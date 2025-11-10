"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Award, Target } from "lucide-react";

export default function PerformancePage() {
  const [performances, setPerformances] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/performance")
      .then((res) => res.json())
      .then((data) => {
        setPerformances(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const averageScore = performances.length > 0
    ? performances.reduce((sum, p) => sum + p.score, 0) / performances.length
    : 0;

  const topPerformers = [...performances]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 75) return "Good";
    if (score >= 60) return "Average";
    return "Needs Improvement";
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Tracking</h1>
          <p className="text-gray-500">Monitor and evaluate team performance</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Evaluation
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Across {performances.length} evaluations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topPerformers.length}</div>
            <p className="text-xs text-muted-foreground">
              Score above 90%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Evaluations</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performances.length}</div>
            <p className="text-xs text-muted-foreground">This period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((perf, index) => (
                <div
                  key={perf.id}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{perf.user.name}</p>
                      <p className="text-sm text-gray-500">{perf.user.department || "No dept"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${getScoreColor(perf.score)}`}>
                      {perf.score}%
                    </p>
                    <p className="text-xs text-gray-500">{perf.period}</p>
                  </div>
                </div>
              ))}
              {topPerformers.length === 0 && (
                <p className="text-center text-gray-500 py-8">No evaluations yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Evaluations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performances.slice(0, 5).map((perf) => (
                <div
                  key={perf.id}
                  className="flex items-start justify-between border-b pb-3 last:border-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{perf.user.name}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        perf.score >= 90 ? "bg-green-100 text-green-800" :
                        perf.score >= 75 ? "bg-blue-100 text-blue-800" :
                        perf.score >= 60 ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {getScoreBadge(perf.score)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{perf.goal}</p>
                    {perf.remarks && (
                      <p className="text-sm text-gray-600 mt-1 italic">{perf.remarks}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">Period: {perf.period}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className={`text-2xl font-bold ${getScoreColor(perf.score)}`}>
                      {perf.score}%
                    </p>
                  </div>
                </div>
              ))}
              {performances.length === 0 && (
                <p className="text-center text-gray-500 py-8">No evaluations yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Performance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Employee</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Goal</th>
                  <th className="text-left py-3 px-4">Period</th>
                  <th className="text-left py-3 px-4">Score</th>
                  <th className="text-left py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {performances.map((perf) => (
                  <tr key={perf.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{perf.user.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {perf.user.department || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm">{perf.goal}</td>
                    <td className="py-3 px-4 text-sm">{perf.period}</td>
                    <td className="py-3 px-4">
                      <span className={`text-lg font-bold ${getScoreColor(perf.score)}`}>
                        {perf.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        perf.score >= 90 ? "bg-green-100 text-green-800" :
                        perf.score >= 75 ? "bg-blue-100 text-blue-800" :
                        perf.score >= 60 ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {getScoreBadge(perf.score)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {performances.length === 0 && (
              <p className="text-center text-gray-500 py-8">No performance records yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
