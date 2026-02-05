import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import ScrollToTop from "./Components/ScrollToTop";

import Hero from "./Pages/Hero";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import DealPromo from "./Pages/DealPromo";
import ProductDetails from "./Pages/ProductDetails";   
import LoadingScreen from "./Pages/LoadingScreen";
import AppleSection from "./Pages/AppleSection";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";


const Home = () => (
  <>
    <Hero />
    <HomePage />
  </>
);

const App = () => {
  return (
    <>
      <Header />
      <ScrollToTop />

      <Routes>
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/apple" element={<AppleSection />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* ⭐ NEW PRODUCT DETAILS PAGE */}
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/deal-promo/:id" element={<DealPromo />} />
       
      </Routes>
    </>
  );
};

export default App;
