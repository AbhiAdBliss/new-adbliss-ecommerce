import React from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom"; 

export default function CartDrawer({ open, onClose }) {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate(); 

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price.replace(/,/g, "")) * item.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {cartItems.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          cartItems.map((item) => (
            <Box key={item.id} sx={{ mb: 2 }}>
              <Typography fontWeight={600}>{item.name}</Typography>
              <Typography>₹{item.price}</Typography>

              <Box display="flex" alignItems="center" gap={1} mt={1}>
                <Button size="small" onClick={() => decreaseQty(item.id)}>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button size="small" onClick={() => increaseQty(item.id)}>+</Button>

                <IconButton onClick={() => removeFromCart(item.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Box>
              <Divider sx={{ mt: 1 }} />
            </Box>
          ))
        )}

        <Box mt={3}>
          <Typography variant="h6">Total: ₹{total.toLocaleString()}</Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => {
              onClose();
              navigate("/checkout"); 
            }}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
