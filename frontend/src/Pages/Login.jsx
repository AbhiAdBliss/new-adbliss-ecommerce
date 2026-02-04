import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Typography,
  Button,
  Paper,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#141e30,#243b55)",
        display: "flex",
        alignItems: "center"
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ p: 5, borderRadius: 4 }}>
          <Typography variant="h5" fontWeight="bold" mb={3} align="center">
            Welcome Back 👋
          </Typography>

          {/* FORM START */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              margin="normal"
              required
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, py: 1.5, borderRadius: 3 }}
            >
              Login
            </Button>
          </Box>
          {/* FORM END */}

          <Typography variant="body2" mt={2} textAlign="center">
            Don’t have an account?{" "}
            <Link to="/register" style={{ color: "#1976d2", fontWeight: "bold" }}>
              Register Now
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
