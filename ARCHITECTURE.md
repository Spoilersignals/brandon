# DAMS System Architecture

## Overview

DAMS (Digital Accountability and Management System) is built using a modern, scalable architecture following best practices for web applications.

## Architecture Layers

### 1. Presentation Layer (Frontend)

**Technology**: Next.js 14 with React 18

**Components**:
- **UI Components**: Radix UI primitives with custom styling
- **Pages**: Server-rendered and client-side pages
- **Layouts**: Shared layouts (Sidebar, Header)
- **State Management**: React Query for server state
- **Styling**: Tailwind CSS for utility-first styling

**Key Features**:
- Server-Side Rendering (SSR) for SEO
- Client-Side Rendering for interactivity
- Responsive design for mobile/tablet/desktop
- Real-time updates with React Query

### 2. API Layer (Backend)

**Technology**: Next.js API Routes

**Components**:
- **Route Handlers**: RESTful API endpoints
- **Middleware**: Authentication and authorization
- **Validation**: Zod schema validation
- **Error Handling**: Centralized error responses

**Endpoints**:
```
/api/auth/[...nextauth]  - Authentication
/api/users               - User management
/api/projects            - Project CRUD
/api/tasks               - Task management
/api/transactions        - Financial transactions
/api/performance         - Performance tracking
/api/reports             - Report generation
/api/notifications       - Notification management
```

### 3. Authentication & Authorization

**Technology**: NextAuth.js v5

**Features**:
- JWT-based authentication
- Session management
- Role-based access control (RBAC)
- Password hashing with bcrypt

**Roles**:
- **ADMIN**: Full system access
- **MANAGER**: Project and team management
- **STAFF**: Task execution and viewing
- **AUDITOR**: Read-only access to audit logs

### 4. Business Logic Layer

**Components**:

**User Management**:
- User CRUD operations
- Role assignment
- Profile management

**Financial Management**:
- Transaction tracking (income/expenses)
- Budget monitoring
- Project-based financial allocation

**Project Management**:
- Project lifecycle management
- Budget tracking per project
- Department assignment

**Task Management**:
- Task creation and assignment
- Progress tracking
- Priority and status management

**Performance Tracking**:
- KPI definition and tracking
- Performance scoring
- Evaluation reports

**Audit Trail**:
- Immutable audit logs
- Action tracking
- Change history

**Notifications**:
- In-app notifications
- Email notifications (optional)
- Real-time updates

### 5. Data Access Layer

**Technology**: Prisma ORM

**Features**:
- Type-safe database queries
- Automatic migrations
- Connection pooling
- Query optimization

**Key Patterns**:
- Repository pattern
- Transaction management
- Soft deletes (via audit trail)
- Indexed queries

### 6. Database Layer

**Technology**: PostgreSQL 15

**Schema**:
```
User
├── id (PK)
├── email (unique)
├── password (hashed)
├── role (enum)
├── department
└── metadata

Project
├── id (PK)
├── title
├── budget
├── spentAmount
├── status (enum)
├── createdBy (FK → User)
└── departmentId (FK → Department)

Task
├── id (PK)
├── projectId (FK → Project)
├── assignedTo (FK → User)
├── status (enum)
├── priority (enum)
└── progress (0-100)

Transaction
├── id (PK)
├── amount
├── type (enum: INCOME/EXPENSE)
├── projectId (FK → Project)
├── addedBy (FK → User)
└── date

AuditLog
├── id (PK)
├── userId (FK → User)
├── action
├── tableName
├── recordId
├── previousData (JSON)
├── newData (JSON)
└── timestamp

Performance
├── id (PK)
├── userId (FK → User)
├── goal
├── score
└── period

Notification
├── id (PK)
├── userId (FK → User)
├── message
├── type
└── status
```

## Data Flow

### Read Operations

1. Client makes request
2. Next.js API route receives request
3. NextAuth validates session
4. RBAC checks permissions
5. Prisma queries database
6. Data returned to client

### Write Operations

1. Client submits data
2. Next.js API route receives request
3. NextAuth validates session
4. Zod validates input schema
5. RBAC checks permissions
6. Prisma writes to database
7. Audit log created
8. Notification sent (if applicable)
9. Success response returned

## Security Architecture

### Authentication Flow

1. User submits credentials
2. Credentials verified against hashed password
3. JWT token generated with user data
4. Token stored in HTTP-only cookie
5. Token validated on each request

### Authorization Flow

1. Extract JWT from cookie
2. Verify token signature
3. Extract user role from token
4. Check role permissions for endpoint
5. Allow or deny access

### Audit Trail

All mutations are logged:
```typescript
{
  userId: "user-id",
  action: "CREATE_TRANSACTION",
  tableName: "Transaction",
  recordId: "transaction-id",
  previousData: null,
  newData: { amount: 1000, type: "EXPENSE" },
  timestamp: "2024-01-01T00:00:00Z"
}
```

## Deployment Architecture

### Development
```
Developer Machine
├── Next.js Dev Server (port 3000)
└── PostgreSQL (Docker or local)
```

### Production (Docker)
```
Docker Compose
├── App Container (Next.js)
│   └── Port 3000
├── PostgreSQL Container
│   └── Port 5432 (internal)
└── Nginx Reverse Proxy (optional)
    └── Port 80/443
```

### Production (Cloud - Vercel)
```
Vercel Platform
├── Next.js Application (serverless)
├── Edge Network (CDN)
└── External PostgreSQL (Neon/Supabase)
```

## Performance Optimization

### Database
- Indexed frequently queried columns
- Connection pooling
- Query optimization with Prisma
- Pagination for large datasets

### Frontend
- Server-side rendering for initial load
- Code splitting with Next.js
- Image optimization
- Lazy loading components

### Caching (Optional)
- React Query for client-side caching
- Redis for server-side caching
- Static page generation where possible

## Scalability Considerations

### Horizontal Scaling
- Stateless application design
- Session stored in database
- Load balancer support

### Vertical Scaling
- Optimized database queries
- Connection pooling
- Resource monitoring

## Monitoring & Logging

### Application Logs
- API request/response logs
- Error logs
- Performance metrics

### Audit Logs
- All data mutations
- User actions
- System events

### Health Checks
- Database connectivity
- API endpoint status
- Resource utilization

## Technology Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend Framework | Next.js 14 |
| UI Library | React 18 |
| Styling | Tailwind CSS |
| UI Components | Radix UI |
| Language | TypeScript |
| API | Next.js API Routes |
| Authentication | NextAuth.js v5 |
| ORM | Prisma |
| Database | PostgreSQL 15 |
| Validation | Zod |
| State Management | React Query |
| Charts | Recharts |
| Deployment | Docker / Vercel |

## Future Enhancements

- [ ] WebSocket support for real-time updates
- [ ] Advanced reporting with PDF generation
- [ ] Mobile app (React Native)
- [ ] AI-powered insights and predictions
- [ ] Multi-tenant support
- [ ] API rate limiting
- [ ] Advanced caching with Redis
- [ ] Microservices architecture (if needed)

---

**Last Updated**: 2024  
**Version**: 1.0.0
