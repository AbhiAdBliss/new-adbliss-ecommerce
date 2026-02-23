import { StrictMode } from "react";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ ADD THIS
import App from "./App";
import CartProvider from "./context/CartProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> {/* ✅ ADD THIS */}
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);