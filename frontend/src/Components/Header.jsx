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
  Badge
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

  const { cartItems } = useCart();

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Why Shopify", "Products", "Pricing", "Enterprise"];
  const isProductPage = location.pathname.startsWith("/product");
  const isCheckoutPage = location.pathname.startsWith("/checkout");

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: isCheckoutPage || isProductPage || scrolled
            ? "rgba(122, 89, 52, 0.85)"
            : "transparent",
          backdropFilter: scrolled && !isProductPage && !isCheckoutPage ? "blur(8px)" : "none",
          transition: "all 0.4s ease",
          px: { xs: 2, md: 6 },
          py: 1
        }}
      >
        <Toolbar sx={{ 
          justifyContent: isCheckoutPage ? "center" : "space-between", // Centers logo on checkout
          minHeight: "80px" 
        }}>

          {/* LOGO - Always Visible */}
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{ 
              fontWeight: "bold", 
              color: "#fff", 
              textDecoration: "none",
              fontSize: isCheckoutPage ? "1.5rem" : "1.25rem" // Slightly larger if alone
            }}
          >
            Adbliss Ecommerce
          </Typography>

          {/* HIDE EVERYTHING ELSE ON CHECKOUT */}
          {!isCheckoutPage && (
            <>
              {/* DESKTOP NAV LINKS */}
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
                {navLinks.map((link) => (
                  <Typography key={link} sx={{ color: "#fff", fontSize: 17 }}>
                    {link}
                  </Typography>
                ))}
              </Box>

              {/* RIGHT SIDE DESKTOP */}
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
                <Button
                  onClick={() => setCartOpen(true)}
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    borderColor: "rgba(255,255,255,0.4)",
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 2,
                    gap: 1,
                    "&:hover": { borderColor: "#fff" }
                  }}
                >
                  <Badge badgeContent={cartItems.length} color="error" sx={{ mr: 1 }}>
                    <Box
                      component="img"
                      src={shop}
                      alt="Cart"
                      sx={{ width: 18, height: 18, filter: "brightness(0) invert(1)" }}
                    />
                  </Badge>
                  Cart
                </Button>

                <Typography component={Link} to="/login" sx={{ color: "#fff", textDecoration: "none" }}>
                  Log in
                </Typography>

                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{ backgroundColor: "#fff", color: "#000", borderRadius: "25px", textTransform: "none" }}
                >
                  Start for free
                </Button>
              </Box>

              {/* MOBILE RIGHT SIDE */}
              <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1 }}>
                <IconButton onClick={() => setCartOpen(true)} sx={{ color: "#fff" }}>
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
        <Box sx={{ width: 250 }} onClick={toggleDrawer}>
          <List>
            {navLinks.map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Log in" />
          </ListItem>
        </Box>
      </Drawer>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;