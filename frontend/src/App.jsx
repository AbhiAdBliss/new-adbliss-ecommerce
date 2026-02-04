import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Hero from "./Pages/Hero";
// import CategoriesSection from "./Pages/CategoriesSection";
import AppleSection from "./Pages/AppleSection";
import Deals from "./Pages/Deals";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PromoRegister from "./Pages/PromoRegister";
import DealPromo from "./Pages/DealPromo";


const Home = () => (
  <>
    <Hero />
    {/* <CategoriesSection /> */}
    <AppleSection />
    <Deals />
  </>
);

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/promo/:id" element={<PromoRegister />} />
        <Route path="/promo/:id" element={<DealPromo/>} />
      </Routes>
    </>
  );
};

export default App;
