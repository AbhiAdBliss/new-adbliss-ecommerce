import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer"; // Assuming you have a Footer component
import ScrollToTop from "./Components/ScrollToTop";
import CookieConsent from "./Components/CookieConsent"; // ✅ Added Import

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
import Security from "./Profile/Security";   

import ProtectedRoute from "./Components/ProtectedRoute";
import SpaceLogin from "./Pages/Login";

import LoadingPage from "./Loading/LoadingPage";
import Addresses from "./Profile/Addresses";
import LoyaltyCoupon from "./LoyaltyPages/LoyaltyCoupon";
import LoyaltyCheckout from "./LoyaltyPages/LoyaltyCheckout";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";


const Home = () => (
  <>
    <Hero />
    <HomePage />
    
  </>
);

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Define pages where header/footer should be hidden
  const hideLayout = location.pathname.startsWith("/order-success");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Triggered on path change

  if (loading) return <LoadingPage />;

  

  return (
    <>
      {!hideLayout && <Header />}
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

      <Route path="/order-success/:orderId" element={<OrderSuccess />} />

<Route path="/product/:param/:coupon?" element={<ProductDetails />} />

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<SpaceLogin />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/deal-promo/:id" element={<DealPromo />} />

        <Route path="/loyalty-coupon" element={<LoyaltyCoupon/>} />

        <Route path="/loyalty-checkout/:slug" element={<LoyaltyCheckout/>} />

        <Route path="/about" element={<AboutUs/>} />
        
        <Route path="/contact" element={<ContactUs/>} />


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
          element={<h2 style={{ textAlign: "center", marginTop: "100px" }}>404 Page Not Found</h2>}
        />
      </Routes>

      {!hideLayout && <Footer />}

      {/* ✅ GLOBALLY ACCESSIBLE COOKIE BANNER */}
      <CookieConsent />
    </>
  );
}

export default function App() {
  return <AppContent />;
}