import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    console.log("req error");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      setTimeout(() => {
        location.replace("/");
      }, 2000);
    }
    return Promise.reject(error);
  }
);

export default api;
