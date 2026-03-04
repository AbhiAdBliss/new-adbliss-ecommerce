import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Chip,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();

  // Optimized: Load from localStorage immediately during initial render
  // This prevents the "cascading render" warning and flickering
  const [myOrders, setMyOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("myOrders");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading orders from storage:", error);
      return [];
    }
  });

  // Function to clear history (Useful for testing)
  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your order history?")) {
      localStorage.removeItem("myOrders");
      setMyOrders([]);
    }
  };

  return (
    <Box sx={{ 
      bgcolor: "#F8F9FA", 
      minHeight: "100vh", 
      py: { xs: 4, md: 8 }, 
      
    }}>
      <Container maxWidth="md">
        
        {/* HEADER SECTION */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={() => navigate("/profile")} sx={{ color: "#121212" }}>
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#121212", letterSpacing: -1 }}>
              My Orders
            </Typography>
          </Stack>
          
          {myOrders.length > 0 && (
            <Button 
              startIcon={<DeleteOutlineIcon />} 
              onClick={clearHistory}
              sx={{ color: "#6B7280", textTransform: 'none', fontWeight: 600 }}
            >
              Clear History
            </Button>
          )}
        </Stack>

        {/* ORDERS LIST */}
        {myOrders.length > 0 ? (
          <Stack spacing={3}>
            {myOrders.map((order, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 5,
                  border: "1px solid #E5E7EB",
                  bgcolor: "#fff",
                  transition: "0.3s ease",
                  "&:hover": { boxShadow: "0 12px 24px rgba(0,0,0,0.05)" },
                }}
              >
                {/* ORDER INFO BAR */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, alignItems: 'center' }}>
                  <Box>
                    <Typography sx={{ fontWeight: 800, color: "#121212" }}>
                      Order #{order.orderId || "N/A"}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#9CA3AF", fontWeight: 600 }}>
                      PLACED ON {order.date}
                    </Typography>
                  </Box>
                  <Chip 
                    label="Processing" 
                    size="small" 
                    sx={{ bgcolor: "#DBEAFE", color: "#1E40AF", fontWeight: 800, px: 1 }} 
                  />
                </Box>

                <Divider sx={{ my: 2, borderColor: '#F3F4F6' }} />

                {/* PRODUCT ITEMS IN THE ORDER */}
                <Stack spacing={2}>
                  {order.items?.map((item, idx) => (
                    <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: { xs: 2, md: 3 } }}>
                      <Box 
                        component="img" 
                        src={item.image || item.img} 
                        alt={item.name}
                        sx={{ 
                          width: 70, 
                          height: 70, 
                          borderRadius: 3, 
                          objectFit: 'contain', 
                          bgcolor: '#F9FAFB', 
                          p: 1,
                          border: '1px solid #F1F5F9'
                        }} 
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: "#1E293B" }}>
                          {item.name || item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#64748B", fontWeight: 500 }}>
                          Quantity: {item.quantity || 1}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 800, color: "#121212" }}>
                        ₹{item.price}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ my: 2, borderColor: '#F3F4F6' }} />

                {/* FOOTER ACTIONS */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle2" sx={{ color: "#64748B" }}>
                    Total Amount: <span style={{ color: '#121212', fontWeight: 900 }}>₹{order.total || order.items?.reduce((acc, curr) => acc + curr.price, 0)}</span>
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => navigate(`/product/${order.items[0]?.id}`)}
                    sx={{ 
                      borderRadius: 2, 
                      textTransform: "none", 
                      fontWeight: 700, 
                      color: '#121212', 
                      borderColor: '#E5E7EB',
                      "&:hover": { bgcolor: "#F9FAFB", borderColor: "#121212" }
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Paper>
            ))}
          </Stack>
        ) : (
          /* EMPTY STATE */
          <Paper
            elevation={0}
            sx={{
              p: 10,
              textAlign: 'center',
              borderRadius: 8,
              bgcolor: 'transparent',
              border: '2px dashed #E5E7EB'
            }}
          >
            <LocalMallIcon sx={{ fontSize: 80, color: '#E5E7EB', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>No orders yet!</Typography>
            <Typography sx={{ color: "#6B7280", mb: 4 }}>
              When you buy items, they will appear here for you to track.
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => navigate('/apple')}
              sx={{ 
                bgcolor: "#121212", 
                borderRadius: 3, 
                px: 5, 
                py: 1.5, 
                fontWeight: 700,
                "&:hover": { bgcolor: "#333" }
              }}
            >
              Start Shopping
            </Button>
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Orders;