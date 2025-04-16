import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const status = error.response?.status || 500;

    switch (status) {
      case 401: {
        window.location.href = "/";
        return Promise.reject(error);
      }

      case 403: {
        return Promise.reject(error);
      }

      case 400: {
        return Promise.reject(error);
      }

      case 404: {
        return Promise.reject(error);
      }

      case 409: {
        return Promise.reject(error);
      }

      case 422: {
        return Promise.reject(error);
      }

      default: {
        return Promise.reject(error);
      }
    }
  }
);

export default instance;
