const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    name: { type: String }, // e.g., "Apple Inc."
    ticker: { type: String, required: true }, // e.g., "AAPL"

    quantity: { type: Number, required: true }, // How many units owned
    buyPrice: { type: Number, required: true }, // Average buy price per unit

    currentPrice: { type: Number }, // Optional: can be updated periodically via cronjob or price API

    assetType: {
      type: String,
      enum: ["stock", "crypto", "mutual_fund", "etf", "other"],
      default: "stock",
    },
  },
  { timestamps: true }
);

// Virtual field for totalValue (not stored in DB)
assetSchema.virtual("totalValue").get(function () {
  return (this.currentPrice ?? 0) * this.quantity;
});

// Virtual field for P/L %
assetSchema.virtual("plPercent").get(function () {
  if (!this.currentPrice || !this.buyPrice) return 0;
  const gain = this.currentPrice - this.buyPrice;
  return (gain / this.buyPrice) * 100;
});

// Include virtuals in JSON
assetSchema.set("toJSON", { virtuals: true });
assetSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Asset", assetSchema);
