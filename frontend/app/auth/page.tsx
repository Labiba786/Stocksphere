"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { TrendingUp, ArrowLeft, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo") || "/dashboard"

  const [isLogin, setIsLogin] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    rememberMe: false,
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (!isLogin) {
      if (!formData.firstName) newErrors.firstName = "First name is required"
      if (!formData.lastName) newErrors.lastName = "Last name is required"
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password"
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = "You must agree to the terms"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Simulate authentication
      if (returnTo === "/subscription") {
        router.push("/subscription")
      } else {
        router.push(returnTo)
      }
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-blue-950 dark:via-cyan-950 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Stocksphere
            </span>
          </div>
        </div>

        {/* Auth Form */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-blue-200 dark:border-blue-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin ? "Sign in to access your portfolio" : "Start your investment journey today"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className={`border-blue-200 focus:border-blue-500 dark:border-blue-700 ${
                        errors.firstName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className={`border-blue-200 focus:border-blue-500 dark:border-blue-700 ${
                        errors.lastName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`border-blue-200 focus:border-blue-500 dark:border-blue-700 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`border-blue-200 focus:border-blue-500 dark:border-blue-700 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={`border-blue-200 focus:border-blue-500 dark:border-blue-700 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={isLogin ? formData.rememberMe : formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      handleInputChange(isLogin ? "rememberMe" : "agreeToTerms", checked as boolean)
                    }
                  />
                  <Label htmlFor="remember" className="text-sm">
                    {isLogin ? "Remember me" : "I agree to the Terms of Service"}
                  </Label>
                </div>
                {isLogin && (
                  <Link href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                    Forgot password?
                  </Link>
                )}
              </div>

              {!isLogin && errors.agreeToTerms && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.agreeToTerms}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>

              <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  )
}
