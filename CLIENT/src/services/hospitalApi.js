import axios from "axios";
import { getAuth } from "firebase/auth";

const API = axios.create({
  baseURL: "http://localhost:8080/api/hospitals",
});

API.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getMyHospital = () => API.get("/my");
