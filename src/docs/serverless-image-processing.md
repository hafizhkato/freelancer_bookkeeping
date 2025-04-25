

## 1. Project Overview

![Compression Output](https://d3vc6iedgmxs4m.cloudfront.net/lambda-gig1.png)

As part of my journey into serverless architecture, I recently built a simple yet powerful image compression pipeline using AWS. The goal was straightforward: whenever an image is uploaded to S3, compress it automatically and save the optimized version in another folder, so I can display the compressed image directly on my website. Instead of relying on a traditional monolithic app, I went fully serverless to keep it scalable and cost-effective. The optimized images are served through CloudFront for faster delivery, and displayed in my React app without storing them in the repo or exposing my s3 URL.

Let me walk you through how it works and how I built it from the ground up.

---

## 2. The Idea

Most image-heavy apps need some sort of compression to improve loading times and reduce bandwidth usage. Services like TinyPNG exist, but I wanted to create my own serverless version using:

- **Amazon S3**: to store original and compressed images.
- **Amazon SQS**: to handle events asynchronously.
- **AWS Lambda**: to do the actual image compression.
- **Cloudfront**: Serve optimized image to avoid exposing s3 URL.
- **Terraform**: to define and manage all infrastructure as code.
- **Docker**: build dependencies for Lambda Layer.

---

## 3. The Architecture

Here’s the basic flow:

1. An image is uploaded to **uploads/** in an S3 bucket 

2. This triggers an event → sends a message to an SQS queue 

3. SQS triggers a Lambda function (with batch support)  

4. The Lambda compresses the image using Pillow (Python Imaging Library) 

5. The output is saved in **optimized/** inside the same bucket

6. A CloudFront distribution is set up in front of the S3 bucket, configured to serve only the **optimized/** path. This ensures compressed images are cached and delivered efficiently to users around the world.

---

## 4. Setup & Deployment

**1. Build Lambda Layer (with Pillow)**

```bash
    chmod +x build-layer-docker.sh
    ./build-layer-docker.sh
```
**2. Zip Lambda Function**

```bash
    chmod +x zip-function.sh
    ./zip-function.sh
```
**3. Deploy with Terraform**

```bash
    terraform init
    terraform apply
```

---

## 5. Challenges Faced!!

**1. Pillow Import Error on Lambda**
- **Error**: cannot import name '_imaging' from 'PIL'
- **Cause**: Pillow was installed on the local machine (incompatible with Lambda's environment)
- **Fix**: Used Docker to install Pillow inside an Amazon Linux-compatible environment

**2. Lambda Crashing Without Error Logs**
- At first, Lambda just failed silently with a cryptic message:
**Runtime exited with error: signal: killed**

- No logs. No stack trace. Just dead.

- After digging around, I realized it was a memory issue. The image processing was too heavy for the default 128MB. I bumped it up to 512MB and increased the timeout to 60 seconds. That fixed it.

**3. SQS + Lambda: Batch Size Confusion**
- Initially, I set **batch_size = 5** for the Lambda trigger from SQS. But this caused some weird behavior. Sometimes only one image got processed, sometimes none.
- Lowering the batch size to 1 made it much more reliable. I might revisit batching later when I handle lighter image types or do parallel processing.

**4. Terraform Debugging Was Tedious**
- Terraform is amazing, but when things don’t work, it’s not always obvious why. I had to constantly terraform destroy and re-apply to test permissions or fix policies. Most problem come from fixing policies and permission generally.

---

## 6. Why Add SQS?

- **1. Reliability**: Messages won't be lost even if Lambda fails
- **2. Decoupling**: Separates the upload event from the processing logic.
- **3. Batch Processing**: You can process multiple events in one Lambda invocation.
- **4. Scalability**: Handles spikes in uploads more gracefully.

---

## 7. Final Thoughts

- This project was a great exercise in applying AWS serverless services in a real-world use case. It’s lean, cost-effective, and easily extendable.

- You can find the full code on GitHub 

---

