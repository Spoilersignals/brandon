"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, calculatePercentage } from "@/lib/utils";
import { Plus, FolderKanban } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
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
      case "ACTIVE":
        return "bg-blue-100 text-blue-800";
      case "PLANNING":
        return "bg-yellow-100 text-yellow-800";
      case "ON_HOLD":
        return "bg-orange-100 text-orange-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-500">Manage and track all your projects</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Project
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{project.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Budget</span>
                  <span className="font-medium">{formatCurrency(project.budget)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Spent</span>
                  <span className="font-medium">{formatCurrency(project.spentAmount)}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Budget Usage</span>
                    <span className="font-medium">
                      {calculatePercentage(project.spentAmount, project.budget)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        calculatePercentage(project.spentAmount, project.budget) > 90
                          ? "bg-red-600"
                          : calculatePercentage(project.spentAmount, project.budget) > 75
                          ? "bg-orange-600"
                          : "bg-green-600"
                      }`}
                      style={{
                        width: `${Math.min(
                          calculatePercentage(project.spentAmount, project.budget),
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Start Date</span>
                  <span>{formatDate(project.startDate)}</span>
                </div>
                {project.endDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">End Date</span>
                    <span>{formatDate(project.endDate)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Tasks</span>
                  <span className="font-medium">{project._count.tasks}</span>
                </div>
                {project.department && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Department</span>
                    <span>{project.department.name}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Created by</span>
                  <span>{project.createdBy.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FolderKanban className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-center text-gray-500">No projects yet</p>
                <Button className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Project
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
