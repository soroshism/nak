import axios from "axios";
import { useAuthStore } from "../store/auth";

const api = axios.create({
  baseURL: "https://nak-interview.darkube.app",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
