"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, Bell, Shield, Database } from "lucide-react";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);

  const handleSave = async (section: string) => {
    setSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    alert(`${section} settings saved!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your account and application settings</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Profile Settings</CardTitle>
            </div>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" placeholder="IT Department" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Info</Label>
                <Input id="contact" placeholder="+1 234 567 8900" />
              </div>
            </div>
            <Button onClick={() => handleSave("Profile")} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              <CardTitle>Security Settings</CardTitle>
            </div>
            <CardDescription>Update your password and security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button onClick={() => handleSave("Security")} disabled={saving}>
              {saving ? "Updating..." : "Update Password"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notification Preferences</CardTitle>
            </div>
            <CardDescription>Choose what notifications you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Task Assignments</p>
                <p className="text-sm text-gray-500">Get notified when tasks are assigned to you</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Performance Reviews</p>
                <p className="text-sm text-gray-500">Get notified about performance evaluations</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Project Updates</p>
                <p className="text-sm text-gray-500">Receive updates on project progress</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <Button onClick={() => handleSave("Notifications")} disabled={saving}>
              {saving ? "Saving..." : "Save Preferences"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Privacy & Data</CardTitle>
            </div>
            <CardDescription>Manage your data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Profile Visibility</p>
                <p className="text-sm text-gray-500">Make your profile visible to team members</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Activity Status</p>
                <p className="text-sm text-gray-500">Show when you're online</p>
              </div>
              <input type="checkbox" className="h-5 w-5" defaultChecked />
            </div>
            <div className="pt-4 border-t">
              <Button variant="outline" className="text-red-600">
                Download My Data
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Download all your data from the system
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              <CardTitle>System Information</CardTitle>
            </div>
            <CardDescription>Information about the application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Version</span>
              <span className="text-sm font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Environment</span>
              <span className="text-sm font-medium">Development</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Database</span>
              <span className="text-sm font-medium">PostgreSQL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Last Updated</span>
              <span className="text-sm font-medium">2024</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
