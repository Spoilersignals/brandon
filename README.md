# DAMS - Digital Accountability and Management System

A comprehensive web-based platform designed to enhance transparency, efficiency, and accountability within institutions and organizations such as schools, offices, church projects, clubs, and NGOs.

## 🎯 Features

### Core Functionality

- **User Management & Authentication**
  - Multi-role user system (Admin, Manager, Staff, Auditor)
  - Secure JWT-based authentication with NextAuth.js
  - Role-based access control (RBAC)
  - Profile management with photo upload support

- **Financial Management**
  - Track income and expenses by category
  - Project-based budget allocation
  - Real-time financial dashboards
  - Transaction approval workflows
  - Financial reports and summaries

- **Audit Trail & Transparency**
  - Immutable audit logs for all actions
  - Track who did what and when
  - Tamper-proof data integrity
  - Automatic alerts for suspicious activity

- **Task & Project Management**
  - Create and assign tasks with deadlines
  - Track project progress and status
  - Priority-based task organization
  - Calendar view for task management
  - Automated notifications

- **Performance Tracking**
  - Set KPIs and measurable goals
  - Automatic performance scoring
  - Graphical dashboards and charts
  - Top performer identification
  - Exportable performance summaries

- **Reports & Analytics**
  - Financial performance reports
  - Project progress tracking
  - Task completion statistics
  - Department efficiency metrics
  - Exportable reports (PDF, Excel, CSV)

- **Notifications & Communication**
  - In-app notifications
  - Email notifications for task assignments
  - Activity feed
  - Real-time updates

## 🏗️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Query (TanStack Query)
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Authentication**: NextAuth.js v5
- **Validation**: Zod

### Database
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Caching**: (Optional) Redis

### DevOps
- **Containerization**: Docker
- **Deployment**: Vercel, Railway, AWS, or self-hosted
- **CI/CD**: GitHub Actions (optional)

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- npm or pnpm

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Spoilersignals/brandon.git
   cd brandon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dams?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma Client
   npm run db:generate
   
   # Push database schema
   npm run db:push
   
   # Seed the database with sample data
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Default Login Credentials

After seeding the database, you can log in with:

- **Admin**: `admin@dams.com` / `admin123`
- **Manager**: `manager@dams.com` / `admin123`
- **Staff**: `staff@dams.com` / `admin123`

⚠️ **Important**: Change these credentials immediately in production!

## 🐳 Docker Deployment

### Using Docker Compose

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Run database migrations**
   ```bash
   docker-compose exec app npx prisma db push
   docker-compose exec app npm run db:seed
   ```

3. **Access the application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Standalone Docker

```bash
# Build the image
docker build -t dams .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  dams
```

## 📁 Project Structure

```
brandoni/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seeding script
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── users/         # User management
│   │   │   ├── projects/      # Project management
│   │   │   ├── tasks/         # Task management
│   │   │   └── transactions/  # Financial transactions
│   │   ├── auth/              # Auth pages
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   └── ui/                # Reusable UI components
│   └── lib/
│       ├── auth.ts            # Authentication config
│       ├── prisma.ts          # Prisma client
│       └── utils.ts           # Utility functions
├── docker-compose.yml         # Docker Compose config
├── Dockerfile                 # Docker image definition
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies
├── tailwind.config.ts         # Tailwind CSS config
└── tsconfig.json              # TypeScript config
```

## 🔒 Security Features

- **Authentication**: Secure JWT-based authentication
- **Authorization**: Role-based access control (RBAC)
- **Password Hashing**: bcrypt with salt rounds
- **Audit Logging**: Complete audit trail of all actions
- **Data Validation**: Zod schema validation
- **SQL Injection Protection**: Prisma ORM parameterized queries
- **HTTPS**: Enforced in production
- **Session Management**: Secure session handling

## 📊 Database Models

### Core Models

- **User**: User accounts with roles and permissions
- **Department**: Organizational departments
- **Project**: Projects with budgets and timelines
- **Task**: Tasks assigned to users
- **Transaction**: Financial transactions (income/expenses)
- **Performance**: Performance evaluations
- **AuditLog**: Immutable audit trail
- **Report**: Generated reports
- **Notification**: User notifications
- **Session**: Authentication sessions

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Railway

```bash
railway login
railway init
railway add postgresql
railway up
```

### Self-Hosted

1. Set up PostgreSQL database
2. Configure environment variables
3. Build the application: `npm run build`
4. Start the server: `npm start`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

### Database Management

```bash
# Open Prisma Studio (Database GUI)
npm run db:studio

# Create a migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset
```

## 📈 Performance Optimization

- Server-side rendering (SSR) for critical pages
- Static generation for public pages
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Database query optimization with Prisma
- Caching strategies with React Query

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run E2E tests (when implemented)
npm run test:e2e
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📧 Support

For support, email support@dams.com or open an issue in the repository.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma team for the excellent ORM
- Radix UI for accessible components
- All contributors and supporters

---

**Built with ❤️ for transparency and accountability**
