"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CurrencyToggle } from "@/components/ui/currency-toggle"
import { AssetModal, type Asset } from "@/components/ui/asset-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Edit,
  Trash2,
  ArrowUpDown,
  Briefcase,
  ShoppingCart,
  Star,
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

const initialHoldings: Asset[] = [
  {
    id: "1",
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "stock",
    quantity: 150,
    avgBuyPrice: 165.2,
    currentPrice: 185.5,
    purchaseDate: new Date("2023-06-15"),
    totalValue: 27825,
    gainLoss: 3045,
    gainLossPercent: 12.3,
  },
  {
    id: "2",
    symbol: "BTC",
    name: "Bitcoin",
    type: "crypto",
    quantity: 0.5,
    avgBuyPrice: 45000,
    currentPrice: 52000,
    purchaseDate: new Date("2023-08-20"),
    totalValue: 26000,
    gainLoss: 3500,
    gainLossPercent: 15.6,
  },
  {
    id: "3",
    symbol: "MSFT",
    name: "Microsoft Corporation",
    type: "stock",
    quantity: 75,
    avgBuyPrice: 245.8,
    currentPrice: 250.3,
    purchaseDate: new Date("2023-07-10"),
    totalValue: 18772.5,
    gainLoss: 337.5,
    gainLossPercent: 1.8,
  },
  {
    id: "4",
    symbol: "ETH",
    name: "Ethereum",
    type: "crypto",
    quantity: 5,
    avgBuyPrice: 2800,
    currentPrice: 3200,
    purchaseDate: new Date("2023-09-05"),
    totalValue: 16000,
    gainLoss: 2000,
    gainLossPercent: 14.3,
  },
  {
    id: "5",
    symbol: "SPY",
    name: "SPDR S&P 500 ETF",
    type: "etf",
    quantity: 30,
    avgBuyPrice: 420,
    currentPrice: 445,
    purchaseDate: new Date("2023-05-12"),
    totalValue: 13350,
    gainLoss: 750,
    gainLossPercent: 5.9,
  },
]

// Mock watchlist data
const initialWatchlist = [
  {
    id: "w1",
    symbol: "TSLA",
    name: "Tesla Inc.",
    currentPrice: 195.75,
    dayChange: -2.1,
    targetPrice: 220.0,
  },
  {
    id: "w2",
    symbol: "META",
    name: "Meta Platforms Inc.",
    currentPrice: 352.8,
    dayChange: 3.4,
    targetPrice: 380.0,
  },
]

