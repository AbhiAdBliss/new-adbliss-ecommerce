import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
  Divider
} from "@mui/material";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price.replace(/,/g, "")) * item.quantity,
    0
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: ""
  });

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleOrder = (e) => {
    e.preventDefault(); // stop refresh
    navigate("/order-success"); // only runs if HTML validation passes
  };

  return (
    <Box sx={{ mt: 10, px: { xs: 2, md: 6 }, pb: 8, pt: 10, bgcolor: "#f5f5f5" }}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        Checkout
      </Typography>

      <form onSubmit={handleOrder}>
        <Grid container spacing={4} alignItems="flex-start">

          {/* 🟢 LEFT SIDE */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 3, mb: 4 }}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Shipping Address
              </Typography>

              <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    required
                    value={form.name}
                    onChange={handleChange("name")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    required
                    type="tel"
                    inputProps={{ pattern: "[0-9]{10}" }}
                    helperText="Enter 10 digit mobile number"
                    value={form.phone}
                    onChange={handleChange("phone")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    required
                    type="tel"
                    inputProps={{ pattern: "[0-9]{6}" }}
                    helperText="Enter 6 digit pincode"
                    value={form.pincode}
                    onChange={handleChange("pincode")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    required
                    value={form.city}
                    onChange={handleChange("city")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State"
                    required
                    value={form.state}
                    onChange={handleChange("state")}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Street Address"
                    required
                    multiline
                    rows={3}
                    value={form.address}
                    onChange={handleChange("address")}
                  />
                </Grid>

              </Grid>
            </Paper>

            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Payment Method
              </Typography>
              <Typography color="text.secondary">💳 Credit / Debit Card</Typography>
              <Typography color="text.secondary">📱 UPI / Wallet</Typography>
              <Typography color="text.secondary">💵 Cash on Delivery</Typography>
            </Paper>
          </Grid>

          {/* 🔵 RIGHT SIDE */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, borderRadius: 3, position: "sticky", top: 100 }}>
              <Typography variant="h6" fontWeight={600} mb={3}>
                Price Details
              </Typography>

              {cartItems.map(item => (
                <Box key={item.id} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{ width: 60, height: 60, objectFit: "contain", mr: 2 }}
                  />
                  <Box>
                    <Typography variant="body2">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Qty: {item.quantity}
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>₹{total.toLocaleString()}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Delivery</Typography>
                <Typography color="green">Free</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">₹{total.toLocaleString()}</Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                sx={{ mt: 2, bgcolor: "#c0974b" }}
              >
                Place Order
              </Button>
            </Paper>
          </Grid>

        </Grid>
      </form>
    </Box>
  );
}
