import React from "react";
import Navbar from "./components/Navbar.jsx";
import AppRouter from "./router/AppRouter.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  );
}