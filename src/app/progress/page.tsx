"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const progressData = [
  {
    course: "React Fundamentals",
    completedLessons: 15,
    totalLessons: 20,
    progress: 75,
    status: "In Progress",
    lastAccessed: "2 days ago",
    estimatedCompletion: "1 week",
  },
  {
    course: "Advanced JavaScript",
    completedLessons: 11,
    totalLessons: 25,
    progress: 44,
    status: "In Progress",
    lastAccessed: "1 week ago",
    estimatedCompletion: "3 weeks",
  },
  {
    course: "Python Basics",
    completedLessons: 4,
    totalLessons: 18,
    progress: 22,
    status: "Started",
    lastAccessed: "3 days ago",
    estimatedCompletion: "4 weeks",
  },
  {
    course: "HTML & CSS Basics",
    completedLessons: 12,
    totalLessons: 12,
    progress: 100,
    status: "Completed",
    lastAccessed: "1 month ago",
    estimatedCompletion: "Completed",
  },
];

export default function UserProgress() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("userEmail");
    
    if (authStatus === "true" && email) {
      setIsAuthenticated(true);
      setUserEmail(email);
    } else {
      router.push("/signin");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
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
      "In Progress": "bg-blue-100 text-blue-800", 
      "Started": "bg-yellow-100 text-yellow-800",
    };
    return statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800";
  };

  const overallProgress = Math.round(
    progressData.reduce((acc, course) => acc + course.progress, 0) / progressData.length
  );

  const completedCourses = progressData.filter(course => course.progress === 100).length;
  const inProgressCourses = progressData.filter(course => course.progress > 0 && course.progress < 100).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        userType="user" 
        isLoggedIn={true} 
        onLogout={handleLogout}
        userEmail={userEmail}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Learning Progress</h1>
            <p className="text-gray-600 mt-2">Track your learning progress across all courses</p>
            <p className="text-sm text-gray-500">Signed in as: {userEmail}</p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Progress value={overallProgress} className="flex-1" />
                <span className="text-2xl font-bold text-blue-600">{overallProgress}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedCourses}</div>
              <p className="text-sm text-gray-500">out of {progressData.length} enrolled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{inProgressCourses}</div>
              <p className="text-sm text-gray-500">courses active</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Progress Table */}
        <Card>
          <CardHeader>
            <CardTitle>Course Progress Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Lessons</TableHead>
                  <TableHead className="text-center">Progress</TableHead>
                  <TableHead className="text-center">Last Accessed</TableHead>
                  <TableHead className="text-center">Est. Completion</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {progressData.map((course, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{course.course}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={getStatusBadge(course.status)}>
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {course.completedLessons} / {course.totalLessons}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Progress value={course.progress} className="flex-1" />
                        <span className="text-sm font-medium min-w-[3rem]">
                          {course.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-sm text-gray-600">
                      {course.lastAccessed}
                    </TableCell>
                    <TableCell className="text-center text-sm text-gray-600">
                      {course.estimatedCompletion}
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
            onClick={() => router.push("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Back to Dashboard
          </Button>
          <Button 
            onClick={() => router.push("/courses")}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Browse More Courses
          </Button>
        </div>
      </div>
    </div>
  );
}

