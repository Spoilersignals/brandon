import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@dams.com' },
    update: {},
    create: {
      email: 'admin@dams.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      department: 'Administration',
      contactInfo: '+1234567890',
    },
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@dams.com' },
    update: {},
    create: {
      email: 'manager@dams.com',
      name: 'Manager User',
      password: hashedPassword,
      role: 'MANAGER',
      department: 'Operations',
      contactInfo: '+1234567891',
    },
  });

  const staff = await prisma.user.upsert({
    where: { email: 'staff@dams.com' },
    update: {},
    create: {
      email: 'staff@dams.com',
      name: 'Staff User',
      password: hashedPassword,
      role: 'STAFF',
      department: 'Operations',
      contactInfo: '+1234567892',
    },
  });

  const dept1 = await prisma.department.upsert({
    where: { name: 'IT Department' },
    update: {},
    create: {
      name: 'IT Department',
      description: 'Information Technology Department',
      budget: 100000,
    },
  });

  const dept2 = await prisma.department.upsert({
    where: { name: 'Finance Department' },
    update: {},
    create: {
      name: 'Finance Department',
      description: 'Financial Management Department',
      budget: 150000,
    },
  });

  const project1 = await prisma.project.create({
    data: {
      title: 'Website Redesign',
      description: 'Complete redesign of company website',
      startDate: new Date('2025-11-01'),
      endDate: new Date('2025-11-30'),
      status: 'ACTIVE',
      budget: 50000,
      spentAmount: 15000,
      departmentId: dept1.id,
      createdById: admin.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: 'Financial System Upgrade',
      description: 'Upgrade accounting software',
      startDate: new Date('2025-11-01'),
      endDate: new Date('2025-12-31'),
      status: 'PLANNING',
      budget: 75000,
      spentAmount: 0,
      departmentId: dept2.id,
      createdById: manager.id,
    },
  });

  await prisma.task.createMany({
    data: [
      {
        projectId: project1.id,
        assignedTo: staff.id,
        createdBy: manager.id,
        title: 'Design Homepage Mockup',
        description: 'Create modern homepage design',
        deadline: new Date('2025-11-15'),
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        progress: 60,
      },
      {
        projectId: project1.id,
        assignedTo: staff.id,
        createdBy: manager.id,
        title: 'Implement Responsive Layout',
        description: 'Make website mobile-friendly',
        deadline: new Date('2025-11-20'),
        status: 'TODO',
        priority: 'MEDIUM',
        progress: 0,
      },
    ],
  });

  await prisma.transaction.createMany({
    data: [
      {
        amount: 10000,
        type: 'INCOME',
        category: 'Budget Allocation',
        date: new Date('2025-11-01'),
        description: 'Initial project funding',
        projectId: project1.id,
        addedBy: admin.id,
      },
      {
        amount: 5000,
        type: 'EXPENSE',
        category: 'Design Tools',
        date: new Date('2025-11-05'),
        description: 'Adobe Creative Cloud subscription',
        projectId: project1.id,
        addedBy: manager.id,
      },
      {
        amount: 10000,
        type: 'EXPENSE',
        category: 'Contractor Payment',
        date: new Date('2025-11-08'),
        description: 'UI/UX designer consultation',
        projectId: project1.id,
        addedBy: manager.id,
      },
    ],
  });

  await prisma.performance.create({
    data: {
      userId: staff.id,
      goal: 'Complete 10 tasks this month',
      score: 85,
      period: '2025-11',
      remarks: 'Excellent performance, meeting all deadlines',
      evaluatedBy: manager.id,
    },
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: staff.id,
        message: 'You have been assigned to "Website Redesign" project',
        type: 'PROJECT_ASSIGNED',
        status: 'UNREAD',
      },
      {
        userId: manager.id,
        message: 'New transaction requires approval',
        type: 'APPROVAL_REQUIRED',
        status: 'UNREAD',
      },
    ],
  });

  console.log('Database seeded successfully!');
  console.log('Login credentials:');
  console.log('Admin: admin@dams.com / admin123');
  console.log('Manager: manager@dams.com / admin123');
  console.log('Staff: staff@dams.com / admin123');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
