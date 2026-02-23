import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext.jsx";
import { paymentsApi } from "../services/payments.api";

export default function Checkout() {
  const { state } = useContext(AppContext);
  const { token } = useContext(AuthContext);

  const total = state.cart.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);

  const clp = (n) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(n);

  async function pay() {
    const res = await paymentsApi.createStripeCheckout(state.cart, token);
    window.location.href = res.data.data.url;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Finalizar Compra</h1>

        <div style={styles.summary}>
          {state.cart.map((item) => (
            <div key={item._id} style={styles.row}>
              <span>
                {item.name} x {item.qty}
              </span>
              <span>{clp(item.price * item.qty)}</span>
            </div>
          ))}
        </div>

        <div style={styles.totalRow}>
          <span>Total:</span>
          <strong>{clp(total)}</strong>
        </div>

        <button
          style={styles.payBtn}
          onClick={pay}
          disabled={state.cart.length === 0}
        >
          💳 Pagar con Stripe
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    fontFamily: "Poppins, Arial, sans-serif",
  },

  card: {
    background: "white",
    padding: 32,
    borderRadius: 20,
    width: "100%",
    maxWidth: 500,
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  title: {
    textAlign: "center",
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: 800,
  },

  summary: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 15,
    color: "#444",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.2rem",
    fontWeight: 800,
    borderTop: "1px solid #eee",
    paddingTop: 12,
  },

  payBtn: {
    background: "linear-gradient(135deg, #ff6f00, #ff3d00)",
    color: "white",
    border: "none",
    padding: "14px 20px",
    borderRadius: 14,
    fontWeight: 800,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 12px 24px rgba(255, 111, 0, 0.3)",
    transition: "transform 150ms ease, opacity 150ms ease",
  },
};