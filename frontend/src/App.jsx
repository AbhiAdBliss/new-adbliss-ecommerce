import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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

// ✅ NEW IMPORTS
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";

const Home = () => (
  <>
    <Hero />
    <HomePage />
  </>
);

function AppContent() {
  const location = useLocation();

  // ❌ Hide header only on order success page
  const hideHeader = location.pathname === "/order-success";

  return (
    <>
      {!hideHeader && <Header />}
      <ScrollToTop />

      <Routes>
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/apple" element={<AppleSection />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/deal-promo/:id" element={<DealPromo />} />

        {/* 🔒 PROTECTED PROFILE */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return <AppContent />;
}
