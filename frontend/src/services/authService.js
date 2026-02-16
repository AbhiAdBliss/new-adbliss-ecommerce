import axios from "axios";

const API = "http://13.233.120.37:5000/api";

export const registerUser = (data) =>
  axios.post(`${API}/register`, data);

export const loginUser = (data) =>
  axios.post(`${API}/login`, data);
