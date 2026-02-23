import { api } from "./api";

export const productsApi = {
  list: () => api.get("/products"),
  get: (id) => api.get(`/products/${id}`),
};