from flask import Flask, request
import threading
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from transformers import pipeline
import json

app = Flask(__name__)
video_id = None  # Initialize variable to store the video ID

@app.route('/video_id', methods=['POST'])
def get_video_id():
    global video_id
    data = request.get_json()
    video_id = data.get('videoId')
    print(f"Received Video ID: {video_id}")
    return {'status': 'success'}, 200

def run_flask_app():
    app.run(port=5000)

def get_comments(client, video_id, token=None):
    try:
        response = (
            client.commentThreads()
            .list(
                part="snippet",
                videoId=video_id,
                textFormat="plainText",
                maxResults=100,
                pageToken=token,
            )
            .execute()
        )
        return response
    except HttpError as e:
        print(e.resp.status)
        return None
    except Exception as e:
        print(e)
        return None

def analyze_comments():
    global video_id
    yt_client = build(
        "youtube", "v3", developerKey="YOUR_API_KEY"  # Replace with your actual API key
    )

    while True:
        if video_id:  # Check if a video ID has been received
            comments = []
            next_token = None
            while True:
                resp = get_comments(yt_client, video_id, next_token)

                if not resp:
                    break

                # Extract comment texts into a flat list
                comments.extend(item["snippet"]["topLevelComment"]["snippet"]["textDisplay"] for item in resp["items"])
                next_token = resp.get("nextPageToken")
                if not next_token:
                    break

            # Store the comments as a one-dimensional list
            comment_texts = comments

            # Sentiment Analysis
            classifier = pipeline("sentiment-analysis")

            # Perform sentiment analysis on the list of comments
            result = classifier(comment_texts)

            # Count positive and negative sentiments
            positive_count = sum(1 for item in result if item['label'] == 'POSITIVE')
            negative_count = sum(1 for item in result if item['label'] == 'NEGATIVE')

            # Calculate ratios
            total_count = positive_count + negative_count
            positive_ratio = positive_count / total_count if total_count > 0 else 0
            negative_ratio = negative_count / total_count if total_count > 0 else 0

            # Store the ratios in variables
            sentiment_ratios = {
                "positive_ratio": positive_ratio,
                "negative_ratio": negative_ratio
            }

            # You can use sentiment_ratios variable later as needed
            # For now, it is just stored and not printed

            video_id = None  # Reset video ID to prevent repeated processing

if __name__ == '__main__':
    # Start the Flask app in a separate thread
    threading.Thread(target=run_flask_app).start()
    print("Flask server running on http://localhost:5000")
    analyze_comments()  # Start analyzing comments