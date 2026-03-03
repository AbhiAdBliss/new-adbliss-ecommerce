import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.PROD
    ? "/"                      // EC2 production (via Nginx)
    : "http://localhost:5001", // Local development
});

export default API;