

## 1. Project Overview

This project provisions a basic **AWS infrastructure using Terraform**, including a VPC, subnets (public and private), internet access via an Internet Gateway and NAT Gateway, and a public EC2 instance running Docker. It's ideal for beginners learning Infrastructure as Code (IaC) and understanding basic AWS networking principles.

---

## 2. How It Works

1. **VPC Creation**  
   A Virtual Private Cloud (VPC) is created with DNS support and hostnames enabled.

2. **Public and Private Subnets**  
   The VPC includes two subnets:
   - **Public Subnet**: Enables internet access.
   - **Private Subnet**: Used for internal resources (not directly internet-accessible).

3. **Internet Gateway and NAT Gateway**  
   - An **Internet Gateway (IGW)** is attached to allow public subnet access to the internet.
   - A **NAT Gateway** allows private subnet instances to access the internet for updates and dependencies.

4. **Route Tables**  
   - The public subnet is associated with a route table pointing to the IGW.
   - The private subnet uses a NAT Gateway for internet access.

5. **Security Group for EC2**  
   Allows SSH access from a specific IP and unrestricted HTTP access.

6. **EC2 Instance with Docker, Git, Node and PM2 Installation**  
   Launches an EC2 instance in the public subnet and installs Docker, Git, Node and PM2 via user_data.

---

## 3. Tech Stack

| Layer                         | Technology Used                               |
|-------------------------------|-----------------------------------------------|
| Infrastructure as Code        | Terraform                                     |
| Cloud Provider                | AWS                                           |
| Compute                       | EC2                                           |
| Networking                    | VPC, Subnets, IGW, NAT GW                     |
| Route Management              | Route Tables                                  |
| Scripting                     | Bash (Docker install script)                  |

---

## 4. Key Terraform Resources

| Resource                  | Purposes                                       |
|---------------------------|------------------------------------------------|
| **aws_vpc**               | Creates the VPC                                |
| **aws_subnet**            | Defines public and private subnets             |
| **aws_internet_gateway**  | Enables internet access for public subnet      |
| **aws_nat_gateway**       | Allows private subnet to reach internet        |
| **aws_route_table**       | Directs traffic to IGW or NAT GW               |
| **aws_security_group**    | Controls inbound/outbound traffic              |
| **aws_instance**          | Launches EC2 with public IP & Docker installed |

---

## 5. Security Highlights

- **SSH Access Limited to One IP**: Only the user's IP can access EC2 over port 22.
- **Outbound Traffic Fully Allowed**: EC2 can reach out to the internet.
- **HTTP Access is Open**: Port 80 is accessible from all IPs for web services.

---

## 6. Key Features

- Automated VPC Creation with subnets and routing 
- Internet Gateway and NAT Gateway setup for connectivity
- Secure EC2 Launch in the public subnet with Docker
- Variable-based configuration for flexibility
- Script-based provisioning using user_data

---

## 7. Potential Use Cases

- Launch a web server for development or testing  
- Host a lightweight app with Docker on EC2  
- Create foundational AWS network setup for future services
- Learn VPC design and EC2 provisioning with Terraform

---

