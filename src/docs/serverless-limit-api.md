



![Compression Output](https://d3vc6iedgmxs4m.cloudfront.net/limit-API.jpg)
## 1. Project Overview

As part of building a more robust and fair upload system, I developed an upload rate limiter API using AWS serverless services. The concept is straightforward: track user upload activity in a DynamoDB table and block further uploads once a predefined threshold is reached. This helps prevent abuse and keeps the system sustainable.

This rate limiter is specifically designed for another part of my project a web app that uses Amazon Textract. Since I'm working with limited resources, I'm cautious about unexpected spikes in cloud costs. While this solution may not be the most optimized or cost-efficient, it's a practical starting point that offers protection without much complexity.

That said, I recognize that querying DynamoDB on every upload introduces latency and could become expensive at scale. One alternative is Redis-based caching (via ElastiCache), which offers much faster lookups. However, ElastiCache is not serverless and requires VPC setup and server management which is something I want to avoid.

If latency is a real concern, one option would be to integrate DynamoDB DAX (DynamoDB Accelerator). It provides in-memory caching without significant changes to the existing DynamoDB SDK and architecture, making it relatively painless to integrate while keeping everything serverless but expensive.

Alternatively, if I want both low latency and cost-efficiency at scale, a hybrid setup using CloudFront and Lambda is likely the best path forward. In this approach, the client first requests a signed upload URL from a lightweight Lambda (which applies the rate limit check using DynamoDB), and then uploads the file directly to S3 via that signed URL. In this case, I dont need API Gateway and Cloudfront are generally cheaper than API Gateway.

This implementation is fully serverless and scalable, built using AWS Lambda, API Gateway, and DynamoDB, all provisioned through Terraform for repeatable, consistent deployments.

Let me walk you through how it works and how I put it together from scratch.

---

## 2. The Idea

Imagine a scenario where users can upload content but you want to prevent them from overusing the system (e.g., limit to 5 uploads every 24 hours). That’s where this API fits in.

Here’s what I used:

- **API Gateway**: Expose a simple REST endpoint /upload-check
- **AWS Lambda**: Core logic to check if a user has hit their limit
- **DynamoDB**: Store each upload event with TTL for automatic expiry
- **IAM Roles**: Secure access between services
- **Terraform**: Define the entire stack as code

---

## 3. The Architecture

Here's how the system works from request to enforcement:

1. Client sends a **POST** request to **/upload-check** with a userId

2. API Gateway forwards the request to a Lambda Function

3. Lambda:
- - Queries DynamoDB for recent uploads by that user
- - If count < limit (e.g., 5 per 3 hours), allows the upload and writes a new entry 
- - If limit is hit, returns a 429 response (Too Many Requests)

4. DynamoDB:
- - Table uses userId as the partition key and timestamp as the sort key
- - A TTL field (expireAt) automatically removes entries after 3 hours

---

## 4. Setup & Deployment

**1. DynamoDB Table**

```hcl
  resource "aws_dynamodb_table" "upload_tracker" {
  name         = "UploadTracker"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "userId"
  range_key    = "timestamp"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "S"
  }

  ttl {
    attribute_name = "expireAt"
    enabled        = true
  }
}
```
**2. IAM Role + Policies for Lambda**

```hcl
resource "aws_iam_role" "lambda_role" {
  name = "UploadLimiterLambdaRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action    = "sts:AssumeRole",
      Principal = { Service = "lambda.amazonaws.com" },
      Effect    = "Allow"
    }]
  })
}

resource "aws_iam_policy" "lambda_dynamodb_policy" {
  name = "UploadLimiterDynamoDBPolicy"
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect   = "Allow",
      Action   = ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:Query"],
      Resource = aws_dynamodb_table.upload_tracker.arn
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy_attach" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_dynamodb_policy.arn
}

resource "aws_iam_role_policy_attachment" "lambda_logs_attach" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

```
**3. Lambda Function**

```hcl
resource "aws_lambda_function" "upload_limiter" {
  function_name = "UploadLimiterFunction"
  runtime       = "python3.12"
  handler       = "lambda_function.lambda_handler"
  filename         = "upload-limiter.zip"
  source_code_hash = filebase64sha256("upload-limiter.zip")
  role             = aws_iam_role.lambda_role.arn
}

```
- zip your lambda function first

**4. API Gateway + CORS Support**

```hcl
resource "aws_api_gateway_rest_api" "upload_limiter_api" {
  name        = "UploadLimiterAPI"
  description = "API for limiting uploads"
}

resource "aws_api_gateway_method" "options_method" {
  rest_api_id   = aws_api_gateway_rest_api.upload_limiter_api.id
  resource_id   = aws_api_gateway_resource.upload_check.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}


```
- for more CORS detailed setup can go to my github repo.

**5. Optional: Add a DAX Cluster**

```hcl
resource "aws_dax_cluster" "upload_tracker_cache" {
  cluster_name           = "upload-tracker-dax"
  node_type              = "dax.r5.large"
  replication_factor     = 1
  iam_role_arn           = aws_iam_role.lambda_role.arn
  subnet_group_name      = aws_dax_subnet_group.upload_subnets.name
  security_group_ids     = [aws_security_group.dax_sg.id]
}

resource "aws_dax_subnet_group" "upload_subnets" {
  name       = "dax-subnet-group"
  subnet_ids = ["subnet-1234567", "subnet-7654321"] # Replace with your private subnet IDs
}
```
- you will also need to update your lambda function to use **AmazonDAXClient** in Python using boto3 + amazondax SDK
- your lambda will need: 
- - 1.  VPC access with NAT (for logs, metrics)
- - 2. Security group that allows outbound access to DAX
- - 3. Subnets that match the DAX subnet group
- This will be quite expensive since we need to provision VPC and NAT Gateway

---

## 5. Why This Pattern?

- **Scalability**: Fully serverless, handles sudden spikes easily

- **Security**: Fine-grained IAM roles per service

- **TTL-based Cleanup**: No need for manual cleanup logic

- **Cost-Efficient**: PAY_PER_REQUEST billing mode + Lambda’s low cost

---

## 6. Final Thoughts

This pattern is ideal for B2C systems with fair-use requirements. It enforces rules server-side and makes abuse much harder. The use of DynamoDB TTL means you don’t need to run cleanup jobs, and everything is neatly packaged using Terraform.

Want to go further? You can extend this with rate-limiting by IP, dynamic quotas, or even integrate with usage-based billing models.

---

