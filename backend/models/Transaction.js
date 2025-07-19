const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    asset: { type: mongoose.Schema.Types.ObjectId, ref: "Asset" }, // Optional link to the asset

    ticker: { type: String, required: true }, // e.g., "AAPL"
    type: {
      type: String,
      enum: ["buy", "sell", "dividend"],
      required: true,
    },

    quantity: { type: Number, required: true }, // Shares/units
    price: { type: Number, required: true },    // Price per unit
    fees: { type: Number, default: 0 },         // Brokerage or transaction fees

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Virtual field: total = quantity * price + fees
transactionSchema.virtual("total").get(function () {
  const rawTotal = this.quantity * this.price;
  return rawTotal + this.fees;
});

transactionSchema.set("toJSON", { virtuals: true });
transactionSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Transaction", transactionSchema);
