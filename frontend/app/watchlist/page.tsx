"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Plus, Search, MoreHorizontal, TrendingUp, TrendingDown, ShoppingCart, Trash2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const initialWatchlistItems = [
  {
    id: "1",
    symbol: "META",
    name: "Meta Platforms Inc.",
    currentPrice: 352.8,
    dayChange: 8.45,
    dayChangePercent: 2.45,
    volume: "15.2M",
    marketCap: "895.2B",
    pe: 24.8,
    targetPrice: 380.0,
  },
  {
    id: "2",
    symbol: "NFLX",
    name: "Netflix Inc.",
    currentPrice: 485.2,
    dayChange: -12.3,
    dayChangePercent: -2.47,
    volume: "8.7M",
    marketCap: "215.8B",
    pe: 28.5,
    targetPrice: 520.0,
  },
  {
    id: "3",
    symbol: "AMD",
    name: "Advanced Micro Devices",
    currentPrice: 142.75,
    dayChange: 3.25,
    dayChangePercent: 2.33,
    volume: "42.1M",
    marketCap: "230.4B",
    pe: 45.2,
    targetPrice: 165.0,
  },
  {
    id: "4",
    symbol: "PYPL",
    name: "PayPal Holdings Inc.",
    currentPrice: 58.9,
    dayChange: -1.85,
    dayChangePercent: -3.05,
    volume: "18.9M",
    marketCap: "67.2B",
    pe: 18.7,
    targetPrice: 75.0,
  },
  {
    id: "5",
    symbol: "SHOP",
    name: "Shopify Inc.",
    currentPrice: 72.45,
    dayChange: 2.15,
    dayChangePercent: 3.06,
    volume: "12.3M",
    marketCap: "91.5B",
    pe: 85.3,
    targetPrice: 85.0,
  },
  {
    id: "6",
    symbol: "SQ",
    name: "Block Inc.",
    currentPrice: 68.2,
    dayChange: -0.95,
    dayChangePercent: -1.37,
    volume: "9.8M",
    marketCap: "39.7B",
    pe: -12.4,
    targetPrice: 80.0,
  },
]

