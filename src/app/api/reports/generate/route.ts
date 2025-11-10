import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, startDate, endDate } = await request.json();

    let reportData: any = {};

    switch (type) {
      case "financial": {
        const transactions = await prisma.transaction.findMany({
          where: {
            date: {
              gte: startDate ? new Date(startDate) : undefined,
              lte: endDate ? new Date(endDate) : undefined,
            },
          },
          include: {
            project: { select: { title: true } },
            user: { select: { name: true } },
          },
        });

        const totalIncome = transactions
          .filter((t) => t.type === "INCOME")
          .reduce((sum, t) => sum + t.amount, 0);

        const totalExpenses = transactions
          .filter((t) => t.type === "EXPENSE")
          .reduce((sum, t) => sum + t.amount, 0);

        reportData = {
          totalTransactions: transactions.length,
          totalIncome,
          totalExpenses,
          balance: totalIncome - totalExpenses,
          transactions,
        };
        break;
      }

      case "project": {
        const projects = await prisma.project.findMany({
          include: {
            _count: { select: { tasks: true } },
            createdBy: { select: { name: true } },
          },
        });

        reportData = {
          totalProjects: projects.length,
          activeProjects: projects.filter((p) => p.status === "ACTIVE").length,
          completedProjects: projects.filter((p) => p.status === "COMPLETED").length,
          totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
          totalSpent: projects.reduce((sum, p) => sum + p.spentAmount, 0),
          projects,
        };
        break;
      }

      case "performance": {
        const performances = await prisma.performance.findMany({
          where: {
            period: {
              gte: startDate || undefined,
              lte: endDate || undefined,
            },
          },
          include: {
            user: { select: { name: true, department: true } },
          },
        });

        const averageScore = performances.length > 0
          ? performances.reduce((sum, p) => sum + p.score, 0) / performances.length
          : 0;

        reportData = {
          totalEvaluations: performances.length,
          averageScore,
          topPerformers: performances.filter((p) => p.score >= 90).length,
          performances,
        };
        break;
      }

      case "task": {
        const tasks = await prisma.task.findMany({
          include: {
            project: { select: { title: true } },
            assignedUser: { select: { name: true } },
          },
        });

        reportData = {
          totalTasks: tasks.length,
          completedTasks: tasks.filter((t) => t.status === "COMPLETED").length,
          inProgressTasks: tasks.filter((t) => t.status === "IN_PROGRESS").length,
          todoTasks: tasks.filter((t) => t.status === "TODO").length,
          completionRate: tasks.length > 0
            ? (tasks.filter((t) => t.status === "COMPLETED").length / tasks.length) * 100
            : 0,
          tasks,
        };
        break;
      }

      default:
        return NextResponse.json({ error: "Invalid report type" }, { status: 400 });
    }

    const report = await prisma.report.create({
      data: {
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Report`,
        type,
        generatedBy: (session.user as any).id,
        metadata: reportData,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "GENERATE_REPORT",
        tableName: "Report",
        recordId: report.id,
        newData: { type, reportId: report.id } as any,
      },
    });

    return NextResponse.json({ report, data: reportData }, { status: 201 });
  } catch (error) {
    console.error("Report generation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
