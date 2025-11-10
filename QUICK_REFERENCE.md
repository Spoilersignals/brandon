# DAMS - Quick Reference Card

## 🚀 Installation (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Start PostgreSQL (Docker)
docker run --name dams-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=dams -p 5432:5432 -d postgres:15-alpine

# 3. Create .env file
cp .env.example .env
# Edit .env: DATABASE_URL="postgresql://postgres:password@localhost:5432/dams?schema=public"

# 4. Initialize database
npm run db:generate
npm run db:push
npm run db:seed

# 5. Start app
npm run dev
```

Open: **http://localhost:3000**

---

## 🔑 Default Logins

- **Admin**: `admin@dams.com` / `admin123`
- **Manager**: `manager@dams.com` / `admin123`
- **Staff**: `staff@dams.com` / `admin123`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # Backend API routes
│   │   ├── auth/         # Authentication
│   │   ├── users/        # User management
│   │   ├── projects/     # Projects
│   │   ├── tasks/        # Tasks
│   │   ├── transactions/ # Finance
│   │   ├── performance/  # Performance
│   │   ├── reports/      # Reports
│   │   └── notifications/# Notifications
│   ├── dashboard/        # Main dashboard
│   ├── projects/         # Projects page
│   ├── tasks/            # Tasks board
│   ├── finance/          # Finance page
│   ├── performance/      # Performance page
│   ├── reports/          # Reports page
│   ├── notifications/    # Notifications page
│   ├── users/            # User management (Admin)
│   ├── settings/         # Settings page
│   └── auth/signin/      # Login page
├── components/
│   ├── ui/               # Reusable components
│   └── layout/           # Sidebar, Header
└── lib/
    ├── auth.ts           # Auth config
    ├── prisma.ts         # Database client
    └── utils.ts          # Utilities
```

---

## 🛠️ Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Database
npm run db:generate      # Generate Prisma Client
npm run db:push          # Push schema to DB
npm run db:studio        # Open Prisma Studio (DB GUI)
npm run db:seed          # Seed sample data

# Utilities
npm run lint             # Run ESLint
```

---

## 🔗 API Endpoints

| Endpoint | Methods | Description |
|----------|---------|-------------|
| `/api/auth/[...nextauth]` | GET, POST | Authentication |
| `/api/users` | GET, POST | User management |
| `/api/projects` | GET, POST | Project CRUD |
| `/api/tasks` | GET, POST | Task management |
| `/api/transactions` | GET, POST | Financial tracking |
| `/api/performance` | GET, POST | Performance tracking |
| `/api/reports` | GET, POST | Report listing |
| `/api/reports/generate` | POST | Generate reports |
| `/api/notifications` | GET, POST, PATCH | Notifications |

---

## 📊 Pages & Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/auth/signin` | Public | Login page |
| `/dashboard` | Protected | Main dashboard |
| `/projects` | Protected | Projects listing |
| `/tasks` | Protected | Task board |
| `/finance` | Protected | Financial management |
| `/performance` | Protected | Performance tracking |
| `/reports` | Protected | Reports & analytics |
| `/notifications` | Protected | Notifications center |
| `/users` | Admin only | User management |
| `/settings` | Protected | User settings |

---

## 👥 User Roles

| Role | Permissions |
|------|------------|
| **ADMIN** | Full system access, user management |
| **MANAGER** | Create projects, assign tasks, approve transactions |
| **STAFF** | View assigned tasks, update progress |
| **AUDITOR** | Read-only access to all data and audit logs |

---

## 🗄️ Database Models

1. **User** - User accounts
2. **Session** - Auth sessions
3. **Department** - Departments
4. **Project** - Projects
5. **Task** - Tasks
6. **Transaction** - Transactions
7. **Performance** - Evaluations
8. **AuditLog** - Audit trail
9. **Report** - Reports
10. **Notification** - Notifications

---

## 🎨 Key Features

- ✅ Multi-role authentication
- ✅ Financial tracking (income/expenses)
- ✅ Project & task management
- ✅ Performance evaluations
- ✅ Real-time reports
- ✅ Audit trail
- ✅ Notifications
- ✅ Responsive design
- ✅ Role-based access

---

## 🐳 Docker Deployment

```bash
# Start with Docker Compose
docker-compose up -d

# Run migrations
docker-compose exec app npx prisma db push
docker-compose exec app npm run db:seed

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## 📚 Documentation

- **README.md** - Main documentation
- **QUICKSTART.md** - 5-minute setup
- **SETUP.md** - Detailed installation
- **ARCHITECTURE.md** - System design
- **COMPLETION_SUMMARY.md** - Feature list
- **INSTALLATION_CHECKLIST.md** - Setup checklist

---

## 🔧 Configuration

### Environment Variables

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/dams"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NODE_ENV="development"
```

### Generate Secret Key

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🆘 Troubleshooting

**Database connection error?**
```bash
# Check PostgreSQL is running
docker ps

# Verify DATABASE_URL in .env
```

**Port 3000 in use?**
```bash
# Use different port
PORT=3001 npm run dev
```

**Build errors?**
```bash
# Clear and reinstall
rm -rf node_modules .next
npm install
```

---

## 📞 Support

- **GitHub Issues**: Create an issue
- **Documentation**: See README.md
- **Email**: support@dams.com

---

## ✅ Status

- **Backend**: ✅ 100% Complete
- **Frontend**: ✅ 100% Complete
- **Database**: ✅ 100% Complete
- **Documentation**: ✅ 100% Complete
- **Deployment**: ✅ Ready

**Version**: 1.0.0  
**License**: MIT
