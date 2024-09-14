import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import HomePage from "./components/home/HomePage";
import Login from "./components/login/Login";
import ProductDetail from "./components/products/ProductDetail";
import AboutUs from "./components/shop/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
