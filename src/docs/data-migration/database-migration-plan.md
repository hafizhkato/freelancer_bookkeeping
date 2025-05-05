
## 🎯 Project Goal

Migrate an on-premises MySQL database to a highly available and scalable cloud environment using AWS services, with minimal downtime and data integrity assurance.

---

## 🧠 Project Scope

1. **Simulate an on-premises MySQL environment locally (e.g., EC2, local VM).**  

2. **Migrate database to AWS RDS for MySQL.**  

3. **Use AWS DMS for minimal downtime migration.**  

4. **Enable monitoring, backup, and security features.**  

5. **Include rollback and disaster recovery planning.**  

6. **Document and visualize the entire process.**  

---

## 3. Tech Stack

| Layer                         | Technology Used                               |
|-------------------------------|-----------------------------------------------|
| Source DB       | MySQL on local VM/EC2 (simulate on-prem)                                    |
| Destination                | Amazon RDS (MySQL)                                           |
| Migration               | AWS Database Migration Service (DMS), AWS Schema Conversion Tool (if needed)  |
| Security                    | IAM, KMS, Security Groups                     |
| Monitoring              | CloudWatch, Enhanced Monitoring                                  |
| Logging                     | CloudTrail, RDS logs                  |

---

## 🛠️ Phase 1: Setup Source & Destination Environments

✅ Tasks
- Launch a local VM or EC2 instance simulating an on-prem server.
- Install MySQL and populate it with realistic data (e.g., mock e-commerce or inventory DB).
- Launch Amazon RDS for MySQL with proper subnet group and security groups.
- Enable RDS automatic backups and monitoring.

---

## 🔒 Phase 2: Security & Access

✅ Tasks

- Configure IAM roles for AWS DMS.
- Set up KMS for encryption (optional for more advanced setup).
- Configure Security Groups: allow access between source and destination.
- Enable SSL for secure data transfer (optional).

---

## 🔄 Phase 3: Data Migration (Using AWS DMS)

✅ Tasks

- Create a replication instance in AWS DMS.
- Create source and target endpoints in DMS.
- Test connectivity from DMS to source and target.
- Choose migration type:
- - Full Load only
- - Full Load + CDC (Change Data Capture)
- Run full load migration and validate.
- Run CDC to sync changes if simulating real-time migration.
- Monitor task status and logs in DMS dashboard.

---

## 📋 Phase 4: Validation & Cutover Plan

⏳ Tasks

- Validate row count and integrity between source and target DBs. 
- Run application queries against new RDS endpoint 
- Switch application connection strings from on-prem to RDS (simulate cutover).
- Monitor post-migration metrics (CPU, memory, connections).
- Stop CDC once cutover is complete.

---

## 🔁 Phase 5: Backup & Rollback

⏳ Tasks

- Take a manual snapshot before and after cutover. 
- Document rollback plan: how to revert to on-prem MySQL if needed. 
- Enable automated backups, retention policy.

---

## 📈 Phase 6: Optimization & Monitoring

⏳ Tasks

- Enable RDS performance insights. 
- Tune DB parameters via RDS Parameter Group. 
- Set up alarms with CloudWatch for CPU/memory/storage thresholds.
- Log slow queries and optimize indexes.