export default function PortfolioPage() {
  const router = useRouter()
  const [holdings, setHoldings] = useState<Asset[]>(initialHoldings)
  const [watchlist, setWatchlist] = useState(initialWatchlist)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("totalValue")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [currency, setCurrency] = useState("USD")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAsset, setEditingAsset] = useState<Asset | undefined>()

  const getCurrencySymbol = (curr: string) => {
    const symbols: Record<string, string> = { USD: "$", INR: "₹", EUR: "€", GBP: "£" }
    return symbols[curr] || "$"
  }

  const formatCurrency = (amount: number, curr: string) => {
    return `${getCurrencySymbol(curr)}${amount.toLocaleString()}`
  }

  const filteredAndSortedHoldings = holdings
    .filter((holding) => {
      const matchesSearch =
        holding.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        holding.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === "all" || holding.type === typeFilter
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      const aValue = a[sortBy as keyof Asset] as number
      const bValue = b[sortBy as keyof Asset] as number
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    })

  const totalValue = holdings.reduce((sum, holding) => sum + holding.totalValue, 0)
  const totalGainLoss = holdings.reduce((sum, holding) => sum + holding.gainLoss, 0)
  const totalGainLossPercent = (totalGainLoss / (totalValue - totalGainLoss)) * 100

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("desc")
    }
  }

  const handleAddAsset = (
    assetData: Omit<Asset, "id" | "currentPrice" | "totalValue" | "gainLoss" | "gainLossPercent">,
  ) => {
    // Simulate current price and calculations
    const currentPrice = assetData.avgBuyPrice * (1 + Math.random() * 0.2 - 0.1) // ±10% variation
    const totalValue = assetData.quantity * currentPrice
    const gainLoss = totalValue - assetData.quantity * assetData.avgBuyPrice
    const gainLossPercent = (gainLoss / (assetData.quantity * assetData.avgBuyPrice)) * 100

    const newAsset: Asset = {
      ...assetData,
      id: Date.now().toString(),
      currentPrice,
      totalValue,
      gainLoss,
      gainLossPercent,
    }

    setHoldings([...holdings, newAsset])

    // Add to watchlist as well (Watchlist Integration)
    const watchlistItem = {
      id: `w${Date.now()}`,
      symbol: assetData.symbol,
      name: assetData.name,
      currentPrice,
      dayChange: Math.random() * 10 - 5, // Random day change between -5% and +5%
      targetPrice: currentPrice * (1 + Math.random() * 0.2 + 0.05), // Target price 5-25% higher
    }

    setWatchlist([...watchlist, watchlistItem])

    toast({
      title: "Asset Added Successfully!",
      description: `${assetData.symbol} has been added to both your portfolio and watchlist.`,
      duration: 3000,
    })
  }

  const handleEditAsset = (
    assetData: Omit<Asset, "id" | "currentPrice" | "totalValue" | "gainLoss" | "gainLossPercent">,
  ) => {
    if (!editingAsset) return

    const currentPrice = assetData.avgBuyPrice * (1 + Math.random() * 0.2 - 0.1)
    const totalValue = assetData.quantity * currentPrice
    const gainLoss = totalValue - assetData.quantity * assetData.avgBuyPrice
    const gainLossPercent = (gainLoss / (assetData.quantity * assetData.avgBuyPrice)) * 100

    const updatedAsset: Asset = {
      ...assetData,
      id: editingAsset.id,
      currentPrice,
      totalValue,
      gainLoss,
      gainLossPercent,
    }

    setHoldings(holdings.map((h) => (h.id === editingAsset.id ? updatedAsset : h)))
    setEditingAsset(undefined)

    toast({
      title: "Asset Updated",
      description: `${assetData.symbol} has been updated successfully.`,
      duration: 3000,
    })
  }

  const handleDeleteAsset = (id: string) => {
    const asset = holdings.find((h) => h.id === id)
    setHoldings(holdings.filter((h) => h.id !== id))

    if (asset) {
      toast({
        title: "Asset Removed",
        description: `${asset.symbol} has been removed from your portfolio.`,
        duration: 3000,
      })
    }
  }

  const openEditModal = (asset: Asset) => {
    setEditingAsset(asset)
    setIsModalOpen(true)
  }

  const openAddModal = () => {
    setEditingAsset(undefined)
    setIsModalOpen(true)
  }

  const handleBuyStock = () => {
    router.push("/buy-stock")
  }

  const addToWatchlist = (asset: Asset) => {
    const watchlistItem = {
      id: `w${Date.now()}`,
      symbol: asset.symbol,
      name: asset.name,
      currentPrice: asset.currentPrice,
      dayChange: Math.random() * 10 - 5,
      targetPrice: asset.currentPrice * (1 + Math.random() * 0.2 + 0.05),
    }

    setWatchlist([...watchlist, watchlistItem])

    toast({
      title: "Added to Watchlist",
      description: `${asset.symbol} has been added to your watchlist.`,
      duration: 3000,
    })
  }

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-cyan-500" />
              <span>Portfolio</span>
            </h1>
            <p className="text-muted-foreground">Manage and track your investment holdings</p>
          </div>
          <div className="flex items-center space-x-3">
            <CurrencyToggle value={currency} onValueChange={setCurrency} />
            <Button
              onClick={handleBuyStock}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white transition-all hover:scale-105"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Buy Stock
            </Button>
            <Button
              onClick={openAddModal}
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-950"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Asset
            </Button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-hover border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalValue, currency)}</div>
              <p className="text-sm text-muted-foreground">{holdings.length} assets</p>
            </CardContent>
          </Card>

          <Card className="card-hover border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Gain/Loss</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totalGainLoss >= 0 ? "+" : ""}
                {formatCurrency(totalGainLoss, currency)}
              </div>
              <div className={`flex items-center text-sm ${totalGainLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totalGainLoss >= 0 ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                {totalGainLoss >= 0 ? "+" : ""}
                {totalGainLossPercent.toFixed(2)}%
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Watchlist Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{watchlist.length}</div>
              <p className="text-sm text-muted-foreground">Stocks being monitored</p>
            </CardContent>
          </Card>
        </div>

        {/* Holdings Table */}
        <Card className="card-hover">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Holdings</CardTitle>
                <CardDescription>Your current investment positions</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search holdings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="stock">Stocks</SelectItem>
                    <SelectItem value="crypto">Crypto</SelectItem>
                    <SelectItem value="etf">ETFs</SelectItem>
                    <SelectItem value="bond">Bonds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("quantity")}>
                    <div className="flex items-center space-x-1">
                      <span>Quantity</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("avgBuyPrice")}>
                    <div className="flex items-center space-x-1">
                      <span>Avg Buy Price</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("currentPrice")}>
                    <div className="flex items-center space-x-1">
                      <span>Current Price</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("totalValue")}>
                    <div className="flex items-center space-x-1">
                      <span>Total Value</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("gainLossPercent")}>
                    <div className="flex items-center space-x-1">
                      <span>P/L %</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedHoldings.map((holding, index) => (
                  <TableRow
                    key={holding.id}
                    className="animate-slide-in hover:bg-muted/50 transition-colors"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-300">
                            {holding.symbol.slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{holding.symbol}</div>
                          <div className="text-sm text-muted-foreground">{holding.name}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {holding.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{holding.quantity}</TableCell>
                    <TableCell>{formatCurrency(holding.avgBuyPrice, currency)}</TableCell>
                    <TableCell>{formatCurrency(holding.currentPrice, currency)}</TableCell>
                    <TableCell>{formatCurrency(holding.totalValue, currency)}</TableCell>
                    <TableCell>
                      <div className={holding.gainLoss >= 0 ? "text-green-600" : "text-red-600"}>
                        <div className="font-medium">
                          {holding.gainLoss >= 0 ? "+" : ""}
                          {formatCurrency(Math.abs(holding.gainLoss), currency)}
                        </div>
                        <div className="text-sm">
                          {holding.gainLoss >= 0 ? "+" : ""}
                          {holding.gainLossPercent.toFixed(2)}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openEditModal(holding)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Asset
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => addToWatchlist(holding)}>
                            <Star className="mr-2 h-4 w-4" />
                            Add to Watchlist
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteAsset(holding.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Asset
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

        {/* Asset Modal */}
        <AssetModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          asset={editingAsset}
          onSave={editingAsset ? handleEditAsset : handleAddAsset}
        />
      </div>
    </AppLayout>
  )
}
