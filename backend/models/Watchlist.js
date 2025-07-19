const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    ticker: { type: String, required: true }, // e.g., "AAPL"
    price: Number,                            // Current price (optional, update via API)
    dayChange: Number,                        // e.g., +2.34 or -1.12
    volume: Number,                           // Current volume
    marketCap: Number,                        // Market capitalization
    peRatio: Number,                          // P/E ratio
    targetPrice: Number,                      // User-defined target
    notes: String                             // Optional notes
  },
  { _id: false }
);

const watchlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, default: "My Watchlist" }, // Optional title for list
    stocks: [stockSchema]                            // Array of watched stocks
  },
  { timestamps: true }
);

module.exports = mongoose.model("Watchlist", watchlistSchema);
