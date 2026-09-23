#!/bin/bash

# Semmozhi Workshop OS - AWS Deployment Script
# This script deploys the application to AWS ECS on Fargate

set -e

# Configuration
AWS_REGION=${AWS_REGION:-"us-east-1"}
AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID:-"YOUR_ACCOUNT_ID"}
ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
IMAGE_NAME="semmozhi-workshop-os"
CLUSTER_NAME="semmozhi-cluster"
SERVICE_NAME="semmozhi-service"
TASK_DEFINITION="semmozhi-workshop-os"

echo "🚀 Deploying Semmozhi Workshop OS to AWS ECS..."

# 1. Build Docker image
echo "📦 Building Docker image..."
docker build -t ${IMAGE_NAME}:latest .

# 2. Login to ECR
echo "🔐 Logging in to ECR..."
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REGISTRY}

# 3. Create ECR repository if it doesn't exist
echo "📋 Checking ECR repository..."
aws ecr describe-repositories --repository-names ${IMAGE_NAME} --region ${AWS_REGION} 2>/dev/null || \
  aws ecr create-repository --repository-name ${IMAGE_NAME} --region ${AWS_REGION}

# 4. Tag and push image to ECR
echo "📤 Pushing image to ECR..."
docker tag ${IMAGE_NAME}:latest ${ECR_REGISTRY}/${IMAGE_NAME}:latest
docker tag ${IMAGE_NAME}:latest ${ECR_REGISTRY}/${IMAGE_NAME}:$(date +%Y%m%d_%H%M%S)
docker push ${ECR_REGISTRY}/${IMAGE_NAME}:latest

# 5. Update ECS task definition
echo "⚙️  Updating ECS task definition..."
TASK_DEF=$(aws ecs describe-task-definition --task-definition ${TASK_DEFINITION} --region ${AWS_REGION})
NEW_TASK_DEF=$(echo $TASK_DEF | jq --arg IMAGE "${ECR_REGISTRY}/${IMAGE_NAME}:latest" '.taskDefinition | .containerDefinitions[0].image = $IMAGE | del(.taskDefinitionArn) | del(.revision) | del(.status) | del(.requiresCompatibilities) | del(.compatibilities) | del(.registeredAt) | del(.registeredBy)')
aws ecs register-task-definition --cli-input-json "$(echo $NEW_TASK_DEF | jq -c .)" --region ${AWS_REGION}

# 6. Update ECS service
echo "🔄 Updating ECS service..."
aws ecs update-service --cluster ${CLUSTER_NAME} --service ${SERVICE_NAME} --task-definition ${TASK_DEFINITION} --region ${AWS_REGION}

# 7. Wait for service to stabilize
echo "⏳ Waiting for service to stabilize..."
aws ecs wait services-stable --cluster ${CLUSTER_NAME} --services ${SERVICE_NAME} --region ${AWS_REGION}

echo "✅ Deployment complete!"
echo "🌐 Application deployed to AWS ECS"
echo "📊 Check status: aws ecs describe-services --cluster ${CLUSTER_NAME} --services ${SERVICE_NAME} --region ${AWS_REGION}"
