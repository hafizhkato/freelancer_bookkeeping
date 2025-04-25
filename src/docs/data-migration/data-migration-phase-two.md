
## 1. Objective

Migrate an existing MySQL database running on an EC2 instance to a managed RDS MySQL instance using AWS Database Migration Service (DMS). The goal was to move data without app downtime, using Full Load migration.

---

## 2. Stack

- **1. Source**: MySQL on EC2

- **2. Target**: RDS MySQL

- **3. Migration Tool**: AWS DMS (Terraform-managed)

- **4. Infra as Code**: Terraform

- **5. Security**: IAM roles, Security Groups

---

## 3. Prerequisite

- Make sure already run ec2 with MySQL database, since we will be using resource from Phase 1 part 1 in this section.
- Already setup Amazon RDS since we will be using this as target endpoint.
- In this section, I use both Management Console and Terraform to migrate the data:
- - **Terraform**: 
- - - To setup IAM role for DMS
- - - Setup security group
- - - Create replication instance
- - - Create source and target endpoint
- - **Management Console**:
- - - Create Migration Task

---

## 4. Configure IAM for DMS

```hcl
resource "aws_iam_role" "dms_vpc_role" {
  name = "dms-vpc-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Service = "dms.amazonaws.com"
        },
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "dms_vpc_access" {
  role       = aws_iam_role.dms_vpc_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonDMSVPCManagementRole"
}

```

---
## 5. Set Up Security Groups

```hcl
resource "aws_security_group" "dms_sg" {
  name        = "dms-security-group"
  description = "Allow DMS to access source and target databases"
  vpc_id      = data.aws_vpc.default.id
  tags = {
    Name = "dms-security-group"
  }
  # Outbound rule to allow connections to MySQL servers
  egress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Consider restricting this to the specific IP ranges or security groups
  }

  egress { # Allow all outbound traffic by default (can be made more restrictive)
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Allow DMS to connect to EC2 MySQL
resource "aws_security_group_rule" "dms_to_ec2" {
  type                     = "ingress"
  from_port               = 3306
  to_port                 = 3306
  protocol                = "tcp"
  security_group_id       = data.aws_security_group.ec2_mysql_sg.id
  source_security_group_id = aws_security_group.dms_sg.id
}

# Allow DMS to connect to RDS MySQL
resource "aws_security_group_rule" "dms_to_rds" {
  type                     = "ingress"
  from_port               = 3306
  to_port                 = 3306
  protocol                = "tcp"
  security_group_id       = data.aws_security_group.rds_mysql_sg.id
  source_security_group_id = aws_security_group.dms_sg.id
}


```
---
## 6. Create DMS Replication Instance

```hcl
resource "aws_dms_replication_instance" "dms_instance" {
  replication_instance_id     = "portfolio-dms-instance"
  replication_instance_class  = "dms.t3.micro" # free tier eligible
  allocated_storage           = 50
  publicly_accessible         = false
  auto_minor_version_upgrade  = true
  multi_az                    = false
  engine_version              = "3.5.3"
  replication_subnet_group_id = aws_dms_replication_subnet_group.dms_subnet_group.id
  vpc_security_group_ids      = [aws_security_group.dms_sg.id]
  tags = {
    Name = "PortfolioDMS"
  }
}

resource "aws_dms_replication_subnet_group" "dms_subnet_group" {
  replication_subnet_group_id          = "portfolio-dms-subnet-group"
  replication_subnet_group_description = "Subnet group for DMS replication instance"
  subnet_ids                           = [data.aws_subnets.default.ids[0],  # required by DMS to be in different AZs
                                         data.aws_subnets.default.ids[2] ]  
  tags = {
    Name = "DMS subnet group"
  }
}

```
---
## 7. Create Endpoints (Source and Target)

```hcl
resource "aws_dms_endpoint" "source_endpoint" {
  endpoint_id          = "source-ec2-mysql"
  endpoint_type        = "source"
  engine_name          = "mysql"
  username             = var.source_mysql_user
  password             = var.source_mysql_password
  server_name          = var.ec2_mysql_ip
  port                 = 3306
  database_name        = var.source_db_name
  ssl_mode             = "none" # or "require" if you're using SSL

  tags = {
    Name = "EC2 MySQL Source"
  }
}

resource "aws_dms_endpoint" "target_endpoint" {
  endpoint_id          = "target-rds-mysql"
  endpoint_type        = "target"
  engine_name          = "mysql"
  username             = var.rds_mysql_user
  password             = var.rds_mysql_password
  server_name          = data.aws_db_instance.mysql_rds.address
  port                 = 3306
  database_name        = var.target_db_name
  ssl_mode             = "none" # or "require" for encryption

  tags = {
    Name = "RDS MySQL Target"
  }
}

```
---
## 8. Challenges Faced!!!
**Test Connection Failed**
- Endpoint test connection (source) always failed. This is the hardest part in this section to debug. At first I try to limit access in ec2 only to DMS, SSH and MySQL, then I try to open all port and all IP to 0.0.0.0/0 but still fail
- I check NACL and it seems to be completely fine.
- Checking Route Table. The problem might be in route table but I cant find anything wrong in the route table
- Try changing the endpoint by using private IP instead of public one. Still face test connection error.
- After multiple attempt, I found out it is because of MySQL can only be access by localhost which is ec2 instance. To change that i need to change the script in my ec2 instance to allow external connections.
```bash
# Allow MySQL to accept external connections
sudo sed -i "s/^bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf
sudo systemctl restart mysql

```
**Migration Task**
- Then I try to use Terraform to create migration task. But I feel overwhelmed because of multiple error. Always stuck at **Creating...** and **Running with Error...** I decide to use Management Console to run the task for now
- Next time I will try again using Terraform to automatically run Migration Task.