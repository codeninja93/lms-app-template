"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const courses = [
  {
    id: "1",
    name: "React Fundamentals",
    category: "Web Development",
    enrolled: 245,
    status: "Active",
    instructor: "John Doe",
    created: "2024-01-15",
  },
  {
    id: "2",
    name: "Advanced JavaScript",
    category: "Web Development",
    enrolled: 198,
    status: "Active",
    instructor: "Jane Smith",
    created: "2024-01-10",
  },
  {
    id: "3",
    name: "Python Basics",
    category: "Programming",
    enrolled: 312,
    status: "Active",
    instructor: "Mike Johnson",
    created: "2024-01-20",
  },
  {
    id: "4",
    name: "UI/UX Design",
    category: "Design",
    enrolled: 156,
    status: "Draft",
    instructor: "Sarah Wilson",
    created: "2024-01-25",
  },
];

export default function AdminCourses() {
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
    return status === "Active" 
      ? "bg-green-100 text-green-800" 
      : "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        userType="admin" 
        isLoggedIn={true} 
        onLogout={handleLogout}
        userEmail={userEmail}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
            <p className="text-gray-600 mt-2">Manage all courses in your LMS</p>
            <p className="text-sm text-gray-500">Signed in as: {userEmail}</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create New Course
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Enrolled</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell className="text-center">{course.enrolled}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(course.status)}>
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{course.created}</TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                        Delete
                      </Button>
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

