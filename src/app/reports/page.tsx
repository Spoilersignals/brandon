"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, TrendingUp, BarChart3, CheckCircle2, DollarSign } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = () => {
    fetch("/api/reports")
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error(err));
  };

  const generateReport = async (type: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const result = await res.json();
      setGeneratedReport(result);
      fetchReports();
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = (reportData: any) => {
    const content = JSON.stringify(reportData, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportData.report.type}-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadHistoryReport = (report: any) => {
    const content = JSON.stringify(report.metadata, null, 2);
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.type}-report-${report.createdAt.split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const reportTypes = [
    {
      type: "financial",
      title: "Financial Report",
      description: "Income, expenses, and budget analysis",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      type: "project",
      title: "Project Report",
      description: "Project status and budget tracking",
      icon: BarChart3,
      color: "text-blue-600",
    },
    {
      type: "performance",
      title: "Performance Report",
      description: "Team performance and evaluations",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      type: "task",
      title: "Task Report",
      description: "Task completion and progress",
      icon: CheckCircle2,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports & Insights</h1>
        <p className="text-gray-500">Generate comprehensive reports and analytics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {reportTypes.map((reportType) => {
          const Icon = reportType.icon;
          return (
            <Card key={reportType.type} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gray-100 ${reportType.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{reportType.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">{reportType.description}</p>
                <Button
                  onClick={() => generateReport(reportType.type)}
                  disabled={loading}
                  className="w-full"
                >
                  {loading ? "Generating..." : "Generate Report"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {generatedReport && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Report: {generatedReport.report.title}</CardTitle>
              <Button variant="outline" onClick={() => downloadReport(generatedReport)}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generatedReport.report.type === "financial" && (
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total Income</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(generatedReport.data.totalIncome)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatCurrency(generatedReport.data.totalExpenses)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Balance</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(generatedReport.data.balance)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Transactions</p>
                    <p className="text-2xl font-bold">{generatedReport.data.totalTransactions}</p>
                  </div>
                </div>
              )}

              {generatedReport.report.type === "project" && (
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total Projects</p>
                    <p className="text-2xl font-bold">{generatedReport.data.totalProjects}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Active Projects</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {generatedReport.data.activeProjects}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total Budget</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(generatedReport.data.totalBudget)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total Spent</p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(generatedReport.data.totalSpent)}
                    </p>
                  </div>
                </div>
              )}

              {generatedReport.report.type === "performance" && (
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total Evaluations</p>
                    <p className="text-2xl font-bold">{generatedReport.data.totalEvaluations}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Average Score</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {generatedReport.data.averageScore.toFixed(1)}%
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Top Performers</p>
                    <p className="text-2xl font-bold text-green-600">
                      {generatedReport.data.topPerformers}
                    </p>
                  </div>
                </div>
              )}

              {generatedReport.report.type === "task" && (
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total Tasks</p>
                    <p className="text-2xl font-bold">{generatedReport.data.totalTasks}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-2xl font-bold text-green-600">
                      {generatedReport.data.completedTasks}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {generatedReport.data.inProgressTasks}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <p className="text-2xl font-bold">
                      {generatedReport.data.completionRate.toFixed(1)}%
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Report History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">{report.title}</p>
                    <p className="text-sm text-gray-500">
                      Generated by {report.user.name} on {formatDate(report.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {report.type}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => downloadHistoryReport(report)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {reports.length === 0 && (
              <p className="text-center text-gray-500 py-8">No reports generated yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
