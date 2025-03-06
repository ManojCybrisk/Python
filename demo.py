import boto3
import os

def upload_to_s3(file_path, bucket_name, s3_key):
    s3 = boto3.client('s3')
    try:
        s3.upload_file(file_path, bucket_name, s3_key)
        print(f"File {file_path} uploaded to {bucket_name}/{s3_key}")
    except Exception as e:
        print(f"Error uploading file: {e}")

def move_files_to_s3(folder_path, bucket_name):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            file_path = os.path.join(root, file)
            s3_key = os.path.relpath(file_path, folder_path)
            upload_to_s3(file_path, bucket_name, s3_key)

if __name__ == "__main__":
    folder_path = '/path/to/your/folder'
    bucket_name = 'your-s3-bucket-name'
    move_files_to_s3(folder_path, bucket_name)