import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  auth: {
    username: "start0123",
    password: "woah_012",
  },
});

export default API;