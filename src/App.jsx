import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import HomePage from "./components/home/HomePage";
import Login from "./components/login/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
