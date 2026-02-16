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

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartOpen, setCartOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { cartItems } = useCart();

  // ✅ USER STATE
  const [user, setUser] = useState(null);

  // ✅ CHECK PAGE
  const isHomePage = location.pathname === "/";

  // ✅ LOAD USER + LIVE UPDATE
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
    navigate("/"); // ✅ go to HomePage
  };

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "#7a5934" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>

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

            {/* 🛒 CART */}
            <IconButton
              onClick={() => setCartOpen(true)}
              sx={{ color: "#fff" }}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* 👤 USER SECTION */}
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

                  {/* 💰 COINS */}
                  <Chip
                    label={`💰 ${user.coins || 0}`}
                    sx={{
                      bgcolor: "#ffd700",
                      color: "#000",
                      fontWeight: "bold"
                    }}
                  />
                </Box>

                {/* DROPDOWN MENU */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem disabled>
                    {user.email}
                  </MenuItem>

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
