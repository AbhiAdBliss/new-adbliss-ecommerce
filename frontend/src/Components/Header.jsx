import React, { useState, useEffect } from "react";
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
  Chip
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/useCart";
import CartDrawer from "../Components/CartDrawer";

// ✅ IMPORT VIDEO
import coinVideo from "../assets/Home-images/Coins.mp4";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartOpen, setCartOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const { cartItems } = useCart();
  const [user, setUser] = useState(null);

  const isHomePage = location.pathname === "/";
  const isApplePage = location.pathname === "/apple";

  // 🔥 HIDE HEADER ON LOGIN & REGISTER
  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/register";

  // ✅ SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ USER LOAD
  useEffect(() => {
    const updateUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setUser(null);
      }
    };

    updateUser();

    window.addEventListener("userUpdated", updateUser);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("userUpdated", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userUpdated"));
    setAnchorEl(null);
    navigate("/");
  };

  const shouldBeTransparent = (isHomePage || isApplePage) && !scrolled;

  // 🔥 RETURN NULL (HIDE HEADER COMPLETELY)
  if (hideHeader) return null;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={shouldBeTransparent ? 0 : 4}
        sx={{
          bgcolor: shouldBeTransparent ? "transparent" : "#121212",
          transition: "all 0.3s ease",
          backdropFilter: shouldBeTransparent ? "none" : "blur(6px)",
          height: 75
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", height: "100%" }}>

          {/* LOGO */}
          <Typography
            component={Link}
            to={user ? "/apple" : "/"}
            sx={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "20px"
            }}
          >
            Adbliss Ecommerce
          </Typography>

          {/* RIGHT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

            {/* CART */}
            <IconButton
              onClick={() => setCartOpen(true)}
              sx={{ color: "#fff" }}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* USER */}
            {user && !isHomePage ? (
              <>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                  {/* AVATAR */}
                  <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <Avatar sx={{ bgcolor: "#fff", color: "#000" }}>
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </Avatar>
                  </IconButton>

                  {/* NAME */}
                  <Typography sx={{ color: "#fff", fontWeight: 500 }}>
                    {user.name}
                  </Typography>

                  {/* 🪙 COINS */}
                  <Chip
                    label={user.coins || 0}
                    avatar={
                      <Box sx={{ width: 24, height: 24 }}>
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
                            borderRadius: "50%"
                          }}
                        />
                      </Box>
                    }
                    sx={{
                      bgcolor: "#fff8dc",
                      color: "#000",
                      fontWeight: "bold",
                      px: 1
                    }}
                  />
                </Box>

                {/* MENU */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem disabled>{user.email}</MenuItem>
                  <Divider />

                  <MenuItem onClick={() => navigate("/profile")}>
                    👤 My Profile
                  </MenuItem>

                  <MenuItem onClick={() => navigate("/orders")}>
                    📦 My Orders
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    🚪 Logout
                  </MenuItem>
                </Menu>
              </>
            ) : !user ? (
              <>
                <Button component={Link} to="/login" sx={{ color: "#fff" }}>
                  Login
                </Button>

                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    ":hover": {
                      bgcolor: "#fff",
                      color: "#000"
                    }
                  }}
                >
                  Register
                </Button>
              </>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>

      {/* CART DRAWER */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
