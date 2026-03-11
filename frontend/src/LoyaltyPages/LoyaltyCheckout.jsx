import React from "react";
import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";
import { loyaltyProducts } from "../data/loyaltyProducts";
import Register from "../Pages/Register";
import Coupn from "../assets/AppleS-imgs/coupn-img.png";

const API_BASE =
  import.meta.env.MODE === "development" ? "" : "https://shopnbliss.com";

export default function LoyaltyCheckout() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = loyaltyProducts.find((p) => p.slug === slug);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!user;
  // ✅ check if coupon already redeemed
  const alreadyRedeemed =
    user?.redeemedCoupons?.includes(product?.slug) ?? false;

  const [authError, setAuthError] = useState("");
  const [openAuthToast, setOpenAuthToast] = useState(false);

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5">Product not found</Typography>
      </Box>
    );
  }

  const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

  const handleRedeem = async () => {
    console.log("Redeem button clicked");

    if (!isLoggedIn) {
      setAuthError("🔐 Please login or register first");
      setOpenAuthToast(true);
      return;
    }

    // ❌ block if coupon already redeemed
    if (alreadyRedeemed) {
      alert("You already redeemed this coupon");
      return;
    }

    try {
      // ✅ prevent multiple Razorpay popups
      if (window.rzpOpened) return;
      window.rzpOpened = true;

      // create order
      const orderRes = await fetch(`${API_BASE}/api/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: product.price,
        }),
      });

      console.log("Order response:", orderRes);

      const order = await orderRes.json();
      console.log("Order data:", order);

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Shopnbliss",
        description: "Loyalty Coupon Purchase",

        handler: async function (response) {
          const verifyRes = await fetch(`${API_BASE}/api/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user.id,
              amount: product.price,
              couponSlug: product.slug,
            }),
          });

          const data = await verifyRes.json();

          if (data.success) {
            const updatedUser = {
              ...user,
              coins: data.coins,
              redeemedCoupons: [...(user.redeemedCoupons || []), product.slug],
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));
            window.dispatchEvent(new Event("userUpdated"));

            sessionStorage.setItem("orderSuccess", "true");

            const orderId = "ORD" + Date.now();

            window.rzpOpened = false; // ✅ ADD THIS

            navigate(`/order-success/${orderId}`);
          }
        }, // ✅ IMPORTANT: comma here

        modal: {
          ondismiss: function () {
            console.log("Payment cancelled");
            window.rzpOpened = false;
            alert("Payment cancelled");
          },
        },

        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },

        theme: {
          color: "#f59e0b",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
      window.rzpOpened = false;
    }
  };

  return (
    <Box sx={{ bgcolor: "#F5F7FA", minHeight: "100vh", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* PRODUCT IMAGE */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: { xs: 2, md: 4 },
                borderRadius: 4,
                textAlign: "center",
                bgcolor: "#fcf8e3",
                border: "1px solid #d4c8a4",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* COUPON RIBBON */}
              <Box
                sx={{
                  position: "absolute",
                  top: 35,
                  left: -35,
                  transform: "rotate(-45deg)",
                  bgcolor: "#f7e895",
                  color: "#000",
                  width: "190px",
                  py: 0.6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.5,
                  border: "1px solid #eab308",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                }}
              >
                <Box
                  component="img"
                  src={Coupn}
                  alt="coupon"
                  sx={{ width: 12, height: 13 }}
                />

                <Typography
                  sx={{
                    fontSize: "10px",
                    fontWeight: 900,
                    textTransform: "uppercase",
                  }}
                >
                  Loyalty Coupon
                </Typography>
              </Box>

              <Box
                component="img"
                src={product.image}
                sx={{
                  width: "100%",
                  maxWidth: 350,
                  objectFit: "contain",
                }}
              />
              
            </Paper>
<Typography
  sx={{
    mt: { xs: 1.5, md: 2 },
    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.2rem" },
    color: "#444444ff",
    textAlign: "center",
    px: { xs: 1.5, sm: 2 },
    width: { xs: "100%", sm: "90%", md: 340 },
    mx: "auto",
    lineHeight: 1.5
  }}
>
  Purchase this Loyalty Coupon to earn reward coins that can be used for discounts on future orders.
</Typography>



            {/* DESKTOP BUTTON */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                onClick={handleRedeem}
                disabled={alreadyRedeemed}
                sx={{
                  py: 1.5,
                  fontWeight: 700,
                  width: "100%",
                  maxWidth: 280,
                  borderRadius: "12px",
                  background: "linear-gradient(90deg,#facc15,#f59e0b)",
                  color: "#000",
                  boxShadow: "0 8px 20px rgba(245,158,11,0.35)",
                  "&:hover": {
                    background: "linear-gradient(90deg,#eab308,#d97706)",
                  },
                }}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>
         

          {/* PRODUCT DETAILS */}
          <Grid item xs={12} md={isLoggedIn ? 8 : 4}>
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", md: 300 },
                mx: { xs: "auto", md: 0 },
              }}
            >
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.3rem",
                    md: "1.5rem",
                    lg: "1.6rem",
                  },
                  textAlign: { xs: "center", md: "left" },
                  lineHeight: 1.3,
                }}
              >
                {product.name}
              </Typography>

              {authError && (
                <Typography sx={{ color: "red", mt: 1 }}>
                  {authError}
                </Typography>
              )}

              {/* NOTE BOX */}
              <Typography
                sx={{
                  mt: { xs: 2, md: 2 },
                  p: { xs: 1.8, sm: 2 },
                  borderRadius: "8px",
                  bgcolor: "#fff7ed",
                  border: "1px solid #f59e0b",
                  fontSize: { xs: "0.85rem", sm: "0.9rem", md: "0.95rem" },
                  color: "#7c2d12",
                  lineHeight: { xs: 1.5, md: 1.6 },
                  width: { xs: "80%", sm: "95%", md: "80%" },
                  mx: { xs: "auto", md: 0 },
                  textAlign: { xs: "center", sm: "center", md: "left" },
                }}
              >
                <b>Note:</b> This is not a physical product. By redeeming this
                item you will receive a <b>Loyalty Coupon</b> credited to your
                account. The coupon allows you to earn
                <b> {product.price} loyalty coins</b> which can later be
                redeemed when purchasing eligible physical products.
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="h6"
                fontWeight={900}
                sx={{
                  fontSize: { xs: "1.8rem", md: "2rem" },
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                ₹{product.price}
              </Typography>


              {alreadyRedeemed && (
                <Typography sx={{ color: "red", mt: 1 }}>
                  You have already redeemed this coupon
                </Typography>
              )}

              {/* MOBILE BUTTON */}


              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                
                <Button
                  variant="contained"
                  sx={{
                    py: 1.5,
                    fontWeight: 700,
                    width: "100%",
                    maxWidth: 280,
                    borderRadius: "12px",
                    background: "linear-gradient(90deg,#facc15,#f59e0b)",
                    color: "#000",
                    boxShadow: "0 8px 20px rgba(245,158,11,0.35)",
                    "&:hover": {
                      background: "linear-gradient(90deg,#eab308,#d97706)",
                    },
                  }}
                >
                  {alreadyRedeemed ? "Redeemed" : "Redeem Now"}
                </Button>
                
              </Box>

              <Divider sx={{ my: 2 }} />

              {product.features.map((f, i) => (
                <Typography
                  key={i}
                  sx={{ mb: 1, textAlign: { xs: "center", sm: "left" } }}
                >
                  • {f}
                </Typography>
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography
                sx={{
                  mt: 2,
                  fontWeight: 800,
                  color: "#f59e0b",
                  fontSize: "1.2rem",
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                Earn {product.price} Loyalty Coins
              </Typography>

              <Divider sx={{ my: 3 }} />

              {isLoggedIn && (
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      color: "#7c3aed",
                      mb: 1,
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    Loyalty Reward Program
                  </Typography>

                  <Typography
                    sx={{
                      color: "#555",
                      mb: 1.5,
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    Redeem this exclusive loyalty coupon and earn
                    <b> {product.price} reward coins</b> instantly after
                    completing your purchase.
                  </Typography>

                  <Typography
                    sx={{
                      color: "#555",
                      mb: 1.5,
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    These reward coins can be redeemed during checkout to
                    receive discounts on future orders across our store.
                  </Typography>

                  <Typography
                    sx={{
                      color: "#555",
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    Coins are credited to your account once the purchase of the
                    physical product is successfully completed and confirmed.
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

          {/* REGISTER */}
          {!isLoggedIn && (
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  border: "1px solid #e4e3e3",
                  bgcolor: "#fafafa",
                  borderRadius: 4,
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <Register isEmbedded />
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>

      <Snackbar
        open={openAuthToast}
        autoHideDuration={3000}
        onClose={() => setOpenAuthToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenAuthToast(false)}
          severity="warning"
          variant="filled"
          sx={{
            width: "100%",
            borderRadius: 3,
            fontWeight: 500,
          }}
        >
          {authError}
        </Alert>
      </Snackbar>
    </Box>
  );
}
