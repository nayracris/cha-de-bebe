import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction
  ? process.env.NEXT_PUBLIC_VERCEL_URL || "https://seu-projeto.vercel.app" // URL padrão para segurança
  : "http://localhost:3000";

export const api = axios.create({ baseURL });

export const setToken = (token: string) => {
  api.defaults.headers.Authorization = `Bearer ${token}`;
};
