# Automated Vercel Deployment Configuration

This file contains the deployment setup for Vercel.

## Your Neon Connection String (Saved)
```
Connection String: *****(provided by user)
Status: ✅ Received
```

## Environment Variables for Vercel

Copy these and paste into Vercel dashboard when importing:

```
DATABASE_URL=postgresql://<user>:<password>@ep-little-hat-b57wukt3-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

NEXTAUTH_URL=https://YOUR_VERCEL_APP.vercel.app

NEXTAUTH_SECRET=d3v3l0pm3nt_s3cr3t_k3y_ch4ng3_in_pr0duction_t0_r4nd0m_v4lu3

JWT_SECRET=jwt_d3v3l0pm3nt_s3cr3t_ch4ng3_in_pr0duction_t0_r4nd0m_v4lu3

NODE_ENV=production

APP_NAME=Semmozhi Workshop OS

CERTIFICATE_ISSUER_NAME=AUREX 2026

ENABLE_EMAIL_VERIFICATION=true

ENABLE_WORKSHOP_COMMUNITIES=true
```

## ⚠️ IMPORTANT

Replace `YOUR_VERCEL_APP` with your actual Vercel app name after deployment.

Example:
- If Vercel gives you: `https://semmozhi-workshop-os-abc123.vercel.app`
- Then use that full URL for `NEXTAUTH_URL`
