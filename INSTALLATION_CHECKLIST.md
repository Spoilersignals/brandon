# DAMS Installation Checklist

Use this checklist to ensure proper installation and configuration of DAMS.

## 📋 Pre-Installation

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] PostgreSQL 15+ installed or Docker available
- [ ] Git installed (`git --version`)
- [ ] Code editor ready (VS Code recommended)

## 🔧 Installation Steps

### 1. Project Setup
- [ ] Clone repository
- [ ] Navigate to project directory
- [ ] Run `npm install` to install dependencies
- [ ] Wait for installation to complete (may take 2-5 minutes)

### 2. Database Setup

#### Option A: Docker (Recommended)
- [ ] Docker installed and running
- [ ] Run PostgreSQL container:
  ```bash
  docker run --name dams-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=dams -p 5432:5432 -d postgres:15-alpine
  ```
- [ ] Verify container is running: `docker ps`

#### Option B: Local PostgreSQL
- [ ] PostgreSQL service running
- [ ] Create database: `CREATE DATABASE dams;`
- [ ] Note username and password

### 3. Environment Configuration
- [ ] Copy `.env.example` to `.env`
- [ ] Update `DATABASE_URL` with your credentials
- [ ] Generate `NEXTAUTH_SECRET`:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```
- [ ] Set `NEXTAUTH_SECRET` in `.env`
- [ ] Set `NEXTAUTH_URL` (default: `http://localhost:3000`)
- [ ] Set `NODE_ENV` to `development`

### 4. Database Initialization
- [ ] Run `npm run db:generate` (Generate Prisma Client)
- [ ] Run `npm run db:push` (Create database tables)
- [ ] Run `npm run db:seed` (Seed sample data)
- [ ] Verify success messages

### 5. Start Development Server
- [ ] Run `npm run dev`
- [ ] Wait for compilation
- [ ] Look for "Ready" message
- [ ] Note the URL (usually http://localhost:3000)

### 6. Verify Installation
- [ ] Open browser to http://localhost:3000
- [ ] Landing page loads successfully
- [ ] Navigate to sign in page
- [ ] Log in with admin credentials:
  - Email: `admin@dams.com`
  - Password: `admin123`
- [ ] Dashboard loads with sample data
- [ ] Navigate to Projects page
- [ ] Navigate to Tasks page
- [ ] Navigate to Finance page
- [ ] Check that sample data is visible

### 7. Test Core Features

#### User Management
- [ ] View users list (Admin only)
- [ ] User profiles display correctly

#### Projects
- [ ] View projects list
- [ ] Project cards show budget information
- [ ] Project status badges display

#### Tasks
- [ ] View tasks in columns (To Do, In Progress, Completed)
- [ ] Task cards show all information
- [ ] Progress bars display correctly

#### Finance
- [ ] View transactions list
- [ ] Income and expenses display correctly
- [ ] Balance calculation is accurate

#### Dashboard
- [ ] All stat cards load
- [ ] Charts display data
- [ ] Recent activity shows

### 8. Database Tools
- [ ] Open Prisma Studio: `npm run db:studio`
- [ ] Verify tables exist
- [ ] Check sample data
- [ ] Explore relationships

## 🔒 Security Checklist

- [ ] `.env` file is in `.gitignore`
- [ ] `NEXTAUTH_SECRET` is strong and unique
- [ ] Default passwords will be changed after first login
- [ ] Database credentials are secure
- [ ] No secrets in code

## 🎨 Optional Configuration

### Branding
- [ ] Update company name in code
- [ ] Modify colors in `tailwind.config.ts`
- [ ] Add logo image
- [ ] Update meta tags

### Email (Optional)
- [ ] Configure SMTP settings
- [ ] Test email delivery
- [ ] Update email templates

### File Upload (Optional)
- [ ] Configure AWS S3 or Cloudinary
- [ ] Test file upload
- [ ] Set file size limits

## 🚀 Production Deployment Checklist

### Pre-Deployment
- [ ] Run `npm run build` successfully
- [ ] Fix any build errors
- [ ] Run `npm run lint` with no errors
- [ ] Test all features in development
- [ ] Prepare production database

### Environment Variables (Production)
- [ ] `DATABASE_URL` set to production database
- [ ] `NEXTAUTH_SECRET` is strong and unique
- [ ] `NEXTAUTH_URL` set to production URL
- [ ] `NODE_ENV` set to `production`
- [ ] All optional variables configured

### Database (Production)
- [ ] Production database created
- [ ] Connection tested
- [ ] Migrations run: `npx prisma db push`
- [ ] Backups configured
- [ ] Connection pooling configured

### Security (Production)
- [ ] HTTPS/SSL configured
- [ ] CORS configured correctly
- [ ] Rate limiting enabled (if applicable)
- [ ] Firewall rules set
- [ ] Database access restricted
- [ ] Secrets rotated from development

### Deployment
- [ ] Build succeeds: `npm run build`
- [ ] Deploy to platform (Vercel/Railway/Docker)
- [ ] Run database migrations on production
- [ ] Create admin user on production
- [ ] Test login on production
- [ ] Test all major features
- [ ] Monitor for errors

### Post-Deployment
- [ ] Access production URL
- [ ] Login successful
- [ ] All pages load
- [ ] Create test data
- [ ] Check error logs
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Document production setup

## 🐛 Troubleshooting

### Database Connection Failed
- [ ] Check PostgreSQL is running
- [ ] Verify DATABASE_URL is correct
- [ ] Check username and password
- [ ] Verify database exists
- [ ] Check firewall settings

### Build Errors
- [ ] Delete `node_modules` and reinstall
- [ ] Delete `.next` folder
- [ ] Clear npm cache: `npm cache clean --force`
- [ ] Check Node.js version

### Port Already in Use
- [ ] Kill process on port 3000
- [ ] Use different port: `PORT=3001 npm run dev`

### Prisma Errors
- [ ] Delete `node_modules/.prisma`
- [ ] Run `npm run db:generate` again
- [ ] Check schema.prisma for errors

## ✅ Installation Complete!

Once all items are checked:
- [ ] Installation successful
- [ ] Application running
- [ ] Sample data loaded
- [ ] Features tested
- [ ] Documentation reviewed

## 📚 Next Steps

1. Read [README.md](README.md) for overview
2. Review [QUICKSTART.md](QUICKSTART.md) for basic usage
3. Consult [SETUP.md](SETUP.md) for detailed configuration
4. Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design

## 🎉 Success!

You're ready to use DAMS! Start by:
1. Creating your first project
2. Adding team members
3. Assigning tasks
4. Tracking finances

---

**Need help?** Check the documentation or create an issue on GitHub.
