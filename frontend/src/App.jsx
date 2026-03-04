import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./Components/Header";
import ScrollToTop from "./Components/ScrollToTop";

import Hero from "./Pages/Hero";
import HomePage from "./Pages/HomePage";
import Register from "./Pages/Register";
import DealPromo from "./Pages/DealPromo";
import ProductDetails from "./Pages/ProductDetails";
import AppleSection from "./Pages/AppleSection";
import Checkout from "./Pages/Checkout";
import OrderSuccess from "./Pages/OrderSuccess";
import ForgotPassword from "./Pages/ForgotPassword";
import Profile from "./Profile/Profile";
import Orders from "./Profile/Orders";
import Security from "./Profile/Security";   // ✅ FIXED IMPORT

import ProtectedRoute from "./Components/ProtectedRoute";
import SpaceLogin from "./Pages/Login";

import LoadingPage from "./Loading/LoadingPage";
import Addresses from "./Profile/Addresses";

const Home = () => (
  <>
    <Hero />
    <HomePage />
  </>
);

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const hideHeader = location.pathname === "/order-success";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [location]);

  if (loading) return <LoadingPage />;

  return (
    <>
      {!hideHeader && <Header />}
      <ScrollToTop />

      <Routes>
        <Route path="/apple" element={<AppleSection />} />

        {/* ================= CHECKOUT (PROTECTED) ================= */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<SpaceLogin />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/deal-promo/:id" element={<DealPromo />} />

        {/* ================= PROFILE (PROTECTED) ================= */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ================= ORDERS (PROTECTED) ================= */}
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        {/* ================= SECURITY PAGE (PROTECTED) ================= */}
        <Route
          path="/security"
          element={
            <ProtectedRoute>
              <Security />
            </ProtectedRoute>
          }
        />
        {/* ================= Addresses (PROTECTED) ================= */}
        <Route
          path="/addresses"
          element={
            <ProtectedRoute>
              <Addresses/>
            </ProtectedRoute>
          }
        />

        {/* ================= 404 ================= */}
        <Route
          path="*"
          element={<h2 style={{ textAlign: "center" }}>404 Page Not Found</h2>}
        />
      </Routes>
    </>
  );
}

export default function App() {
  return <AppContent />;
}