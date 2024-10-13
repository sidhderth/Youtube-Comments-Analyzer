from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import csv
import sys

if len(sys.argv) != 3:
    print("Add a video ID and output file name after the script name")
    sys.exit(1)

vid_id = sys.argv[1]          #send video Id here
output_file = sys.argv[2]
yt_client = build(
    "youtube", "v3", developerKey="AIzaSyA7qgWTG3KYFoLrVZXdi6oAwb4_70kuFCU" #API token here
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


comments = []
next = None

while True:
    resp = get_comments(yt_client, vid_id, next)

    if not resp:
        break

    comments += resp["items"]
    next = resp.get("nextPageToken")
    if not next:
        break

print(f"Total comments fetched:{len(comments)}")


with open(output_file, "w", newline="", encoding="utf-8") as file:
    csvWrite = csv.writer(file)
    for i in comments:
        row = [i["snippet"]["topLevelComment"]["snippet"]["textDisplay"]]
        csvWrite.writerow(row)