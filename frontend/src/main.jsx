import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import CartProvider from "./context/CartProvider";
import "./index.css";

const GOOGLE_CLIENT_ID =
  "868957802350-prb3kfmdi24u4ch1ofj7q6q4ddibulin.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);