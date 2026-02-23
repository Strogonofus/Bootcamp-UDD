import { Router } from "express";
import Stripe from "stripe";
import { requireAuth } from "../middleware/auth.middleware.js";
import { ENV } from "../config/env.js";

const router = Router();
const stripe = new Stripe(ENV.STRIPE_SECRET_KEY);

router.post("/create-session", requireAuth, async (req, res) => {
  try {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Carrito vacío" });
    }

    const line_items = items.map((it) => ({
      price_data: {
        currency: "clp",
        product_data: { name: it.name },
        unit_amount: Math.round(it.price), // CLP no lleva *100
      },
      quantity: it.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${ENV.CLIENT_URL}/success`,
      cancel_url: `${ENV.CLIENT_URL}/cancel`,
    });

    return res.json({ success: true, data: { url: session.url } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Error creando sesión Stripe" });
  }
});

export default router;