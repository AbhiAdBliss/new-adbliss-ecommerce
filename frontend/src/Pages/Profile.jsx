import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box sx={{ mt: 12, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, width: 400 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          My Profile
        </Typography>

        <Typography>Name: {user?.name}</Typography>
        <Typography>Email: {user?.email}</Typography>
        <Typography>Phone: {user?.phone}</Typography>
      </Paper>
    </Box>
  );
}
