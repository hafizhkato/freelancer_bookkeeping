# 📄 Real-Time Document Data Extraction with AWS Textract

## 1. Project Overview

This project is a **serverless document processing pipeline** that extracts structured data from uploaded files (e.g., receipts, invoices) using **AWS Textract**, and delivers the output in real-time as downloadable CSV files. The architecture is optimized for minimal latency, security, and scalability, making it ideal for automation-heavy back offices or digital bookkeeping tools.

---

## 2. How It Works

1. **User Uploads a File to S3**  
   Documents are uploaded to a designated S3 bucket via the frontend.

2. **Lambda Trigger**  
   The S3 upload automatically triggers an AWS Lambda function.

3. **Textract OCR Processing**  
   The Lambda function calls **Amazon Textract** to analyze the document and extract key-value pairs.

4. **Data Normalization & CSV Generation**  
   The extracted data is converted into a structured CSV format, stored back into S3.

5. **WebSocket Notification to Frontend**  
   When processing is complete, the user is notified in real-time using **API Gateway WebSocket**, including a secure CloudFront-signed download link.

6. **CloudFront-Signed URL for Secure Access**  
   Files are served securely through **CloudFront** using signed URLs to prevent unauthorized access and hide the raw S3 endpoint.

---

## 3. Tech Stack

| Layer              | Technology Used                           |
|-------------------|--------------------------------------------|
| File Storage       | Amazon S3                                  |
| OCR Engine         | Amazon Textract                            |
| Backend Compute    | AWS Lambda (Python)                        |
| Messaging          | API Gateway WebSocket                      |
| Frontend Hosting   | AWS Amplify (React + Vite)                 |
| Secure Delivery    | CloudFront + Signed URL                    |
| Authentication     | AWS Amplify Auth (Cognito)                 |
| Secret Management  | AWS Secrets Manager (for RSA Private Key) |
| Database           | DynamoDB (User session & extracted fields) |

---

## 4. Security Highlights

- **RSA Private Key** used for signing CloudFront URLs is securely stored in **AWS Secrets Manager**.
- **WebSocket-based delivery** ensures only the correct client receives the download link.
- **CloudFront Signed URLs** mask the real S3 location and enforce expiration (1 hour by default).

---

## 5. Key Features

- **OCR using Amazon Textract**: Automatically extract data from uploaded documents.
- **Real-time feedback via WebSocket**: Get notified instantly when the file is processed and ready for download.
- **Downloadable CSV ready within seconds**: Processed data is available for download in CSV format quickly.
- **Secured with signed CloudFront links**: Protect your files with secure, time-limited CloudFront URLs.
- **Scalable and serverless design**: Built on AWS Lambda and other serverless services for easy scaling and cost efficiency.


---

## 6. Challenges & Lessons Learned

- **Secrets Manager Parsing**  
  Initially assumed Secrets Manager required a key-value JSON. Learned that using plaintext is sufficient and simpler for single RSA key storage.

- **CloudFront Signed URL Errors**  
  Faced misleading "Access Denied" errors due to malformed PEM format. Resolved by stripping extra spaces and validating line breaks in RSA keys.

- **Amplify & Auth Integration**  
  Originally used Amplify for both frontend and backend, which led to confusion. Later decoupled and used it solely for hosting and authentication, while backend stayed Lambda-native.

---

## 7. Potential Use Cases

- Invoice or receipt processing for bookkeeping apps  
- Digital filing cabinets for freelancers or small businesses  
- Real-time OCR for any back-office automation

---

