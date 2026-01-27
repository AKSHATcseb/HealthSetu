import axios from "axios";
import { getAuth } from "firebase/auth";

const API = axios.create({
  baseURL: "http://localhost:8080/api/appointments",
});

API.interceptors.request.use(async (config) => {
  const user = getAuth().currentUser;

  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getHospitalAppointments = (hospitalId) =>
  API.get(`/hospital/${hospitalId}`);

export const cancelAppointment = (id) =>
  API.put(`/cancel/${id}`);

export const startSession = (id) =>
  API.put(`/start/${id}`);

export const completeSession = (id) =>
  API.put(`/complete/${id}`);
