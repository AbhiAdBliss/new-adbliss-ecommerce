import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Grid,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Shipping() {
  const navigate = useNavigate();

  const savedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const [form, setForm] = useState({
    name: savedUser?.name || "",
    email: savedUser?.email || "",
    phone: savedUser?.phone || "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });

  const handleChange = (field) => (e) =>
    setForm({ ...form, [field]: e.target.value });

  const handleContinue = () => {
    navigate("/checkout", {
      state: { form }
    });
  };

  return (
    <Box sx={{  pb: 5, width:700 }}>
      <Typography variant="h4" mb={4}>
        Shipping Details
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Grid container spacing={3}>
          {[
            "name",
            "phone",
            "email",
            "address1",
            "address2",
            "city",
            "state",
            "pincode",
            "country"
          ].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                fullWidth
                required={field !== "address2"}
                label={field}
                value={form[field]}
                onChange={handleChange(field)}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          sx={{ mt: 3, bgcolor: "#2F80ED" }}
          onClick={handleContinue}
        >
           Checkout
        </Button>
      </Paper>
    </Box>
  );
}