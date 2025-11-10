import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createTransactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["INCOME", "EXPENSE"]),
  category: z.string().min(1),
  date: z.string().datetime(),
  description: z.string().optional(),
  projectId: z.string().optional(),
  receiptUrl: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("projectId");
    const type = searchParams.get("type");

    const transactions = await prisma.transaction.findMany({
      where: {
        ...(projectId && { projectId }),
        ...(type && { type: type as any }),
      },
      include: {
        project: { select: { title: true } },
        user: { select: { name: true } },
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(transactions);
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
    const data = createTransactionSchema.parse(body);

    const transaction = await prisma.transaction.create({
      data: {
        ...data,
        date: new Date(data.date),
        addedBy: (session.user as any).id,
      },
      include: {
        project: { select: { title: true } },
        user: { select: { name: true } },
      },
    });

    if (data.projectId) {
      await prisma.project.update({
        where: { id: data.projectId },
        data: {
          spentAmount: {
            increment: data.type === "EXPENSE" ? data.amount : 0,
          },
        },
      });
    }

    await prisma.auditLog.create({
      data: {
        userId: (session.user as any).id,
        action: "CREATE_TRANSACTION",
        tableName: "Transaction",
        recordId: transaction.id,
        newData: transaction as any,
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
