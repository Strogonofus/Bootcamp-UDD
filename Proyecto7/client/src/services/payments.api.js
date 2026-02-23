import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const paymentsApi = {
  createStripeCheckout: (cart, token) => {
    return axios.post(
      `${API_URL}/payments/create-session`,
      { items: cart },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
  },
};