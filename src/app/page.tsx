import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">DAMS</h1>
          <Link href="/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Digital Accountability and Management System
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Enhance transparency, efficiency, and accountability within your organization.
              Track finances, manage tasks, and evaluate performance in real-time.
            </p>
          </div>

          <div className="flex gap-4">
            <Link href="/auth/signin">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">Learn More</Button>
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-16">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Financial Tracking</h3>
              <p className="text-sm text-gray-500">
                Monitor income, expenses, and budgets in real-time
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Task Management</h3>
              <p className="text-sm text-gray-500">
                Assign and track tasks with deadlines and priorities
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Performance Analytics</h3>
              <p className="text-sm text-gray-500">
                Evaluate performance with intuitive dashboards
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Audit Trail</h3>
              <p className="text-sm text-gray-500">
                Maintain tamper-proof logs of all activities
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
