import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useNavigate } from "react-router-dom";

const Security = () => {
  const navigate = useNavigate();
  
  // Get user from local storage to show their current info
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [showPassword, setShowPassword] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    profilePublic: true,
    twoStep: false,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", py: { xs: 4, md: 10 }}}>
      <Container maxWidth="sm">
        
        {/* HEADER */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
          <IconButton onClick={() => navigate("/profile")} sx={{ color: "#121212" }}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 800, color: "#121212", letterSpacing: -1 }}>
            Security & Privacy
          </Typography>
        </Stack>

        <Stack spacing={3}>
          {/* PASSWORD SECTION */}
          <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: "1px solid #E5E7EB" }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
              <LockResetIcon sx={{ color: "#5c8bc8ff" }} />
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Login Password</Typography>
            </Stack>

            <Typography variant="body2" sx={{ color: "#6B7280", mb: 2 }}>
              This is the password you use to log into your account.
            </Typography>

            <TextField
              fullWidth
              label="Your Current Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              defaultValue={storedUser.password || "********"} 
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
            />

            <Button 
              fullWidth 
              variant="contained" 
              sx={{ bgcolor: "#121212", borderRadius: 3, py: 1.5, fontWeight: 700, textTransform: 'none' }}
              onClick={() => alert("Password change feature coming soon!")}
            >
              Update Password
            </Button>
          </Paper>

          {/* PRIVACY SECTION */}
          <Paper elevation={0} sx={{ p: 4, borderRadius: 5, border: "1px solid #E5E7EB" }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Privacy Settings</Typography>
            
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>Public Profile</Typography>
                  <Typography variant="caption" sx={{ color: "#6B7280" }}>Allow others to see your name and coins</Typography>
                </Box>
                <Switch 
                  checked={privacySettings.profilePublic} 
                  onChange={(e) => setPrivacySettings({...privacySettings, profilePublic: e.target.checked})}
                />
              </Box>

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>Two-Step Verification</Typography>
                  <Typography variant="caption" sx={{ color: "#6B7280" }}>Secure your account with a phone code</Typography>
                </Box>
                <Switch 
                  checked={privacySettings.twoStep}
                  onChange={(e) => setPrivacySettings({...privacySettings, twoStep: e.target.checked})}
                />
              </Box>
            </Stack>
          </Paper>

          <Typography variant="caption" sx={{ textAlign: 'center', color: '#9CA3AF', display: 'block' }}>
            Last changed: {new Date().toLocaleDateString()}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Security;