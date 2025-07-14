"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, TrendingUp, Award, DollarSign, Activity } from "lucide-react";

export default function AdminDashboard() {
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
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      trend: "+12%",
      color: "text-blue-600",
    },
    {
      title: "Active Courses",
      value: "56",
      icon: BookOpen,
      trend: "+5%",
      color: "text-green-600",
    },
    {
      title: "Completion Rate",
      value: "85%",
      icon: TrendingUp,
      trend: "+8%",
      color: "text-purple-600",
    },
    {
      title: "Certificates Issued",
      value: "892",
      icon: Award,
      trend: "+23%",
      color: "text-orange-600",
    },
  ];

  const recentActivities = [
    {
      user: "John Smith",
      action: "Completed",
      course: "React Fundamentals",
      time: "2 hours ago",
    },
    {
      user: "Sarah Johnson",
      action: "Started",
      course: "Advanced JavaScript",
      time: "4 hours ago",
    },
    {
      user: "Mike Wilson",
      action: "Enrolled in",
      course: "Python Basics",
      time: "6 hours ago",
    },
    {
      user: "Emily Davis",
      action: "Completed",
      course: "UI/UX Design",
      time: "1 day ago",
    },
  ];

  const topCourses = [
    {
      name: "React Fundamentals",
      enrolled: 245,
      completed: 189,
      completionRate: 77,
    },
    {
      name: "Advanced JavaScript",
      enrolled: 198,
      completed: 145,
      completionRate: 73,
    },
    {
      name: "Python Basics",
      enrolled: 312,
      completed: 267,
      completionRate: 86,
    },
    {
      name: "UI/UX Design",
      enrolled: 156,
      completed: 134,
      completionRate: 86,
    },
  ];

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
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Monitor your LMS performance and user activity</p>
            <p className="text-sm text-gray-500">Signed in as: {userEmail}</p>
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
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.trend}</span> from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user} <span className="text-gray-600">{activity.action}</span>
                      </p>
                      <p className="text-sm text-blue-600">{activity.course}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Top Performing Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-gray-900">{course.name}</h4>
                      <Badge variant="secondary">{course.completionRate}%</Badge>
                    </div>
                    <Progress value={course.completionRate} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Enrolled: {course.enrolled}</span>
                      <span>Completed: {course.completed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Create New Course</h3>
                    <p className="text-sm text-gray-600">Add a new course to your LMS</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Manage Users</h3>
                    <p className="text-sm text-gray-600">View and manage user accounts</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">View Reports</h3>
                    <p className="text-sm text-gray-600">Generate detailed analytics</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
