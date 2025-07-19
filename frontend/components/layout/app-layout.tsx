"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  TrendingUp,
  LayoutDashboard,
  Briefcase,
  Eye,
  ArrowUpDown,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Portfolio", href: "/portfolio", icon: Briefcase },
  { name: "Watchlist", href: "/watchlist", icon: Eye },
  { name: "Transactions", href: "/transactions", icon: ArrowUpDown },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem("authToken")
    sessionStorage.clear()

    // Redirect to login page
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Mobile sidebar */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", sidebarOpen ? "block" : "hidden")}>
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-cyan-500" />
              <span className="text-lg font-semibold">Stocksphere</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-900 dark:from-blue-900 dark:to-cyan-900 dark:text-blue-100"
                      : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-gray-900 dark:text-gray-300 dark:hover:from-blue-950 dark:hover:to-cyan-950 dark:hover:text-white",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5 transition-colors duration-200" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={cn(
          "hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col transition-all duration-300",
          sidebarCollapsed ? "lg:w-16" : "lg:w-64",
        )}
      >
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex h-16 items-center justify-between px-4">
            <div
              className={cn(
                "flex items-center space-x-2 transition-all duration-300",
                sidebarCollapsed && "justify-center",
              )}
            >
              <TrendingUp className="h-6 w-6 text-cyan-500" />
              {!sidebarCollapsed && <span className="text-lg font-semibold">Stocksphere</span>}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={cn("transition-all duration-300", sidebarCollapsed && "mx-auto")}
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-900 dark:from-blue-900 dark:to-cyan-900 dark:text-blue-100"
                      : "text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-gray-900 dark:text-gray-300 dark:hover:from-blue-950 dark:hover:to-cyan-950 dark:hover:text-white",
                    sidebarCollapsed && "justify-center",
                  )}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <item.icon className={cn("h-5 w-5 transition-colors duration-200", !sidebarCollapsed && "mr-3")} />
                  {!sidebarCollapsed && item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className={cn("transition-all duration-300", sidebarCollapsed ? "lg:pl-16" : "lg:pl-64")}>
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:gap-x-6 sm:px-6 lg:px-8 transition-colors duration-300">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="theme-toggle"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                        JD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
