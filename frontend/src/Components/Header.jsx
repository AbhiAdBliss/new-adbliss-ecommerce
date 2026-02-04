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
  Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import shop from "../assets/shop.png";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Why Shopify", "Products", "Pricing", "Enterprise"];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled ? "rgba(122, 89, 52, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          transition: "all 0.4s ease",
          boxShadow: "none",
          px: { xs: 2, md: 6 },
          py: 1
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", minHeight: "80px" }}>

          {/* LOGO */}
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              cursor: "pointer",
              letterSpacing: 1,
              textDecoration: "none"
            }}
          >
            Adbliss Ecommerce
          </Typography>

          {/* NAV LINKS */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {navLinks.map((link) => (
              <Typography
                key={link}
                sx={{
                  color: "#fff",
                  fontSize: "17px",
                  cursor: "pointer",
                  "&:hover": { opacity: 0.7 }
                }}
              >
                {link}
              </Typography>
            ))}
          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, alignItems: "center" }}>
            
            <Button
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
              <Box
                component="img"
                src={shop}
                alt="Edition"
                sx={{
                  width: 18,
                  height: 18,
                  filter: "brightness(0) invert(1)"
                }}
              />
              Editions
            </Button>

            {/* LOGIN */}
            <Typography
              component={Link}
              to="/login"
              sx={{
                color: "#fff",
                cursor: "pointer",
                textDecoration: "none",
                "&:hover": { opacity: 0.7 }
              }}
            >
              Log in
            </Typography>

            {/* REGISTER */}
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                borderRadius: "25px",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                py: 1.2,
                textDecoration: "none",
                "&:hover": { backgroundColor: "#f2f2f2" }
              }}
            >
              Start for free
            </Button>
          </Box>

          {/* MOBILE MENU ICON */}
          <IconButton
            sx={{ display: { md: "none" }, color: "#fff" }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            {navLinks.map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>

          <Divider />

          <List>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Log in" />
            </ListItem>

            <ListItem button component={Link} to="/register">
              <ListItemText primary="Start for free" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
