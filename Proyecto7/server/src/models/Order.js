import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [itemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
    paymentProvider: { type: String, enum: ["stripe", "mercadopago", "paypal"], default: "stripe" },
    paymentId: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);