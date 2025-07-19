"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ArrowLeft, Check, Star, Zap, Shield, BarChart3, Globe } from "lucide-react"

const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with portfolio tracking",
    features: [
      "Track up to 5 stocks",
      "Basic portfolio analytics",
      "Daily price updates",
      "Mobile app access",
      "Email support",
    ],
    limitations: ["Limited to 5 holdings", "Basic charts only", "No real-time data"],
    popular: false,
    buttonText: "Get Started Free",
    icon: BarChart3,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "Advanced features for serious investors",
    features: [
      "Unlimited stock tracking",
      "Real-time market data",
      "Advanced analytics & insights",
      "Portfolio optimization tools",
      "Price alerts & notifications",
      "Multi-currency support",
      "Export & reporting tools",
      "Priority customer support",
      "API access",
      "Dark mode & themes",
    ],
    popular: true,
    buttonText: "Proceed to Payment",
    icon: Star,
  },
]

export default function SubscriptionPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    if (planId === "free") {
      // Redirect directly to dashboard for free plan
      router.push("/dashboard")
    } else if (planId === "pro") {
      // Redirect to payment for pro plan
      router.push("/payment")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-blue-950 dark:via-cyan-950 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div
          className="text-center space-y-4 mb-12 animate-fade-in-up opacity-0"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4 hover:scale-110 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center justify-center space-x-2 mb-4 hover:scale-110 transition-all duration-300">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Stocksphere
            </span>
          </div>

          <h1
            className="text-4xl font-bold text-gray-900 dark:text-white animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            Choose Your Plan
          </h1>
          <p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
            style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
          >
            Start with our free plan or unlock advanced features with Pro. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            return (
              <Card
                key={plan.id}
                className={`relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-2 transition-all duration-500 hover:shadow-xl hover:scale-105 animate-fade-in-up opacity-0 ${
                  plan.popular
                    ? "border-blue-500 shadow-lg scale-105"
                    : "border-blue-200 dark:border-blue-800 hover:border-blue-300"
                }`}
                style={{ animationDelay: `${700 + index * 200}ms`, animationFillMode: "forwards" }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 hover:scale-110 transition-all duration-300">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                          : "bg-gradient-to-r from-gray-400 to-gray-500"
                      }`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <div>
                    <CardTitle className="text-2xl font-bold hover:scale-105 transition-all duration-300">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-2 hover:scale-105 transition-all duration-300">
                      <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">/{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2 hover:scale-105 transition-all duration-300">
                      {plan.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center space-x-3 hover:scale-105 transition-all duration-300"
                      >
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Limitations:</p>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-500 dark:text-gray-400 hover:scale-105 transition-all duration-300"
                          >
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-3 text-lg font-semibold transition-all duration-300 hover:scale-110 ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                    }`}
                    disabled={selectedPlan === plan.id}
                  >
                    {selectedPlan === plan.id ? "Processing..." : plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features Comparison */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2
            className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8 animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
            style={{ animationDelay: "1200ms", animationFillMode: "forwards" }}
          >
            Why Choose Stocksphere Pro?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Real-time Data",
                description: "Get live market data and instant price updates for all your investments.",
              },
              {
                icon: Shield,
                title: "Advanced Security",
                description: "Bank-level encryption and security measures to protect your financial data.",
              },
              {
                icon: Globe,
                title: "Global Markets",
                description: "Track investments from major exchanges worldwide with multi-currency support.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-blue-200 dark:border-blue-800 hover:shadow-xl hover:scale-110 transition-all duration-500 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${1400 + index * 150}ms`, animationFillMode: "forwards" }}
              >
                <CardHeader className="text-center">
                  <feature.icon className="h-12 w-12 text-blue-500 mx-auto mb-4 hover:scale-110 transition-all duration-300" />
                  <CardTitle className="hover:scale-105 transition-all duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 text-center hover:scale-105 transition-all duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
