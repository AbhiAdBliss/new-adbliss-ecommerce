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
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Register({ isEmbedded = false }) {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [serverMessage, setServerMessage] = useState("");
  const [serverError, setServerError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
  };

  const validate = () => {
    if (!values.name) return "Full Name is required";
    if (!/\S+@\S+\.\S+/.test(values.email)) return "Invalid Email";
    if (!/^[0-9]{10}$/.test(values.phone)) return "Phone must be 10 digits";
    if (values.password.length < 6)
      return "Password must be at least 6 characters";
    return "";
  };

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

      setLoading(true);

      const res = await API.post("/api/register", {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        isVerified: true,
      });

      setServerMessage("🎉 Registration Successful!");

      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("userUpdated"));

      setTimeout(() => {
        navigate("/apple", { state: { user: res.data.user } });
      }, 1200);

    } catch (err) {
      console.error(err);
      setServerError(
        err.response?.data?.message || "Registration failed ❌"
      );
    } finally {
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
              fontSize: {
                xs: 40,
                sm: 50,
                md: 60,
              },
              color: "#1976d2",
              animation: "pulse 1.5s infinite",
            }}
          />

          <Typography
            variant="h5"
            sx={{
              fontSize: {
                xs: "18px",
                sm: "20px",
                md: "24px",
              },
            }}
          >
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

          pt: { xs: 2, sm: 4 },
          pb: { xs: 6, sm: 10 },
          px: { xs: 2, sm: 0 },

          background: "#d8d7d7ff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",

          minHeight: isEmbedded ? "auto" : "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            mt: { xs: 3, sm: 6 },
          }}
        >
          <Paper
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 4,
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight={700}
              sx={{
                fontSize: {
                  xs: "26px",
                  sm: "30px",
                  md: "34px",
                },
              }}
            >
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

            <Box component="form" onSubmit={handleSubmit} mt={2}>

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
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={values.password}
                onChange={handleChange("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 3,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "200px",
                    },
                    borderRadius: "10px",
                    fontWeight: "bold",
                    bgcolor: "#100e0eff",
                    py: 1.2,
                  }}
                >
                  Register
                </Button>
              </Box>
            </Box>

            <Typography
              mt={2}
              textAlign="center"
              sx={{
                fontSize: {
                  xs: "14px",
                  sm: "15px",
                },
              }}
            >
              Already have an account? <Link to="/login">Login</Link>
            </Typography>

          </Paper>
        </Container>
      </Box>
    </>
  );
}