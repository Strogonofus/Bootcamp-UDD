import Stripe from "stripe";
import { ENV } from "../config/env.js";

export const stripe = new Stripe(ENV.STRIPE_SECRET_KEY);

export async function createCheckoutSession({ items, successUrl, cancelUrl }) {
  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items.map((it) => ({
      quantity: it.qty,
      price_data: {
        currency: "clp",
        unit_amount: it.price,
        product_data: { name: it.name },
      },
    })),
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}