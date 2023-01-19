import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default api;
