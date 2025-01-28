const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      // Change from `item` to `items`
      type: [
        {
          product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
          quantity: { type: Number, required: true },
          size: { type: String, required: true },
        },
      ],
      required: true,
    },
    address: {
      // Change from array to a single object
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Dispatched", "Out for delivery", "Cancelled"],
      default: "Pending",
    },
    paymentMode: {
      type: String,
      enum: ["COD", "UPI", "CARD"],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    orderNo: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Order", orderSchema);