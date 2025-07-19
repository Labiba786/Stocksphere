"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CurrencyToggle } from "@/components/ui/currency-toggle"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Wallet,
  BarChart,
} from "lucide-react"
import { useState, useEffect } from "react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart as RechartsPie,
  BarChart as RechartsBar,
  Bar,
  Cell,
  Area,
  AreaChart,
  Pie,
  Tooltip,
} from "recharts"

const portfolioData = {
  totalValue: { USD: 125420.5, INR: 10435000, EUR: 115230, GBP: 98750 },
  dayChange: { USD: 2340.25, INR: 195000, EUR: 2150, GBP: 1850 },
  dayChangePercent: 1.9,
  totalGainLoss: { USD: 15420.5, INR: 1285000, EUR: 14200, GBP: 12100 },
  totalGainLossPercent: 14.0,
}

const portfolioHistory = [
  { date: "Jan", value: 95000, volume: 1200000 },
  { date: "Feb", value: 98000, volume: 1350000 },
  { date: "Mar", value: 102000, volume: 1100000 },
  { date: "Apr", value: 105000, volume: 1450000 },
  { date: "May", value: 108000, volume: 1300000 },
  { date: "Jun", value: 112000, volume: 1600000 },
  { date: "Jul", value: 115000, volume: 1250000 },
  { date: "Aug", value: 118000, volume: 1400000 },
  { date: "Sep", value: 121000, volume: 1550000 },
  { date: "Oct", value: 123000, volume: 1350000 },
  { date: "Nov", value: 125420, volume: 1700000 },
]

const assetAllocation = [
  { name: "Stocks", value: 65, amount: 81523, color: "#1e40af", growth: 12.5 },
  { name: "Crypto", value: 20, amount: 25084, color: "#3b82f6", growth: 25.3 },
  { name: "ETFs", value: 10, amount: 12542, color: "#60a5fa", growth: 8.7 },
  { name: "Bonds", value: 5, amount: 6271, color: "#93c5fd", growth: 4.2 },
]

const topPerformers = [
  { symbol: "AAPL", name: "Apple Inc.", change: 12.3, value: 25420, volume: "45.2M", gainLoss: 2840, color: "#1e40af" },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    change: 8.7,
    value: 18750,
    volume: "52.1M",
    gainLoss: 1650,
    color: "#3b82f6",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    change: 6.2,
    value: 15230,
    volume: "38.7M",
    gainLoss: 890,
    color: "#60a5fa",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    change: -2.1,
    value: 12890,
    volume: "28.9M",
    gainLoss: -270,
    color: "#93c5fd",
  },
  { symbol: "TSLA", name: "Tesla Inc.", change: 15.4, value: 22100, volume: "67.8M", gainLoss: 2950, color: "#2563eb" },
  {
    symbol: "META",
    name: "Meta Platforms",
    change: -1.8,
    value: 14200,
    volume: "31.2M",
    gainLoss: -260,
    color: "#1d4ed8",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    change: 4.5,
    value: 16800,
    volume: "42.1M",
    gainLoss: 720,
    color: "#2563eb",
  },
  {
    symbol: "NFLX",
    name: "Netflix Inc.",
    change: -0.8,
    value: 11200,
    volume: "18.5M",
    gainLoss: -90,
    color: "#3b82f6",
  },
]

const recentTransactions = [
  { type: "BUY", symbol: "NVDA", shares: 50, price: 485.2, date: "2024-01-15", time: "09:30" },
  { type: "SELL", symbol: "META", shares: 25, price: 352.8, date: "2024-01-14", time: "14:25" },
  { type: "BUY", symbol: "AAPL", shares: 100, price: 185.5, date: "2024-01-12", time: "10:15" },
]

