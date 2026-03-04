import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Grid,
  Button,
  IconButton,
  Card,
  Divider,
  Stack
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ShieldMoonIcon from "@mui/icons-material/ShieldMoon"; 
import LocalMallIcon from "@mui/icons-material/LocalMall";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom"; // For navigation
import Footer from "../Components/Footer";

const Profile = () => {
  const navigate = useNavigate();

  /* ================= GET USER DATA ================= */
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  /* ================= FUNCTIONALITY: LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("user");
    // Optional: clear other cart/session data here
    navigate("/login");
    window.location.reload(); // Ensures header and state refresh
  };

  if (!user) return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Stack spacing={2} alignItems="center">
        <Typography sx={{ color: "#121212", fontWeight: 600 }}>Please Login to view your profile.</Typography>
        <Button variant="contained" onClick={() => navigate("/login")}>Go to Login</Button>
      </Stack>
    </Box>
  );

  return (
    <>
    
    <Box sx={{ 
      bgcolor: "#F8F9FA", 
      minHeight: "100vh", 
      py: { xs: 4, md: 10 }, 
      color: "#121212", 
    }}>
      <Container maxWidth="md">
        
        {/* MAIN PROFILE CARD */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 6,
            bgcolor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.04)"
          }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* AVATAR SECTION */}
            <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  sx={{
                    width: { xs: 120, md: 160 },
                    height: { xs: 120, md: 160 },
                    fontSize: "3.5rem",
                    background: "linear-gradient(135deg, #6366F1 0%, #A855F7 100%)",
                    color: "#FFFFFF", 
                    fontWeight: 800,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                    border: "6px solid #F3F4F6"
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
                {/* FUNCTIONALITY: EDIT AVATAR */}
                <IconButton
                  onClick={() => alert("Upload new profile picture feature coming soon!")}
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    bgcolor: "#121212", 
                    color: "#fff",
                    "&:hover": { bgcolor: "#333" },
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    border: "3px solid #fff"
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
            </Grid>

            {/* INFO SECTION */}
            <Grid item xs={12} md={8} sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="overline" sx={{ color: "#6B7280", letterSpacing: 3, fontWeight: 700 }}>
                VERIFIED USER
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: "#121212", letterSpacing: -1, fontSize: { xs: '2rem', md: '3rem' } }}>
                {user?.name}
              </Typography>
              <Typography sx={{ color: "#6B7280", fontSize: "1.1rem", mb: 3, fontWeight: 400 }}>
                {user?.email}
              </Typography>
              
              <Button 
                variant="contained" 
                onClick={() => alert("Edit Profile Modal would open here")}
                sx={{ 
                  bgcolor: "#5c8bc8ff", 
                  color: "#fff", 
                  borderRadius: "12px",
                  px: 4,
                  py: 1.2,
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": { bgcolor:"#2a68b8ff" }
                }}
              >
                Edit Account Settings
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* QUICK STATS CARDS */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Card sx={{ 
              bgcolor: "#FFFFFF", 
              borderRadius: 5, 
              border: "1px solid #E5E7EB", 
              textAlign: "center", 
              p: 3,
              boxShadow: "0 4px 6px rgba(0,0,0,0.02)"
            }}>
              <WorkspacePremiumIcon sx={{ color: "#f3b51bff", fontSize: 35, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#121212" }}>{user?.coins || 0}</Typography>
              <Typography variant="caption" sx={{ color: "#6B7280", letterSpacing: 1, fontWeight: 700 }}>BLISS COINS</Typography>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card 
              onClick={() => navigate("/orders")}
              sx={{ 
                bgcolor: "#FFFFFF", 
                borderRadius: 5, 
                border: "1px solid #E5E7EB", 
                textAlign: "center", 
                p: 3,
                cursor: 'pointer',
                boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
                '&:hover': { bgcolor: '#fcfcfc' }
              }}
            >
              <LocalMallIcon sx={{ color: "#6e9af1ff", fontSize: 35, mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#121212" }}>12</Typography>
              <Typography variant="caption" sx={{ color: "#6B7280", letterSpacing: 1, fontWeight: 700 }}>MY ORDERS</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* PREFERENCES LIST */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" sx={{ mb: 2, ml: 1, fontWeight: 700, color: "#121212" }}>Security & Preferences</Typography>
          <Paper sx={{ bgcolor: "#FFFFFF", borderRadius: 5, border: "1px solid #E5E7EB", overflow: "hidden" }}>
            
            <Box 
              onClick={() => navigate("/security")}
              sx={{ 
                p: 3, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: '#fefefeff',
                cursor: 'pointer', '&:hover': { bgcolor: '#F3F4F6' }
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ bgcolor: '#F3F4F6', p: 1, borderRadius: 2, display: 'flex' }}>
                   <ShieldMoonIcon sx={{ color: "#121212" }} />
                </Box>
                <Typography sx={{ fontWeight: 600, color: "#121212" }}>Privacy & Password</Typography>
              </Stack>
              <ArrowForwardIosIcon sx={{ fontSize: 16, color: '#9CA3AF' }} />
            </Box>

            <Divider sx={{ mx: 2 }} />

            <Box 
              onClick={() => navigate("/addresses")}
              sx={{ 
                p: 3, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: '#fefefeff',
                cursor: 'pointer', '&:hover': { bgcolor: '#F3F4F6' }
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ bgcolor: '#F3F4F6', p: 1, borderRadius: 2, display: 'flex' }}>
                   <LocalMallIcon sx={{ color: "#121212" }} />
                </Box>
                <Typography sx={{ fontWeight: 600, color: "#121212" }}>Delivery Addresses</Typography>
              </Stack>
              <ArrowForwardIosIcon sx={{ fontSize: 16, color: '#9CA3AF' }} />
            </Box>

          </Paper>
        </Box>

        {/* LOGOUT BUTTON - FULL WIDTH FOR ACCESSIBILITY */}
        <Button
      
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{ 
            mt: 4, 
            py: 1.5, 
            color: "#DC2626", 
            border: '1px solid #DC2626',
            borderRadius: '12px',
            fontWeight: 700, 
            textTransform: 'none',
            '&:hover': { bgcolor: '#FEF2F2', border: '1px solid #DC2626' }
          }}
        >
          Logout from Session
        </Button>

      </Container>
    </Box>

<Footer/>
    </>
  );
};

export default Profile;