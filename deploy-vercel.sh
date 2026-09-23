#!/bin/bash

# 🚀 Semmozhi Workshop OS - Vercel Deployment Script
# This script automates deployment to Vercel

set -e

echo "🚀 Starting Semmozhi Workshop OS Deployment..."
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if we have environment variables
if [ -z "$VERCEL_TOKEN" ]; then
    echo "⚠️  VERCEL_TOKEN not set. You'll need to authenticate."
    echo "📝 Proceeding with interactive auth..."
fi

echo "📦 Building application..."
npm run build

echo "🌐 Deploying to Vercel..."

# Deploy to production
if [ "$1" = "prod" ] || [ "$1" = "production" ]; then
    echo "🔥 Deploying to PRODUCTION..."
    vercel --prod
else
    echo "🔧 Deploying to STAGING..."
    vercel
fi

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📊 Check your deployment at: https://vercel.com/dashboard"
echo ""
echo "🎉 Your app is now LIVE!"
