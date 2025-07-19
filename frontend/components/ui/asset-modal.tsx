"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export interface Asset {
  id: string
  symbol: string
  name: string
  type: "stock" | "crypto" | "etf" | "bond"
  quantity: number
  avgBuyPrice: number
  currentPrice: number
  purchaseDate: Date
  totalValue: number
  gainLoss: number
  gainLossPercent: number
}

interface AssetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  asset?: Asset
  onSave: (asset: Omit<Asset, "id" | "currentPrice" | "totalValue" | "gainLoss" | "gainLossPercent">) => void
}

const assetTypes = [
  { value: "stock", label: "Stock" },
  { value: "crypto", label: "Cryptocurrency" },
  { value: "etf", label: "ETF" },
  { value: "bond", label: "Bond" },
]

const popularAssets = [
  { symbol: "AAPL", name: "Apple Inc.", type: "stock" },
  { symbol: "MSFT", name: "Microsoft Corporation", type: "stock" },
  { symbol: "GOOGL", name: "Alphabet Inc.", type: "stock" },
  { symbol: "TSLA", name: "Tesla Inc.", type: "stock" },
  { symbol: "AMZN", name: "Amazon.com Inc.", type: "stock" },
  { symbol: "BTC", name: "Bitcoin", type: "crypto" },
  { symbol: "ETH", name: "Ethereum", type: "crypto" },
  { symbol: "SPY", name: "SPDR S&P 500 ETF", type: "etf" },
  { symbol: "QQQ", name: "Invesco QQQ Trust", type: "etf" },
]

export function AssetModal({ open, onOpenChange, asset, onSave }: AssetModalProps) {
  const [formData, setFormData] = React.useState({
    symbol: "",
    name: "",
    type: "stock" as const,
    quantity: 0,
    avgBuyPrice: 0,
    purchaseDate: new Date(),
  })

  React.useEffect(() => {
    if (asset) {
      setFormData({
        symbol: asset.symbol,
        name: asset.name,
        type: asset.type,
        quantity: asset.quantity,
        avgBuyPrice: asset.avgBuyPrice,
        purchaseDate: asset.purchaseDate,
      })
    } else {
      setFormData({
        symbol: "",
        name: "",
        type: "stock",
        quantity: 0,
        avgBuyPrice: 0,
        purchaseDate: new Date(),
      })
    }
  }, [asset, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
  }

  const handleAssetSelect = (selectedAsset: (typeof popularAssets)[0]) => {
    setFormData((prev) => ({
      ...prev,
      symbol: selectedAsset.symbol,
      name: selectedAsset.name,
      type: selectedAsset.type as any,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{asset ? "Edit Asset" : "Add New Asset"}</DialogTitle>
          <DialogDescription>
            {asset ? "Update your asset information." : "Add a new asset to your portfolio."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Asset Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: any) => setFormData((prev) => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select asset type" />
              </SelectTrigger>
              <SelectContent>
                {assetTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <div className="space-y-2">
              <Input
                id="symbol"
                placeholder="e.g., AAPL, BTC"
                value={formData.symbol}
                onChange={(e) => setFormData((prev) => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                required
              />
              <div className="grid grid-cols-3 gap-1">
                {popularAssets
                  .filter((a) => a.type === formData.type)
                  .slice(0, 6)
                  .map((popularAsset) => (
                    <Button
                      key={popularAsset.symbol}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleAssetSelect(popularAsset)}
                    >
                      {popularAsset.symbol}
                    </Button>
                  ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Asset Name</Label>
            <Input
              id="name"
              placeholder="e.g., Apple Inc."
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                step="0.000001"
                min="0"
                placeholder="0"
                value={formData.quantity || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, quantity: Number.parseFloat(e.target.value) || 0 }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avgBuyPrice">Avg Buy Price</Label>
              <Input
                id="avgBuyPrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.avgBuyPrice || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, avgBuyPrice: Number.parseFloat(e.target.value) || 0 }))
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Purchase Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.purchaseDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.purchaseDate ? format(formData.purchaseDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.purchaseDate}
                  onSelect={(date) => date && setFormData((prev) => ({ ...prev, purchaseDate: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              {asset ? "Update Asset" : "Add Asset"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
