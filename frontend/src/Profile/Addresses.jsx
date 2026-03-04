import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  IconButton,
  Chip,
  Divider,
  Card,
  Grid
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HomeIcon from "@mui/icons-material/Home";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useNavigate } from "react-router-dom";

const Addresses = () => {
  const navigate = useNavigate();

  // Mock data - usually this would come from your 'user' object in localStorage or API
  const [addressList, setAddressList] = useState([
  
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Delete this address?")) {
      setAddressList(addressList.filter((addr) => addr.id !== id));
    }
  };

  return (
    <Box sx={{ bgcolor: "#F8F9FA", minHeight: "100vh", py: { xs: 4, md: 10 } }}>
      <Container maxWidth="md">
        
        {/* HEADER */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton onClick={() => navigate("/profile")} sx={{ color: "#121212" }}>
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#121212", letterSpacing: -1 }}>
              My Addresses
            </Typography>
          </Stack>
          
          <Button 
  variant="contained" 
  startIcon={<AddIcon />}
  onClick={() => alert("Add Address Modal coming soon!")}
  sx={{ 
    bgcolor: "#121212",
    borderRadius: 3,
    textTransform: "none",
    fontWeight: 700,

    px: { xs: 1.1, sm: 3 },   
    py: { xs: 0.6, sm: 1 },   
    fontSize: { xs: "12px", sm: "14px" }, 

    "&:hover": { bgcolor: "#333" }
  }}
>
  Add New
</Button>
        </Stack>

        <Grid container spacing={3}>
          {addressList.map((addr) => (
            <Grid item xs={12} key={addr.id}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: 5, 
                  border: addr.isDefault ? "2px solid #121212" : "1px solid #E5E7EB",
                  bgcolor: "#fff",
                  position: 'relative'
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Stack direction="row" spacing={2} alignItems="center">
                    {addr.type === "Home" ? <HomeIcon color="action" /> : <WorkOutlineIcon color="action" />}
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>{addr.type}</Typography>
                    {addr.isDefault && (
                      <Chip label="DEFAULT" size="small" sx={{ bgcolor: "#121212", color: "#fff", fontWeight: 700, height: 20, fontSize: '0.65rem' }} />
                    )}
                  </Stack>
                  
                  <IconButton onClick={() => handleDelete(addr.id)} sx={{ color: "#DC2626" }}>
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Stack>

                <Box sx={{ mt: 2, ml: 5 }}>
                  <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{addr.name}</Typography>
                  <Typography variant="body2" sx={{ color: "#6B7280", lineHeight: 1.6 }}>
                    {addr.street}<br />
                    {addr.city} - {addr.pincode}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontWeight: 600, color: "#121212" }}>
                    Phone: {addr.phone}
                  </Typography>
                </Box>

                {!addr.isDefault && (
                  <Button 
                    size="small" 
                    sx={{ mt: 2, ml: 4, textTransform: 'none', fontWeight: 700, color: '#5c8bc8ff' }}
                    onClick={() => alert("Address set as default")}
                  >
                    Set as Default
                  </Button>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

        {addressList.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography color="textSecondary">No addresses saved yet.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Addresses;