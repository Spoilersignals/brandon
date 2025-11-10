# Brandon IT Project

A comprehensive full-stack IT management system with user authentication, data management, and role-based access control.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **Role-Based Access**: Admin and user roles with different permissions
- **Data Management**: Create, read, update, and delete data entries
- **Search & Filter**: Advanced filtering and search capabilities
- **Responsive Design**: Works seamlessly on all devices
- **RESTful API**: Well-structured API endpoints
- **Modern UI**: Clean and intuitive user interface

## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Express Validator

### Frontend
- React 18
- React Router v6
- Axios for API calls
- React Toastify for notifications
- Vite for build tooling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd BRANDON-IT-PROJECT
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
# Update MongoDB URI, JWT secret, etc.

# Start the server
npm run dev
```

The backend server will run on http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the development server
npm run dev
```

The frontend will run on http://localhost:3000

## 📁 Project Structure

```
BRANDON-IT-PROJECT/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── config/          # Configuration files
│   │   └── server.js        # Entry point
│   ├── tests/               # Test files
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── context/         # React context
│   │   ├── hooks/           # Custom hooks
│   │   ├── styles/          # CSS files
│   │   └── App.jsx          # Main App component
│   ├── public/
│   └── package.json
│
├── database/                # Database scripts
├── docs/                    # Documentation
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Data Management
- `GET /api/data` - Get all data (with filtering)
- `GET /api/data/:id` - Get data by ID
- `POST /api/data` - Create new data
- `PUT /api/data/:id` - Update data
- `DELETE /api/data/:id` - Delete data
- `GET /api/data/my-data` - Get user's data

## 👤 Default Admin Account

After seeding the database, you can use:
- Email: admin@example.com
- Password: admin123

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Build the application
3. Deploy to your chosen platform (Heroku, AWS, etc.)

### Frontend Deployment
```bash
cd frontend
npm run build
```

Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Brandon Wamukota**

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern web development practices
- Built with passion for learning and development
