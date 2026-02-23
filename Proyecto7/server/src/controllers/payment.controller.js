import Order from "../models/Order.js";
import { createCheckoutSession } from "../services/stripe.service.js";
import { ENV } from "../config/env.js";

export async function createStripeCheckout(req, res, next) {
  try {
    const { items } = req.body; // [{productId,name,price,qty}]
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart items required" });
    }

    const total = items.reduce((acc, it) => acc + it.price * it.qty, 0);

    const order = await Order.create({
      userId: req.user.id,
      items,
      total,
      status: "pending",
      paymentProvider: "stripe",
    });

    const session = await createCheckoutSession({
      items,
      successUrl: `${ENV.CLIENT_URL}/success?orderId=${order._id}`,
      cancelUrl: `${ENV.CLIENT_URL}/cancel?orderId=${order._id}`,
    });

    order.paymentId = session.id;
    await order.save();

    res.json({ success: true, data: { url: session.url } });
  } catch (err) {
    next(err);
  }
}