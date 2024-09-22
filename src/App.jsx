import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import Login from "./components/login/Login";
import PrivateRoute from "./components/private-routes/PrivateRoute";
import ProductDetail from "./components/products/ProductDetail";
import Register from "./components/register/Register";
import AboutUs from "./components/shop/AboutUs";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { AuthProvider } from "./components/auth/AuthContext";
import Profile from "./components/user/Profile";
import SideBar from "./components/admin/layout/SideBar";
import DashBoard from "./components/admin/pages/DashBoard";
import AdminPage from "./components/admin/pages/AdminPage";
import AddProduct from "./components/admin/pages/AddProduct";
import ProductList from "./components/admin/pages/ProductList";
import ManageUser from "./components/admin/pages/ManageUser";

function Layout() {
  return (
    <AuthProvider>
      <Header />
      <Outlet /> {/* This will render the matched route's component */}
      <Footer />
    </AuthProvider>
  );
}

function AdminLayout() {
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
          path: "user",
          element: <PrivateRoute />,
          children: [
            {
              path: "profile",
              element: <Profile />,
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
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
