from chalice import Chalice

from PIL import Image
import boto3

app = Chalice(app_name='events')
@app.on_s3_event(bucket='explore-tech',
                 events=['s3:ObjectCreated:Put'],
                 prefix='images/', suffix='.png')
def handle_s3_event(event):
    print("Received event for bucket: %s, key: %s",
                  event.bucket, event.key)

    thumb_size = 128, 128

    s3_client = boto3.client('s3')
    s3_client.download_file(event.bucket, event.key, "/tmp/source.png")
    
    source = Image.open("/tmp/source.png")
    source.thumbnail(thumb_size)
    source.save("/tmp/thumbnail.png")

    destination = event.key.replace("images/", "thumbs/")
    s3_client.upload_file("/tmp/thumbnail.png", event.bucket, destination)