import axios from "../service/axiosConfig";

export const getProducts = async () => {
  return axios.get("/api/products/all");
};
