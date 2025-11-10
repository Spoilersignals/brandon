# DAMS Quick Start Guide

Get up and running with DAMS in 5 minutes!

## ⚡ Quick Installation

```bash
# 1. Clone the repository
git clone https://github.com/Spoilersignals/brandon.git
cd brandon

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Start PostgreSQL (using Docker)
docker run --name dams-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=dams -p 5432:5432 -d postgres:15-alpine

# 5. Update .env with database URL
# DATABASE_URL="postgresql://postgres:password@localhost:5432/dams?schema=public"

# 6. Initialize database
npm run db:generate
npm run db:push
npm run db:seed

# 7. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔑 Default Login

- **Admin**: `admin@dams.com` / `admin123`
- **Manager**: `manager@dams.com` / `admin123`
- **Staff**: `staff@dams.com` / `admin123`

## 🎯 What's Next?

### Explore the Dashboard
1. **Dashboard** - View financial overview, projects, and tasks
2. **Projects** - Create and manage projects
3. **Tasks** - Assign and track tasks
4. **Finance** - Monitor income and expenses
5. **Reports** - Generate financial and performance reports

### Create Your First Project
1. Navigate to **Projects**
2. Click **Create Project**
3. Fill in project details:
   - Title: "Website Redesign"
   - Description: "Update company website"
   - Budget: $10,000
   - Start Date: Today
4. Click **Create**

### Add a Task
1. Navigate to **Tasks**
2. Click **Create Task**
3. Fill in task details:
   - Project: Select your project
   - Assigned To: Select a user
   - Title: "Design Homepage"
   - Deadline: Set a date
   - Priority: High
4. Click **Create**

### Record a Transaction
1. Navigate to **Finance**
2. Click **Add Transaction**
3. Fill in details:
   - Type: Income or Expense
   - Amount: $1,000
   - Category: "Budget Allocation"
   - Project: Select project
   - Date: Today
4. Click **Save**

## 🛠️ Common Commands

```bash
# View database
npm run db:studio

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Build for production
npm run build

# Start production server
npm start
```

## 📱 Mobile Access

DAMS is fully responsive! Access it from:
- Desktop browsers
- Tablets
- Mobile phones

## 🆘 Need Help?

- **Documentation**: See [README.md](README.md)
- **Setup Guide**: See [SETUP.md](SETUP.md)
- **Issues**: Create an issue on GitHub

## 🎓 Key Features

✅ Multi-role user management (Admin, Manager, Staff, Auditor)  
✅ Financial tracking with budget monitoring  
✅ Project and task management  
✅ Performance tracking and analytics  
✅ Comprehensive audit trail  
✅ Real-time dashboards and reports  
✅ Notification system  
✅ Responsive mobile design  

---

**Ready to enhance accountability and transparency? Let's go! 🚀**
