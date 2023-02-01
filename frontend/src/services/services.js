import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// formate la date hh:mm:ss en hh:mm
export const formatDate = (date) => {
  const tmpDate = date.split("");
  tmpDate.splice(5, 3);
  return tmpDate.join("");
};

export default api;
