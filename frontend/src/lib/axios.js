import axios from "axios";

// In production, there's no localhost; so URL needs to be dynamic
const BASE_URL = import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "/api";

const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
});

// Automatically attach JWT token from localStorage to each request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