const chartConfig = {
  value: {
    label: "Portfolio Value",
    color: "hsl(var(--primary))",
  },
  volume: {
    label: "Volume",
    color: "hsl(var(--muted))",
  },
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function DashboardPage() {
  const [currency, setCurrency] = useState("USD")
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [animatedData, setAnimatedData] = useState(portfolioHistory.slice(0, 1))

  useEffect(() => {
    setMounted(true)
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      // Animate chart data
      let index = 0
      const interval = setInterval(() => {
        index++
        if (index < portfolioHistory.length) {
          setAnimatedData(portfolioHistory.slice(0, index + 1))
        } else {
          clearInterval(interval)
        }
      }, 200)
      return () => clearInterval(interval)
    }
  }, [loading])

  if (!mounted) {
    return null
  }

  const getCurrencySymbol = (curr: string) => {
    const symbols: Record<string, string> = { USD: "$", INR: "₹", EUR: "€", GBP: "£" }
    return symbols[curr] || "$"
  }

  const formatCurrency = (amount: number, curr: string) => {
    return `${getCurrencySymbol(curr)}${amount.toLocaleString()}`
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <LoadingSpinner size="lg" />
            <p className="text-muted-foreground">Loading your portfolio...</p>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your portfolio overview.</p>
          </div>
          <div className="flex items-center space-x-3">
            <CurrencyToggle value={currency} onValueChange={setCurrency} />
          </div>
        </div>

        {/* Portfolio Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-hover border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(portfolioData.totalValue[currency as keyof typeof portfolioData.totalValue], currency)}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />+{portfolioData.dayChangePercent}% from yesterday
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Change</CardTitle>
              <Activity className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                +{formatCurrency(portfolioData.dayChange[currency as keyof typeof portfolioData.dayChange], currency)}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />+{portfolioData.dayChangePercent}%
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
              <TrendingUp className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                +
                {formatCurrency(
                  portfolioData.totalGainLoss[currency as keyof typeof portfolioData.totalGainLoss],
                  currency,
                )}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />+{portfolioData.totalGainLossPercent}%
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Diversity</CardTitle>
              <PieChart className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Holdings across 4 categories</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Enhanced Portfolio Value Chart */}
          <Card className="lg:col-span-2 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <span>Portfolio Performance</span>
              </CardTitle>
              <CardDescription>Your portfolio value and trading volume over the last 11 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[350px] pr-4">
                <AreaChart data={animatedData}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted opacity-30" />
                  <XAxis
                    dataKey="date"
                    className="text-muted-foreground"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="value"
                    className="text-muted-foreground"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${getCurrencySymbol(currency)}${(value / 1000).toFixed(0)}k`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="volume"
                    orientation="right"
                    className="text-muted-foreground"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value: any, name: any) => [
                      name === "value" ? formatCurrency(value, currency) : `${(value / 1000000).toFixed(1)}M`,
                      name === "value" ? "Portfolio Value" : "Trading Volume",
                    ]}
                  />
                  <Area
                    yAxisId="volume"
                    type="monotone"
                    dataKey="volume"
                    stroke="#06b6d4"
                    strokeWidth={1}
                    fill="url(#volumeGradient)"
                    fillOpacity={0.3}
                  />
                  <Area
                    yAxisId="value"
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#portfolioGradient)"
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: "#ffffff" }}
                  />
                </AreaChart>
              </ChartContainer>
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Portfolio Insights</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">11-Month Growth</p>
                    <p className="font-medium text-green-600">+31.9% ({formatCurrency(30420, currency)})</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Average Monthly Return</p>
                    <p className="font-medium">+2.9%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Best Month</p>
                    <p className="font-medium">November (+2.0%)</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Trading Volume Peak</p>
                    <p className="font-medium">1.7M (November)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Asset Allocation Pie Chart */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-purple-500" />
                <span>Asset Allocation</span>
              </CardTitle>
              <CardDescription>Distribution by asset type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[280px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={assetAllocation}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {assetAllocation.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          style={{
                            filter: `drop-shadow(2px 4px 6px rgba(0,0,0,0.2))`,
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: any, name: any) => [`${value}%`, name]} labelFormatter={() => ""} />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {assetAllocation.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <div className="text-xs text-muted-foreground">{item.value}% allocation</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatCurrency(item.amount, currency)}</div>
                      <div className={`text-xs ${item.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                        +{item.growth}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Enhanced Top Performers */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-500" />
                <span>Top Performers</span>
              </CardTitle>
              <CardDescription>Best performing assets with trading volume</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPerformers.slice(0, 4).map((performer, index) => (
                <div
                  key={performer.symbol}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                        {performer.symbol.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{performer.symbol}</p>
                      <p className="text-sm text-muted-foreground">{performer.name}</p>
                      <p className="text-xs text-muted-foreground">Vol: {performer.volume}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(performer.value, currency)}</p>
                    <Badge variant={performer.change > 0 ? "default" : "destructive"} className="text-xs">
                      {performer.change > 0 ? "+" : ""}
                      {performer.change}%
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Enhanced Recent Transactions */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-orange-500" />
                <span>Recent Transactions</span>
              </CardTitle>
              <CardDescription>Your latest trading activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransactions.map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-all duration-300 animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        transaction.type === "BUY" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                      }`}
                    >
                      {transaction.type === "BUY" ? (
                        <ArrowUpRight className="h-5 w-5 text-green-600 dark:text-green-300" />
                      ) : (
                        <ArrowDownRight className="h-5 w-5 text-red-600 dark:text-red-300" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {transaction.type} {transaction.symbol}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.shares} shares @ {formatCurrency(transaction.price, currency)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(transaction.shares * transaction.price, currency)}</p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.date} {transaction.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Asset Performance Bar Chart */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="h-5 w-5 text-indigo-500" />
              <span>Asset-wise Gains/Losses</span>
            </CardTitle>
            <CardDescription>Individual asset performance with different color indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <RechartsBar data={topPerformers}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted opacity-30" />
                <XAxis
                  dataKey="symbol"
                  className="text-muted-foreground"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  className="text-muted-foreground"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${getCurrencySymbol(currency)}${value}`}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value: any, name: any, props: any) => [formatCurrency(value, currency), "Gain/Loss"]}
                  labelFormatter={(label) => `Asset: ${label}`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="gainLoss"
                  radius={[6, 6, 0, 0]}
                  className="hover:opacity-80 transition-opacity"
                  style={{
                    filter: "drop-shadow(3px 5px 5px rgba(0, 0, 0, 0.2))",
                  }}
                >
                  {topPerformers.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      style={{
                        transform: "translateY(2px)",
                        transition: "transform 0.3s ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        //@ts-ignore
                        e.target.style.transform = "translateY(-2px)"
                      }}
                      onMouseLeave={(e) => {
                        //@ts-ignore
                        e.target.style.transform = "translateY(2px)"
                      }}
                    />
                  ))}
                </Bar>
              </RechartsBar>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <h4 className="font-semibold text-sm text-green-700 dark:text-green-300 mb-2">Total Gains</h4>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(8200, currency)}</p>
                <p className="text-sm text-green-600">From 5 profitable assets</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <h4 className="font-semibold text-sm text-red-700 dark:text-red-300 mb-2">Total Losses</h4>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(620, currency)}</p>
                <p className="text-sm text-red-600">From 3 underperforming assets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
