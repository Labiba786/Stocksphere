"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, CheckCircle, Star, ArrowRight } from "lucide-react"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/dashboard")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-blue-950 dark:via-cyan-950 dark:to-blue-900 flex items-center justify-center p-4">
      <Card
        className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-blue-200 dark:border-blue-800 text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-fade-in-up opacity-0"
        style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
      >
        <CardHeader className="space-y-4">
          <div
            className="flex justify-center animate-fade-in-up opacity-0"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>

          <div
            className="flex items-center justify-center space-x-2 animate-fade-in-up opacity-0 hover:scale-110 transition-all duration-300"
            style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Stocksphere
            </span>
          </div>

          <CardTitle
            className="text-2xl font-bold text-gray-900 dark:text-white animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-300"
            style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
          >
            Payment Successful!
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div
              className="bg-green-50 dark:bg-green-950 p-4 rounded-lg animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-300"
              style={{ animationDelay: "900ms", animationFillMode: "forwards" }}
            >
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-green-800 dark:text-green-200">Welcome to Stocksphere Pro!</span>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your subscription is now active and you have access to all Pro features.
              </p>
            </div>

            <div
              className="space-y-2 text-sm text-gray-600 dark:text-gray-400 animate-fade-in-up opacity-0"
              style={{ animationDelay: "1100ms", animationFillMode: "forwards" }}
            >
              <p className="hover:scale-105 transition-all duration-300">✅ Real-time market data activated</p>
              <p className="hover:scale-105 transition-all duration-300">✅ Advanced analytics unlocked</p>
              <p className="hover:scale-105 transition-all duration-300">✅ Unlimited stock tracking enabled</p>
              <p className="hover:scale-105 transition-all duration-300">✅ Priority support access granted</p>
            </div>

            <div
              className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-300"
              style={{ animationDelay: "1300ms", animationFillMode: "forwards" }}
            >
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Receipt:</strong> A confirmation email has been sent to your registered email address.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hover:scale-110 transition-all duration-300 animate-fade-in-up opacity-0"
              style={{ animationDelay: "1500ms", animationFillMode: "forwards" }}
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p
              className="text-xs text-gray-500 dark:text-gray-400 animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-300"
              style={{ animationDelay: "1700ms", animationFillMode: "forwards" }}
            >
              Redirecting automatically in {countdown} seconds...
            </p>
          </div>
        </CardContent>
      </Card>

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
