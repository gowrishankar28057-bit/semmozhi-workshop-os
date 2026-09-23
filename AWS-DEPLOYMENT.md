# AWS Deployment Guide for Semmozhi Workshop OS

This guide walks you through deploying Semmozhi Workshop OS to AWS using ECS Fargate and RDS PostgreSQL.

## Prerequisites

- AWS Account with appropriate IAM permissions
- AWS CLI configured (`aws configure`)
- Docker installed locally
- Node.js 18+ installed

## Step 1: Create RDS PostgreSQL Database

```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier semmozhi-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username postgres \
  --master-user-password YOUR_SECURE_PASSWORD \
  --allocated-storage 20 \
  --publicly-accessible false \
  --region us-east-1

# Get the endpoint
aws rds describe-db-instances \
  --db-instance-identifier semmozhi-db \
  --query 'DBInstances[0].Endpoint.Address'
```

## Step 2: Create AWS Secrets Manager Secrets

```bash
# Store database URL
aws secretsmanager create-secret \
  --name semmozhi/database-url \
  --secret-string "postgresql://postgres:PASSWORD@RDS_ENDPOINT:5432/semmozhi_prod"

# Store NextAuth secret
aws secretsmanager create-secret \
  --name semmozhi/nextauth-secret \
  --secret-string "$(openssl rand -base64 32)"

# Store JWT secret
aws secretsmanager create-secret \
  --name semmozhi/jwt-secret \
  --secret-string "$(openssl rand -base64 32)"
```

## Step 3: Create ECS Cluster

```bash
# Create ECS cluster
aws ecs create-cluster \
  --cluster-name semmozhi-cluster \
  --region us-east-1

# Create CloudWatch Log Group
aws logs create-log-group \
  --log-group-name /ecs/semmozhi-workshop-os \
  --region us-east-1
```

## Step 4: Create IAM Roles

```bash
# Create ecsTaskExecutionRole (already exists in most AWS accounts)
# If it doesn't exist, create it with:
aws iam create-role \
  --role-name ecsTaskExecutionRole \
  --assume-role-policy-document file://trust-policy.json

# Attach policy
aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

# Add secrets access
aws iam put-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-name ECSTaskExecutionSecretsPolicy \
  --policy-document file://secrets-policy.json
```

## Step 5: Create ECR Repository

```bash
aws ecr create-repository \
  --repository-name semmozhi-workshop-os \
  --region us-east-1
```

## Step 6: Update and Register Task Definition

```bash
# Update the ecs-task-definition.json with your AWS account ID and region
sed -i 's/YOUR_ECR_REGISTRY/YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/g' ecs-task-definition.json
sed -i 's/ACCOUNT_ID/YOUR_ACCOUNT_ID/g' ecs-task-definition.json
sed -i 's/REGION/us-east-1/g' ecs-task-definition.json

# Register task definition
aws ecs register-task-definition \
  --cli-input-json file://ecs-task-definition.json \
  --region us-east-1
```

## Step 7: Create ECS Service

```bash
# Create security group for ALB
aws ec2 create-security-group \
  --group-name semmozhi-alb-sg \
  --description "Security group for Semmozhi ALB"

# Allow HTTP/HTTPS traffic
aws ec2 authorize-security-group-ingress \
  --group-name semmozhi-alb-sg \
  --protocol tcp \
  --port 80 \
  --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
  --group-name semmozhi-alb-sg \
  --protocol tcp \
  --port 443 \
  --cidr 0.0.0.0/0

# Create Application Load Balancer
aws elbv2 create-load-balancer \
  --name semmozhi-alb \
  --subnets subnet-xxxxx subnet-xxxxx \
  --security-groups sg-xxxxx \
  --scheme internet-facing

# Create Target Group
aws elbv2 create-target-group \
  --name semmozhi-tg \
  --protocol HTTP \
  --port 3000 \
  --vpc-id vpc-xxxxx \
  --target-type ip

# Create ECS Service
aws ecs create-service \
  --cluster semmozhi-cluster \
  --service-name semmozhi-service \
  --task-definition semmozhi-workshop-os:1 \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxx,subnet-xxxxx],securityGroups=[sg-xxxxx],assignPublicIp=ENABLED}" \
  --load-balancers targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:ACCOUNT_ID:targetgroup/semmozhi-tg/xxxxx,containerName=semmozhi-app,containerPort=3000
```

## Step 8: Deploy Using GitHub Actions

1. Add AWS credentials to GitHub Secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

2. Push to main branch:
```bash
git add .
git commit -m "chore: add AWS deployment configuration"
git push -u origin main
```

3. GitHub Actions will automatically build and deploy!

## Step 9: Set Up Custom Domain (Optional)

```bash
# Create Route53 record pointing to ALB
aws route53 change-resource-record-sets \
  --hosted-zone-id ZONE_ID \
  --change-batch file://route53-change.json

# Add SSL certificate via ACM
aws acm request-certificate \
  --domain-name your-domain.com \
  --validation-method DNS
```

## Monitoring

```bash
# Check service status
aws ecs describe-services \
  --cluster semmozhi-cluster \
  --services semmozhi-service

# View logs
aws logs tail /ecs/semmozhi-workshop-os --follow

# Check task health
aws ecs list-tasks --cluster semmozhi-cluster
aws ecs describe-tasks --cluster semmozhi-cluster --tasks TASK_ARN
```

## Database Migrations

After deployment, run Prisma migrations:

```bash
# In the ECS task/container
npx prisma db push
```

Or add to the task definition entrypoint:
```json
"entryPoint": [
  "sh",
  "-c",
  "npx prisma db push && npm start"
]
```

## Environment Variables

Update in AWS Secrets Manager:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Your domain (e.g., https://your-domain.com)
- `NEXTAUTH_SECRET` - Random 32-char string
- `JWT_SECRET` - Random 32-char string

## Cost Optimization

- Use **Fargate Spot** for non-critical environments
- Set **auto-scaling** policies
- Use **RDS Multi-AZ** only for production
- Enable **CloudWatch cost alerts**

## Troubleshooting

**Tasks failing to start:**
```bash
aws ecs describe-tasks --cluster semmozhi-cluster --tasks TASK_ARN | jq '.tasks[].stopCode'
```

**Database connection issues:**
Check security groups allow communication between ECS and RDS.

**Out of memory:**
Increase task memory in ECS task definition (currently 512MB).

---

For more info, visit: [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
