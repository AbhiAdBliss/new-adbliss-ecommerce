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
    <GoogleOAuthProvider clientId="868957802350-prb3kfmdi24u4ch1ofj7q6q4ddibulin.apps.googleusercontent.com"> {/* ✅ ADD THIS */}
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);