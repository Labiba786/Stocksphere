const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, enum: ["free", "pro"], default: "free" },
  paymentStatus: { type: String, enum: ["active", "failed", "cancelled"], default: "active" },
  expiryDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Subscription", subscriptionSchema);
