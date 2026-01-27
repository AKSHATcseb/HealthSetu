import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/machines",
});

export const getHospitalMachines = (hospitalId) =>
  API.get(`/${hospitalId}`);
