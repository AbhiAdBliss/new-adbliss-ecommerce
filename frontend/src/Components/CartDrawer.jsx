import React, { useState } from "react";
import {
  Drawer, Box, Typography, IconButton,
  Button, Divider, Chip, Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";

// ── Animated Cart Item ────────────────────────────────────────────────────────
function CartItem({ item, onRemove, onIncrease, onDecrease, index }) {
  const [removing, setRemoving] = useState(false);
  const [qtyAnim, setQtyAnim] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 320);
  };

  const handleQty = (fn) => {
    setQtyAnim(true);
    fn(item.id);
    setTimeout(() => setQtyAnim(false), 250);
  };

  const itemTotal = (item.price * item.quantity).toLocaleString("en-IN");

  return (
    <Box
      sx={{
        opacity: removing ? 0 : 1,
        transform: removing ? "translateX(60px)" : "translateX(0)",
        transition: "all 0.32s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: `slideIn 0.35s ease ${index * 0.06}s both`,
        "@keyframes slideIn": {
          from: { opacity: 0, transform: "translateX(30px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
      }}
    >
      <Box sx={{
        display: "flex", gap: 2, alignItems: "flex-start",
        p: 2, borderRadius: "14px",
        bgcolor: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        mb: 2,
        transition: "border-color 0.2s",
        "&:hover": { borderColor: "rgba(47,128,237,0.25)" },
      }}>

        {/* Product image placeholder / initial */}
        <Box sx={{
          width: 52, height: 52, borderRadius: "10px", flexShrink: 0,
          bgcolor: "rgba(47,128,237,0.1)",
          border: "1px solid rgba(47,128,237,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.3rem",
          ...(item.image ? {} : {}),
        }}>
          {item.image
            ? <Box component="img" src={item.image} alt={item.name}
                sx={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "10px" }} />
            : "📦"}
        </Box>

        {/* Info */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{
            fontWeight: 700, fontSize: "0.88rem", color: "#fff",
            lineHeight: 1.3, mb: 0.3,
            overflow: "hidden", textOverflow: "ellipsis",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
          }}>
            {item.name}
          </Typography>
          <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", mb: 1 }}>
            ₹{item.price.toLocaleString("en-IN")} each
          </Typography>

          {/* Qty controls + delete */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{
              display: "flex", alignItems: "center", gap: 0,
              bgcolor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px", overflow: "hidden",
            }}>
              <IconButton
                size="small"
                onClick={() => handleQty(onDecrease)}
                disabled={item.quantity <= 1}
                sx={{
                  borderRadius: 0, width: 30, height: 30, color: "#fff",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                  "&:disabled": { color: "rgba(255,255,255,0.2)" },
                }}
              >
                <RemoveIcon sx={{ fontSize: 14 }} />
              </IconButton>

              <Typography sx={{
                minWidth: 28, textAlign: "center",
                fontSize: "0.88rem", fontWeight: 700, color: "#fff",
                transform: qtyAnim ? "scale(1.3)" : "scale(1)",
                transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}>
                {item.quantity}
              </Typography>

              <IconButton
                size="small"
                onClick={() => handleQty(onIncrease)}
                sx={{
                  borderRadius: 0, width: 30, height: 30, color: "#fff",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                }}
              >
                <AddIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: "0.88rem", color: "#2F80ED" }}>
                ₹{itemTotal}
              </Typography>
              <Tooltip title="Remove item">
                <IconButton
                  size="small"
                  onClick={handleRemove}
                  sx={{
                    color: "rgba(255,255,255,0.25)", width: 28, height: 28,
                    "&:hover": { color: "#ef4444", bgcolor: "rgba(239,68,68,0.1)" },
                    transition: "all 0.2s",
                  }}
                >
                  <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ── Main CartDrawer ───────────────────────────────────────────────────────────
export default function CartDrawer({ open, onClose }) {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, clearCart } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = couponApplied ? Math.round(total * 0.1) : 0;
  const finalTotal = total - discount;
  const savings = cartItems.reduce((sum, item) => {
    const orig = Math.round(item.price * 1.15);
    return sum + (orig - item.price) * item.quantity;
  }, 0);

  const handleCoupon = () => {
    if (coupon.trim().toUpperCase() === "BLISS10") setCouponApplied(true);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100vw", sm: 400 },
          bgcolor: "#0c111c",
          backgroundImage: "none",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* ── HEADER ── */}
      <Box sx={{
        px: 3, py: 2.5,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        bgcolor: "rgba(255,255,255,0.02)",
        flexShrink: 0,
      }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{
            width: 34, height: 34, borderRadius: "10px",
            bgcolor: "rgba(47,128,237,0.15)",
            border: "1px solid rgba(47,128,237,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 18, color: "#2F80ED" }} />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#fff", lineHeight: 1 }}>
              Your Cart
            </Typography>
            <Typography sx={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", mt: 0.2 }}>
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          {cartItems.length > 0 && (
            <Tooltip title="Clear all">
              <IconButton
                onClick={clearCart}
                size="small"
                sx={{
                  color: "rgba(255,255,255,0.25)", borderRadius: "8px",
                  "&:hover": { color: "#ef4444", bgcolor: "rgba(239,68,68,0.08)" },
                }}
              >
                <DeleteSweepOutlinedIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          )}
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "rgba(255,255,255,0.4)", borderRadius: "8px",
              "&:hover": { color: "#fff", bgcolor: "rgba(255,255,255,0.06)" },
            }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>

      {/* ── ITEMS ── */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 2.5, py: 2.5,
        "&::-webkit-scrollbar": { width: 4 },
        "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
        "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.1)", borderRadius: 2 },
      }}>
        {cartItems.length === 0 ? (
          <Box sx={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            height: "100%", gap: 2, py: 8,
            animation: "fadeIn 0.4s ease",
            "@keyframes fadeIn": { from: { opacity: 0, transform: "scale(0.9)" }, to: { opacity: 1, transform: "scale(1)" } },
          }}>
            <Box sx={{
              width: 80, height: 80, borderRadius: "50%",
              bgcolor: "rgba(47,128,237,0.08)",
              border: "2px dashed rgba(47,128,237,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ShoppingCartOutlinedIcon sx={{ fontSize: 36, color: "rgba(255,255,255,0.2)" }} />
            </Box>
            <Typography sx={{ fontWeight: 700, color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>
              Your cart is empty
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", textAlign: "center", maxWidth: 220 }}>
              Add some Apple products and they'll show up here
            </Typography>
            <Button
              onClick={onClose}
              variant="outlined"
              size="small"
              sx={{
                mt: 1, borderColor: "rgba(47,128,237,0.4)", color: "#2F80ED",
                borderRadius: "10px", textTransform: "none", fontWeight: 600,
                "&:hover": { bgcolor: "rgba(47,128,237,0.08)", borderColor: "#2F80ED" },
              }}
            >
              Browse Products
            </Button>
          </Box>
        ) : (
          <>
            {/* Savings badge */}
            {savings > 0 && (
              <Box sx={{
                display: "flex", alignItems: "center", gap: 1,
                bgcolor: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: "10px", px: 2, py: 1.2, mb: 2.5,
                animation: "slideIn 0.4s ease",
              }}>
                <LocalOfferOutlinedIcon sx={{ fontSize: 16, color: "#22c55e" }} />
                <Typography sx={{ fontSize: "0.78rem", color: "#22c55e", fontWeight: 600 }}>
                  You're saving ₹{savings.toLocaleString("en-IN")} on this order!
                </Typography>
              </Box>
            )}

            {cartItems.map((item, i) => (
              <CartItem
                key={item.id}
                item={item}
                index={i}
                onRemove={removeFromCart}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
              />
            ))}
          </>
        )}
      </Box>

      {/* ── FOOTER ── */}
      {cartItems.length > 0 && (
        <Box sx={{
          px: 2.5, pt: 2, pb: 3,
          borderTop: "1px solid rgba(255,255,255,0.07)",
          bgcolor: "rgba(255,255,255,0.01)",
          flexShrink: 0,
          animation: "slideUp 0.4s ease",
          "@keyframes slideUp": { from: { opacity: 0, transform: "translateY(20px)" }, to: { opacity: 1, transform: "none" } },
        }}>

          {/* Coupon */}
          <Box sx={{ display: "flex", gap: 1, mb: 2.5 }}>
            <Box
              component="input"
              placeholder='Try "BLISS10"'
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCoupon()}
              disabled={couponApplied}
              sx={{
                flex: 1, bgcolor: "rgba(255,255,255,0.05)",
                border: `1px solid ${couponApplied ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.1)"}`,
                borderRadius: "10px", px: 2, py: 1,
                color: couponApplied ? "#22c55e" : "#fff",
                fontSize: "0.82rem", outline: "none",
                fontFamily: "inherit",
                "&::placeholder": { color: "rgba(255,255,255,0.2)" },
                "&:focus": { borderColor: "rgba(47,128,237,0.5)" },
                transition: "border-color 0.2s",
              }}
            />
            <Button
              onClick={handleCoupon}
              disabled={couponApplied}
              size="small"
              sx={{
                borderRadius: "10px", textTransform: "none",
                fontWeight: 700, fontSize: "0.78rem", px: 2,
                bgcolor: couponApplied ? "rgba(34,197,94,0.15)" : "rgba(47,128,237,0.15)",
                color: couponApplied ? "#22c55e" : "#2F80ED",
                border: `1px solid ${couponApplied ? "rgba(34,197,94,0.3)" : "rgba(47,128,237,0.3)"}`,
                "&:hover": { bgcolor: couponApplied ? "rgba(34,197,94,0.2)" : "rgba(47,128,237,0.25)" },
                "&:disabled": { color: "#22c55e", opacity: 1 },
              }}
            >
              {couponApplied ? "✓ Applied" : "Apply"}
            </Button>
          </Box>

          {/* Price breakdown */}
          <Box sx={{
            bgcolor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "14px", px: 2.5, py: 2, mb: 2,
          }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)" }}>
                Subtotal ({cartItems.length} items)
              </Typography>
              <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                ₹{total.toLocaleString("en-IN")}
              </Typography>
            </Box>

            {couponApplied && (
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ fontSize: "0.82rem", color: "#22c55e" }}>
                  Coupon (BLISS10)
                </Typography>
                <Typography sx={{ fontSize: "0.82rem", color: "#22c55e", fontWeight: 600 }}>
                  − ₹{discount.toLocaleString("en-IN")}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)" }}>
                Delivery
              </Typography>
              <Chip label="FREE" size="small" sx={{
                bgcolor: "rgba(34,197,94,0.1)", color: "#22c55e",
                fontWeight: 700, fontSize: "0.65rem", height: 18, border: "1px solid rgba(34,197,94,0.2)",
              }} />
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.07)", my: 1.5 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography sx={{ fontWeight: 800, color: "#fff", fontSize: "0.95rem" }}>
                Total
              </Typography>
              <Typography sx={{
                fontWeight: 900, color: "#fff", fontSize: "1.15rem",
                letterSpacing: "-0.02em",
              }}>
                ₹{finalTotal.toLocaleString("en-IN")}
              </Typography>
            </Box>
          </Box>

          {/* Checkout button */}
          <Button
            fullWidth
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={() => { onClose(); navigate("/checkout"); }}
            sx={{
              py: 1.6, fontWeight: 700, fontSize: "0.95rem",
              borderRadius: "14px", textTransform: "none",
              background: "linear-gradient(135deg, #2F80ED 0%, #1a5fd4 100%)",
              boxShadow: "0 4px 20px rgba(47,128,237,0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #3d8ef5 0%, #2469e0 100%)",
                boxShadow: "0 6px 24px rgba(47,128,237,0.5)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.25s ease",
            }}
          >
            Proceed to Checkout
          </Button>

          <Typography sx={{ textAlign: "center", mt: 1.5, fontSize: "0.7rem", color: "rgba(255,255,255,0.2)" }}>
            🔒 Secure checkout · Free delivery · Easy returns
          </Typography>
        </Box>
      )}
    </Drawer>
  );
}