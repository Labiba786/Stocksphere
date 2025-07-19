"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ArrowLeft, CreditCard, Shield, Lock, Check } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [processing, setProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      router.push("/payment-success")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-blue-950 dark:via-cyan-950 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div
          className="text-center space-y-4 mb-8 animate-fade-in-up opacity-0"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <Link
            href="/subscription"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4 hover:scale-110 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Plans</span>
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
            className="text-3xl font-bold text-gray-900 dark:text-white animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            Complete Your Purchase
          </h1>
          <p
            className="text-gray-600 dark:text-gray-300 animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
            style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
          >
            Secure payment powered by industry-leading encryption
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Order Summary */}
          <Card
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-blue-200 dark:border-blue-800 hover:shadow-xl hover:scale-105 transition-all duration-500 animate-fade-in-up opacity-0"
            style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 hover:scale-105 transition-all duration-300">
                <CreditCard className="h-5 w-5" />
                <span>Order Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between hover:scale-105 transition-all duration-300">
                <div>
                  <h3 className="font-semibold">Stocksphere Pro</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly subscription</p>
                </div>
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:scale-110 transition-all duration-300">
                  Most Popular
                </Badge>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between hover:scale-105 transition-all duration-300">
                  <span>Subtotal</span>
                  <span>$29.00</span>
                </div>
                <div className="flex justify-between hover:scale-105 transition-all duration-300">
                  <span>Tax</span>
                  <span>$2.90</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg hover:scale-105 transition-all duration-300">
                  <span>Total</span>
                  <span>$31.90</span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg hover:scale-105 transition-all duration-300">
                <h4 className="font-semibold mb-2">What's included:</h4>
                <ul className="space-y-1 text-sm">
                  {[
                    "Unlimited stock tracking",
                    "Real-time market data",
                    "Advanced analytics",
                    "Price alerts",
                    "Priority support",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 hover:scale-105 transition-all duration-300">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-blue-200 dark:border-blue-800 hover:shadow-xl hover:scale-105 transition-all duration-500 animate-fade-in-up opacity-0"
            style={{ animationDelay: "900ms", animationFillMode: "forwards" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 hover:scale-105 transition-all duration-300">
                <Shield className="h-5 w-5" />
                <span>Payment Details</span>
              </CardTitle>
              <CardDescription className="hover:scale-105 transition-all duration-300">
                Your payment information is encrypted and secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-4">
                <div
                  className="space-y-2 animate-fade-in-up opacity-0"
                  style={{ animationDelay: "1100ms", animationFillMode: "forwards" }}
                >
                  <Label>Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger className="hover:scale-105 transition-all duration-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {paymentMethod === "card" && (
                  <>
                    <div
                      className="space-y-2 animate-fade-in-up opacity-0"
                      style={{ animationDelay: "1200ms", animationFillMode: "forwards" }}
                    >
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="border-blue-200 focus:border-blue-500 dark:border-blue-700 hover:scale-105 transition-all duration-300"
                        required
                      />
                    </div>

                    <div
                      className="grid grid-cols-2 gap-4 animate-fade-in-up opacity-0"
                      style={{ animationDelay: "1300ms", animationFillMode: "forwards" }}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="border-blue-200 focus:border-blue-500 dark:border-blue-700 hover:scale-105 transition-all duration-300"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="border-blue-200 focus:border-blue-500 dark:border-blue-700 hover:scale-105 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    <div
                      className="space-y-2 animate-fade-in-up opacity-0"
                      style={{ animationDelay: "1400ms", animationFillMode: "forwards" }}
                    >
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        className="border-blue-200 focus:border-blue-500 dark:border-blue-700 hover:scale-105 transition-all duration-300"
                        required
                      />
                    </div>
                  </>
                )}

                <Separator />

                <div
                  className="space-y-2 animate-fade-in-up opacity-0"
                  style={{ animationDelay: "1500ms", animationFillMode: "forwards" }}
                >
                  <Label htmlFor="email">Billing Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="border-blue-200 focus:border-blue-500 dark:border-blue-700 hover:scale-105 transition-all duration-300"
                    required
                  />
                </div>

                <div
                  className="space-y-2 animate-fade-in-up opacity-0"
                  style={{ animationDelay: "1600ms", animationFillMode: "forwards" }}
                >
                  <Label htmlFor="address">Billing Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    className="border-blue-200 focus:border-blue-500 dark:border-blue-700 hover:scale-105 transition-all duration-300"
                    required
                  />
                </div>

                <div
                  className="grid grid-cols-2 gap-4 animate-fade-in-up opacity-0"
                  style={{ animationDelay: "1700ms", animationFillMode: "forwards" }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      className="border-blue-200 focus:border-blue-500 dark:border-blue-700 hover:scale-105 transition-all duration-300"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input
                      id="zip"
                      placeholder="10001"
                      className="border-blue-200 focus:border-blue-500 dark:border-blue-700 hover:scale-105 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div
                  className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: "1800ms", animationFillMode: "forwards" }}
                >
                  <Lock className="h-4 w-4" />
                  <span>Your payment information is encrypted and secure</span>
                </div>

                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 text-lg font-semibold hover:scale-110 transition-all duration-300 animate-fade-in-up opacity-0"
                  style={{ animationDelay: "1900ms", animationFillMode: "forwards" }}
                >
                  {processing ? "Processing Payment..." : "Complete Payment - $31.90"}
                </Button>

                <p
                  className="text-xs text-gray-500 dark:text-gray-400 text-center animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: "2000ms", animationFillMode: "forwards" }}
                >
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy. You can cancel your
                  subscription at any time.
                </p>
              </form>
            </CardContent>
          </Card>
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
