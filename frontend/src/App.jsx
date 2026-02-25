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

import Profile from "./Pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import SpaceLogin from "./Pages/Login";

const Home = () => (
  <>
    <Hero />
    <HomePage />
  </>
);

function AppContent() {
  const location = useLocation();

  const hideHeader = location.pathname === "/order-success";

  return (
    <>
      {!hideHeader && <Header />}
      <ScrollToTop />

      <Routes>
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/apple" element={<AppleSection />} />

        {/* 🔒 PROTECTED CHECKOUT */}
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

        {/* ✅ LOGIN FIX */}
        <Route path="/login" element={<SpaceLogin/>} />

        <Route path="/register" element={<Register />} />
        <Route path="/deal-promo/:id" element={<DealPromo />} />

        {/* 🔒 PROFILE */}
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