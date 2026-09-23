# Semmozhi Workshop OS

A full-stack, production-ready LMS (Learning Management System) platform for managing workshops, lifelong learning, attendance tracking, and certificate generation. Built for the **AUREX'26 hackathon** by **APEX Syndicate**.

**Track:** Track 01 — LMS / LLL Website Workshop & Learning Management Portal

## 🎯 Project Overview

Semmozhi Workshop OS is a comprehensive learning management platform that enables three core roles to interact:

### **Admin** → Creates Organizers
### **Organizer** → Creates Workshops & Sessions  
### **Participant** → Discovers & Attends Workshops

## ✨ Core Features

### 🔐 Authentication & Authorization
- JWT-based authentication with 7-day token expiry
- Role-based access control (Admin, Organizer, Participant)
- Secure password hashing with bcryptjs

### 👨‍💼 Admin Dashboard
- Organizer account creation and management
- Enable/disable organizer accounts
- View all participants and workshops
- Platform statistics and analytics

### 🎓 Organizer Dashboard
- Create, edit, and publish workshops
- Manage sessions with meeting links (Google Meet, Zoom)
- Record and track attendance in real-time
- Create announcements and upload resources
- View certificate eligibility status
- Workshop analytics and insights

### 👥 Participant Dashboard
- Discover and search workshops
- Register for workshops
- View my workshops and attendance percentage
- Access workshop resources and announcements
- View and verify certificates
- Learning history and passport

### 📊 Attendance Engine
- Real-time attendance tracking
- Automatic percentage calculation: `attended / total * 100`
- Certificate eligibility threshold: **≥ 90%**
- Verified with automated tests for 0%, 50%, 89%, 90%, 100%

### 🎖️ Certificate System
- Auto-generated certificate codes: `CICT-AUREX-2026-XXXX`
- SHA-256 hash verification
- QR code generation
- Public certificate verification page: `/verify/[certificateCode]`
- Displays: participant name, workshop, organizer, completion date, attendance %, issue date

## 📁 Project Structure

```
semmozhi-workshop-os/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (auth)/             # Auth pages
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── page.tsx
│   │   ├── admin/              # Admin dashboard
│   │   ├── organizer/          # Organizer dashboard
│   │   ├── participant/        # Participant dashboard
│   │   ├── verify/             # Certificate verification
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── api/                    # API routes
│   │   ├── auth/
│   │   ├── workshops/
│   │   ├── sessions/
│   │   ├── attendance/
│   │   ├── certificates/
│   │   └── verify/
│   ├── components/             # React components
│   ├── lib/                    # Utility functions
│   │   ├── auth.ts
│   │   ├── attendance.ts
│   │   ├── certificate.ts
│   │   └── db.ts
│   ├── types/                  # TypeScript definitions
│   └── middleware.ts           # Auth middleware
├── prisma/
│   └── schema.prisma           # Database schema
├── public/                     # Static assets
├── .github/workflows/          # GitHub Actions CI/CD
│   └── deploy-aws.yml
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Local development
├── ecs-task-definition.json   # AWS ECS configuration
├── deploy-aws.sh              # AWS deployment script
├── AWS-DEPLOYMENT.md          # Detailed AWS guide
├── .env.example               # Environment variables template
├── .gitignore
├── LICENSE
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + NextAuth
- **Deployment**: Docker, AWS ECS Fargate, RDS PostgreSQL
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+ (or Docker)
- Docker & Docker Compose (optional)

### Local Development

1. **Clone and Install**
```bash
git clone https://github.com/gowrishankar28057-bit/semmozhi-workshop-os.git
cd semmozhi-workshop-os
npm install
```

2. **Set Up Environment**
```bash
cp .env.example .env.local
# Edit .env.local with your PostgreSQL connection string
```

3. **Setup Database**
```bash
npx prisma db push
```

4. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Using Docker Compose

```bash
docker-compose up -d
npm run dev
```

This starts PostgreSQL and the Next.js app on port 3000.

## 🧪 Testing

The attendance engine includes automated tests for:
- 0% attendance (Certificate LOCKED)
- 50% attendance (Certificate LOCKED)
- 89% attendance (Certificate LOCKED)
- 90% attendance (Certificate ELIGIBLE)
- 100% attendance (Certificate ELIGIBLE)

```bash
npm run test
```

## 🎯 API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/user/profile` - Get current user profile

### Workshops
- `GET /api/workshops` - List all published workshops
- `GET /api/workshops/[id]` - Get workshop details
- `POST /api/workshops` - Create workshop (Organizer only)
- `PATCH /api/workshops/[id]` - Update workshop (Organizer only)

### Registration & Attendance
- `POST /api/workshops/[id]/register` - Register for workshop
- `POST /api/workshops/[id]/attendance` - Record attendance
- `GET /api/workshops/[id]/attendance` - Get attendance data

### Certificates
- `GET /api/workshops/[id]/certificates` - Get eligible certificates
- `POST /api/workshops/[id]/certificates` - Generate certificate
- `GET /api/verify/[certificateCode]` - Public certificate verification

## 📦 Build & Deploy

### Build Production Bundle
```bash
npm run build
npm start
```

### Deploy to AWS
See [AWS-DEPLOYMENT.md](./AWS-DEPLOYMENT.md) for complete setup guide:

```bash
# Prerequisites: AWS CLI, Docker, AWS account
# 1. Create RDS PostgreSQL database
# 2. Create AWS Secrets Manager secrets
# 3. Create ECS cluster and service
# 4. Configure GitHub Actions with AWS credentials
# 5. Push to main branch - automatic deployment!

bash deploy-aws.sh
```

### Deploy to Other Platforms
- **Vercel**: `vercel deploy`
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo via dashboard
- **Self-hosted**: Use Dockerfile with nginx/Caddy

## 🔄 Database Schema

**Models:**
- User (Admin, Organizer, Participant)
- Organizer (Organization details)
- Workshop (Courses/Workshops)
- Session (Individual sessions per workshop)
- WorkshopParticipant (Registration tracking)
- Attendance (Session attendance records)
- Certificate (Generated certificates)
- Announcement (Workshop announcements)
- Resource (Educational materials)

See `prisma/schema.prisma` for complete schema.

## 📊 Attendance Formula

```
attendancePercentage = attendedEligibleSessions / totalEligibleSessions * 100

Certificate Eligible If: attendancePercentage >= 90%
```

## 🎖️ Certificate Code Format

```
CICT-AUREX-2026-AB12CD
├─ CICT: Certificate Issuer Code
├─ AUREX: Event Name
├─ 2026: Year
└─ AB12CD: Random alphanumeric (6 chars)
```

## 🚀 Innovation Features (Phase 2)

- 🔐 Dynamic QR Code Attendance (signed, time-bound tokens)
- 📚 Learning Passport (complete learner profile)
- 🏛️ Workshop Knowledge Archive (post-workshop content preservation)
- 👥 Workshop Communities (member posts, discussions, comments)

## 📝 Environment Variables

```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=generated_secret
JWT_SECRET=generated_secret
AWS_REGION=us-east-1
```

See `.env.example` for complete configuration options.

## 📚 Documentation

- [API Documentation](./API.md) - Coming soon
- [AWS Deployment Guide](./AWS-DEPLOYMENT.md) - Complete AWS setup
- [Database Schema](./prisma/schema.prisma) - Prisma models
- [Next.js Docs](https://nextjs.org/docs)

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - Copyright © 2026 Gowri Shankar.M

See [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

Built for **AUREX'26 Hackathon** by **APEX Syndicate**

---

**Made with ❤️ for the lifelong learning community**
