"use client";

import React, { useState, useEffect, memo } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useCart } from "../context/useCart";
import CartDrawer from "../Components/CartDrawer";

import coinVideo from "../assets/Home-images/Coins.mp4";
import logo from "../assets/shopnbliss-logo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [cartOpen, setCartOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  /* ================= USER STATE ================= */
  const [user, setUser] = useState(() => {
    try {
      const userFromState = location.state?.user;
      if (userFromState) {
        localStorage.setItem("user", JSON.stringify(userFromState));
        return userFromState;
      }

      const stored = localStorage.getItem("user");
      // Check for existence and that it's not the literal string "undefined"
      if (stored && stored !== "undefined") {
        return JSON.parse(stored);
      }
      return null;
    } catch (err) {
      console.error("Header User Init Error:", err);
      return null;
    }
  });

  const { cartItems } = useCart();
  const cartCount = cartItems?.length || 0;

  /* ================= LOGIN / LOGOUT SYNC ================= */
  useEffect(() => {
    const updateUser = (res) => {
      try {
        const stored = localStorage.getItem("user");
        if (stored && stored !== "undefined") {
          setUser(JSON.parse(stored));
        } else {
          setUser(null);
        }
      } catch (err) {
  console.error("Server Error:", err);
  return res.status(500).json({
    message: "Something went wrong"
  });
      }
    };

    window.addEventListener("userUpdated", updateUser);
    window.addEventListener("storage", updateUser); // Syncs across tabs
    
    return () => {
      window.removeEventListener("userUpdated", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= PAGE LOGIC ================= */
  const hideHeader = ["/login", "/register"].includes(location.pathname);
  const isTransparentPage = location.pathname === "/" || location.pathname === "/apple";

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAnchorEl(null);
    window.dispatchEvent(new Event("userUpdated"));
    navigate("/");
  };

  if (hideHeader) return null;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={isTransparentPage ? (scrolled ? 4 : 0) : 4}
        sx={{
          bgcolor: isTransparentPage
            ? scrolled ? "#121212" : "transparent"
            : "#121212",
          backdropFilter: scrolled ? "blur(6px)" : "none",
          transition: "all 0.3s ease-in-out",
          height: { xs: 70, md: 80 },
          justifyContent: "center",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1.5, sm: 3 } }}>
          {/* LOGO */}
          <Typography
            component={Link}
            to="/"
            aria-label="Shopnbliss Home"
            sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
          >
            <Box
              component="img"
              src={logo}
              alt="Shopnbliss"
              sx={{
                height: { xs: 50, sm: 70, md: 85 },
                transition: "height 0.3s ease",
              }}
            />
          </Typography>

          {/* RIGHT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
            {/* COINS */}
            {user && (
              <Chip
                label={user?.coins ?? 0}
                avatar={
                  <Box sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 } }}>
                    <video
                      src={coinVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </Box>
                }
                sx={{
                  bgcolor: "#fff8dc",
                  color: "#000",
                  fontWeight: "bold",
                  height: { xs: 30, sm: 34 },
                  fontSize: { xs: "0.8rem", sm: "0.9rem" },
                  "& .MuiChip-label": { px: { xs: 1, sm: 1.5 } },
                }}
              />
            )}

            {/* CART */}
            <IconButton onClick={() => setCartOpen(true)} sx={{ color: "#fff" }}>
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
              </Badge>
            </IconButton>

            {/* USER PROFILE / LOGIN */}
            {user ? (
              <>
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0.5 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#fff",
                      color: "#000",
                      width: { xs: 34, sm: 40 },
                      height: { xs: 34, sm: 40 },
                      fontWeight: "bold",
                    }}
                  >
                    {(user?.name?.[0] || user?.email?.[0] || "U").toUpperCase()}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  disableScrollLock={true}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography fontWeight={600}>{user?.name || "User"}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {user?.email}
                    </Typography>
                  </Box>
                  <Divider />
                  <MenuItem onClick={() => { navigate("/profile"); setAnchorEl(null); }}>
                    👤 My Profile
                  </MenuItem>
                  <MenuItem onClick={() => { navigate("/orders"); setAnchorEl(null); }}>
                    📦 My Orders
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                    🚪 Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  onClick={() => navigate("/login", { state: { from: location.pathname } })}
                  sx={{ color: "#fff", textTransform: "none" }}
                >
                  Login
                </Button>
                {!isMobile && (
                  <Button
                    component={Link}
                    to="/register"
                    variant="outlined"
                    sx={{
                      color: "#fff",
                      borderColor: "#fff",
                      textTransform: "none",
                      ":hover": { bgcolor: "#fff", color: "#000" },
                    }}
                  >
                    Register
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* HEADER SPACER */}
      {(!isTransparentPage || scrolled) && (
        <Box sx={{ height: { xs: 70, md: 80 } }} />
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default memo(Header);