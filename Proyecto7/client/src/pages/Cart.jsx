import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const clp = (n) =>
  new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(n);

export default function Cart() {
  const { state, dispatch } = useContext(AppContext);
  const nav = useNavigate();

  const total = state.cart.reduce((acc, it) => acc + it.price * it.qty, 0);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🛒 Carrito</h1>

        {state.cart.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ margin: 0 }}>Tu carrito está vacío.</p>
            <Link to="/products" style={styles.link}>Ir al menú</Link>
          </div>
        ) : (
          <>
            <div style={styles.list}>
              {state.cart.map((it) => (
                <div key={it._id} style={styles.row}>
                  {/* miniatura */}
                  <div style={styles.thumbWrap}>
                    <img
                      src={it.image}
                      alt={it.name}
                      style={styles.thumb}
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://via.placeholder.com/80x80.png?text=🍕";
                      }}
                    />
                  </div>

                  {/* info */}
                  <div style={styles.info}>
                    <div style={styles.name}>{it.name}</div>
                    <div style={styles.unit}>{clp(it.price)}</div>
                  </div>

                  {/* qty */}
                  <div style={styles.qty}>
                    <button
                      style={styles.circleBtn}
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QTY",
                          payload: { id: it._id, qty: it.qty - 1 },
                        })
                      }
                      aria-label="Disminuir cantidad"
                    >
                      −
                    </button>

                    <span style={styles.qtyNum}>{it.qty}</span>

                    <button
                      style={styles.circleBtn}
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QTY",
                          payload: { id: it._id, qty: it.qty + 1 },
                        })
                      }
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>

                  {/* subtotal + remove */}
                  <div style={styles.right}>
                    <div style={styles.subtotal}>{clp(it.price * it.qty)}</div>

                    <button
                      style={styles.removeBtn}
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: it._id })
                      }
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.summary}>
              <button
                style={styles.clearBtn}
                onClick={() => dispatch({ type: "CLEAR_CART" })}
              >
                Vaciar carrito
              </button>

              <div style={styles.totalBox}>
                <div style={styles.totalLabel}>Total</div>
                <div style={styles.totalValue}>{clp(total)}</div>
              </div>
            </div>

            <div style={styles.payWrap}>
              <button style={styles.payBtn} onClick={() => nav("/checkout")}>
                Ir a pagar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: 24,
    fontFamily: "Poppins, Arial, sans-serif",
  },
  card: {
    maxWidth: 920,
    margin: "0 auto",
    background: "white",
    borderRadius: 18,
    border: "1px solid #eee",
    boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
    padding: 22,
  },
  title: {
    margin: "0 0 16px",
    fontSize: "1.8rem",
  },
  empty: {
    display: "grid",
    gap: 10,
    padding: 14,
    borderRadius: 12,
    background: "#fff7ed",
    border: "1px solid #ffe5c7",
  },
  link: {
    color: "#e65100",
    fontWeight: 700,
    textDecoration: "none",
    width: "fit-content",
  },

  list: {
    display: "grid",
    gap: 12,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "88px 1fr 140px 160px",
    gap: 12,
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    border: "1px solid #f0f0f0",
    background: "#fff",
  },

  thumbWrap: {
    width: 80,
    height: 80,
    borderRadius: 14,
    overflow: "hidden",
    border: "1px solid #eee",
    background: "#fafafa",
  },
  thumb: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  info: {
    display: "grid",
    gap: 4,
  },
  name: {
    fontWeight: 700,
    color: "#111",
  },
  unit: {
    color: "#666",
    fontSize: 14,
  },

  qty: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 999,
    border: "1px solid #eee",
    background: "#fff7ed",
    cursor: "pointer",
    fontSize: 18,
    fontWeight: 800,
    color: "#111",
    boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
  },
  qtyNum: {
    minWidth: 18,
    textAlign: "center",
    fontWeight: 700,
  },

  right: {
    justifySelf: "end",
    textAlign: "right",
    display: "grid",
    gap: 8,
  },
  subtotal: {
    fontWeight: 800,
  },
  removeBtn: {
    background: "white",
    border: "1px solid #ffd0c6",
    color: "#b42318",
    padding: "8px 10px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
    width: "fit-content",
    justifySelf: "end",
  },

  summary: {
    marginTop: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  clearBtn: {
    background: "#111",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
  },
  totalBox: {
    display: "grid",
    gap: 4,
    textAlign: "right",
  },
  totalLabel: {
    color: "#666",
    fontSize: 13,
  },
  totalValue: {
    fontSize: "1.4rem",
    fontWeight: 900,
    color: "#e65100",
  },

  payWrap: {
    marginTop: 14,
    display: "flex",
    justifyContent: "flex-end",
  },
  payBtn: {
    background: "#ff6f00",
    color: "white",
    border: "none",
    padding: "12px 16px",
    borderRadius: 14,
    cursor: "pointer",
    fontWeight: 800,
    boxShadow: "0 10px 20px rgba(255,111,0,0.25)",
  },
};