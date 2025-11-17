"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatDate, calculatePercentage } from "@/lib/utils";
import { Plus, FolderKanban } from "lucide-react";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: "",
        startDate: "",
        endDate: "",
        status: "PLANNING",
        departmentId: "",
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = () => {
        setLoading(true);
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
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        try {
            const payload = {
                title: formData.title,
                description: formData.description || undefined,
                budget: formData.budget ? parseFloat(formData.budget) : undefined,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
                status: formData.status,
                departmentId: formData.departmentId || undefined,
            };

            const response = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to create project");
            }

            setMessage({ type: "success", text: "Project created successfully!" });
            setFormData({
                title: "",
                description: "",
                budget: "",
                startDate: "",
                endDate: "",
                status: "PLANNING",
                departmentId: "",
            });
            fetchProjects();
            setTimeout(() => {
                setOpen(false);
                setMessage(null);
            }, 1500);
        } catch (error) {
            setMessage({ type: "error", text: "Failed to create project" });
        } finally {
            setSubmitting(false);
        }
    };

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
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Create New Project</DialogTitle>
                            <DialogDescription>
                                Fill in the details below to create a new project.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">
                                        Title <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        rows={3}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="budget">
                                        Budget <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="budget"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="startDate">
                                            Start Date <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="endDate">End Date</Label>
                                        <Input
                                            id="endDate"
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PLANNING">Planning</SelectItem>
                                            <SelectItem value="ACTIVE">Active</SelectItem>
                                            <SelectItem value="ON_HOLD">On Hold</SelectItem>
                                            <SelectItem value="COMPLETED">Completed</SelectItem>
                                            <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            {message && (
                                <div
                                    className={`p-3 rounded-md text-sm ${message.type === "success"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {message.text}
                                </div>
                            )}
                            <DialogFooter className="mt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    disabled={submitting}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? "Creating..." : "Create Project"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
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
                                            className={`h-full transition-all ${calculatePercentage(project.spentAmount, project.budget) > 90
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
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="mt-4">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create Your First Project
                                        </Button>
                                    </DialogTrigger>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
