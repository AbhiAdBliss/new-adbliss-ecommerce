import axios from "axios";

const API = "http://13.233.120.37:5000/api";

export const creditCoins = (data) =>
  axios.post(`${API}/order-success`, data);
