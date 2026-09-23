# 🔧 MANUAL STEP: Update .env.local

## What to do:

1. Open this file in your editor:
   ```
   C:\Users\Krithick Roshan\semmozhi-workshop-os\.env.local
   ```

2. Find this line:
   ```
   DATABASE_URL="******localhost:5432/semmozhi_db"
   ```

3. Replace it with your Neon connection string from:
   👉 https://console.neon.tech/app/projects/dry-lab-11801238

4. The line should look like:
   ```
   DATABASE_URL="postgresql://neondb_owner:YOUR_PASSWORD@ep-dry-lab-11801238.us-east-1.aws.neon.tech/neondb?sslmode=require"
   ```

5. Save the file (Ctrl+S)

6. Run in terminal:
   ```
   npx prisma db push
   ```

That's it! ✅
