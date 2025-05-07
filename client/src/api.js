import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (typeof token === "string" && token.split(".").length === 3) {
    req.headers.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    console.warn("Видалено невалідний токен із localStorage:", token);
  }

  return req;
});

export default API;
