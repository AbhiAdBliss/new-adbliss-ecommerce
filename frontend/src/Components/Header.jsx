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

  const { cartItems } = useCart();

  /* ================= SCROLL LOGIC ================= */
  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls more than 50px, change state
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= USER LOGIC ================= */
  const userFromState = location.state?.user;
  let user = null;

  if (userFromState) {
    user = userFromState;
    localStorage.setItem("user", JSON.stringify(userFromState));
  } else {
    try {
      const stored = localStorage.getItem("user");
      user = stored ? JSON.parse(stored) : null;
    } catch {
      user = null;
    }
  }

  /* ================= PAGE LOGIC ================= */
  const hideHeader = location.pathname === "/login" || location.pathname === "/register";
  
  // Define pages where header should start transparent (Home and Apple page)
  const isTransparentPage = location.pathname === "/" || location.pathname === "/apple";

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("user");
    setAnchorEl(null);
    navigate("/");
  };

  if (hideHeader) return null;

  return (
    <>
      <AppBar
        position="fixed"
        // Elevation 0 when transparent, 4 when scrolled
        elevation={isTransparentPage ? (scrolled ? 4 : 0) : 4}
        sx={{
          // Color logic: Transparent if on specific pages and not scrolled, otherwise solid Black
          bgcolor: isTransparentPage 
            ? (scrolled ? "#121212" : "transparent") 
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

          {/* RIGHT SIDE SECTION */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 } }}>
            {/* COINS */}
            {user && (
              <Chip
                label={user?.coins || 0}
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

            {/* CART ICON */}
            <IconButton onClick={() => setCartOpen(true)} sx={{ color: "#fff" }}>
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
              </Badge>
            </IconButton>

            {/* USER AVATAR */}
            {user ? (
              <>
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  sx={{ p: 0.5 }}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#fff",
                      color: "#000",
                      width: { xs: 34, sm: 40 },
                      height: { xs: 34, sm: 40 },
                      fontWeight: "bold",
                      fontSize: { xs: "0.9rem", sm: "1.1rem" },
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  PaperProps={{
                    sx: { mt: 1.5, minWidth: 180, borderRadius: 2 },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {user?.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
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

      {/* FIXED SPACER: Only show if header is NOT transparent or if scrolled */}
      {(!isTransparentPage || scrolled) && (
        <Box sx={{ height: { xs: 70, md: 80 } }} />
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;