import React from "react";
import {
  Menu,
  MenuItem,
  Box,
  Typography,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import coinimg from "../assets/AppleS-imgs/coin-img.png";

/* MUI ICONS */
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

const FONT = "'Nunito', sans-serif";

const UserMenu = ({ anchorEl, setAnchorEl, user, handleLogout }) => {
  const navigate = useNavigate();

  const close = () => setAnchorEl(null);

  const go = (path) => {
    navigate(path);
    close();
  };

  const menuItems = [
    {
      icon: <PersonOutlineIcon sx={{ fontSize: 18 }} />,
      label: "My Profile",
      sub: "View & edit your account",
      path: "/profile",
      hoverBg: "#F5F3FF",
      iconBg: "#EEF2FF",
    },
    {
      icon: <Inventory2OutlinedIcon sx={{ fontSize: 18 }} />,
      label: "My Orders",
      sub: "Track & view past orders",
      path: "/orders",
      hoverBg: "#F0FDF4",
      iconBg: "#ECFDF5",
    },
    {
      icon: <FavoriteBorderIcon sx={{ fontSize: 18 }} />,
      label: "Wishlist",
      sub: "Your saved items",
      path: "/wishlist",
      hoverBg: "#FFF1F2",
      iconBg: "#FFF1F2",
    },
    {
      icon: <EmojiEventsOutlinedIcon sx={{ fontSize: 18 }} />,
      label: "Rewards",
      sub: "Coins, coupons & tier",
      path: "/profile",
      hoverBg: "#FFFBEB",
      iconBg: "#FFFBEB",
    },
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={close}
      disableScrollLock={true}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      PaperProps={{
        sx: {
          borderRadius: 4,
          minWidth: 260,
          boxShadow: "0 16px 48px rgba(0,0,0,0.13)",
          border: "1px solid #E5E7EB",
          overflow: "hidden",
          mt: 1,
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          background:
            "linear-gradient(120deg,#6366F1 0%,#A855F7 60%,#EC4899 100%)",
          px: 2.5,
          pt: 2.5,
          pb: 2,
          position: "relative",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              width: 46,
              height: 46,
              bgcolor: "rgba(255,255,255,0.25)",
              color: "#fff",
              fontWeight: 800,
              fontSize: "1.2rem",
              border: "2px solid rgba(255,255,255,0.5)",
              fontFamily: FONT,
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 800,
                color: "#fff",
                fontFamily: FONT,
                fontSize: "1rem",
              }}
            >
              {user?.name || "User"}
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.75)",
                fontSize: ".75rem",
                fontFamily: FONT,
              }}
            >
              {user?.email}
            </Typography>
          </Box>
        </Stack>

        {/* Coins */}
        <Box
          sx={{
            mt: 1.5,
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            bgcolor: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 2,
            px: 1.2,
            py: 0.4,
          }}
        >
          <Box component="img" src={coinimg} sx={{ width: 16, height: 16 }} />

          <Typography
            sx={{
              fontSize: ".74rem",
              color: "#FDE68A",
              fontWeight: 800,
              fontFamily: FONT,
            }}
          >
            {user?.coins?.toLocaleString() || 0} Loyalty Coins
          </Typography>
        </Box>
      </Box>

      {/* MENU ITEMS */}
      <Box sx={{ py: 0.5 }}>
        {menuItems.map(({ icon, label, sub, path, hoverBg, iconBg }) => (
          <MenuItem
            key={label}
            onClick={() => go(path)}
            sx={{
              px: 2.5,
              py: 1.2,
              gap: 1.5,
              "&:hover": { bgcolor: hoverBg },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                bgcolor: iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon}
            </Box>

            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: ".88rem",
                  fontFamily: FONT,
                }}
              >
                {label}
              </Typography>

              <Typography
                sx={{ fontSize: ".72rem", color: "#9CA3AF", fontFamily: FONT }}
              >
                {sub}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* LOGOUT */}
      <MenuItem
        onClick={() => {
          handleLogout();
          close();
        }}
        sx={{
          px: 2.5,
          py: 1.2,
          gap: 1.5,
          "&:hover": { bgcolor: "#FEF2F2" },
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 2,
            bgcolor: "#FEF2F2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LogoutIcon sx={{ fontSize: 18, color: "#DC2626" }} />
        </Box>

        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: ".88rem",
              fontFamily: FONT,
              color: "#DC2626",
            }}
          >
            Logout
          </Typography>

          <Typography
            sx={{ fontSize: ".72rem", color: "#FCA5A5", fontFamily: FONT }}
          >
            Sign out of your account
          </Typography>
        </Box>
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;