"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Plus, Clock, CheckCircle2 } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800";
      case "TODO":
        return "bg-gray-100 text-gray-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "text-red-600";
      case "HIGH":
        return "text-orange-600";
      case "MEDIUM":
        return "text-yellow-600";
      case "LOW":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  const todoTasks = tasks.filter((t) => t.status === "TODO");
  const inProgressTasks = tasks.filter((t) => t.status === "IN_PROGRESS");
  const completedTasks = tasks.filter((t) => t.status === "COMPLETED");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Task Management</h1>
          <p className="text-gray-500">Manage and track all your tasks</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">To Do</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todoTasks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTasks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">To Do</h2>
          {todoTasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">{task.title}</h3>
                    <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <div className="text-xs text-gray-500">
                    Project: {task.project.title}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-500">
                      Due: {formatDate(task.deadline)}
                    </span>
                    <span className="text-xs text-gray-500">
                      Assigned to: {task.assignedUser.name}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {todoTasks.length === 0 && (
            <p className="text-center text-gray-500 py-8">No tasks</p>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">In Progress</h2>
          {inProgressTasks.map((task) => (
            <Card key={task.id}>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold">{task.title}</h3>
                    <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <div className="text-xs text-gray-500">
                    Project: {task.project.title}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-500">
                      Due: {formatDate(task.deadline)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {task.assignedUser.name}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {inProgressTasks.length === 0 && (
            <p className="text-center text-gray-500 py-8">No tasks</p>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Completed</h2>
          {completedTasks.map((task) => (
            <Card key={task.id} className="opacity-75">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold line-through">{task.title}</h3>
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-500">{task.description}</p>
                  <div className="text-xs text-gray-500">
                    Project: {task.project.title}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-gray-500">
                      Completed: {formatDate(task.updatedAt)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {task.assignedUser.name}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {completedTasks.length === 0 && (
            <p className="text-center text-gray-500 py-8">No tasks</p>
          )}
        </div>
      </div>
    </div>
  );
}
