import axios from "../service/axiosConfig";

export const loginUser = async (data) => {
  return axios.post("/api/auth/login", data);
};

export const getProducts = async () => {
  return axios.get("/api/products/all");
};

export const getAllCategories = async () => {
  return axios.get("/api/categories/all");
};

export const getProductById = async (id) => {
  return axios.get(`/api/products/${id}/get`);
};

export const getNewArrivals = async () => {
  return axios.get("/api/products/new-arrival");
};
