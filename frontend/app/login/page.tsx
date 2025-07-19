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

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate authentication
    router.push("/dashboard")
  }

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

        {/* Login Form */}
        <Card
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-blue-200 dark:border-blue-800 hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-fade-in-up opacity-0"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Sign in to access your portfolio</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div
                className="space-y-2 animate-fade-in-up opacity-0"
                style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
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
                style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
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
                className="flex items-center justify-between animate-fade-in-up opacity-0"
                style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
              >
                <div className="flex items-center space-x-2 hover:scale-105 transition-all duration-300">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="#"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400 hover:scale-110 transition-all duration-300"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hover:scale-110 transition-all duration-300 animate-fade-in-up opacity-0"
                style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
              >
                Sign In
              </Button>

              <p
                className="text-sm text-center text-gray-600 dark:text-gray-400 animate-fade-in-up opacity-0"
                style={{ animationDelay: "900ms", animationFillMode: "forwards" }}
              >
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:underline dark:text-blue-400 hover:scale-110 transition-all duration-300 inline-block"
                >
                  Sign up
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
