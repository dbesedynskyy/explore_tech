Chalice example (S3 events) for ExploreTech-Toronto
Function will be called for every **.png** file upload to S3 bucket with prefix **images/**

You can reconfigure this behavior by modifying bucket name and prefix in **app.py**:
 
    @app.on_s3_event(bucket='[YOUR BUCKET NAME]', 
                     events=['s3:ObjectCreated:Put'],
                     prefix='[YOUR PREFIX]', suffix='.png')

Create S3 bucket for image files

To deploy project:

    chalice deploy

---
more information on chalice: https://chalice.readthedocs.io/en/latest/