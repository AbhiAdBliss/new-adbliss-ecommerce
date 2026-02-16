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
import {
  Visibility,
  VisibilityOff,
  CardGiftcard,
  Refresh
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const generateCaptchaCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const [captcha, setCaptcha] = useState(() => generateCaptchaCode());

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    captchaInput: ""
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

    temp.phone = /^[0-9]{10}$/.test(values.phone)
      ? ""
      : "Phone number must be exactly 10 digits";

    temp.password =
      values.password.length >= 6 ? "" : "Minimum 6 characters required";

    temp.confirmPassword =
      values.password === values.confirmPassword
        ? ""
        : "Passwords do not match";

    temp.captchaInput =
      values.captchaInput === captcha ? "" : "Captcha does not match";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage("");
    setServerError("");

    if (!validate()) return;

    try {
      await axios.post("http://13.233.120.37:5000/api/register", {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password
      });

      setServerMessage("🎉 Registration Successful! Redirecting...");
      setValues({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        captchaInput: ""
      });

      setCaptcha(generateCaptchaCode());

      setTimeout(() => {
        navigate("/loading");
      }, 1500);

    } catch (err) {
      setServerError(err.response?.data?.message || "Server not responding.");
    }
  };

  return (
    <Box sx={{background: "#836a4e",}}>
  <Typography variant="h4" color="white" fontWeight="bold" sx={{pt:5 , textAlign:'center' , fontSize: { xs: "1.5rem", md: "2rem" },}}>
Unlock the Adbliss Experience 🚀
      </Typography>
    
      <Box
        sx={{
          minHeight: "100vh",
          background: "#836a4e",
          display: "flex",
          alignItems: "center",
          py: 4,
          pt: 5,
          pb: 20
        }}
      >
        
        <Container maxWidth="sm">
          <Paper elevation={6} sx={{ borderRadius: 4, overflow: "hidden" }}>
            <Grid container>
              <Grid
                item xs={12} md={6}
                sx={{
                  background: "linear-gradient(135deg,#fa8d78,#fc95c5)",
                  color: "#fff",
                  p: 5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <CardGiftcard sx={{ fontSize: 50, mb: 2 }} />
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Join Us & Get Free Items 🎁
                </Typography>
                <Typography>
                  Sign up today and unlock exclusive deals.
                </Typography>
              </Grid>

              <Grid item xs={12} md={6} sx={{ p: 5 }}>
                <Typography variant="h5" fontWeight="bold" mb={3}>
                  Create Account
                </Typography>

                {serverMessage && <Alert severity="success" sx={{ mb: 2 }}>{serverMessage}</Alert>}
                {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField fullWidth required label="Full Name" margin="normal"
                    value={values.name} onChange={handleChange("name")}
                    error={Boolean(errors.name)} helperText={errors.name} />

                  <TextField fullWidth required label="Email Address" type="email" margin="normal"
                    value={values.email} onChange={handleChange("email")}
                    error={Boolean(errors.email)} helperText={errors.email} />

                  <TextField fullWidth required label="Phone Number" type="tel" margin="normal"
                    value={values.phone} onChange={handleChange("phone")}
                    error={Boolean(errors.phone)} helperText={errors.phone} />

                  {/* NEW PASSWORD */}
                  <TextField fullWidth required label="New Password"
                    type={showPassword ? "text" : "password"} margin="normal"
                    value={values.password} onChange={handleChange("password")}
                    error={Boolean(errors.password)} helperText={errors.password}
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

                  {/* CONFIRM PASSWORD */}
                  <TextField fullWidth required label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"} margin="normal"
                    value={values.confirmPassword} onChange={handleChange("confirmPassword")}
                    error={Boolean(errors.confirmPassword)} helperText={errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* CAPTCHA */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
                    <Typography sx={{
                      fontWeight: "bold",
                      fontSize: "20px",
                      letterSpacing: "3px",
                      bgcolor: "#eee",
                      px: 2,
                      py: 1,
                      borderRadius: 1
                    }}>
                      {captcha}
                    </Typography>
                    <IconButton onClick={() => setCaptcha(generateCaptchaCode())}>
                      <Refresh />
                    </IconButton>
                  </Box>

                  <TextField fullWidth required label="Enter Captcha" margin="normal"
                    value={values.captchaInput} onChange={handleChange("captchaInput")}
                    error={Boolean(errors.captchaInput)} helperText={errors.captchaInput} />

                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button type="submit" variant="contained" size="large"
                      sx={{ mt: 3, py: 1.5, px: 4, borderRadius: 3 }}>
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

      
    </Box>
  );
}
