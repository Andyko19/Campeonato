import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Esto lo cambiaremos cuando tengamos backend
});

export default api;
