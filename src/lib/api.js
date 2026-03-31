import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  withCredentials: false,
});

export function extractResponseData(data) {
  // Backend shapes may vary between `{ data: ... }`, `{ result: ... }`, or direct objects.
  return data?.data ?? data?.result ?? data;
}

