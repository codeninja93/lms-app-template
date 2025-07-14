"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, BookOpen, Award } from "lucide-react";

const progressData = [
  {
    id: 1,
    user: "John Smith",
    email: "john@example.com",
    course: "React Fundamentals", 
    completed: 75,
    lessonsCompleted: 15,
    totalLessons: 20,
    lastActivity: "2 days ago",
    status: "Active",
  },
  {
    id: 2,
    user: "Sarah Johnson",
    email: "sarah@example.com",
    course: "Advanced JavaScript",
    completed: 50,
    lessonsCompleted: 12,
    totalLessons: 24,
    lastActivity: "1 day ago",
    status: "Active",
  },
  {
    id: 3,
    user: "Mike Wilson",
    email: "mike@example.com",
    course: "Python Basics",
    completed: 30,
    lessonsCompleted: 6,
    totalLessons: 20,
    lastActivity: "5 days ago",
    status: "Inactive",
  },
  {
    id: 4,
    user: "Emily Davis",
    email: "emily@example.com",
    course: "UI/UX Design",
    completed: 90,
    lessonsCompleted: 18,
    totalLessons: 20,
    lastActivity: "1 hour ago",
    status: "Active",
  },
  {
    id: 5,
    user: "Alex Chen",
    email: "alex@example.com",
    course: "React Fundamentals",
    completed: 100,
    lessonsCompleted: 20,
    totalLessons: 20,
    lastActivity: "1 week ago",
    status: "Completed",
  },
];

export default function AdminProgress() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated and is admin
    const authStatus = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("userEmail");
    const userType = localStorage.getItem("userType");
    
    if (authStatus === "true" && email) {
      // If user is not admin, redirect to user dashboard
      if (userType !== "admin") {
        router.push("/dashboard");
        return;
      }
      setIsAuthenticated(true);
      setUserEmail(email);
    } else {
      router.push("/signin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userType");
    router.push("/signin");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      "Completed": "bg-green-100 text-green-800",
      "Active": "bg-blue-100 text-blue-800", 
      "Inactive": "bg-red-100 text-red-800",
    };
    return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800";
  };

  // Calculate summary stats
  const totalStudents = progressData.length;
  const activeStudents = progressData.filter(p => p.status === "Active").length;
  const completedCourses = progressData.filter(p => p.status === "Completed").length;
  const avgProgress = Math.round(
    progressData.reduce((acc, p) => acc + p.completed, 0) / totalStudents
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        userType="admin" 
        isLoggedIn={true} 
        onLogout={handleLogout}
        userEmail={userEmail}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
            <p className="text-gray-600 mt-2">Monitor user progress across all courses</p>
            <p className="text-sm text-gray-500">Signed in as: {userEmail}</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Active Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Award className="h-4 w-4" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{completedCourses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Avg Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{avgProgress}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Progress Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Progress Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-center">Lessons</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {progressData.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <div className="font-medium">{entry.user}</div>
                        <div className="text-sm text-gray-500">{entry.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{entry.course}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Progress value={entry.completed} className="flex-1 h-2" />
                        <span className="text-sm font-medium min-w-[3rem]">
                          {entry.completed}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm">
                        {entry.lessonsCompleted} / {entry.totalLessons}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={getStatusBadge(entry.status)}>
                        {entry.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {entry.lastActivity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button 
            onClick={() => router.push("/admin")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Back to Dashboard
          </Button>
          <Button 
            onClick={() => router.push("/admin/reports")}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            View Reports
          </Button>
          <Button 
            onClick={() => router.push("/admin/users")}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Manage Users
          </Button>
        </div>
      </div>
    </div>
  );
}

