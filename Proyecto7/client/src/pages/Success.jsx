import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

export default function Success() {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    // al llegar desde Stripe, vaciamos el carrito
    dispatch({ type: "CLEAR_CART" });
  }, [dispatch]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>✅ Compra realizada</h1>
        <p style={styles.text}>
          Tu pago fue exitoso. ¡Gracias por comprar en <b>Moisizza</b> 🍕!
        </p>

        <div style={styles.actions}>
          <Link to="/" style={styles.primaryBtn}>Volver al Home</Link>
          <Link to="/products" style={styles.secondaryBtn}>Seguir comprando</Link>
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
  }
}