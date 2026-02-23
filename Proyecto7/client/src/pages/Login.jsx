import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export default function Login() {
  const { setToken, setUser } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data.data;

      setToken(token);
      setUser(user);

      nav("/"); // puedes cambiar a "/profile" si quieres
    } catch (err) {
      console.error(err);
      setMsg(err?.response?.data?.message || "Credenciales inválidas");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Inicia sesión</h1>

      <p style={styles.subtitle}>
        Inicia sesión para realizar tu compra en <b>Moisizza</b> 🍕
      </p>

      <form onSubmit={submit} style={styles.form}>
        <label>Email</label>
        <input
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Contraseña</label>
        <input
          type="password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button}>Ingresar</button>
      </form>

      {msg && <p style={styles.error}>{msg}</p>}

      {/* 🔥 Registro */}
      <div style={styles.registerBox}>
        <p>
          ¿No tienes cuenta?{" "}
          <Link to="/signup" style={styles.link}>
            Regístrate acá
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 420,
    margin: "60px auto",
    padding: 24,
    fontFamily: "Arial",
    border: "1px solid #eee",
    borderRadius: 14,
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  },
  title: {
    marginBottom: 10,
  },
  subtitle: {
    marginBottom: 20,
    color: "#555",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  button: {
    marginTop: 10,
    padding: "10px 14px",
    borderRadius: 8,
    border: "none",
    background: "#ff4d4d",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    marginTop: 10,
    color: "crimson",
  },
  registerBox: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
  },
  link: {
    color: "#ff4d4d",
    fontWeight: "bold",
    textDecoration: "none",
  },
};