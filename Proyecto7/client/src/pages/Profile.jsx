import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>👤 Mi Perfil</h1>

        {!user ? (
          <p style={styles.notLogged}>No has iniciado sesión.</p>
        ) : (
          <>
            <div style={styles.avatar}>
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div style={styles.infoBlock}>
              <div style={styles.row}>
                <span style={styles.label}>Nombre</span>
                <span style={styles.value}>{user.name}</span>
              </div>

              <div style={styles.row}>
                <span style={styles.label}>Email</span>
                <span style={styles.value}>{user.email}</span>
              </div>
            </div>

            <div style={styles.badges}>
              <span style={styles.badge}>🍕 Cliente Moisizza</span>
              <span style={styles.badge}>🔥 Activo</span>
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
    padding: "40px 20px",
    fontFamily: "Poppins, Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: 520,
    padding: 32,
    borderRadius: 22,
    background: "rgba(255,255,255,0.45)",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 26px 60px rgba(0,0,0,0.16)",
    backdropFilter: "blur(10px)",
    textAlign: "center",
  },

  title: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: 900,
    marginBottom: 20,
    color: "#111",
  },

  notLogged: {
    color: "#666",
    fontWeight: 500,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ff4d4d, #ff7a4d)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: 900,
    color: "white",
    margin: "0 auto 20px",
    boxShadow: "0 14px 28px rgba(255,77,77,0.25)",
  },

  infoBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    marginBottom: 18,
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    background: "rgba(255,255,255,0.7)",
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.05)",
  },

  label: {
    fontWeight: 700,
    color: "#444",
  },

  value: {
    fontWeight: 600,
    color: "#111",
  },

  badges: {
    display: "flex",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
  },

  badge: {
    background: "rgba(255,255,255,0.75)",
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 800,
    border: "1px solid rgba(0,0,0,0.08)",
  },
};