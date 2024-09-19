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

function Layout() {
  return (
    <AuthProvider>
      <Header />
      <Outlet /> {/* This will render the matched route's component */}
      <Footer />
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
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
