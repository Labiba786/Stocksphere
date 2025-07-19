import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { symbol, name, type, quantity, price, purchaseDate } = body

    if (!symbol || !name || !type || !quantity || !price || !purchaseDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simulate transaction processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock transaction record
    const transaction = {
      id: `TXN${Date.now()}`,
      symbol,
      name,
      type,
      quantity: Number(quantity),
      price: Number(price),
      total: Number(quantity) * Number(price),
      fees: Number(quantity) * Number(price) * 0.001,
      purchaseDate,
      createdAt: new Date().toISOString(),
    }

    // In a real app, you would save to database here
    console.log("Transaction created:", transaction)

    return NextResponse.json({
      success: true,
      transaction,
      message: "Transaction created successfully",
    })
  } catch (error) {
    console.error("Transaction error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  // Mock transaction history
  const transactions = [
    {
      id: "TXN001",
      symbol: "AAPL",
      name: "Apple Inc.",
      type: "BUY",
      quantity: 50,
      price: 185.5,
      total: 9275.0,
      fees: 9.28,
      purchaseDate: "2024-01-15T09:30:00Z",
      createdAt: "2024-01-15T09:30:00Z",
    },
    {
      id: "TXN002",
      symbol: "MSFT",
      name: "Microsoft Corporation",
      type: "BUY",
      quantity: 30,
      price: 250.3,
      total: 7509.0,
      fees: 7.51,
      purchaseDate: "2024-01-10T14:25:00Z",
      createdAt: "2024-01-10T14:25:00Z",
    },
  ]

  return NextResponse.json({ transactions })
}
