const mongoose = require("mongoose");

const notificationSettingsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },

    // Channels
    emailNotifications: { type: Boolean, default: true },
    pushNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },

    // Content Types
    priceAlerts: { type: Boolean, default: true },
    portfolioUpdates: { type: Boolean, default: true },
    marketNews: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("NotificationSettings", notificationSettingsSchema);
