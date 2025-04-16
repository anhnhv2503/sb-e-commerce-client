import axios from "./axiosConfig";

export const loginUser = async (data) => {
  return axios.post("/api/auth/login", data);
};

export const getProducts = async (page, size) => {
  return axios.get("/api/products", {
    params: {
      page: page,
      size: size,
    },
  });
};

export const getAllCategories = async () => {
  return axios.get("/api/categories/all");
};

export const addCategory = async (categoryName) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const formData = new FormData();
  formData.append("name", categoryName);
  return axios.post("/api/categories/add", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCategory = async (id) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.delete(`/api/categories/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

export const addProductToCart = async (data) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.post("/api/cart-item/item/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCartByUserId = async (userId) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.get(`/api/cart/detail/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const verifyEmail = async (token) => {
  return axios.post(`/api/email/verify`, { token });
};

export const changePassword = async (oldPassword, newPassword) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const formData = new FormData();
  formData.append("oldPassword", oldPassword);
  formData.append("newPassword", newPassword);
  return axios.put("/api/user/change-password", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const forgotPassword = async (email) => {
  const formData = new FormData();
  formData.append("email", email);
  return axios.post("/api/user/forgot-password", formData);
};

export const resetPassword = async (token, newPassword) => {
  return axios.post("/api/user/reset-password", { token, newPassword });
};

export const placeOrder = async (data) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.post("/api/order/place-order", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const vnPayOrder = async (data) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.post("/api/order/vnpay", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const vnPayCallback = async (data, vnp_ResponseCode) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.post(
    `/api/order/vnpay-callback?vnp_ResponseCode=${vnp_ResponseCode}`,
    {
      ...data, // Data in the request body
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getOrdersByUserAndStatus = async (status) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.get(`/api/order/my-orders`, {
    params: {
      status: status,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cancelOrder = async (orderId) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.put(`/api/order/cancel-order/${orderId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrdersByStatus = async (page, status) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.get(`/api/order/all`, {
    params: {
      page: page,
      status: status,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateOrderStatus = async (orderId) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.put(`/api/order/update-order-status/${orderId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const confirmDelivery = async (orderId) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.put(`/api/order/confirm-delivered/${orderId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addItemToCart = async (data) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.post("/api/cart-item/item/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCart = async () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.get("/api/cart/my-cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeItemFromCart = async (cartItemId) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.delete(`/api/cart-item/remove/${cartItemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCartItemQuantity = async (cartItemId, quantity) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.put(
    `/api/cart-item/update/${cartItemId}/${quantity}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const createPayOSPayment = async () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.post(
    "/api/order/payos/create-link",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const executePayOSPayment = async (data) => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.post("/api/order/payos/execute", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProductsByCategory = async (categoryId) => {
  return axios.get(`/api/products/category?categoryId=${categoryId}`);
};

export const getNewestOrders = async () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.get("/api/order/newest", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDashboardData = async () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.get("/api/dashboard/data", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
