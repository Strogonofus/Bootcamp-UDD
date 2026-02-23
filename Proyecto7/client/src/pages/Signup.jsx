import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export default function Signup() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      await axios.post(`${API_URL}/auth/register`, { name, email, password });
      nav("/login");
    } catch (err) {
      console.error(err);
      setMsg(err?.response?.data?.message || "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>🍕</div>
          <div>
            <h1 style={styles.title}>Crear cuenta</h1>
            <p style={styles.subtitle}>Únete a Moisizza y guarda tu carrito para comprar más rápido.</p>
          </div>
        </div>

        <form onSubmit={submit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Nombre</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              placeholder="Ej: Moises"
              autoComplete="name"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="moises@email.com"
              autoComplete="email"
              type="email"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          </div>

          <button style={loading ? styles.btnDisabled : styles.btn} disabled={loading}>
            {loading ? "Creando cuenta..." : "Registrarme"}
          </button>

          {msg && <div style={styles.errorBox}>{msg}</div>}

          <p style={styles.footerText}>
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" style={styles.link}>
              Inicia sesión acá
            </Link>
          </p>
        </form>
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
    padding: "34px 20px 50px",
    fontFamily: "Poppins, Arial, sans-serif",
    position: "relative",
    overflow: "hidden",
  },

  blob1: {
    position: "absolute",
    width: 520,
    height: 520,
    borderRadius: "50%",
    filter: "blur(30px)",
    opacity: 0.18,
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
    opacity: 0.16,
    bottom: -260,
    right: -260,
    background: "radial-gradient(circle at 30% 30%, #ff7a4d, transparent 60%)",
    pointerEvents: "none",
  },

  card: {
    width: "100%",
    maxWidth: 480,
    padding: 28,
    borderRadius: 22,
    background: "rgba(255,255,255,0.45)",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 26px 60px rgba(0,0,0,0.16)",
    backdropFilter: "blur(10px)",
    position: "relative",
  },

  header: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    marginBottom: 18,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #ff4d4d, #ff7a4d)",
    color: "white",
    fontSize: 22,
    boxShadow: "0 14px 24px rgba(255,77,77,0.25)",
    flexShrink: 0,
  },

  title: {
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: 900,
    color: "#111",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    margin: "6px 0 0",
    color: "rgba(0,0,0,0.6)",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 1.4,
  },

  form: { marginTop: 10 },

  field: { marginBottom: 12 },

  label: {
    display: "block",
    fontWeight: 800,
    color: "rgba(0,0,0,0.72)",
    marginBottom: 6,
    fontSize: 13,
  },

  input: {
    width: "100%",
    padding: "11px 12px",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.12)",
    outline: "none",
    background: "rgba(255,255,255,0.8)",
    fontWeight: 600,
  },

  btn: {
    width: "100%",
    marginTop: 6,
    padding: "12px 14px",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    color: "white",
    fontWeight: 900,
    background: "linear-gradient(135deg, #ff4d4d, #ff7a4d)",
    boxShadow: "0 16px 26px rgba(255, 77, 77, 0.25)",
  },
  btnDisabled: {
    width: "100%",
    marginTop: 6,
    padding: "12px 14px",
    borderRadius: 14,
    border: "none",
    cursor: "not-allowed",
    color: "white",
    fontWeight: 900,
    background: "linear-gradient(135deg, rgba(255,77,77,0.6), rgba(255,122,77,0.6))",
  },

  errorBox: {
    marginTop: 12,
    padding: "10px 12px",
    borderRadius: 14,
    background: "rgba(220, 20, 60, 0.10)",
    border: "1px solid rgba(220, 20, 60, 0.22)",
    color: "crimson",
    fontWeight: 700,
    fontSize: 13,
  },

  footerText: {
    marginTop: 14,
    textAlign: "center",
    color: "rgba(0,0,0,0.6)",
    fontWeight: 600,
    fontSize: 13,
  },

  link: {
    color: "#ff4d4d",
    fontWeight: 900,
    textDecoration: "none",
  },
};