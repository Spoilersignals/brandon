# Installation Guide

## Prerequisites

Ensure you have the following installed on your system:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **MongoDB** (v4.4 or higher)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
   - Verify: `mongod --version`

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

## Step-by-Step Installation

### 1. Navigate to Project Directory

```bash
cd BRANDON-IT-PROJECT
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create environment file
copy .env.example .env    # Windows
# or
cp .env.example .env      # Mac/Linux

# Edit .env file and configure:
# - PORT=5000
# - MONGODB_URI=mongodb://localhost:27017/brandon_it_project
# - JWT_SECRET=your_secret_key_here
# - JWT_EXPIRE=7d
```

**Start MongoDB:**
```bash
# Windows (if MongoDB is installed as service):
net start MongoDB

# Mac/Linux:
mongod
```

**Run Backend Server:**
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

Backend should now be running on: http://localhost:5000

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create environment file
copy .env.example .env    # Windows
# or
cp .env.example .env      # Mac/Linux

# Edit .env file and set:
# VITE_API_URL=http://localhost:5000/api
```

**Run Frontend Server:**
```bash
# Development mode
npm run dev

# Build for production
npm run build
```

Frontend should now be running on: http://localhost:3000

## Docker Installation (Alternative)

If you prefer using Docker:

```bash
# Make sure Docker is installed and running

# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## Verification

1. **Backend Health Check:**
   - Open browser: http://localhost:5000/health
   - Should display: `{"status":"OK","message":"Server is running"}`

2. **Frontend:**
   - Open browser: http://localhost:3000
   - You should see the home page

3. **Test Login:**
   - Click "Register" and create a new account
   - After registration, you should be redirected to the dashboard

## Common Issues

### MongoDB Connection Error

**Problem:** Cannot connect to MongoDB

**Solution:**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- For MongoDB Atlas, ensure IP whitelist is configured

### Port Already in Use

**Problem:** Port 5000 or 3000 already in use

**Solution:**
```bash
# Windows - Kill process on port
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

Or change the port in `.env` files

### Dependencies Installation Fails

**Problem:** npm install fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### CORS Errors

**Problem:** CORS policy blocking requests

**Solution:**
- Ensure frontend URL is in `ALLOWED_ORIGINS` in backend `.env`
- Check that API_URL in frontend `.env` matches backend URL

## Database Seeding (Optional)

To create sample data:

```bash
cd backend
node src/utils/seed.js
```

This will create:
- An admin user (admin@example.com / admin123)
- Sample data entries

## Production Deployment

### Backend (e.g., Heroku)

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create brandon-it-backend

# Add MongoDB addon
heroku addons:create mongolab

# Set environment variables
heroku config:set JWT_SECRET=your_production_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Frontend (e.g., Netlify)

```bash
# Build the project
cd frontend
npm run build

# Deploy dist folder to Netlify
# Or connect GitHub repo to Netlify for automatic deployment
```

## Next Steps

1. Change default JWT secret in production
2. Configure MongoDB Atlas for production database
3. Set up SSL/TLS certificates
4. Configure environment-specific variables
5. Set up CI/CD pipeline
6. Enable monitoring and logging

## Support

If you encounter any issues:
1. Check the [API Documentation](./API_DOCUMENTATION.md)
2. Review error logs in terminal
3. Check MongoDB connection
4. Verify environment variables
5. Create an issue in the repository

## Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
