import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import HomePage from "./components/home/HomePage";
import Login from "./components/login/Login";
import ProductDetail from "./components/products/ProductDetail";
import AboutUs from "./components/shop/AboutUs";
import { AuthProvider } from "./components/auth/AuthContext";
import React from "react";
import Logout from "./components/logout/Logout";
import Register from "./components/register/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
