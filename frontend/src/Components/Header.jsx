"use client";

import React, { useState, useEffect, memo, useRef } from "react";
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
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CloseIcon from "@mui/icons-material/Close";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AppleIcon from "@mui/icons-material/Apple";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import UserMenu from "./Usermenu";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { useCart } from "../context/useCart";
import CartDrawer from "../Components/CartDrawer";

import coinVideo from "../assets/Home-images/Coins.mp4";
import logo from "../assets/shopnbliss-logo.png";

/* ─── Announcement messages ──────────────────────────────────────────── */
const ANNOUNCEMENTS = [
  "🚚 Free Delivery on all orders above ₹99999 · Limited time offer!",
  "💳 10% instant discount on SBI & HDFC Credit Cards · T&C apply",
  "🎁 Buy any Apple product & earn 2× Loyalty Coins this week",
  "📦 Same-day dispatch on orders placed before 2 PM · Pan India",
  "🔒 100% Genuine Apple products · Official Authorised Reseller",
];

/* ─── Nav links ───────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Shop", path: "/apple", icon: <StorefrontOutlinedIcon sx={{ fontSize: 16 }} /> },
  { label: "About Us", path: "/about", icon: <InfoOutlinedIcon sx={{ fontSize: 16 }} /> },
  { label: "Contact Us", path: "/contact", icon: <MailOutlineIcon sx={{ fontSize: 16 }} /> },
];

/* ─── Mock notifications ──────────────────────────────────────────────── */
const NOTIFICATIONS = [
 
];

/* ─── Searchable products ─────────────────────────────────────────────── */
const SEARCH_PRODUCTS = [
  { name: "iPhone 17", slug: "apple-iphone-17-256gb-storage-black" },
  { name: "iPhone 17 Pro", slug: "apple-iphone-17-pro" },
  { name: "iPhone Air", slug: "apple-iphone-air-256gb-storage-sky-blue" },
  { name: "MacBook Air M4", slug: "apple-macbook-air-m4-chip" },
  { name: "iPad 11th Gen", slug: "apple-ipad-11th-gen-2025" },
  { name: "Apple Watch SE 3", slug: "apple-watch-se-3-gps-44mm" },
  { name: "AirPods Pro 3", slug: "apple-airpods-pro-3" },
  { name: "Apple TV 4K", slug: "apple-tv-4k" },
  { name: "MagSafe Battery", slug: "apple-magsafe-battery" },
];

/* ════════════════════════════════════════════════════════════════════════
   ANNOUNCEMENT STRIP
════════════════════════════════════════════════════════════════════════ */
const AnnouncementStrip = memo(({ onClose, visible }) => {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        setFade(true);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <Box
      sx={{
        bgcolor: "#1a1a2e",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        px: 5,
      }}
    >
      {/* Subtle left/right gradient fade */}
      <Box sx={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 40, background: "linear-gradient(to right, #1a1a2e, transparent)", zIndex: 1 }} />
      <Box sx={{ position: "absolute", right: 32, top: 0, bottom: 0, width: 40, background: "linear-gradient(to left, #1a1a2e, transparent)", zIndex: 1 }} />

      <Typography
        sx={{
          fontSize: { xs: "0.7rem", sm: "0.78rem" },
          color: "rgba(255,255,255,0.85)",
          fontWeight: 500,
          letterSpacing: "0.02em",
          textAlign: "center",
          transition: "opacity 0.3s ease",
          opacity: fade ? 1 : 0,
          userSelect: "none",
        }}
      >
        {ANNOUNCEMENTS[idx]}
      </Typography>

      <IconButton
        size="small"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 6,
          color: "rgba(255,255,255,0.5)",
          p: 0.5,
          zIndex: 2,
          "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.1)" },
        }}
      >
        <CloseIcon sx={{ fontSize: 14 }} />
      </IconButton>
    </Box>
  );
});

