import axios from "axios";

const BASE_URL = "https://stock-management-api.vercel.app/api"; // Change this for production

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
