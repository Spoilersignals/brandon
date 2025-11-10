# DAMS - AI Agent Instructions

This file contains important information for AI coding agents working on the DAMS project.

## 🏗️ Project Overview

**Name**: DAMS (Digital Accountability and Management System)  
**Type**: Full-stack web application  
**Framework**: Next.js 14 (App Router)  
**Language**: TypeScript  
**Database**: PostgreSQL with Prisma ORM  
**Styling**: Tailwind CSS + Radix UI

## 🔧 Frequently Used Commands

### Development
```bash
npm run dev          # Start development server (port 3000)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Database
```bash
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with sample data
```

### Testing
```bash
npm test             # Run tests (when implemented)
```

## 📁 Project Structure

```
src/
├── app/              # Next.js 14 App Router pages
│   ├── api/         # API routes
│   ├── dashboard/   # Dashboard pages
│   ├── auth/        # Authentication pages
│   └── (other routes)
├── components/
│   ├── ui/          # Reusable UI components (Shadcn/ui)
│   └── layout/      # Layout components (Sidebar, Header)
├── lib/
│   ├── auth.ts      # NextAuth configuration
│   ├── prisma.ts    # Prisma client
│   └── utils.ts     # Utility functions
└── types/           # TypeScript type definitions
```

## 🎨 Code Style Preferences

### TypeScript
- Use TypeScript for all new files
- Prefer interfaces over types for object shapes
- Use strict mode
- Avoid `any` type - use proper typing

### React Components
- Use functional components with hooks
- Prefer named exports for components
- Use client components (`"use client"`) only when needed
- Server components by default

### API Routes
- Use Zod for validation
- Return proper HTTP status codes
- Include error handling
- Add audit logging for mutations

### Database
- Use Prisma for all database operations
- Add indexes for frequently queried fields
- Use transactions for related operations
- Follow the audit trail pattern

## 🔐 Security Practices

- Never commit secrets or API keys
- Use environment variables for configuration
- Validate all user input with Zod
- Implement role-based access control
- Add audit logs for sensitive operations

## 🧪 Testing Approach

- Test critical business logic
- Mock external dependencies
- Test API routes with different user roles
- Test database constraints

## 📊 Database Patterns

### Audit Trail Pattern
```typescript
// Always add audit log for mutations
await prisma.auditLog.create({
  data: {
    userId: session.user.id,
    action: "CREATE_RESOURCE",
    tableName: "Resource",
    recordId: resource.id,
    newData: resource,
  },
});
```

### Role-Based Access
```typescript
// Check user role before operations
if (session.user.role !== "ADMIN") {
  return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
}
```

## 🎯 Common Tasks

### Adding a New API Route

1. Create file in `src/app/api/[resource]/route.ts`
2. Define Zod schema for validation
3. Implement GET, POST, PUT, DELETE methods
4. Add authentication check
5. Add role-based authorization
6. Create audit log for mutations
7. Return proper responses

### Adding a New Page

1. Create file in `src/app/[route]/page.tsx`
2. Add to sidebar navigation if needed
3. Implement data fetching
4. Add loading states
5. Style with Tailwind CSS
6. Make responsive

### Adding a Database Model

1. Update `prisma/schema.prisma`
2. Run `npm run db:generate`
3. Run `npm run db:push`
4. Create API routes
5. Update types if needed

## 🐛 Debugging

- Check browser console for client errors
- Check terminal for server errors
- Use Prisma Studio to inspect database
- Check `.env` file for configuration issues
- Use `console.log` or debugger statements

## 📦 Dependencies

### Core
- Next.js 14
- React 18
- TypeScript 5
- Prisma 5
- NextAuth.js 5

### UI
- Tailwind CSS
- Radix UI
- Lucide Icons
- Recharts (for charts)

### Utilities
- Zod (validation)
- date-fns (date formatting)
- bcryptjs (password hashing)

## 🚀 Deployment

- Build with `npm run build` before deploying
- Ensure all environment variables are set
- Run database migrations in production
- Use Docker for containerized deployment
- See SETUP.md for detailed deployment instructions

## ⚠️ Known Issues

- None currently

## 💡 Tips for AI Agents

1. **Always check authentication** before accessing protected routes
2. **Use Prisma transactions** for related database operations
3. **Add audit logs** for all create/update/delete operations
4. **Validate input** with Zod schemas
5. **Return proper HTTP status codes** (200, 201, 400, 401, 403, 500)
6. **Make components responsive** with Tailwind breakpoints
7. **Use server components** by default, client components only when needed
8. **Follow existing patterns** in the codebase
9. **Test thoroughly** before marking tasks complete
10. **Update this file** if you discover new patterns or preferences

---

Last updated: 2024
