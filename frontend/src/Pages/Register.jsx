import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  Alert
} from "@mui/material";
import { Visibility, VisibilityOff, CardGiftcard } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const handleChange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
  };

  const validate = () => {
    let temp = {};
    temp.name = values.name ? "" : "Full Name is required";
    temp.email = values.email
      ? /\S+@\S+\.\S+/.test(values.email)
        ? ""
        : "Email is not valid"
      : "Email is required";
    temp.phone = values.phone ? "" : "Phone Number is required";
    temp.password = values.password.length >= 6 ? "" : "Minimum 6 characters required";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage("");
    setServerError("");

    if (!validate()) return;

    try {
      // 🔥 No unused variable now
      await axios.post("/api/register", values);

      setServerMessage("🎉 Registration Successful! Redirecting to your offer...");

      setValues({
        name: "",
        email: "",
        phone: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/promo/1"); // Redirect to Promo Product Page
      }, 1500);

    } catch (err) {
      if (err.response && err.response.data.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError("Server not responding. Please try again.");
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#b0a9a4",
        display: "flex",
        alignItems: "center",
        py: 4,
        pt: 10,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ borderRadius: 4, overflow: "hidden" }}>
          <Grid container>
            {/* LEFT SIDE */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                background: "linear-gradient(135deg,#fa8d78,#fc95c5)",
                color: "#fff",
                p: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardGiftcard sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Join Us & Get Free Items 🎁
              </Typography>
              <Typography>
                Sign up today and unlock exclusive member-only deals.
              </Typography>
            </Grid>

            {/* RIGHT SIDE FORM */}
            <Grid item xs={12} md={6} sx={{ p: 5 }}>
              <Typography variant="h5" fontWeight="bold" mb={3}>
                Create Account
              </Typography>

              {serverMessage && <Alert severity="success" sx={{ mb: 2 }}>{serverMessage}</Alert>}
              {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  required
                  label="Full Name"
                  margin="normal"
                  value={values.name}
                  onChange={handleChange("name")}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />

                <TextField
                  fullWidth
                  required
                  label="Email Address"
                  type="email"
                  margin="normal"
                  value={values.email}
                  onChange={handleChange("email")}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />

                <TextField
                  fullWidth
                  required
                  label="Phone Number"
                  type="tel"
                  margin="normal"
                  value={values.phone}
                  onChange={handleChange("phone")}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />

                <TextField
                  fullWidth
                  required
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  margin="normal"
                  value={values.password}
                  onChange={handleChange("password")}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ mt: 3, py: 1.5, px: 4, borderRadius: 3 }}
                  >
                    Register & Claim Offer
                  </Button>
                </Box>
              </Box>

              <Typography variant="body2" mt={2}>
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#1976d2", fontWeight: "bold" }}>
                  Login
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
