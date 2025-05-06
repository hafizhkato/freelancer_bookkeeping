



![Compression Output](https://d3vc6iedgmxs4m.cloudfront.net/contact-API.jpg)
## 1. Project Overview

To collect and manage inquiries from my website visitors, I built a contact form backend using AWS serverless services. The idea is simple: when someone submits the form, the message is saved to DynamoDB and I get an email alert via SNS.

This setup is reliable, cost-efficient, and scalable with minimal maintenance effort. It doesn't rely on any external SaaS tools since everything runs natively on AWS. The use of Terraform also means that the whole thing is reproducible and easy to deploy across environments.

It’s designed with small businesses and personal projects in mind, cheap to run (no idle charges), and everything can be scaled out later with minimal changes.

---

## 2. The Idea

Here’s what I needed:

- **DynamoDB**: Store contact form submissions (name, email, message, timestamp)
- **SNS**: Send me an email when someone submits the form
- **Lambda**: Take the form data, validate, store it, and trigger an alert
- **API Gateway**: REST endpoint to receive the POST request
- **IAM**: Handle service permissions securely
- **Terraform**: Define the entire stack as code

---

## 3. The Architecture

Here’s how the system works:

1. Frontend sends a **POST** request to **/contact** with form data (name, email, message)

2. API Gateway forwards this to a Lambda function

3. Lambda:
- - Validates the input
- - Saves the data to DynamoDB 
- - Sends an alert through SNS (to my email)

4. DynamoDB:
- - Stores message entries with a unique ID

---

## 4. Setup & Deployment

**1. DynamoDB Table**

```hcl
resource "aws_dynamodb_table" "contact_messages" {
  name         = "ContactMessages"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}
```
**2. SNS Topic + Email Subscription**

```hcl
resource "aws_sns_topic" "contact_alerts" {
  name = "NewContactMessage"
}

resource "aws_sns_topic_subscription" "email_alert" {
  topic_arn = aws_sns_topic.contact_alerts.arn
  protocol  = "email"
  endpoint  = var.notification_email  # Replace with your email
}

```
**3. IAM Role + Policies for Lambda**

```hcl
resource "aws_iam_role" "lambda_role" {
  name = "lambda_contact_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda_contact_policy"
  role = aws_iam_role.lambda_role.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = ["dynamodb:PutItem"],
        Resource = aws_dynamodb_table.contact_messages.arn
      },
      {
        Effect   = "Allow",
        Action   = ["sns:Publish"],
        Resource = aws_sns_topic.contact_alerts.arn
      },
      {
        Effect   = "Allow",
        Action   = ["logs:*"],
        Resource = "*"
      }
    ]
  })
}


```

**4. Lambda Function**

```hcl
resource "aws_lambda_function" "contact_handler" {
  function_name    = "contactHandler"
  role             = aws_iam_role.lambda_role.arn
  handler          = "contact_handler.lambda_handler"
  runtime          = "python3.12"
  timeout          = 10
  memory_size      = 128
  filename         = "lambda_function.zip"
  source_code_hash = filebase64sha256("lambda_function.zip")

  environment {
    variables = {
      TABLE_NAME    = aws_dynamodb_table.contact_messages.name
      SNS_TOPIC_ARN = aws_sns_topic.contact_alerts.arn
    }
  }
}

```
- Make sure to zip your Lambda Python code into lambda_function.zip before deployment.

---

## 5. Why This Pattern?

- **Serverless**: No servers to manage or pay for when idle

- **Scalable**: Lambda + DynamoDB can handle spikes easily

- **Simple Alerts**: Get notified instantly with SNS

- **Secure**: Uses IAM roles for scoped permissions

- **Cost-efficient**: PAY_PER_REQUEST mode ensures no idle cost

- **Reusable**: Everything is in Terraform, so redeploying is fast

---

## 6. Final Thoughts

This contact form backend is perfect for lean websites or indie projects. It’s quick to set up, easy to maintain, and costs virtually nothing when idle. You can plug it into any frontend that supports form submissions, and get alerts instantly when someone reaches out.

From here, you could extend it with:

- 1. reCAPTCHA validation

- 2. Email auto-responders via SES

- 3. Integration with CRM or ticketing systems

---

