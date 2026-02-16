import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  Alert,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field) => (e) => {
    setData({ ...data, [field]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://13.233.120.37:5000/api/login",
        data
      );

      // ✅ SAVE USER
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ TRIGGER HEADER UPDATE
      window.dispatchEvent(new Event("userUpdated"));

      // ✅ REDIRECT
      navigate("/apple");

    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", bgcolor: "#f6eee6" }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>

          <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
            Welcome Back 👋
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleLogin}>

            {/* EMAIL */}
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              value={data.email}
              onChange={handleChange("email")}
            />

            {/* PASSWORD */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              value={data.password}
              onChange={handleChange("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
              Login
            </Button>

          </Box>

          <Typography mt={2} textAlign="center">
            New user? <Link to="/register">Register</Link>
          </Typography>

        </Paper>
      </Container>
    </Box>
  );
}
