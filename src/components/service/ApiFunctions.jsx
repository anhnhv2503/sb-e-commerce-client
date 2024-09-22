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

export const getBrands = async () => {
  return axios.get("/api/products/brand/all");
};

export const registerUser = async (data, fullAddress) => {
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("fullName", data.fullName);
  formData.append("phone", data.phone);
  formData.append("address", fullAddress);

  return axios.post("/api/user/register", formData);
};

export const getUserDetail = async (id) => {
  return axios.get(`/api/user/${id}/detail`);
};

export const getAllProvinces = async () => {
  return axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
};

export const getAllDistricts = async (provinceId) => {
  return axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
};

export const getAllWards = async (districtId) => {
  return axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
};

export const addMoreSizeForProduct = async (productId, sizeName, quantity) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const formData = new FormData();
  formData.append("sizeName", sizeName);
  formData.append("quantity", quantity);
  return axios.post(`/api/products/size/add/${productId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addProduct = async (data) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.post("/api/products/add", data, {
    headers: {
      Authorization: `Bearer ${token}`, // Token for authentication
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getInventory = async (sizeId) => {
  return axios.get(`/api/products/size/inventory/${sizeId}`);
};
