import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const clp = (n) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(n);

export default function Products() {
  const { dispatch } = useContext(AppContext);
  const { token } = useContext(AuthContext);
  const nav = useNavigate();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    axios
      .get(`${API_URL}/products`)
      .then((res) => {
        if (!mounted) return;
        setProducts(res.data?.data || []);
      })
      .catch((err) => {
        console.error(err);
        if (!mounted) return;
        setError(err?.response?.data?.message || err.message || "Error cargando productos");
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleAdd = (p) => {
    if (!token) {
      nav("/login");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: p });
  };

  if (error) {
    return (
      <div style={{ padding: 24, fontFamily: "Arial" }}>
        <h2>Error</h2>
        <p>{error}</p>
        <p style={{ color: "#666" }}>
          Revisa que el backend esté en <b>http://localhost:4000</b> y que VITE_API_URL esté bien.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Menú</h1>

      <div style={styles.grid}>
        {products.map((p) => (
          <div key={p._id} style={styles.card} className="product-card">
            <div className="product-image-wrap">
              <img src={p.image} alt={p.name} className="product-image" />
            </div>

            <h3 style={styles.name}>{p.name}</h3>
            <p style={styles.desc}>{p.description}</p>

            <div style={styles.footer}>
              <strong>{clp(p.price)}</strong>

              <button style={styles.addBtn} onClick={() => handleAdd(p)}>
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p style={{ textAlign: "center", color: "#666" }}>No hay productos aún.</p>
      )}
    </div>
  );
}

const styles = {
  page: { padding: 24, fontFamily: "Arial" },
  title: { marginBottom: 16 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 16,
  },
  card: {
    border: "1px solid #e5e5e5",
    borderRadius: 12,
    padding: 14,
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    background: "white",
  },
  name: { margin: "10px 0 6px" },
  desc: { color: "#555", minHeight: 38 },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },

  addBtn: {
    background: "#111",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "bold",
  },
};