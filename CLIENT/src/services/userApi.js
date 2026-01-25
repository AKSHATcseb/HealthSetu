import axios from "axios";

const BASE = "http://localhost:8080/api";

export const getMe = (token) =>
  axios.get(`${BASE}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const registerUser = (token, data) =>
  axios.post(`${BASE}/users/login`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
