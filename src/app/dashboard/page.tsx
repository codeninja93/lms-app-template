"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react";

export default function UserDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("userEmail");
    const userType = localStorage.getItem("userType");
    
    if (authStatus === "true" && email) {
      // If user is admin, redirect to admin dashboard
      if (userType === "admin") {
        router.push("/admin");
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
  const enrolledCourses = [
    {
      id: 1,
      title: "React Fundamentals",
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      instructor: "John Doe",
      nextLesson: "State Management",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      progress: 45,
      totalLessons: 25,
      completedLessons: 11,
      instructor: "Jane Smith",
      nextLesson: "Async/Await",
    },
    {
      id: 3,
      title: "Python Basics",
      progress: 20,
      totalLessons: 18,
      completedLessons: 4,
      instructor: "Mike Johnson",
      nextLesson: "Variables and Data Types",
    },
  ];

  const completedCourses = [
    {
      title: "HTML & CSS Basics",
      completedDate: "2024-01-15",
      certificate: true,
    },
    {
      title: "JavaScript Fundamentals",
      completedDate: "2024-01-28",
      certificate: true,
    },
  ];

  const stats = [
    {
      title: "Courses Enrolled",
      value: "3",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Courses Completed",
      value: "2",
      icon: Award,
      color: "text-green-600",
    },
    {
      title: "Hours Learned",
      value: "48",
      icon: Clock,
      color: "text-purple-600",
    },
    {
      title: "Certificates Earned",
      value: "2",
      icon: Award,
      color: "text-orange-600",
    },
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-600 mt-2">
              Signed in as: <span className="font-medium">{userEmail}</span>
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Current Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enrolledCourses.map((course) => (
                  <div key={course.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <Badge variant="outline">{course.progress}%</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
                    <Progress value={course.progress} className="h-2 mb-2" />
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                      <span>Next: {course.nextLesson}</span>
                    </div>
                    <Button size="sm" className="mt-2 w-full">
                      Continue Learning
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completed Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Completed Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedCourses.map((course, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-green-50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      {course.certificate && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Certified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Completed on {new Date(course.completedDate).toLocaleDateString()}
                    </p>
                    {course.certificate && (
                      <Button size="sm" variant="outline" className="mt-2">
                        Download Certificate
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Completed lesson "JSX Basics" in React Fundamentals</p>
                  <p className="text-xs text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Earned certificate for JavaScript Fundamentals</p>
                  <p className="text-xs text-gray-600">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Started new course: Advanced JavaScript</p>
                  <p className="text-xs text-gray-600">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
