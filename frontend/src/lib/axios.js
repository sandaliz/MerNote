import axios from "axios";

//in production, theres no localhost, so url needs to be dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
});

export default api;