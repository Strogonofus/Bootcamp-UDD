import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { appReducer, initialState } from "./appReducer";

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (init) => {
    const saved = localStorage.getItem("cart");
    return saved ? { ...init, cart: JSON.parse(saved) } : init;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}