import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { AppContext } from "../context/AppContext.jsx";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { state } = useContext(AppContext);

  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/");
  };

  // contador del carrito
  const count = state.cart.reduce((acc, it) => acc + it.qty, 0);

  return (
    <header style={styles.nav}>
      {/* IZQUIERDA */}
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>🍕 Moisizza</Link>
      </div>

      {/* CENTRO */}
      <div style={styles.center}>
        {user && (
          <span style={styles.greeting}>
            Hola, <b>{user.name}</b> 👋
          </span>
        )}
      </div>

      {/* DERECHA */}
      <div style={styles.right}>
        <Link to="/products" style={styles.link}>Menú</Link>

        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Registro</Link>
          </>
        ) : (
          <>
            {/* 🔥 SOLO APARECE SI ESTÁ LOGUEADO */}
            <Link to="/cart" style={styles.link}>
              Carrito ({count})
            </Link>

            <Link to="/profile" style={styles.link}>Perfil</Link>

            <button onClick={handleLogout} style={styles.btn}>
              Sign out
            </button>
          </>
        )}
      </div>
    </header>
  );
}

const styles = {
  nav: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    padding: "20px 40px",
    background: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    fontSize: "1.05rem",
  },

  left: { justifySelf: "start" },
  center: { justifySelf: "center" },

  right: {
    justifySelf: "end",
    display: "flex",
    gap: 20,
    alignItems: "center"
  },

  brand: {
    textDecoration: "none",
    fontWeight: 800,
    fontSize: "1.6rem",
    color: "#e65100"
  },

  greeting: {
    fontSize: "1.2rem",
    fontWeight: 600,
    color: "#333"
  },

  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: 600
  },

  btn: {
    background: "#ff6f00",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.95rem",
    transition: "0.2s"
  }
};