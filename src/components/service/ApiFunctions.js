import axios from "./axiosConfig";

export const loginUser = async (data) => {
  return axios.post("/api/auth/login", data);
};

export const getProducts = async (
  page,
  size,
  categoryName,
  brandName,
  searchKey,
) => {
  return axios.get("/api/products", {
    params: {
      page: page,
      size: size,
      categoryName: categoryName,
      brandName: brandName,
      search: searchKey,
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
    },
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
    },
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
    },
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

export const getCartCount = async () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return axios.get("/api/cart/count", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/* ───────────── Admin: shared helpers ───────────── */

const authHeaders = () => {
  const token = JSON.parse(localStorage.getItem("accessToken"));
  return { headers: { Authorization: `Bearer ${token}` } };
};

/** Pull the most useful error message out of a backend error response. */
export const getApiErrorMessage = (error, fallback) => {
  const data = error?.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  if (data?.message) return data.message;
  if (typeof data?.data === "string") return data.data;
  if (data && typeof data === "object") {
    const firstFieldError = Object.values(data).find((v) => typeof v === "string");
    if (firstFieldError) return firstFieldError;
  }
  return fallback;
};

/* ───────────── Admin: users ───────────── */

export const getAdminUsers = async ({ page = 0, size = 10, search, role, active } = {}) => {
  return axios.get("/api/admin/users", {
    ...authHeaders(),
    params: {
      page,
      size,
      search: search || undefined,
      role: role || undefined,
      active: active === undefined || active === "" ? undefined : active,
    },
  });
};

export const getAdminUser = async (userId) => {
  return axios.get(`/api/admin/users/${userId}`, authHeaders());
};

export const createAdminUser = async (data) => {
  return axios.post("/api/admin/users", data, authHeaders());
};

export const updateAdminUser = async (userId, data) => {
  return axios.put(`/api/admin/users/${userId}`, data, authHeaders());
};

export const lockUser = async (userId) => {
  return axios.put(`/api/admin/users/${userId}/lock`, null, authHeaders());
};

export const unlockUser = async (userId) => {
  return axios.put(`/api/admin/users/${userId}/unlock`, null, authHeaders());
};

export const activateUser = async (userId) => {
  return axios.put(`/api/admin/users/${userId}/activate`, null, authHeaders());
};

export const changeUserRole = async (userId, roleName) => {
  return axios.put(`/api/admin/users/${userId}/role`, null, {
    ...authHeaders(),
    params: { roleName },
  });
};

export const deleteAdminUser = async (userId) => {
  return axios.delete(`/api/admin/users/${userId}`, authHeaders());
};

/* ───────────── Admin: dashboard ───────────── */

export const getOrderStatusStatistics = async () => {
  return axios.get("/api/dashboard/order-status", authHeaders());
};

export const getMonthlyRevenue = async (year) => {
  return axios.get("/api/dashboard/revenue", { ...authHeaders(), params: { year } });
};

export const getTopSellingProducts = async (limit = 5) => {
  return axios.get("/api/dashboard/top-products", { ...authHeaders(), params: { limit } });
};

export const getLowStockProducts = async (threshold = 5) => {
  return axios.get("/api/dashboard/low-stock", { ...authHeaders(), params: { threshold } });
};

/* ───────────── Brands ───────────── */

export const getAllBrands = async () => {
  return axios.get("/api/brands");
};

export const createBrand = async (data) => {
  return axios.post("/api/brands", data, authHeaders());
};

export const updateBrand = async (id, data) => {
  return axios.put(`/api/brands/${id}`, data, authHeaders());
};

export const deleteBrand = async (id) => {
  return axios.delete(`/api/brands/${id}`, authHeaders());
};
