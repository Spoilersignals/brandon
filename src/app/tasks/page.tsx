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
import { formatDate } from "@/lib/utils";
import { Plus, Clock, CheckCircle2 } from "lucide-react";

interface Project {
    id: string;
    title: string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        projectId: "",
        assignedTo: "",
        title: "",
        description: "",
        deadline: "",
        priority: "MEDIUM",
        status: "TODO",
        progress: 0,
    });

    useEffect(() => {
        fetchTasks();
        fetchProjects();
        fetchUsers();
    }, []);

    const fetchTasks = () => {
        setLoading(true);
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
    };

    const fetchProjects = () => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then((data) => setProjects(data))
            .catch((err) => console.error(err));
    };

    const fetchUsers = () => {
        fetch("/api/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error(err));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    deadline: new Date(formData.deadline).toISOString(),
                    progress: Number(formData.progress),
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create task");
            }

            setSuccess("Task created successfully!");
            setDialogOpen(false);
            setFormData({
                projectId: "",
                assignedTo: "",
                title: "",
                description: "",
                deadline: "",
                priority: "MEDIUM",
                status: "TODO",
                progress: 0,
            });
            fetchTasks();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

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
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Create New Task</DialogTitle>
                            <DialogDescription>
                                Add a new task to the system. Fill in all required fields.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                        {error}
                                    </div>
                                )}
                                {success && (
                                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                                        {success}
                                    </div>
                                )}

                                <div className="grid gap-2">
                                    <Label htmlFor="projectId">
                                        Project <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.projectId}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, projectId: value })
                                        }
                                        required
                                    >
                                        <SelectTrigger id="projectId">
                                            <SelectValue placeholder="Select a project" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {projects.map((project) => (
                                                <SelectItem key={project.id} value={project.id}>
                                                    {project.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="assignedTo">
                                        Assign To <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={formData.assignedTo}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, assignedTo: value })
                                        }
                                        required
                                    >
                                        <SelectTrigger id="assignedTo">
                                            <SelectValue placeholder="Select a user" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem key={user.id} value={user.id}>
                                                    {user.name} ({user.email})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="title">
                                        Title <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        placeholder="Enter task title"
                                        required
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        placeholder="Enter task description"
                                        rows={4}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="deadline">
                                        Deadline <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="deadline"
                                        type="datetime-local"
                                        value={formData.deadline}
                                        onChange={(e) =>
                                            setFormData({ ...formData, deadline: e.target.value })
                                        }
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="priority">Priority</Label>
                                        <Select
                                            value={formData.priority}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, priority: value })
                                            }
                                        >
                                            <SelectTrigger id="priority">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="LOW">Low</SelectItem>
                                                <SelectItem value="MEDIUM">Medium</SelectItem>
                                                <SelectItem value="HIGH">High</SelectItem>
                                                <SelectItem value="URGENT">Urgent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select
                                            value={formData.status}
                                            onValueChange={(value) =>
                                                setFormData({ ...formData, status: value })
                                            }
                                        >
                                            <SelectTrigger id="status">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="TODO">To Do</SelectItem>
                                                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                                                <SelectItem value="COMPLETED">Completed</SelectItem>
                                                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="progress">Progress (0-100)</Label>
                                    <Input
                                        id="progress"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formData.progress}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                progress: parseInt(e.target.value) || 0,
                                            })
                                        }
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setDialogOpen(false)}
                                    disabled={submitting}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={submitting}>
                                    {submitting ? "Creating..." : "Create Task"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
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
