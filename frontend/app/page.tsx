"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StockParticles } from "@/components/ui/stock-particles"
import { AnimatedPortfolioChart } from "@/components/ui/animated-portfolio-chart"
import {
  TrendingUp,
  Shield,
  BarChart3,
  Smartphone,
  Globe,
  Zap,
  Star,
  CheckCircle,
  ArrowRight,
  Moon,
  Sun,
  Heart,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState, memo } from "react"

const features = [
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track your investments with live market data and advanced analytics to make informed decisions.",
  },
  {
    icon: Shield,
    title: "Bank-level Security",
    description: "Your financial data is protected with enterprise-grade security and encryption.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Access your portfolio anywhere with our responsive design and mobile-first approach.",
  },
  {
    icon: Globe,
    title: "Global Markets",
    description: "Track stocks from major exchanges worldwide including NYSE, NASDAQ, and international markets.",
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description: "Get notified immediately when your stocks hit target prices or important market events occur.",
  },
  {
    icon: TrendingUp,
    title: "Smart Insights",
    description: "AI-powered recommendations and insights to help optimize your investment strategy.",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Investment Advisor",
    company: "Goldman Sachs",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "Stocksphere has revolutionized how I track and manage my clients' portfolios. The real-time analytics are incredibly accurate.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Day Trader",
    company: "Independent",
    image: "/placeholder.svg?height=40&width=40",
    content:
      "The instant alerts and mobile optimization make it perfect for active trading. I've increased my returns by 23% since using Stocksphere.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Portfolio Manager",
    company: "Vanguard",
    image: "/portfolio-manager.jpg",
    content:
      "The security features give me peace of mind, and the interface is intuitive enough for both beginners and professionals.",
    rating: 5,
  },
]

