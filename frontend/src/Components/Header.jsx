import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Badge,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useLocation } from "react-router-dom";
import shop from "../assets/shop.png";
import { useCart } from "../context/useCart";
import CartDrawer from "../Components/CartDrawer";

const Header = () => {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // ✅ USER STATE
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const { cartItems } = useCart();

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Sync user across tabs
  useEffect(() => {
    const syncUser = () => {
      try {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  // ✅ Menu handlers
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    handleMenuClose();
  };

  const navLinks = ["Why Shopify", "Products", "Pricing", "Enterprise"];

  const isProductPage = location.pathname.startsWith("/product");
  const isCheckoutPage = location.pathname.startsWith("/checkout");
  const isHomePage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/register";
  const isLoginPage = location.pathname === "/login";
  const isApplePage = location.pathname === "/apple";

  // ✅ Hide header on Register OR Cart open
  if (isRegisterPage || cartOpen)
    return (
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    );

  const isMinimalHeader = isCheckoutPage || isLoginPage;

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: isHomePage
            ? scrolled
              ? "rgba(122, 89, 52, 0.95)"
              : "transparent"
            : isMinimalHeader || isProductPage || scrolled
            ? "rgba(122, 89, 52, 0.95)"
            : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          transition: "all 0.4s ease",
          px: { xs: 2, md: 6 },
          py: 1,
          zIndex: 1201,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: isMinimalHeader ? "center" : "space-between",
            minHeight: "80px",
          }}
        >
          {/* LOGO */}
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              textDecoration: "none",
              textAlign: "center",
              fontSize: isMinimalHeader
                ? { xs: "1.8rem", md: "2.2rem" }
                : { xs: "1.5rem", md: "1.8rem" },
            }}
          >
            Adbliss Ecommerce
          </Typography>

          {!isMinimalHeader && (
            <>
              {/* DESKTOP LINKS */}
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
                {navLinks.map((link) => (
                  <Typography
                    key={link}
                    sx={{ color: "#fff", fontSize: 16, cursor: "pointer" }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>

              {/* DESKTOP ACTIONS */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  gap: 2,
                  alignItems: "center",
                }}
              >
                {/* CART */}
                <Button
                  onClick={() => setCartOpen(true)}
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.4)",
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 2,
                  }}
                >
                  <Badge badgeContent={cartItems.length} color="error" sx={{ mr: 1 }}>
                    <Box
                      component="img"
                      src={shop}
                      sx={{
                        width: 18,
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </Badge>
                  Cart
                </Button>

                {/* ✅ USER / LOGIN FINAL */}
                {user ? (
                  <>
                    {/* Logged-in Avatar */}
                    <IconButton onClick={handleMenuOpen}>
                      <Avatar sx={{ bgcolor: "#fff", color: "#000" }}>
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </Avatar>
                    </IconButton>

                    {/* DROPDOWN */}
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem disabled>
                        {user.name || user.email}
                      </MenuItem>

                      <Divider />

                      <MenuItem onClick={handleLogout}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : isApplePage ? (
                  // 👤 Apple page default icon
                  <IconButton component={Link} to="/login">
                    <Avatar sx={{ bgcolor: "#fff", color: "#000" }}>
                      U
                    </Avatar>
                  </IconButton>
                ) : (
                  // Normal pages
                  <>
                    <Typography
                      component={Link}
                      to="/login"
                      sx={{ color: "#fff", textDecoration: "none" }}
                    >
                      Log in
                    </Typography>

                    <Button
                      component={Link}
                      to="/register"
                      variant="outlined"
                      sx={{
                        color: "white",
                        border: "1px solid white",
                        borderRadius: "25px",
                        textTransform: "none",
                        ":hover": {
                          bgcolor: "white",
                          color: "black",
                        },
                      }}
                    >
                      Start for free
                    </Button>
                  </>
                )}
              </Box>

              {/* MOBILE */}
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <IconButton
                  onClick={() => setCartOpen(true)}
                  sx={{ color: "#fff" }}
                >
                  <Badge badgeContent={cartItems.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                <IconButton sx={{ color: "#fff" }} onClick={toggleDrawer}>
                  <MenuIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 280 }} onClick={toggleDrawer}>
          <List sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ px: 2, pb: 1, fontWeight: "bold" }}>
              Menu
            </Typography>
            <Divider />
            {navLinks.map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* CART DRAWER */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
