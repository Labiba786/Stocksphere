"use client"

import type React from "react"
import { useState, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  ArrowLeft,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CalendarIcon,
  ShoppingCart,
  AlertCircle,
  CheckCircle,
  Check,
  ChevronsUpDown,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Mock stock data
const stockData = [
  { symbol: "AAPL", name: "Apple Inc.", price: 185.5, change: 2.3, volume: "45.2M", marketCap: "2.89T" },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 250.3, change: 1.8, volume: "38.7M", marketCap: "1.85T" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 142.8, change: -1.2, volume: "28.9M", marketCap: "1.78T" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 148.2, change: 0.9, volume: "42.1M", marketCap: "1.54T" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 195.75, change: -2.1, volume: "52.3M", marketCap: "623B" },
  { symbol: "META", name: "Meta Platforms Inc.", price: 352.8, change: 3.4, volume: "15.2M", marketCap: "895B" },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 485.2, change: 4.7, volume: "67.8M", marketCap: "1.19T" },
  { symbol: "NFLX", name: "Netflix Inc.", price: 485.2, change: -1.8, volume: "8.7M", marketCap: "215B" },
  { symbol: "AMD", name: "Advanced Micro Devices", price: 125.4, change: 1.5, volume: "32.1M", marketCap: "203B" },
  { symbol: "INTC", name: "Intel Corporation", price: 45.8, change: -0.8, volume: "28.5M", marketCap: "187B" },
  { symbol: "CRM", name: "Salesforce Inc.", price: 285.6, change: 1.2, volume: "12.3M", marketCap: "278B" },
  { symbol: "ORCL", name: "Oracle Corporation", price: 118.9, change: 0.7, volume: "18.4M", marketCap: "325B" },
]

