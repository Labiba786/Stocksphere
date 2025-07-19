"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DollarSign, IndianRupee, Euro, PoundSterling } from "lucide-react"

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar", icon: DollarSign },
  { code: "INR", symbol: "₹", name: "Indian Rupee", icon: IndianRupee },
  { code: "EUR", symbol: "€", name: "Euro", icon: Euro },
  { code: "GBP", symbol: "£", name: "British Pound", icon: PoundSterling },
]

interface CurrencyToggleProps {
  value: string
  onValueChange: (value: string) => void
}

export function CurrencyToggle({ value, onValueChange }: CurrencyToggleProps) {
  const currentCurrency = currencies.find((c) => c.code === value) || currencies[0]
  const Icon = currentCurrency.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Icon className="h-4 w-4" />
          {currentCurrency.code}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {currencies.map((currency) => {
          const CurrencyIcon = currency.icon
          return (
            <DropdownMenuItem key={currency.code} onClick={() => onValueChange(currency.code)} className="gap-2">
              <CurrencyIcon className="h-4 w-4" />
              <span>{currency.code}</span>
              <span className="text-muted-foreground">- {currency.name}</span>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
