# DAMS Setup Guide

Complete step-by-step guide to set up and deploy the Digital Accountability and Management System.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **PostgreSQL** 15.x or higher ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))
- **Docker** (Optional, for containerized deployment) ([Download](https://www.docker.com/))

## 🚀 Quick Start (Development)

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd brandoni
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/dams?schema=public"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-key-here"

# Environment
NODE_ENV="development"
```

**Generate a secure NEXTAUTH_SECRET:**

```bash
# On Linux/Mac
openssl rand -base64 32

# On Windows (PowerShell)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 4: Set Up PostgreSQL Database

**Option A: Local PostgreSQL**

1. Install PostgreSQL
2. Create a new database:

```bash
# Access PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE dams;

# Exit psql
\q
```

**Option B: Use Docker for PostgreSQL**

```bash
docker run --name dams-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=dams \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### Step 5: Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push database schema
npm run db:push

# Seed database with sample data
npm run db:seed
```

### Step 6: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 7: Log In

Use these default credentials:

- **Admin**: `admin@dams.com` / `admin123`
- **Manager**: `manager@dams.com` / `admin123`
- **Staff**: `staff@dams.com` / `admin123`

⚠️ **Important**: Change these passwords immediately!

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

This will set up both the application and PostgreSQL database:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Run database migrations
docker-compose exec app npx prisma db push
docker-compose exec app npm run db:seed

# Stop services
docker-compose down

# Stop and remove volumes (warning: deletes data)
docker-compose down -v
```

Access the application at [http://localhost:3000](http://localhost:3000)

### Manual Docker Build

```bash
# Build the Docker image
docker build -t dams:latest .

# Run the container
docker run -d \
  --name dams-app \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/dams" \
  -e NEXTAUTH_SECRET="your-secret-key" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  dams:latest
```

## ☁️ Production Deployment

### Vercel Deployment

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**

- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Configure environment variables:
  - `DATABASE_URL`
  - `NEXTAUTH_SECRET`
  - `NEXTAUTH_URL`
- Deploy

3. **Set up Database**

Use a managed PostgreSQL service like:
- [Neon](https://neon.tech) (Free tier available)
- [Supabase](https://supabase.com) (Free tier available)
- [Railway](https://railway.app) (Free tier available)

4. **Run Migrations**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Run migrations
vercel env pull .env.local
npx prisma db push
npx prisma db seed
```

### Railway Deployment

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add PostgreSQL
railway add -d postgres

# Set environment variables
railway variables set NEXTAUTH_SECRET=your-secret-here

# Deploy
railway up
```

### AWS Deployment

1. **Set up RDS (PostgreSQL)**
2. **Deploy to EC2, ECS, or Elastic Beanstalk**
3. **Configure environment variables**
4. **Set up SSL certificate with AWS Certificate Manager**
5. **Configure load balancer**

### Self-Hosted (VPS)

```bash
# On your server (Ubuntu/Debian)

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Clone repository
git clone <your-repo-url>
cd brandoni

# Install dependencies
npm install

# Set up environment variables
nano .env

# Build application
npm run build

# Install PM2 for process management
sudo npm install -g pm2

# Start application
pm2 start npm --name dams -- start

# Make PM2 auto-start on boot
pm2 startup
pm2 save

# Set up Nginx as reverse proxy
sudo apt install nginx

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/dams
```

Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/dams /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Set up SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 🔧 Configuration

### Database Configuration

**Connection Pooling** (for production):

```env
DATABASE_URL="postgresql://user:pass@host:5432/dams?schema=public&connection_limit=10&pool_timeout=10"
```

**SSL Connection**:

```env
DATABASE_URL="postgresql://user:pass@host:5432/dams?schema=public&sslmode=require"
```

### Email Notifications (Optional)

Add to your `.env`:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
EMAIL_FROM="noreply@yourdomain.com"
```

### File Upload Configuration

For production file uploads, configure cloud storage:

```env
# AWS S3
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_BUCKET_NAME="dams-uploads"

# Or Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## 🛠️ Maintenance

### Database Backup

```bash
# Backup database
pg_dump -U postgres dams > backup_$(date +%Y%m%d).sql

# Restore database
psql -U postgres dams < backup_20240101.sql
```

### Application Updates

```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Run migrations
npm run db:generate
npx prisma migrate deploy

# Rebuild application
npm run build

# Restart application
pm2 restart dams
```

### Monitoring

```bash
# View application logs
pm2 logs dams

# Monitor application
pm2 monit

# View process status
pm2 status
```

## 🔒 Security Checklist

- [ ] Change all default passwords
- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Enable HTTPS/SSL in production
- [ ] Configure CORS properly
- [ ] Set up database backups
- [ ] Configure firewall rules
- [ ] Enable rate limiting
- [ ] Set up monitoring and alerts
- [ ] Regular security updates
- [ ] Implement 2FA for admin users

## 📊 Performance Optimization

### Database Optimization

```sql
-- Add indexes for frequently queried fields
CREATE INDEX idx_user_email ON "User"(email);
CREATE INDEX idx_task_status ON "Task"(status);
CREATE INDEX idx_transaction_date ON "Transaction"(date);
```

### Caching (Optional)

Add Redis for caching:

```bash
docker run --name dams-redis -p 6379:6379 -d redis:alpine
```

## 🆘 Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check database connection
psql -U postgres -d dams -c "SELECT 1"
```

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Prisma Issues

```bash
# Clear Prisma cache
rm -rf node_modules/.prisma

# Regenerate client
npm run db:generate
```

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Email: support@dams.com
- Documentation: [DAMS Docs](https://docs.dams.com)

---

**Happy Deploying! 🚀**
