



![Compression Output](https://d3vc6iedgmxs4m.cloudfront.net/stock-1.jpg)
## 1. Project Overview

I automated the deployment process for my Dockerized backend app using GitHub Actions and AWS ECS (Fargate). The flow includes two GitHub workflows:

**Build & Push Workflow**:

- Triggered when I push code to the vite-push branch.

- It builds a Docker image from my Vite-based app, tags it, and pushes it to Amazon ECR.

**Deploy Workflow**:

- Also triggered by the same branch.

- It fills in a task definition template, registers a new ECS Task Definition version, and tells ECS to update the running service with the new image.

![Compression Output](https://d3vc6iedgmxs4m.cloudfront.net/docker-projects/workflow-3.png)

---

## 2. Prerequisites

1. AWS account with appropriate permissions

2. Terraform installed (v1.0+ recommended)

3. AWS CLI configured with default profile

4. Basic understanding of AWS services (ECS, ALB, VPC, IAM)

5. Able to create dockerfile

6. Basic knowledge about Github Actions

---

## 3. Methode

There are 3 Steps to complete this project.

1. Building infrastructure (Terraform)

2. Building Dockerfile (Docker)

3. Building workflows (Github Actions)


---

## 4. Infrastructure Components

I use Terraform to provision my infrastructure (Detailed Terraform script in my github). Here are what I need to do:

1. Provider Configuration

2. Networking Setup (Default VPC, Route Table, and three Public Subnet)

3. Security Group (ALB Security Group, Backend Security Group)

4. S3 Storage

5. ECR Repository

6. ECS Services:

- ECS Cluster
- ECS Task Definition
- ECS Service

7. IAM Roles ( ECS Task Execution Role, ECS Task Role)

8. Load Balancer setup ( Application Load Balancer, Target Group, Listener)

9. Logging ( Cloudwatch)

10. Outputs (alb dns name, ecr repo url, ecs cluster name, ecs task definition arn, exs service name and ecs task execution role arn)
---

## 5. Dockerfile

Next I need to create docker image

**Dockerfile**

**Build Stage**

1. Configure Base Image

2. Working Directory

3. Dependency Installation

4. Application Build

**Production Stage**

5. Base Image

6. Cleanup: Removes default nginx content

7. Asset Deployment

8. Port Configuration

9. Runtime Command

---

## 6. Github Actions workflows

I seperate the workflows into two section. 

1. Push docker image to ECR Repository

2. Push to ECS Cluster

**ECR Repository**

Here is the workflows(Check on my github for full yaml scripts)

1. Checkout Source Code

2. Configure AWS Credentials

3. Login to Amazon ECR

4. Build Docker Image

5. Tag Docker Image

6. Push Docker Image to ECR

**ECS Cluster Workflow**

1. Checkout code

2. Configure AWS credentials

3. Login to Amazon ECR

4. Fill taskdef.json with variables

5. Register new ECS task definition

6. Update ECS service

I am using Secrets and environment settings to store AWS Credentials. I also need to give the least privilege access to the credentials.

![Compression Output](https://d3vc6iedgmxs4m.cloudfront.net/docker-projects/secrets.png)

---
## 7. Result

- Once I push to vite-push, everything from building the image to updating the ECS service happens automatically.

![Compression Output](https://d3vc6iedgmxs4m.cloudfront.net/docker-projects/docker-push.png)

- My backend gets updated on AWS Fargate without any manual steps.

![Compression Output](https://d3vc6iedgmxs4m.cloudfront.net/docker-projects/deploy-to-ecs.png)

- The deployment process is fast, clean, and versioned (thanks to github.sha tags).

- I can access the page by visiting ALB dns name

![Compression Output](https://d3vc6iedgmxs4m.cloudfront.net/docker-projects/vite-page.png)

---

## 8. IAM Permission

- Give user or role these permission if want to apply least privilege principle

| **For Build & Push to ECR**       | **For Deploy to ECS**      |  
|-------------------|--------------------------------------------|
| "ecr:GetAuthorizationToken"      | "ecs:RegisterTaskDefinition"|
| "ecr:BatchCheckLayerAvailability" | "ecs:DescribeTaskDefinition"  |
| "ecr:PutImage"    | "ecs:UpdateService"                        |
| "ecr:InitiateLayerUpload"         | "ecs:DescribeServices"    |
| "ecr:UploadLayerPart"   |                 |
| "ecr:CompleteLayerUpload"    |                    |
| "ecr:DescribeRepositories"     |                 |

- You can also give **ECR and ECS full access** if you don't care about least privilege or just testing

## 9.Challenges Faced

**Challenges Faced**

- Initially, the GitHub workflows failed because the IAM user didn’t have the right permissions. I had to carefully grant only the least privilege access needed for ECR and ECS deployments.

**Task Role Error**

- I hit an error saying the ECS service couldn't be created due to an invalid taskRoleArn. This was fixed by ensuring the ECS Task Definition had the proper IAM role assigned.

**Caching Issue in AWS Console**

- One strange issue was that my ECS service updates didn’t seem to apply — until I tried viewing them in Incognito mode. Turned out to be a caching issue in the AWS Console UI.



