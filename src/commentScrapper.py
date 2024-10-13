from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from transformers import pipeline
import sys

if len(sys.argv) != 2:
    print("Add a video ID after the script name")
    sys.exit(1)

vid_id = sys.argv[1]
yt_client = build(
    "youtube", "v3", developerKey="AIzaSyA7qgWTG3KYFoLrVZXdi6oAwb4_70kuFCU"
)

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

# Initialize an empty list to store comments
comments = []
next_token = None

while True:
    resp = get_comments(yt_client, vid_id, next_token)

    if not resp:
        break

    # Extract comment texts into a flat list
    comments.extend(item["snippet"]["topLevelComment"]["snippet"]["textDisplay"] for item in resp["items"])
    next_token = resp.get("nextPageToken")
    if not next_token:
        break

# Store the comments as a one-dimensional list
comment_texts = comments

print(f"Total comments fetched: {len(comment_texts)}")

# Sentiment Analysis
classifier = pipeline("sentiment-analysis")

# Perform sentiment analysis on the list of comments
result = classifier(comment_texts)

# Extract sentiment labels
labels = [item['label'] for item in result]

# Print the sentiment values
for comment, label in zip(comment_texts, labels):
    print(f"Comment: {comment}\nSentiment: {label}\n")