import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createPerformanceSchema = z.object({
  userId: z.string(),
  goal: z.string().min(1),
  score: z.number().min(0).max(100),
  period: z.string(),
  remarks: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const period = searchParams.get("period");

    const userRole = (session.user as any).role;
    const currentUserId = (session.user as any).id;

    const performances = await prisma.performance.findMany({
      where: {
        ...(userId && { userId }),
        ...(period && { period }),
        ...(userRole === "STAFF" && { userId: currentUserId }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(performances);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    if (userRole !== "ADMIN" && userRole !== "MANAGER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await request.json();
    const data = createPerformanceSchema.parse(body);

    const performance = await prisma.performance.create({
      data: {
        ...data,
        evaluatedBy: (session.user as any).id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            department: true,
          },
        },
      },
    });

    await prisma.notification.create({
      data: {
        userId: data.userId,
        message: `You have a new performance evaluation for ${data.period}`,
        type: "PERFORMANCE_REVIEW",
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "CREATE_PERFORMANCE",
        tableName: "Performance",
        recordId: performance.id,
        newData: performance as any,
      },
    });

    return NextResponse.json(performance, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