// Memoized components for better performance
const FeatureCard = memo(({ feature, index }: { feature: any; index: number }) => (
  <Card
    className="border-blue-100 dark:border-blue-800 hover:shadow-2xl hover:scale-110 transition-all duration-500 group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm opacity-0 animate-fade-in-up"
    style={{
      animationDelay: `${index * 150}ms`,
      animationFillMode: "forwards",
    }}
  >
    <CardHeader className="space-y-4">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
        <feature.icon className="h-8 w-8 text-white" />
      </div>
      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {feature.title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
    </CardContent>
  </Card>
))

const TestimonialCard = memo(({ testimonial, index }: { testimonial: any; index: number }) => (
  <Card
    className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-blue-200 dark:border-blue-800 hover:shadow-2xl hover:scale-110 transition-all duration-500 group opacity-0 animate-fade-in-up"
    style={{
      animationDelay: `${index * 200}ms`,
      animationFillMode: "forwards",
    }}
  >
    <CardContent className="p-8">
      <div className="flex items-center space-x-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-8 italic text-lg leading-relaxed">"{testimonial.content}"</p>
      <div className="flex items-center space-x-4">
        <Avatar className="h-12 w-12 ring-2 ring-blue-200 dark:ring-blue-800">
          <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold">
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white text-lg">{testimonial.name}</p>
          <p className="text-gray-600 dark:text-gray-400">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
))

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="relative z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-blue-200/50 dark:border-blue-800/50 transition-all duration-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className={`flex items-center space-x-2 transition-all duration-700 hover:scale-110 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Stocksphere
              </span>
            </div>

            <div
              className={`flex items-center space-x-4 transition-all duration-700 delay-200 hover:scale-110 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-blue-100 dark:hover:bg-blue-900 transition-all duration-300 hover:scale-110"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 min-h-[90vh] flex items-center">
        {/* Animated Background */}
        <StockParticles className="opacity-30" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Hero content */}
            <div
              className={`space-y-6 text-white transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
            >
              <div className="space-y-4">
                <div className="overflow-hidden">
                  <h1
                    className="text-4xl lg:text-6xl font-bold animate-fade-in-up hover:scale-105 transition-all duration-500"
                    style={{ animationDelay: "300ms", animationFillMode: "forwards", opacity: 0 }}
                  >
                    <span className="text-white drop-shadow-lg">Stocksphere</span>
                  </h1>
                </div>
                <div className="overflow-hidden">
                  <h2
                    className="text-xl lg:text-3xl font-semibold text-blue-100 animate-fade-in-up hover:scale-105 transition-all duration-500"
                    style={{ animationDelay: "500ms", animationFillMode: "forwards", opacity: 0 }}
                  >
                    Your Smart Portfolio Tracker
                  </h2>
                </div>
                <div className="overflow-hidden">
                  <p
                    className="text-base lg:text-lg text-blue-100 leading-relaxed animate-fade-in-up hover:scale-105 transition-all duration-500"
                    style={{ animationDelay: "700ms", animationFillMode: "forwards", opacity: 0 }}
                  >
                    Take control of your investments with real-time analytics, intelligent insights, and
                    professional-grade portfolio management tools.
                  </p>
                </div>
              </div>

              <div
                className="animate-fade-in-up"
                style={{ animationDelay: "900ms", animationFillMode: "forwards", opacity: 0 }}
              >
                <Link href="/auth">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-110 px-8 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
                  >
                    GET STARTED
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>

              <div
                className="flex flex-wrap items-center gap-4 text-sm text-blue-100 animate-fade-in-up"
                style={{ animationDelay: "1100ms", animationFillMode: "forwards", opacity: 0 }}
              >
                <div className="flex items-center space-x-2 hover:text-white hover:scale-110 transition-all duration-300">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-white hover:scale-110 transition-all duration-300">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-white hover:scale-110 transition-all duration-300">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Bank-level security</span>
                </div>
              </div>
            </div>

            {/* Right side - Animated Portfolio Chart */}
            <div
              className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
            >
              <div
                className="animate-fade-in-up max-w-md lg:max-w-lg w-full"
                style={{ animationDelay: "600ms", animationFillMode: "forwards", opacity: 0 }}
              >
                <AnimatedPortfolioChart />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-4 mb-20">
            <div className="overflow-hidden">
              <h2
                className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Why Choose Stocksphere?
              </h2>
            </div>
            <div className="overflow-hidden">
              <p
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
                style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
              >
                Powerful features designed to help you make smarter investment decisions and grow your wealth.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-blue-950 dark:via-cyan-950 dark:to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-cyan-100/50 dark:from-blue-900/50 dark:to-cyan-900/50"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-4 mb-20">
            <div className="overflow-hidden">
              <h2
                className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Trusted by Investment Professionals
              </h2>
            </div>
            <div className="overflow-hidden">
              <p
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
                style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
              >
                See what industry experts are saying about Stocksphere.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <StockParticles className="opacity-20" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <h2
                className="text-4xl lg:text-6xl font-bold text-white drop-shadow-lg animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
                style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
              >
                Ready to Transform Your Investment Strategy?
              </h2>
            </div>
            <div className="overflow-hidden">
              <p
                className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
                style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
              >
                Join thousands of investors who are already using Stocksphere to build wealth smarter.
              </p>
            </div>
            <div
              className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up opacity-0"
              style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
            >
              <Link href="/auth?returnTo=/subscription">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 hover:scale-110 px-12 py-4 text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-4 gap-8">
            <div
              className="space-y-6 animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">Stocksphere</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your intelligent portfolio tracking companion for smarter investment decisions.
              </p>
               <p className="text-gray-400 text-m flex items-center">
                Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by the Labiba Najmee
              </p>
            </div>

            <div
              className="animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              <h3 className="font-semibold mb-6 text-lg">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                    Mobile App
                  </Link>
                </li>
              </ul>
            </div>

            <div
              className="animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
              style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
            >
              <h3 className="font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div
              className="animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
              style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
            >
              <h3 className="font-semibold mb-6 text-lg">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-all duration-300 hover:scale-110 inline-block">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 animate-fade-in-up opacity-0 hover:scale-105 transition-all duration-500"
            style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}
          >
            <p>&copy; 2025 Stocksphere. All rights reserved.</p>
          </div>
        </div>
      </footer>

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
