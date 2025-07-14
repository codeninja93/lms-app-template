"use client";

import React from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const userCourses = [
  {
    name: "React Fundamentals",
    progress: 75,
    enrolledDate: "2024-01-01",
    instructor: "John Doe",
  },
  {
    name: "Advanced JavaScript",
    progress: 45,
    enrolledDate: "2024-02-15",
    instructor: "Jane Smith",
  },
  {
    name: "Python Basics",
    progress: 20,
    enrolledDate: "2024-03-03",
    instructor: "Mike Johnson",
  },
];

export default function UserCourses() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation userType="user" isLoggedIn={true} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-2">Track your courses and progress</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Course List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Enrolled Date</TableHead>
                  <TableHead>Instructor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userCourses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell>{course.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Progress value={course.progress} className="h-2 flex-1 mr-3" />
                        <span className="text-sm text-gray-600">{course.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(course.enrolledDate).toLocaleDateString()}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

