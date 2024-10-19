import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import SideBar from "./components/admin/layout/SideBar";
import AddProduct from "./components/admin/pages/AddProduct";
import AdminPage from "./components/admin/pages/AdminPage";
import DashBoard from "./components/admin/pages/DashBoard";
import ManageUser from "./components/admin/pages/ManageUser";
import ProductList from "./components/admin/pages/ProductList";
import { AuthProvider } from "./components/auth/AuthContext";
import CartPage from "./components/cart/CartPage";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
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
import VerifyEmailSuccess from "./components/verify/VerifyEmailSuccess";
import VerifyEmailFailed from "./components/verify/VerifyEmailFailed";
import ForgotPassword from "@/components/forgot-password/ForgotPassword";
import NotFound from "@/components/error/NotFound";
import ResetPassword from "@/components/forgot-password/ResetPassword";
import ManageCategory from "@/components/admin/pages/ManageCategory";
import { Toaster } from "react-hot-toast";

function Layout() {
  const user = JSON.parse(localStorage.getItem("accessToken"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const decodedUser = jwtDecode(user);
      if (decodedUser.roles[0] !== "ROLE_USER") {
        navigate("/");
      }
    }
  }, []);
  return (
    <AuthProvider>
      <Header />
      <Outlet /> {/* This will render the matched route's component */}
      <Footer />
    </AuthProvider>
  );
}

function AdminLayout() {
  const user = JSON.parse(localStorage.getItem("accessToken"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const decodedUser = jwtDecode(user);
      if (decodedUser.roles[0] !== "ROLE_ADMIN") {
        navigate("/");
      }
    }
  }, []);

  return (
    <AuthProvider>
      <div className="flex">
        <div className="flex-col h-screen">
          <SideBar />
        </div>
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto h-screen">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "verify",
      element: <VerifyEmail />,
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
      path: "/",
      element: <Layout />, // The layout wraps the content with Header and Footer
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
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
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
