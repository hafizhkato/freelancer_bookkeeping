# 🌍 Multi-Environment Deployment Demo

This project showcases a complete CI/CD pipeline with **multi-environment deployment** across **Dev**, **Staging**, and **Production**, using GitHub Actions and AWS infrastructure.

---

## 🔧 Tech Stack

- **Frontend:** React (Vite) → Docker → S3 / CloudFront
- **Backend:** Node.js → Docker → EC2 / ECS
- **CI/CD:** GitHub Actions
- **Infrastructure:** AWS (managed via Terraform)

---

## 📦 Folder Structure

- ├── backend/ # Node.js backend (Dockerized) 
- ├── frontend/ # React frontend (Dockerized or static build) 
- ├── infrastructure/ 
- │ ├── dev/ # Terraform configs for Dev environment 
- │ ├── staging/ # Terraform configs for Staging environment 
- │ └── prod/ # Terraform configs for Production environment 
- ├── .github/ 
- │ └── workflows/ # GitHub Actions for CI/CD 
- └── README.md
---

## 🚀 Deployment Strategy

| Branch       | Environment | Deployment Target    |
|--------------|-------------|----------------------|
| **dev**        | Development | AWS Dev Infrastructure |
| **staging**    | Staging     | AWS Staging Infrastructure |
| **main**       | Production  | AWS Production Infrastructure |

![Compression Output](https://d3vc6iedgmxs4m.cloudfront.net/branch.png)

Each push to a specific branch automatically triggers:
- 1. App build
- 2. Docker image push to ECR
- 3. Environment-specific deployment via ECS / EC2 / S3

---

## 🛠️ In Progress

| Phase | Description                  | Status  |
|-------|------------------------------|---------|
| 1     | Project Structure Setup      | ✅ Done |
| 2     | Terraform Infra (3 envs)     | ✅ Done |
| 3     | GitHub Actions (CI/CD)       | ✅ Done |
| 4     | Secrets & Env Management     | ✅ Done |
| 5     | Tests & Linting Integration  | ✅ Done |

---

## 📸 Demo Screenshots

- **CI/CD run success**
![Compression Output](https://d3vc6iedgmxs4m.cloudfront.net/workflow1.png)
![Compression Output](https://d3vc6iedgmxs4m.cloudfront.net/workflow2.png)


---

## 💡 Why This Project?

Modern companies demand:
- Dev/Staging/Prod environments
- Fast, secure CI/CD pipelines
- Infrastructure as code (IaC)
- Dockerized, scalable apps

This project demonstrates **all of the above**.

---