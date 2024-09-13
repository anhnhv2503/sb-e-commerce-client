import axios from "../service/axiosConfig";

export const getProducts = async () => {
  return axios.get("/api/products/all");
};

export const getAllCategories = async () => {
  return axios.get("/api/categories/all");
};
