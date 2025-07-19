"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { TrendingUp, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.agreeToTerms) {
    alert("Please agree to the Terms of Service and Privacy Policy.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        agreedToTerms: formData.agreeToTerms,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    // Save token and navigate to dashboard
    localStorage.setItem("token", data.token);
    router.push("/dashboard");

  } catch (error: any) {
    alert(error.message || "Something went wrong.");
    console.error("Register error:", error);
  }
};


  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-blue-950 dark:via-cyan-950 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div
          className="text-center space-y-4 animate-fade-in-up opacity-0"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:scale-110 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 hover:scale-110 transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Stocksphere
            </span>
          </div>
        </div>

        {/* Register Form */}
        <Card
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-blue-200 dark:border-blue-800 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-fade-in-up opacity-0"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">Start tracking your investments today</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div
                className="grid grid-cols-2 gap-4 animate-fade-in-up opacity-0"
                style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
              >
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    className="border-blue-200 focus:border-blue-500 dark:border-blue-700 hover:scale-105 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    className="border-blue-200 focus:border-blue-500 dark:border-blue-700 hover:scale-105 transition-all duration-300"
                  />
                </div>
              </div>

              <div
                className="space-y-2 animate-fade-in-up opacity-0"
                style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="border-blue-200 focus:border-blue-500 dark:border-blue-700 hover:scale-105 transition-all duration-300"
                />
              </div>

              <div
                className="space-y-2 animate-fade-in-up opacity-0"
                style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
              >
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  className="border-blue-200 focus:border-blue-500 dark:border-blue-700 hover:scale-105 transition-all duration-300"
                />
              </div>

              <div
                className="space-y-2 animate-fade-in-up opacity-0"
                style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
              >
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  required
                  className="border-blue-200 focus:border-blue-500 dark:border-blue-700 hover:scale-105 transition-all duration-300"
                />
              </div>

              <div
                className="flex items-center space-x-2 animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-300"
                style={{ animationDelay: "900ms", animationFillMode: "forwards" }}
              >
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-400 hover:scale-110 transition-all duration-300 inline-block"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-400 hover:scale-110 transition-all duration-300 inline-block"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hover:scale-110 transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}
              >
                Create Account
              </Button>

              <p
                className="text-sm text-center text-gray-600 dark:text-gray-400 animate-fade-in-up opacity-0"
                style={{ animationDelay: "1100ms", animationFillMode: "forwards" }}
              >
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:underline dark:text-blue-400 hover:scale-110 transition-all duration-300 inline-block"
                >
                  Sign in
                </Link>
              </p>
            </CardContent>
          </form>
        </Card>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
