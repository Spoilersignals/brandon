# 🚀 Quick Start Guide

Get the Brandon IT Project running in 5 minutes!

## Prerequisites
- Node.js installed
- MongoDB installed (or MongoDB Atlas account)

## Setup in 4 Steps

### 1️⃣ Install Backend Dependencies
```bash
cd backend
npm install
copy .env.example .env
```

Edit `.env` and set your MongoDB connection:
```
MONGODB_URI=mongodb://localhost:27017/brandon_it_project
JWT_SECRET=my_secret_key_12345
```

### 2️⃣ Start Backend Server
```bash
npm run dev
```
✅ Backend running on http://localhost:5000

### 3️⃣ Install Frontend Dependencies
Open a new terminal:
```bash
cd frontend
npm install
copy .env.example .env
```

### 4️⃣ Start Frontend Server
```bash
npm run dev
```
✅ Frontend running on http://localhost:3000

## 🎉 You're Done!

Open your browser and go to: **http://localhost:3000**

## First Steps

1. **Register** a new account
2. **Login** with your credentials
3. **Create** your first data entry from the dashboard
4. **Explore** the features!

## Default Test Account

If you run the seed script:
- Email: `admin@example.com`
- Password: `admin123`

## Quick Commands

### Backend
```bash
npm run dev      # Start development server
npm start        # Start production server
npm test         # Run tests
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Need Help?

- 📖 Read the [Full Installation Guide](docs/INSTALLATION.md)
- 📚 Check the [API Documentation](docs/API_DOCUMENTATION.md)
- 🐛 Having issues? Check logs in your terminal

## Architecture Overview

```
┌─────────────┐      HTTP/REST      ┌─────────────┐
│   React     │ ◄─────────────────► │  Express    │
│  Frontend   │    Port 3000        │  Backend    │
│             │                     │             │
└─────────────┘                     └──────┬──────┘
                                           │
                                           │ Mongoose
                                           ▼
                                    ┌─────────────┐
                                    │   MongoDB   │
                                    │  Database   │
                                    └─────────────┘
```

## Key Features

✅ User Authentication (JWT)  
✅ Role-Based Access Control  
✅ CRUD Operations  
✅ Search & Filter  
✅ Responsive Design  
✅ RESTful API  

---

**Happy Coding! 🎯**
