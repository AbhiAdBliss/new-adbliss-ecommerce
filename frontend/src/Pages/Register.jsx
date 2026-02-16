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
  Refresh
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ CAPTCHA (FIXED - no useEffect)
  const generateCaptchaCode = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const [captcha, setCaptcha] = useState(generateCaptchaCode);

  // ✅ FORM DATA
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

  // ✅ PASSWORD STRENGTH
  const getPasswordStrength = (password) => {
    if (password.length < 6) return { label: "Weak", color: "red" };
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/))
      return { label: "Strong", color: "green" };
    return { label: "Medium", color: "orange" };
  };

  const strength = getPasswordStrength(values.password);

  // ✅ VALIDATION
  const validate = () => {
    let temp = {};

    temp.name = values.name ? "" : "Full Name is required";

    temp.email = values.email
      ? /\S+@\S+\.\S+/.test(values.email)
        ? ""
        : "Invalid Email"
      : "Email is required";

    temp.phone = /^[0-9]{10}$/.test(values.phone)
      ? ""
      : "Phone must be 10 digits";

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

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage("");
    setServerError("");

    if (!validate()) return;

    try {
      const res = await axios.post(
        "http://13.233.120.37:5000/api/register",
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password
        }
      );

      // ✅ SAVE USER (IMPORTANT)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setServerMessage("🎉 Registration Successful!");

      // RESET FORM
      setValues({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        captchaInput: ""
      });

      setCaptcha(generateCaptchaCode());

      // REDIRECT
      setTimeout(() => {
        navigate("/apple");
      }, 1200);

    } catch (err) {
      setServerError(err.response?.data?.message || "Server not responding");
    }
  };

  return (
    <Box sx={{ background: "#836a4e", minHeight: "100vh" , pt:3 }}>
      <Box sx={{ display: "flex", alignItems: "center", py: 4 }}>
        <Container maxWidth="sm">
          <Paper elevation={6} sx={{ borderRadius: 4 }}>
            <Grid container>
              <Grid item xs={12} sx={{ p: 3 }}>

                {/* TITLE */}
                <Typography variant="h4" fontWeight="bold" textAlign="center">
                  Unlock Your Adbliss Account
                </Typography>

                <Typography
                  variant="body2"
                  textAlign="center"
                  color="text.secondary"
                  mt={1}
                >
                  Join now and explore exclusive deals & offers
                </Typography>

                {/* ALERTS */}
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

                {/* FORM */}
                <Box component="form" onSubmit={handleSubmit}>

                  <TextField
                    fullWidth
                    label="Full Name"
                    margin="normal"
                    value={values.name}
                    onChange={handleChange("name")}
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={values.email}
                    onChange={handleChange("email")}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                  />

                  <TextField
                    fullWidth
                    label="Phone"
                    margin="normal"
                    value={values.phone}
                    onChange={handleChange("phone")}
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                  />

                  {/* PASSWORD */}
                  <TextField
                    fullWidth
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
                          <IconButton
                            onClick={() =>
                              setShowPassword(!showPassword)
                            }
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />

                  {/* PASSWORD STRENGTH */}
                  {values.password && (
                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: strength.color,
                        fontWeight: "bold",
                        mt: -1,
                        mb: 1
                      }}
                    >
                      Strength: {strength.label}
                    </Typography>
                  )}

                  {/* CONFIRM PASSWORD */}
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    margin="normal"
                    value={values.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />

                  {/* CAPTCHA */}
                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        bgcolor: "#eee",
                        px: 2,
                        py: 1
                      }}
                    >
                      {captcha}
                    </Typography>

                    <IconButton
                      onClick={() =>
                        setCaptcha(generateCaptchaCode())
                      }
                    >
                      <Refresh />
                    </IconButton>
                  </Box>

                  <TextField
                    fullWidth
                    label="Enter Captcha"
                    margin="normal"
                    value={values.captchaInput}
                    onChange={handleChange("captchaInput")}
                    error={Boolean(errors.captchaInput)}
                    helperText={errors.captchaInput}
                  />

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3 }}
                  >
                    Register
                  </Button>
                </Box>

                <Typography mt={2}>
                  Already have an account?{" "}
                  <Link to="/login">Login</Link>
                </Typography>

              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
