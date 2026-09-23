# Quick Start Guide - Local Development

## 🚀 Run Locally in 5 Minutes

### Option 1: Using Docker Compose (Recommended)

```bash
cd semmozhi-workshop-os

# Start PostgreSQL + Next.js app
docker-compose up -d

# Open http://localhost:3000
```

That's it! The database and app will be running.

### Option 2: Manual Setup

**1. Install PostgreSQL locally or use a cloud database:**
```bash
# Example: Using Neon (PostgreSQL as a service)
# https://neon.tech → Create account → Copy connection string
```

**2. Clone and setup:**
```bash
git clone https://github.com/gowrishankar28057-bit/semmozhi-workshop-os.git
cd semmozhi-workshop-os
npm install
```

**3. Configure environment:**
```bash
cp .env.example .env.local

# Edit .env.local with your database connection:
# DATABASE_URL=postgresql://user:password@host:5432/semmozhi_dev
```

**4. Setup database:**
```bash
npx prisma db push
```

**5. Run the app:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🧪 Test Accounts

After first run, create test accounts:

**Admin Account:**
- Email: `admin@example.com`
- Password: `Admin123!`
- Role: Admin

**Organizer Account:**
- Email: `organizer@example.com`
- Password: `Organizer123!`
- Role: Organizer

**Participant Account:**
- Email: `participant@example.com`
- Password: `Participant123!`
- Role: Participant

## 📊 Database Admin

```bash
# Open Prisma Studio to manage data
npx prisma studio
```

Visit [http://localhost:5555](http://localhost:5555)

## 🚀 Deploy to AWS

Once you're ready to deploy:

1. **Ensure GitHub Actions secrets are set:**
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

2. **Follow AWS-DEPLOYMENT.md:**
   ```bash
   cat AWS-DEPLOYMENT.md
   ```

3. **Push to main branch:**
   ```bash
   git push origin main
   ```

GitHub Actions will automatically build and deploy! ✨

## 📝 Available Commands

```bash
npm run dev          # Development server on port 3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Check code quality
npm run type-check   # TypeScript type checking
npm run db:push      # Sync Prisma schema with database
npm run db:studio    # Open Prisma Studio
```

## 🐛 Troubleshooting

**Database connection error:**
- Check `DATABASE_URL` in `.env.local`
- Ensure PostgreSQL is running
- Test connection: `psql $DATABASE_URL`

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**Need to reset database:**
```bash
npx prisma db reset
```

## 📚 Next Steps

1. **Create a workshop** as an Organizer
2. **Add sessions** with meeting links
3. **Register participants**
4. **Record attendance**
5. **Generate certificates** (at 90% attendance)

---

Questions? Check [README.md](./README.md) or [AWS-DEPLOYMENT.md](./AWS-DEPLOYMENT.md)
