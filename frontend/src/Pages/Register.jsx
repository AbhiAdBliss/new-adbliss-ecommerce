import React, { useState } from "react";
import API from "../api";   
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Alert,
  Backdrop,
  CircularProgress,
  Stack
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google"; ❌ commented

export default function Register({ isEmbedded = false }) { // ✅ ADDED PROP
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    // confirmPassword: "", ❌ commented
  });

  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  // 🔥 ADDED LOADER STATE
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
  };

  // ❌ GOOGLE LOGIN COMMENTED
  /*
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await axios.post("/api/google-register", {
        credential: credentialResponse.credential,
      });

      setServerMessage("Google Signup Successful 🎉");

      setTimeout(() => {
        navigate("/apple", { state: { user: res.data.user } });
      }, 1000);
    } catch {
      setServerError("Google signup failed");
    }
  };
  */

  // ✅ VALIDATION
  const validate = () => {
    if (!values.name) return "Full Name is required";
    if (!/\S+@\S+\.\S+/.test(values.email)) return "Invalid Email";
    if (!/^[0-9]{10}$/.test(values.phone)) return "Phone must be 10 digits";
    if (values.password.length < 6)
      return "Password must be at least 6 characters";
    return "";
  };

  // ❌ OTP FUNCTIONS COMMENTED
  /*
  const sendOtp = async () => {};
  const verifyOtp = async () => {};
  */

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setServerMessage("");

    const error = validate();
    if (error) {
      setServerError(error);
      return;
    }

    try {

      // 🔥 START LOADER
      setLoading(true);

      const res = await API.post("/api/register", {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        isVerified: true, // bypass OTP
      });

      setServerMessage("🎉 Registration Successful!");

      // 🔥 ✅ ADD THIS (IMPORTANT)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setTimeout(() => {
        navigate("/apple", { state: { user: res.data.user } });
      }, 1200);

    } catch (err) {
      console.error(err); // 🔥 added for debugging
      setServerError("Server error");
    } finally {

      // 🔥 STOP LOADER
      setLoading(false);
    }
  };

  return (
    <>

      {/* 🔥 REGISTER PROCESSING LOADER */}
      <Backdrop
        open={loading}
        sx={{
          color: "#fff",
          zIndex: 9999,
          backgroundColor: "rgba(0,0,0,0.85)",
        }}
      >
        <Stack spacing={3} alignItems="center">
          <ShoppingBagIcon
            sx={{
              fontSize: 60,
              color: "#1976d2",
              animation: "pulse 1.5s infinite",
            }}
          />

          <Typography variant="h5">
            Creating your account...
          </Typography>

          <CircularProgress
            size={45}
            thickness={4}
            sx={{ color: "#1976d2" }}
          />
        </Stack>
      </Backdrop>

      <Box
        sx={{
          "@keyframes pulse": {
            "0%": { transform: "scale(1)" },
            "50%": { transform: "scale(1.15)" },
            "100%": { transform: "scale(1)" }
          },
          pt: 4,
          background: "#f4f4f4",
          pb: 10,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          minHeight: isEmbedded ? "auto" : "100vh",
        }}
      >
        <Container maxWidth="sm">
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Typography variant="h4" textAlign="center">
              Register
            </Typography>

            {serverMessage && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {serverMessage}
              </Alert>
            )}
            {serverError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {serverError}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              
              {/* ❌ GOOGLE LOGIN COMMENTED */}
              {/*
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setServerError("Google login failed")}
                />
              </Box>
              */}

              <TextField
                fullWidth
                label="Name"
                margin="normal"
                value={values.name}
                onChange={handleChange("name")}
              />

              <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={values.email}
                onChange={handleChange("email")}
              />

              {/* ❌ OTP BUTTON COMMENTED */}
              {/*
              <Button onClick={sendOtp}>
                Send OTP
              </Button>
              */}

              <TextField
                fullWidth
                label="Phone"
                margin="normal"
                value={values.phone}
                onChange={handleChange("phone")}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={values.password}
                onChange={handleChange("password")}
              />

              {/* ❌ CONFIRM PASSWORD COMMENTED */}
              {/*
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                margin="normal"
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
              />
              */}

              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "150px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    bgcolor: "#100e0eff",
                  }}
                >
                  Register
                </Button>
              </Box>
            </Box>

            <Typography mt={2} textAlign="center">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Paper>
        </Container>
      </Box>
    </>
  );
}