export default function BuyStockPage() {
  const router = useRouter()
  const [selectedStock, setSelectedStock] = useState<(typeof stockData)[0] | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [quantity, setQuantity] = useState<number>(0)
  const [customPrice, setCustomPrice] = useState<number>(0)
  const [useMarketPrice, setUseMarketPrice] = useState(true)
  const [purchaseDate, setPurchaseDate] = useState<Date>(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Memoized filtered stocks for better performance
  const filteredStocks = useMemo(() => {
    if (!searchValue.trim()) return stockData
    const searchTerm = searchValue.toLowerCase().trim()
    return stockData.filter(
      (stock) => stock.symbol.toLowerCase().includes(searchTerm) || stock.name.toLowerCase().includes(searchTerm),
    )
  }, [searchValue])

  const currentPrice = useMarketPrice ? selectedStock?.price || 0 : customPrice
  const totalCost = quantity * currentPrice
  const estimatedFees = totalCost * 0.001 // 0.1% fee
  const totalWithFees = totalCost + estimatedFees

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {}

    if (!selectedStock) {
      newErrors.stock = "Please select a stock"
    }

    if (!quantity || quantity <= 0) {
      newErrors.quantity = "Quantity must be greater than 0"
    }

    if (!useMarketPrice && (!customPrice || customPrice <= 0)) {
      newErrors.price = "Price must be greater than 0"
    }

    if (!purchaseDate) {
      newErrors.date = "Please select a purchase date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [selectedStock, quantity, useMarketPrice, customPrice, purchaseDate])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!validateForm()) {
        return
      }

      setIsSubmitting(true)

      try {
        // Simulate API call to create transaction
        const transactionData = {
          symbol: selectedStock?.symbol,
          name: selectedStock?.name,
          type: "BUY",
          quantity,
          price: currentPrice,
          totalCost: totalWithFees,
          fees: estimatedFees,
          purchaseDate: purchaseDate.toISOString(),
        }

        // Mock API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Simulate success
        toast({
          title: "Transaction Successful!",
          description: `Successfully purchased ${quantity} shares of ${selectedStock?.symbol}`,
          duration: 5000,
        })

        // Redirect to portfolio
        router.push("/portfolio")
      } catch (error) {
        toast({
          title: "Transaction Failed",
          description: "There was an error processing your transaction. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    },
    [validateForm, selectedStock, quantity, currentPrice, totalWithFees, estimatedFees, purchaseDate, router],
  )

  const handleStockSelect = useCallback(
    (stock: (typeof stockData)[0]) => {
      setSelectedStock(stock)
      setCustomPrice(stock.price)
      setSearchOpen(false)
      setSearchValue("")
      if (errors.stock) {
        setErrors((prev) => ({ ...prev, stock: "" }))
      }
    },
    [errors.stock],
  )

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/portfolio">
            <Button variant="outline" size="icon" className="transition-all hover:scale-105">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Buy Stock</h1>
            <p className="text-muted-foreground">Add a new stock to your portfolio</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Select Stock</span>
                </CardTitle>
                <CardDescription>Search and select the stock you want to purchase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Stock Symbol</Label>
                  <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={searchOpen}
                        className={`w-full justify-between transition-all hover:scale-105 ${errors.stock ? "border-red-500" : ""}`}
                      >
                        {selectedStock ? (
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{selectedStock.symbol}</span>
                            <span className="text-muted-foreground">- {selectedStock.name}</span>
                          </div>
                        ) : (
                          "Select stock..."
                        )}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[500px] p-0" align="start">
                      <Command shouldFilter={false}>
                        <CommandInput
                          placeholder="Search stocks..."
                          value={searchValue}
                          onValueChange={setSearchValue}
                        />
                        <CommandList>
                          <CommandEmpty>No stocks found.</CommandEmpty>
                          <CommandGroup>
                            {filteredStocks.map((stock) => (
                              <CommandItem
                                key={stock.symbol}
                                value={stock.symbol}
                                onSelect={() => handleStockSelect(stock)}
                                className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted transition-all"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-300">
                                      {stock.symbol.slice(0, 2)}
                                    </span>
                                  </div>
                                  <div>
                                    <p className="font-medium">{stock.symbol}</p>
                                    <p className="text-sm text-muted-foreground">{stock.name}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">${stock.price.toFixed(2)}</p>
                                  <Badge variant={stock.change > 0 ? "default" : "destructive"} className="text-xs">
                                    {stock.change > 0 ? "+" : ""}
                                    {stock.change}%
                                  </Badge>
                                </div>
                                {selectedStock?.symbol === stock.symbol && <Check className="h-4 w-4 text-blue-600" />}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
                </div>

                {selectedStock && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current Price:</span>
                        <p className="font-medium">${selectedStock.price.toFixed(2)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Market Cap:</span>
                        <p className="font-medium">{selectedStock.marketCap}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Volume:</span>
                        <p className="font-medium">{selectedStock.volume}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Change:</span>
                        <p className={`font-medium ${selectedStock.change > 0 ? "text-green-600" : "text-red-600"}`}>
                          {selectedStock.change > 0 ? "+" : ""}
                          {selectedStock.change}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Order Details</span>
                </CardTitle>
                <CardDescription>Enter the quantity and price for your purchase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      step="1"
                      value={quantity || ""}
                      onChange={(e) => {
                        setQuantity(Number(e.target.value))
                        if (errors.quantity) {
                          setErrors((prev) => ({ ...prev, quantity: "" }))
                        }
                      }}
                      placeholder="Number of shares"
                      className={`transition-all hover:scale-105 ${errors.quantity ? "border-red-500" : ""}`}
                    />
                    {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Price per Share</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="market-price"
                          checked={useMarketPrice}
                          onChange={() => setUseMarketPrice(true)}
                          className="transition-all"
                        />
                        <Label htmlFor="market-price">
                          Market Price (${selectedStock?.price.toFixed(2) || "0.00"})
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="custom-price"
                          checked={!useMarketPrice}
                          onChange={() => setUseMarketPrice(false)}
                          className="transition-all"
                        />
                        <Label htmlFor="custom-price">Custom Price</Label>
                      </div>
                      {!useMarketPrice && (
                        <Input
                          type="number"
                          min="0.01"
                          step="0.01"
                          value={customPrice || ""}
                          onChange={(e) => {
                            setCustomPrice(Number(e.target.value))
                            if (errors.price) {
                              setErrors((prev) => ({ ...prev, price: "" }))
                            }
                          }}
                          placeholder="Enter custom price"
                          className={`transition-all hover:scale-105 ${errors.price ? "border-red-500" : ""}`}
                        />
                      )}
                      {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Purchase Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal transition-all hover:scale-105",
                          !purchaseDate && "text-muted-foreground",
                          errors.date && "border-red-500",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {purchaseDate ? format(purchaseDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={purchaseDate}
                        onSelect={(date) => {
                          if (date) {
                            setPurchaseDate(date)
                            if (errors.date) {
                              setErrors((prev) => ({ ...prev, date: "" }))
                            }
                          }
                        }}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedStock && quantity > 0 && currentPrice > 0 ? (
                  <div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Stock:</span>
                        <span className="font-medium">{selectedStock.symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quantity:</span>
                        <span className="font-medium">{quantity} shares</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price per share:</span>
                        <span className="font-medium">${currentPrice.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span className="font-medium">${totalCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Estimated fees:</span>
                        <span className="font-medium">${estimatedFees.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-blue-600">${totalWithFees.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="space-y-3 mt-6">
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all hover:scale-105"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Confirm Purchase
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => router.push("/portfolio")}
                        className="w-full transition-all hover:scale-105"
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Select a stock and enter quantity to see order summary</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedStock && (
              <Card className="hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-sm">Market Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    {selectedStock.change > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={selectedStock.change > 0 ? "text-green-600" : "text-red-600"}>
                      {selectedStock.change > 0 ? "+" : ""}
                      {selectedStock.change}% today
                    </span>
                  </div>
                  <p className="text-muted-foreground">Market data is delayed by 15 minutes</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
