import ManageCategory from "@/components/admin/pages/ManageCategory";
import ManageOrder from "@/components/admin/pages/ManageOrder";
import NotFound from "@/components/error/NotFound";
import ForgotPassword from "@/components/forgot-password/ForgotPassword";
import ResetPassword from "@/components/forgot-password/ResetPassword";
import OrderFailed from "@/components/orders/OrderFailed";
import OrderSuccess from "@/components/orders/OrderSuccess";
import VnPayCallback from "@/components/orders/VnPayCallback";
import MyOrder from "@/components/user/MyOrder";
import AdminRoute from "@/routes/AdminRoute";
import UserRoute from "@/routes/UserRoute";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProduct from "./components/admin/pages/AddProduct";
import AdminPage from "./components/admin/pages/AdminPage";
import DashBoard from "./components/admin/pages/DashBoard";
import ManageUser from "./components/admin/pages/ManageUser";
import ProductList from "./components/admin/pages/ProductList";
import CartPage from "./components/cart/CartPage";
import { CartProvider } from "./components/context/CartContext";
import HomePage from "./components/home/HomePage";
import Login from "./components/login/Login";
import PrivateRoute from "./components/private-routes/PrivateRoute";
import AllProducts from "./components/products/AllProducts";
import ProductDetail from "./components/products/ProductDetail";
import Register from "./components/register/Register";
import AboutUs from "./components/shop/AboutUs";
import Profile from "./components/user/Profile";
import VerifyEmail from "./components/verify/VerifyEmail";
import VerifyEmailFailed from "./components/verify/VerifyEmailFailed";
import VerifyEmailSuccess from "./components/verify/VerifyEmailSuccess";
import Auth from "@/components/common/Auth";
import PayOSCallback from "@/components/orders/PayOS/PayOSCallback";
import { useEffect, useState } from "react";
import AppLoading from "@/components/common/AppLoading";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  const router = createBrowserRouter([
    {
      path: "verify",
      element: <VerifyEmail />,
    },
    {
      path: "auth",
      element: <Auth />,
    },
    {
      path: "email/verify/success",
      element: <VerifyEmailSuccess />,
    },
    {
      path: "email/verify/failed",
      element: <VerifyEmailFailed />,
    },
    {
      path: "reset/password",
      element: <ResetPassword />,
    },
    {
      path: "order/success",
      element: <OrderSuccess />,
    },
    {
      path: "order/fail",
      element: <OrderFailed />,
    },
    {
      path: "payment-callback",
      element: <VnPayCallback />,
    },
    {
      path: "payos/callback",
      element: <PayOSCallback />,
    },
    {
      path: "/",
      element: <UserRoute />, // The layout wraps the content with Header and Footer
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "about",
          element: <AboutUs />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "product/:id",
          element: <ProductDetail />,
        },
        {
          path: "shop",
          element: <AllProducts />,
        },
        {
          path: "forgot/password",
          element: <ForgotPassword />,
        },
        {
          path: "user",
          element: <PrivateRoute />,
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "cart",
              element: <CartPage />,
            },
            {
              path: "my-orders",
              element: <MyOrder />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminRoute />,
      children: [
        {
          path: "",
          element: <AdminPage />,
        },
        {
          path: "dashboard",
          element: <DashBoard />,
        },
        {
          path: "product/add",
          element: <AddProduct />,
        },
        {
          path: "product/list",
          element: <ProductList />,
        },
        {
          path: "manage/user",
          element: <ManageUser />,
        },
        {
          path: "manage/category",
          element: <ManageCategory />,
        },
        {
          path: "manage/orders",
          element: <ManageOrder />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <CartProvider>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </CartProvider>
  );
}

export default App;
