import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div style={styles.page}>
      {/* Fondo + hero */}
      <div style={styles.heroBg} />

      {/* decoraciones suaves */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {/* “pizzas” flotando (suaves/blur) */}
      <div style={{ ...styles.float, ...styles.f1 }}>🍕</div>
      <div style={{ ...styles.float, ...styles.f2 }}>🍟</div>
      <div style={{ ...styles.float, ...styles.f3 }}>🥤</div>
      <div style={{ ...styles.float, ...styles.f4 }}>🍕</div>
      <div style={{ ...styles.float, ...styles.f5 }}>🍦</div>

      {/* Card */}
      <div style={styles.card}>
        <h1 style={styles.title}>🍕 Moisizza</h1>

        {!user ? (
          <>
            <p style={styles.subtitle}>
              Bienvenido a <b>Moisizza</b>. Inicia sesión para guardar tu carrito
            </p>
            <div style={styles.actions}>
              <Link to="/products" style={styles.primaryBtn}>
                Ver Menú
              </Link>
              <Link to="/login" style={styles.secondaryBtn}>
                Login
              </Link>
              <Link to="/signup" style={styles.secondaryBtn}>
                Registro
              </Link>
            </div>


            <p style={styles.note}>Tip: crea tu cuenta para mantener tu carrito guardado 👌</p>
          </>
        ) : (
          <>
            <p style={styles.subtitle}>
              Bienvenido, <b>{user.name}</b> 👋 ya estás listo para pedir en <b>Moisizza</b>.
            </p>
            <div style={styles.actions}>
              <Link to="/products" style={styles.primaryBtn}>
                Ir al Menú
              </Link>
              <Link to="/profile" style={styles.secondaryBtn}>
                Mi Perfil
              </Link>
            </div>




          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "calc(100vh - 72px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "24px 20px 50px", 
    fontFamily: "Poppins, Arial, sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  // hero gradient suave
  heroBg: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(1200px 500px at 50% 0%, rgba(255,255,255,0.55), transparent 55%), linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.0))",
    pointerEvents: "none",
  },

  blob1: {
    position: "absolute",
    width: 520,
    height: 520,
    borderRadius: "50%",
    filter: "blur(30px)",
    opacity: 0.22,
    top: -240,
    left: -240,
    background: "radial-gradient(circle at 30% 30%, #ff4d4d, transparent 60%)",
    pointerEvents: "none",
  },
  blob2: {
    position: "absolute",
    width: 560,
    height: 560,
    borderRadius: "50%",
    filter: "blur(34px)",
    opacity: 0.18,
    bottom: -260,
    right: -260,
    background: "radial-gradient(circle at 30% 30%, #ff7a4d, transparent 60%)",
    pointerEvents: "none",
  },

  // flotantes
  float: {
    position: "absolute",
    fontSize: 52,
    opacity: 0.22,
    filter: "blur(0.2px)",
    transform: "rotate(-10deg)",
    userSelect: "none",
    pointerEvents: "none",
  },
  f1: { top: 90, left: 60, fontSize: 58, opacity: 0.18 },
  f2: { top: 170, right: 90, fontSize: 46, opacity: 0.16, transform: "rotate(8deg)" },
  f3: { top: 360, left: 120, fontSize: 50, opacity: 0.14, transform: "rotate(12deg)" },
  f4: { bottom: 120, right: 140, fontSize: 62, opacity: 0.16, transform: "rotate(-6deg)" },
  f5: { bottom: 220, left: 70, fontSize: 44, opacity: 0.14, transform: "rotate(10deg)" },

  card: {
    marginTop: 14, // 👈 pegadito a navbar
    textAlign: "center",
    width: "100%",
    maxWidth: 860,
    padding: "44px 28px",
    borderRadius: 22,
    background: "rgba(255,255,255,0.35)",
    border: "1px solid rgba(255,255,255,0.55)",
    boxShadow: "0 26px 60px rgba(0,0,0,0.16)",
    backdropFilter: "blur(10px)",
    position: "relative",
  },

  title: {
    fontSize: "3.1rem",
    margin: "0 0 12px",
    fontWeight: 900,
    letterSpacing: "-0.02em",
    color: "#111",
  },

  subtitle: {
    fontSize: "1.15rem",
    color: "rgba(0,0,0,0.62)",
    maxWidth: 720,
    margin: "0 auto 22px",
    lineHeight: 1.55,
    fontWeight: 500,
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 4,
  },

  primaryBtn: {
    background: "linear-gradient(135deg, #ff4d4d, #ff7a4d)",
    color: "white",
    padding: "12px 22px",
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: 900,
    boxShadow: "0 14px 24px rgba(255, 77, 77, 0.25)",
    transition: "transform 160ms ease, opacity 160ms ease",
  },

  secondaryBtn: {
    background: "rgba(255,255,255,0.85)",
    color: "#111",
    padding: "12px 22px",
    borderRadius: 14,
    textDecoration: "none",
    fontWeight: 900,
    border: "1px solid rgba(0,0,0,0.10)",
    transition: "transform 160ms ease, opacity 160ms ease",
  },

  pills: {
    marginTop: 18,
    display: "flex",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  pill: {
    background: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(0,0,0,0.07)",
    padding: "8px 12px",
    borderRadius: 999,
    fontWeight: 800,
    color: "rgba(0,0,0,0.70)",
    fontSize: 13,
  },

  note: {
    marginTop: 14,
    fontSize: 13,
    color: "rgba(0,0,0,0.55)",
    fontWeight: 600,
  },
};