export default function WatchlistPage() {
  const router = useRouter()
  const [watchlistItems, setWatchlistItems] = useState(initialWatchlistItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newStock, setNewStock] = useState({
    symbol: "",
    targetPrice: "",
  })

  const filteredItems = watchlistItems.filter(
    (item) =>
      item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddStock = () => {
    if (!newStock.symbol || !newStock.targetPrice) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Simulate adding a new stock
    const newWatchlistItem = {
      id: Date.now().toString(),
      symbol: newStock.symbol.toUpperCase(),
      name: `${newStock.symbol.toUpperCase()} Company`,
      currentPrice: Math.random() * 200 + 50,
      dayChange: (Math.random() - 0.5) * 10,
      dayChangePercent: (Math.random() - 0.5) * 5,
      volume: `${(Math.random() * 50 + 5).toFixed(1)}M`,
      marketCap: `${(Math.random() * 500 + 100).toFixed(1)}B`,
      pe: Math.random() * 50 + 10,
      targetPrice: Number.parseFloat(newStock.targetPrice),
    }

    setWatchlistItems([...watchlistItems, newWatchlistItem])

    toast({
      title: "Stock Added!",
      description: `${newStock.symbol.toUpperCase()} has been added to your watchlist.`,
    })

    setNewStock({ symbol: "", targetPrice: "" })
    setIsAddDialogOpen(false)
  }

  const handleBuyStock = (symbol: string) => {
    router.push(`/buy-stock?symbol=${symbol}`)
  }

  const handleRemoveFromWatchlist = (id: string) => {
    const item = watchlistItems.find((item) => item.id === id)
    setWatchlistItems(watchlistItems.filter((item) => item.id !== id))

    if (item) {
      toast({
        title: "Removed from Watchlist",
        description: `${item.symbol} has been removed from your watchlist.`,
      })
    }
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-in fade-in-0 duration-500">
        {/* Header */}
        <div className="flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Watchlist</h1>
            <p className="text-muted-foreground">Track stocks you're interested in buying</p>
          </div>
          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all hover:scale-105"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Stock
          </Button>
        </div>

        {/* Watchlist Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          {[
            {
              title: "Stocks Watched",
              value: watchlistItems.length,
              description: "Active watchlist items",
              delay: "0ms",
            },
            {
              title: "Gainers Today",
              value: watchlistItems.filter((item) => item.dayChange > 0).length,
              description: "Positive momentum",
              icon: TrendingUp,
              color: "text-green-600",
              delay: "100ms",
            },
            {
              title: "Losers Today",
              value: watchlistItems.filter((item) => item.dayChange < 0).length,
              description: "Declining today",
              icon: TrendingDown,
              color: "text-red-600",
              delay: "200ms",
            },
            {
              title: "Near Target",
              value: watchlistItems.filter(
                (item) => Math.abs(item.currentPrice - item.targetPrice) / item.targetPrice < 0.05,
              ).length,
              description: "Within 5% of target",
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

        {/* Watchlist Table */}
        <Card className="animate-in slide-in-from-bottom-4 duration-500 delay-400 hover:shadow-lg transition-all">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Watchlist</CardTitle>
                <CardDescription>Stocks you're monitoring for potential investment</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search watchlist..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64 transition-all focus:scale-105"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Day Change</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Market Cap</TableHead>
                  <TableHead>P/E Ratio</TableHead>
                  <TableHead>Target Price</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className="animate-in slide-in-from-left-4 duration-300 hover:bg-muted/50 transition-all"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-300">
                            {item.symbol.slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{item.symbol}</div>
                          <div className="text-sm text-muted-foreground">{item.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${item.currentPrice.toFixed(2)}</div>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`flex items-center space-x-1 ${item.dayChange >= 0 ? "text-blue-600" : "text-red-600"}`}
                      >
                        {item.dayChange >= 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        <span>
                          {item.dayChange >= 0 ? "+" : ""}${Math.abs(item.dayChange).toFixed(2)}
                        </span>
                      </div>
                      <Badge
                        variant={item.dayChange >= 0 ? "default" : "destructive"}
                        className="text-xs transition-all hover:scale-105"
                      >
                        {item.dayChange >= 0 ? "+" : ""}
                        {item.dayChangePercent.toFixed(2)}%
                      </Badge>
                    </TableCell>
                    <TableCell>{item.volume}</TableCell>
                    <TableCell>{item.marketCap}</TableCell>
                    <TableCell>{item.pe > 0 ? item.pe.toFixed(1) : "N/A"}</TableCell>
                    <TableCell>
                      <div className="font-medium">${item.targetPrice.toFixed(2)}</div>
                      <div
                        className={`text-xs ${
                          item.currentPrice < item.targetPrice ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {(((item.targetPrice - item.currentPrice) / item.currentPrice) * 100).toFixed(1)}% upside
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="transition-all hover:scale-105">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleBuyStock(item.symbol)}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Buy Stock
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleRemoveFromWatchlist(item.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove from Watchlist
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add Stock Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Stock to Watchlist</DialogTitle>
              <DialogDescription>
                Enter the stock symbol and target price to add it to your watchlist.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="symbol" className="text-right">
                  Symbol
                </Label>
                <Input
                  id="symbol"
                  value={newStock.symbol}
                  onChange={(e) => setNewStock({ ...newStock, symbol: e.target.value.toUpperCase() })}
                  placeholder="e.g., AAPL"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="targetPrice" className="text-right">
                  Target Price
                </Label>
                <Input
                  id="targetPrice"
                  type="number"
                  value={newStock.targetPrice}
                  onChange={(e) => setNewStock({ ...newStock, targetPrice: e.target.value })}
                  placeholder="0.00"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleAddStock}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
              >
                Add to Watchlist
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}
