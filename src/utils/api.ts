

import axios from "axios";

const api = axios.create({
  baseURL: "https://tasks-api-0wyn.onrender.com", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
