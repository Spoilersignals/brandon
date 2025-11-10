import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, FolderKanban, CheckSquare, Users } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

async function getDashboardData(userId: string, role: string) {
  const [
    totalProjects,
    activeTasks,
    totalUsers,
    recentTransactions,
    projectStats,
  ] = await Promise.all([
    prisma.project.count({
      where: role === "ADMIN" || role === "MANAGER" ? {} : { createdById: userId },
    }),
    prisma.task.count({
      where: {
        status: { in: ["TODO", "IN_PROGRESS"] },
        ...(role === "STAFF" ? { assignedTo: userId } : {}),
      },
    }),
    role === "ADMIN" ? prisma.user.count() : null,
    prisma.transaction.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        project: { select: { title: true } },
        user: { select: { name: true } },
      },
    }),
    prisma.project.groupBy({
      by: ["status"],
      _count: true,
    }),
  ]);

  const financialSummary = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      type: "INCOME",
    },
  });

  const expenses = await prisma.transaction.aggregate({
    _sum: {
      amount: true,
    },
    where: {
      type: "EXPENSE",
    },
  });

  return {
    totalProjects,
    activeTasks,
    totalUsers,
    totalIncome: financialSummary._sum.amount || 0,
    totalExpenses: expenses._sum.amount || 0,
    recentTransactions,
    projectStats,
  };
}

export default async function Dashboard() {
  const session = await auth();
  const userId = (session?.user as any)?.id;
  const role = (session?.user as any)?.role;

  const data = await getDashboardData(userId, role);
  const balance = data.totalIncome - data.totalExpenses;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Overview of your organization's activities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalProjects}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeTasks}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
            <p className="text-xs text-muted-foreground">
              Income: {formatCurrency(data.totalIncome)} | Expenses: {formatCurrency(data.totalExpenses)}
            </p>
          </CardContent>
        </Card>

        {data.totalUsers !== null && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalUsers}</div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{transaction.description || transaction.category}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.project?.title || "No project"} • {transaction.user.name}
                    </p>
                  </div>
                  <div className={`font-semibold ${transaction.type === "INCOME" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "INCOME" ? "+" : "-"}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
              {data.recentTransactions.length === 0 && (
                <p className="text-center text-gray-500">No transactions yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.projectStats.map((stat) => (
                <div key={stat.status} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{stat.status}</span>
                  <span className="text-2xl font-bold">{stat._count}</span>
                </div>
              ))}
              {data.projectStats.length === 0 && (
                <p className="text-center text-gray-500">No projects yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
