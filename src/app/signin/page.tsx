"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .required();

type FormData = z.infer<typeof schema>;

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError("");
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication with two user types
      let userType = "";
      let isValidUser = false;
      
      if (data.email === "user@example.com" && data.password === "password") {
        userType = "user";
        isValidUser = true;
      } else if (data.email === "admin@example.com" && data.password === "admin123") {
        userType = "admin";
        isValidUser = true;
      }
      
      if (isValidUser) {
        // Store mock user session
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", data.email);
        localStorage.setItem("userType", userType);
        
        // Redirect based on user type
        if (userType === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError("Invalid email or password. Try the demo credentials below.");
      }
    } catch (err) {
      setError("An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex justify-center items-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-8">
            <CardTitle className="text-center text-2xl font-bold tracking-tight text-gray-900">
              Welcome back
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Sign in to your account to continue learning
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email address
                </label>
                <Input
                  id="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  type="email"
                  autoComplete="email"
                  className="h-11"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <Input
                  id="password"
                  {...register("password")}
                  placeholder="Enter your password"
                  type="password"
                  autoComplete="current-password"
                  className="h-11"
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            
            {error && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}
            
            <div className="rounded-md bg-blue-50 p-4 border border-blue-200">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Demo credentials
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <div className="mb-2">
                      <p className="font-medium">Regular User:</p>
                      <p>Email: user@example.com</p>
                      <p>Password: password</p>
                    </div>
                    <div>
                      <p className="font-medium">Admin User:</p>
                      <p>Email: admin@example.com</p>
                      <p>Password: admin123</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
              >
                Forgot your password?
              </Link>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            
            </form>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link
                href="/signup"
                className="font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
