"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z
  .object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .required();

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      setSuccess(true);
      
      // Redirect to sign in page after showing success message
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
      
    } catch (err) {
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="flex justify-center items-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-8">
            <CardTitle className="text-center text-2xl font-bold tracking-tight text-gray-900">
              Create your account
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              Join thousands of learners and start your journey today
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    First name
                  </label>
                  <Input
                    id="firstName"
                    {...register("firstName")} 
                    placeholder="John"
                    type="text"
                    autoComplete="given-name"
                    className="h-11"
                  />
                  {errors.firstName && 
                    <p className="text-sm text-red-600">{errors.firstName.message}</p>
                  }
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Last name
                  </label>
                  <Input
                    id="lastName"
                    {...register("lastName")} 
                    placeholder="Doe"
                    type="text"
                    autoComplete="family-name"
                    className="h-11"
                  />
                  {errors.lastName && 
                    <p className="text-sm text-red-600">{errors.lastName.message}</p>
                  }
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email address
                </label>
                <Input
                  id="email"
                  {...register("email")}
                  placeholder="john@example.com"
                  type="email"
                  autoComplete="email"
                  className="h-11"
                />
                {errors.email && 
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                }
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <Input
                  id="password"
                  {...register("password")}
                  placeholder="Enter a secure password"
                  type="password"
                  autoComplete="new-password"
                  className="h-11"
                />
                {errors.password && 
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                }
              </div>
            
              {success && (
                <div className="rounded-md bg-green-50 p-4 border border-green-200">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        Account created successfully!
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>Redirecting to sign in...</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            
              <div className="text-xs text-muted-foreground">
                By creating an account, you agree to our{" "}
                <a href="#" className="underline hover:text-primary">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-primary">
                  Privacy Policy
                </a>
                .
              </div>
            
              <Button
                type="submit"
                disabled={isLoading || success}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? "Creating account..." : success ? "Account created!" : "Create account"}
              </Button>
            </form>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <a
                href="/signin"
                className="font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
              >
                Sign in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

