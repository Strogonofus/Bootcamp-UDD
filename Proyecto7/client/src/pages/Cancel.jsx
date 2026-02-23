import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>❌ Compra cancelada</h1>
        <p style={styles.text}>
          Tu pago fue cancelado. No se realizó ningún cobro.
        </p>

        <div style={styles.actions}>
          <Link to="/" style={styles.primaryBtn}>Volver al Home</Link>
          <Link to="/cart" style={styles.secondaryBtn}>Volver al carrito</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "70vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    fontFamily: "Arial",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    border: "1px solid #eee",
    borderRadius: 14,
    padding: 24,
    boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
    textAlign: "center",
  },
  title: {
    margin: 0,
    marginBottom: 10,
  },
  text: {
    margin: 0,
    color: "#555",
    lineHeight: 1.5,
  },
  actions: {
    marginTop: 18,
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "#111",
    color: "white",
    padding: "10px 14px",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: "bold",
  },
  secondaryBtn: {
    background: "white",
    color: "#111",
    padding: "10px 14px",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: "bold",
    border: "1px solid #ddd",
  },
};