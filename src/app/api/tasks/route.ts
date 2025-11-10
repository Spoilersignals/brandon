import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createTaskSchema = z.object({
  projectId: z.string(),
  assignedTo: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  deadline: z.string().datetime(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).optional(),
  progress: z.number().min(0).max(100).optional(),
});

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const status = searchParams.get("status");
    const assignedTo = searchParams.get("assignedTo");

    const tasks = await prisma.task.findMany({
      where: {
        ...(projectId && { projectId }),
        ...(status && { status: status as any }),
        ...(assignedTo && { assignedTo }),
      },
      include: {
        project: { select: { title: true } },
        assignedUser: { select: { name: true, email: true } },
        createdByUser: { select: { name: true } },
      },
      orderBy: { deadline: "asc" },
    });

    return NextResponse.json(tasks);
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

    const body = await request.json();
    const data = createTaskSchema.parse(body);

    const task = await prisma.task.create({
      data: {
        ...data,
        deadline: new Date(data.deadline),
        createdBy: (session.user as any).id,
      },
      include: {
        project: { select: { title: true } },
        assignedUser: { select: { name: true, email: true } },
        createdByUser: { select: { name: true } },
      },
    });

    await prisma.notification.create({
      data: {
        userId: data.assignedTo,
        message: `You have been assigned a new task: ${data.title}`,
        type: "TASK_ASSIGNED",
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "CREATE_TASK",
        tableName: "Task",
        recordId: task.id,
        newData: task as any,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
