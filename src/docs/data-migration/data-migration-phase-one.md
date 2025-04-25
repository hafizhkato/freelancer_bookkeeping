
## 1. Objective

The goal of this phase is to simulate an on-premises MySQL database server using an EC2 instance. This instance will serve as the source database for the migration process to AWS-managed services. The entire process was automated using Terraform and a startup script, ensuring minimal manual intervention and maximum repeatability.

---

## 2. Infrastructure Provisioning (Terraform)

A Terraform script was written to:

1. Create a public subnet in the default VPC since I might accidentally delete it before. 

2. Set up a security group to allow:
- - SSH access (port 22) for administration
- - MySQL access (port 3306) for testing and migration 

3. Create an IAM role and instance profile that allows the EC2 instance to access S3 (used for loading .sql mock data).  

4. Launch an EC2 instance using a specified AMI and instance type. 

5. Attach the IAM role and security group to the instance.   

---

## 3. MySQL Installation & Automation (User Data Script)

The EC2 instance runs a Bash script via the user_data field, which performs the following actions:

1. Installs MySQL server and AWS CLI

2. Sets a root password and secures the MySQL user

3. Creates a test database (ecommerce)

4. Downloads mock .sql files from an S3 bucket

5. Imports those .sql files into the database

``` bash
#!/bin/bash

# Update and install packages
sudo apt-get update
sudo apt-get install -y mysql-server awscli

# Start MySQL and configure root user
sudo systemctl start mysql
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Create the database
sudo mysql -uroot -pPassword -e "CREATE DATABASE ecommerce;"

# Download SQL files from S3
aws s3 cp s3://aws-project-management-0976/mysql/customers_data.sql /home/ubuntu/customers_data.sql
aws s3 cp s3://aws-project-management-0976/mysql/transaction.sql /home/ubuntu/transaction.sql

# Import SQL files into the ecommerce database
sudo mysql -uroot -pPassword ecommerce < /home/ubuntu/customers_data.sql
sudo mysql -uroot -pPassword ecommerce < /home/ubuntu/transaction.sql

```

---

## 4. Mock Data Population

Mock data was generated using Mockaroo, which allows exporting realistic dummy data in SQL format. The generated SQL was saved with CREATE TABLE statements enabled to avoid insert errors.

The files were uploaded to a specific folder (/mysql) in an S3 bucket.

---

## 5. Challenges Faced!!!

**1. Missing default subnet**
- - I thought default subnet already install in my AWS account. I am not sure if I accidentally delete it. Either way, I just create a new one.
- - **Fix**: Manually created a new subnet and associated it with the default route table

**2. IAM access denied**
- - EC2 instance could not read from S3 due to AccessDenied errors. Every time I do an AWS project, I will run into this issue. I try to use least privillege policy but sometimes, I always need to debug it.
- - **Fix**: Write a better json code

**3. Data is not imported to mysql**
- - Error 1146: Table doesn’t exist during import. I forgot to add CREATE TABLES when generate mock data in Mockaroo. I debug step by step before find the problem is failure in the import and not because my ec2 instances failed to download from my s3 bucket
- - **Fix**: Realized the .sql file lacked CREATE TABLE, resolved by enabling it in Mockaroo


---

## 6. Outcome

By the end of Phase 1, I had a fully functional EC2 instance acting as an on-premises MySQL server with populated test data, ready to be migrated to AWS-managed services (such as RDS or Aurora) in the next phase.

The entire setup is automated using Terraform and Bash scripting, making it easy to destroy and recreate the environment as needed for testing or demonstration.

---
