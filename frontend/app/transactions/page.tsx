"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Search, ArrowUpRight, ArrowDownRight, Download } from "lucide-react"
import { useState } from "react"

const transactions = [
  {
    id: "TXN001",
    type: "BUY",
    symbol: "AAPL",
    name: "Apple Inc.",
    shares: 50,
    price: 185.5,
    total: 9275.0,
    fees: 4.95,
    date: "2024-01-15",
    time: "09:30:00",
  },
  {
    id: "TXN002",
    type: "SELL",
    symbol: "META",
    name: "Meta Platforms Inc.",
    shares: 25,
    price: 352.8,
    total: 8820.0,
    fees: 4.95,
    date: "2024-01-14",
    time: "14:25:00",
  },
  {
    id: "TXN003",
    type: "DIVIDEND",
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    shares: 30,
    price: 485.2,
    total: 14556.0,
    fees: 4.95,
    date: "2024-01-12",
    time: "10:15:00",
  },
  {
    id: "TXN004",
    type: "SELL",
    symbol: "TSLA",
    name: "Tesla Inc.",
    shares: 15,
    price: 195.75,
    total: 2936.25,
    fees: 4.95,
    date: "2024-01-10",
    time: "11:45:00",
  },
  {
    id: "TXN005",
    type: "BUY",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    shares: 40,
    price: 250.3,
    total: 10012.0,
    fees: 4.95,
    date: "2024-01-08",
    time: "13:20:00",
  },
  {
    id: "TXN006",
    type: "BONUS",
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    shares: 25,
    price: 142.8,
    total: 3570.0,
    fees: 4.95,
    date: "2024-01-05",
    time: "15:30:00",
  },
  {
    id: "TXN007",
    type: "SELL",
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    shares: 20,
    price: 148.2,
    total: 2964.0,
    fees: 4.95,
    date: "2024-01-03",
    time: "12:10:00",
  },
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isExporting, setIsExporting] = useState(false)
  const [dateRange, setDateRange] = useState("all")
  const [customDateFrom, setCustomDateFrom] = useState<Date>()
  const [customDateTo, setCustomDateTo] = useState<Date>()
  const [profitLossFilter, setProfitLossFilter] = useState("all")
  const [selectedTypes, setSelectedTypes] = useState({
    buy: true,
    sell: true,
    dividend: true,
    bonus: true,
  })

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || transaction.type.toLowerCase() === typeFilter

    const matchesSelectedTypes = selectedTypes[transaction.type.toLowerCase() as keyof typeof selectedTypes]

    // Date filtering
    let matchesDate = true
    const transactionDate = new Date(transaction.date)
    const now = new Date()

    if (dateRange === "7days") {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      matchesDate = transactionDate >= sevenDaysAgo
    } else if (dateRange === "30days") {
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      matchesDate = transactionDate >= thirtyDaysAgo
    } else if (dateRange === "custom" && customDateFrom && customDateTo) {
      matchesDate = transactionDate >= customDateFrom && transactionDate <= customDateTo
    }

    // Profit/Loss filtering (simplified - assuming SELL transactions are gains if price > average)
    let matchesProfitLoss = true
    if (profitLossFilter === "gains") {
      matchesProfitLoss = transaction.type === "SELL" || transaction.type === "DIVIDEND" || transaction.type === "BONUS"
    } else if (profitLossFilter === "losses") {
      matchesProfitLoss = transaction.type === "BUY" // Simplified logic
    }

    return matchesSearch && matchesType && matchesSelectedTypes && matchesDate && matchesProfitLoss
  })

  const totalBuys = transactions.filter((t) => t.type === "BUY").reduce((sum, t) => sum + t.total, 0)
  const totalSells = transactions.filter((t) => t.type === "SELL").reduce((sum, t) => sum + t.total, 0)
  const totalFees = transactions.reduce((sum, t) => sum + t.fees, 0)

  const handleExport = async () => {
    setIsExporting(true)

    try {
      // Create CSV content
      const headers = ["Date", "Time", "Type", "Symbol", "Name", "Shares", "Price", "Total", "Fees"]
      const csvContent = [
        headers.join(","),
        ...filteredTransactions.map((transaction) =>
          [
            transaction.date,
            transaction.time,
            transaction.type,
            transaction.symbol,
            `"${transaction.name}"`,
            transaction.shares,
            transaction.price,
            transaction.total,
            transaction.fees,
          ].join(","),
        ),
      ].join("\n")

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const link = document.createElement("a")
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", `transactions_${new Date().toISOString().split("T")[0]}.csv`)
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Export Successful!",
        description: "Your transaction data has been downloaded as CSV file.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const clearFilters = () => {
    setSelectedTypes({ buy: true, sell: true, dividend: true, bonus: true })
    setDateRange("all")
    setProfitLossFilter("all")
    setCustomDateFrom(undefined)
    setCustomDateTo(undefined)
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-in fade-in-0 duration-500">
        {/* Header */}
        <div className="flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
            <p className="text-muted-foreground">View and manage your trading history</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={handleExport}
              disabled={isExporting}
              className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-950 transition-all hover:scale-105"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Transaction Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              title: "Total Transactions",
              value: transactions.length,
              description: "All time",
              delay: "0ms",
            },
            {
              title: "Total Purchases",
              value: `$${totalBuys.toLocaleString()}`,
              description: `${transactions.filter((t) => t.type === "BUY").length} transactions`,
              icon: ArrowUpRight,
              color: "text-blue-600",
              delay: "100ms",
            },
            {
              title: "Total Sales",
              value: `$${totalSells.toLocaleString()}`,
              description: `${transactions.filter((t) => t.type === "SELL").length} transactions`,
              icon: ArrowDownRight,
              color: "text-cyan-600",
              delay: "200ms",
            },
            {
              title: "Total Fees",
              value: `$${totalFees.toFixed(2)}`,
              description: "Trading costs",
              delay: "300ms",
            },
          ].map((item, index) => (
            <Card
              key={item.title}
              className="animate-in slide-in-from-bottom-4 duration-500 hover:shadow-lg transition-all hover:scale-105"
              style={{ animationDelay: item.delay }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${item.color || ""}`}>{item.value}</div>
                <div className={`flex items-center text-sm ${item.color || "text-muted-foreground"}`}>
                  {item.icon && <item.icon className="mr-1 h-3 w-3" />}
                  <span>{item.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Transactions Table */}
        <Card className="animate-in slide-in-from-bottom-4 duration-500 delay-400 hover:shadow-lg transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Complete record of your trading activity</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64 transition-all focus:scale-105"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32 transition-all hover:scale-105">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                    <SelectItem value="dividend">Dividend</SelectItem>
                    <SelectItem value="bonus">Bonus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Fees</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction, index) => (
                  <TableRow
                    key={transaction.id}
                    className="animate-in slide-in-from-left-4 duration-300 hover:bg-muted/50 transition-all"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.date}</div>
                        <div className="text-sm text-muted-foreground">{transaction.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.type === "BUY" ? "default" : transaction.type === "SELL" ? "secondary" : "outline"
                        }
                        className="transition-all hover:scale-105"
                      >
                        <div className="flex items-center space-x-1">
                          {transaction.type === "BUY" ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : transaction.type === "SELL" ? (
                            <ArrowDownRight className="h-3 w-3" />
                          ) : null}
                          <span>{transaction.type}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.symbol}</div>
                        <div className="text-sm text-muted-foreground">{transaction.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.shares}</TableCell>
                    <TableCell>${transaction.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="font-medium">${transaction.total.toLocaleString()}</div>
                    </TableCell>
                    <TableCell>${transaction.fees.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
