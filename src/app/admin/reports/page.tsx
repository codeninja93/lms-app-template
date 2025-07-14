"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Users, BookOpen } from "lucide-react";

const userReports = [
  {
    name: "John Smith",
    coursesCompleted: 3,
    totalCourses: 5,
    completionRate: 60,
  },
  {
    name: "Sarah Johnson",
    coursesCompleted: 2,
    totalCourses: 3,
    completionRate: 67,
  },
  {
    name: "Mike Wilson",
    coursesCompleted: 1,
    totalCourses: 4,
    completionRate: 25,
  },
  {
    name: "Emily Davis",
    coursesCompleted: 4,
    totalCourses: 4,
    completionRate: 100,
  },
];

const courseReports = [
  {
    name: "React Fundamentals",
    enrolled: 245,
    completed: 189,
    avgCompletionTime: "2.5 weeks",
    rating: 4.8,
  },
  {
    name: "Advanced JavaScript",
    enrolled: 198,
    completed: 145,
    avgCompletionTime: "3.2 weeks",
    rating: 4.6,
  },
  {
    name: "Python Basics",
    enrolled: 312,
    completed: 267,
    avgCompletionTime: "2.8 weeks",
    rating: 4.7,
  },
  {
    name: "UI/UX Design",
    enrolled: 156,
    completed: 134,
    avgCompletionTime: "4.1 weeks",
    rating: 4.9,
  },
];

export default function AdminReports() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="admin" isLoggedIn={true} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-2">Comprehensive analytics and insights</p>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">User Reports</TabsTrigger>
            <TabsTrigger value="courses">Course Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Progress Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Courses Completed</TableHead>
                      <TableHead>Total Courses</TableHead>
                      <TableHead>Completion Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userReports.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.coursesCompleted}</TableCell>
                        <TableCell>{user.totalCourses}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={user.completionRate} className="h-2 w-20" />
                            <span className="text-sm text-gray-600">{user.completionRate}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Performance Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Enrolled</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Avg. Time</TableHead>
                      <TableHead>Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courseReports.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{course.name}</TableCell>
                        <TableCell>{course.enrolled}</TableCell>
                        <TableCell>{course.completed}</TableCell>
                        <TableCell>{course.avgCompletionTime}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{course.rating} ⭐</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Monthly Enrollments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">1,234</div>
                  <p className="text-sm text-gray-600">Total enrollments this month</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Web Development</span>
                      <span className="text-sm">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="flex justify-between">
                      <span className="text-sm">Programming</span>
                      <span className="text-sm">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                    <div className="flex justify-between">
                      <span className="text-sm">Design</span>
                      <span className="text-sm">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Platform Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+23%</div>
                  <p className="text-sm text-gray-600">Growth compared to last month</p>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">New Users</span>
                      <Badge variant="outline">+156</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Course Completions</span>
                      <Badge variant="outline">+89</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Certificates Issued</span>
                      <Badge variant="outline">+201</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