/* ════════════════════════════════════════════════════════════════════════
   SEARCH BAR
════════════════════════════════════════════════════════════════════════ */
const SearchBar = memo(({ navigate }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const containerRef = useRef(null);

  const results = React.useMemo(() => {
    if (query.trim().length < 1) return [];
    return SEARCH_PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (slug) => {
    setQuery("");
    setFocused(false);
    navigate(`/product/${slug}`);
  };

  return (
    <Box ref={containerRef} sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: focused ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)",
          borderRadius: 2.5,
          px: 1.5,
          py: 0.6,
          border: focused ? "1px solid rgba(255,255,255,0.35)" : "1px solid rgba(255,255,255,0.12)",
          transition: "all 0.25s ease",
          width: { sm: focused ? 240 : 180, md: focused ? 300 : 200 },
        }}
      >
        <SearchIcon sx={{ color: "rgba(255,255,255,0.5)", fontSize: 18, mr: 1 }} />
        <InputBase
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          sx={{
            color: "#fff",
            fontSize: "0.82rem",
            flex: 1,
            "& input::placeholder": { color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" },
          }}
        />
        {query && (
          <IconButton size="small" onClick={() => setQuery("")} sx={{ color: "rgba(255,255,255,0.4)", p: 0 }}>
            <CloseIcon sx={{ fontSize: 14 }} />
          </IconButton>
        )}
      </Box>

      {/* Dropdown results */}
      {focused && results.length > 0 && (
        <Paper
          sx={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            borderRadius: 2,
            overflow: "hidden",
            zIndex: 9999,
            border: "1px solid #e5e7eb",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          <List dense disablePadding>
            {results.map((r, i) => (
              <ListItem
                key={i}
                button
                onClick={() => handleSelect(r.slug)}
                sx={{
                  py: 1.2,
                  px: 2,
                  "&:hover": { bgcolor: "#f0f9ff" },
                  borderBottom: i < results.length - 1 ? "1px solid #f3f4f6" : "none",
                }}
              >
                <SearchIcon sx={{ fontSize: 15, color: "#9ca3af", mr: 1.5 }} />
                <ListItemText
                  primary={r.name}
                  primaryTypographyProps={{ fontSize: "0.85rem", fontWeight: 500, color: "#111827" }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
});

/* ════════════════════════════════════════════════════════════════════════
   NOTIFICATION BELL
════════════════════════════════════════════════════════════════════════ */
const NotificationBell = memo(() => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ color: "#fff", position: "relative" }}>
          <Badge badgeContent={unreadCount} color="error" sx={{ "& .MuiBadge-badge": { fontSize: "0.65rem", minWidth: 16, height: 16 } }}>
            {unreadCount > 0 ? (
              <NotificationsActiveIcon sx={{ fontSize: { xs: 22, sm: 26 } }} />
            ) : (
              <NotificationsNoneIcon sx={{ fontSize: { xs: 22, sm: 26 } }} />
            )}
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        disableScrollLock
        PaperProps={{
          sx: {
            mt: 1.5,
            width: 320,
            borderRadius: 3,
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
          },
        }}
      >
        {/* Header */}
        <Box sx={{ px: 2, py: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: "#fafafa", borderBottom: "1px solid #f0f0f0" }}>
          <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>Notifications</Typography>
          {unreadCount > 0 && (
            <Typography
              onClick={markAllRead}
              sx={{ fontSize: "0.75rem", color: "#2F80ED", fontWeight: 600, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
            >
              Mark all read
            </Typography>
          )}
        </Box>

        {notifications.map((notif, i) => (
          <Box
            key={notif.id}
            sx={{
              px: 2,
              py: 1.5,
              bgcolor: notif.unread ? "#f0f9ff" : "#fff",
              borderBottom: i < notifications.length - 1 ? "1px solid #f3f4f6" : "none",
              display: "flex",
              gap: 1.5,
              alignItems: "flex-start",
              transition: "background 0.2s",
              "&:hover": { bgcolor: "#e0f2fe" },
            }}
          >
            {/* Unread dot */}
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: notif.unread ? "#2F80ED" : "transparent",
                mt: 0.7,
                flexShrink: 0,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontSize: "0.83rem", fontWeight: 700, color: "#111827" }}>{notif.title}</Typography>
              <Typography sx={{ fontSize: "0.78rem", color: "#6b7280", mt: 0.3, lineHeight: 1.5 }}>{notif.desc}</Typography>
              <Typography sx={{ fontSize: "0.7rem", color: "#9ca3af", mt: 0.5 }}>{notif.time}</Typography>
            </Box>
          </Box>
        ))}

        {/* Footer */}
        <Box sx={{ px: 2, py: 1.2, textAlign: "center", borderTop: "1px solid #f0f0f0", bgcolor: "#fafafa" }}>
          <Typography sx={{ fontSize: "0.78rem", color: "#2F80ED", fontWeight: 600, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
            View all notifications
          </Typography>
        </Box>
      </Menu>
    </>
  );
});

/* ════════════════════════════════════════════════════════════════════════
   MAIN HEADER
════════════════════════════════════════════════════════════════════════ */
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [cartOpen, setCartOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  /* ================= USER STATE ================= */
  const [user, setUser] = useState(() => {
    try {
      const userFromState = location.state?.user;
      if (userFromState) {
        localStorage.setItem("user", JSON.stringify(userFromState));
        return userFromState;
      }
      const stored = localStorage.getItem("user");
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
        return res.status(500).json({ message: "Something went wrong" });
      }
    };

    window.addEventListener("userUpdated", updateUser);
    window.addEventListener("storage", updateUser);
    return () => {
      window.removeEventListener("userUpdated", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  /* ================= SCROLL EFFECT ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
      {/* ── ANNOUNCEMENT STRIP ────────────────────────────────────── */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.appBar + 1,
          transform: announcementVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.35s ease",
        }}
      >
        <AnnouncementStrip visible={announcementVisible} onClose={() => setAnnouncementVisible(false)} />
      </Box>

      {/* ── MAIN APPBAR ────────────────────────────────────────────── */}
      <AppBar
        position="fixed"
        elevation={isTransparentPage ? (scrolled ? 4 : 0) : 4}
        sx={{
          top: announcementVisible ? 36 : 0,
          transition: "top 0.35s ease, background 0.3s ease-in-out",
          bgcolor: isTransparentPage
            ? scrolled ? "#121212" : "transparent"
            : "#121212",
          backdropFilter: scrolled ? "blur(6px)" : "none",
          height: { xs: 70, md: 80 },
          justifyContent: "center",
        }}
      >
        {/* ── TOP ROW: Logo + Search + Icons ───────────────────────── */}
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1.5, sm: 3 }, minHeight: "unset !important", height: "100%" }}>

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
              sx={{ height: { xs: 50, sm: 70, md: 85 }, transition: "height 0.3s ease" }}
            />
          </Typography>

          {/* CENTER: Nav links (desktop only) */}
          {!isTablet && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {NAV_LINKS.map((nav) => {
                const isActive = location.pathname === nav.path;
                return (
                  <Button
                    key={nav.path}
                    component={Link}
                    to={nav.path}
                    startIcon={nav.icon}
                    sx={{
                      color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                      textTransform: "none",
                      fontWeight: isActive ? 700 : 500,
                      fontSize: "0.85rem",
                      px: 1.5,
                      py: 0.8,
                      borderRadius: 2,
                      position: "relative",
                      bgcolor: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                      transition: "all 0.2s",
                      "&:hover": {
                        color: "#fff",
                        bgcolor: "rgba(255,255,255,0.08)",
                      },
                      // Active underline
                      "&::after": isActive ? {
                        content: '""',
                        position: "absolute",
                        bottom: 4,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "60%",
                        height: 2,
                        borderRadius: 1,
                        bgcolor: "#2F80ED",
                      } : {},
                    }}
                  >
                    {nav.label}
                  </Button>
                );
              })}
            </Box>
          )}

          {/* RIGHT SIDE */}
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 1.5 } }}>

            {/* SEARCH (desktop only) */}
            {!isMobile && <SearchBar navigate={navigate} />}

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
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
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

            {/* NOTIFICATION BELL */}
            {user && <NotificationBell />}

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

               <UserMenu
  anchorEl={anchorEl}
  setAnchorEl={setAnchorEl}
  user={user}
  handleLogout={handleLogout}
/>
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
        <Box sx={{ height: { xs: announcementVisible ? 106 : 70, md: announcementVisible ? 116 : 80 } }} />
      )}
      {isTransparentPage && !scrolled && announcementVisible && (
        <Box sx={{ height: 36 }} />
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default memo(Header);