const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    type: {
      type: String,
      enum: ["ORDER_PLACED", "ORDER_CONFIRMED", "ORDER_PICKED_UP", "ORDER_DELIVERED", "PAYMENT_SUCCESS", "PAYMENT_FAILED"],
      required: true,
    },
    channel: {
      type: String,
      enum: ["EMAIL", "SMS", "PUSH"],
      required: true,
    },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "SENT", "FAILED"],
      default: "PENDING",
    },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
