import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Deal1 from "../assets/Deals/Deal1.png";
import Deal2 from "../assets/Deals/Deal2.png";
import Deal3 from "../assets/Deals/Deal3.png";
import Deal4 from "../assets/Deals/Deal4.png";
import Deal5 from "../assets/Deals/Deal5.png";
import Deal6 from "../assets/Deals/Deal6.png";
import Footer from "../Components/Footer";

const accessories = [
  { id: 1, name: "Samsung Galaxy S25 Ultra 5G (12GB RAM, 256GB Storage) Titanium Silverblue", image: Deal1 },
  { id: 2, name: "Samsung Galaxy S25 5G (12GB RAM, 256GB Storage) Silver Shadow", image: Deal2 },
  { id: 3, name: "Samsung Galaxy Z Fold7 5G Smartphone with Galaxy AI", image: Deal3 },
  { id: 4, name: "Samsung Galaxy S25 FE 8GB 256GB Navy", image: Deal4 },
  { id: 5, name: "Samsung Galaxy Z Flip 7 FE 5G 8GB 256GB Black", image: Deal5 },
  { id: 6, name: "Samsung Galaxy S24 Ultra 12GB 512GB Orange", image: Deal6 },
];

export default function Deals() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ background: "white", py: { xs: 4, md: 8 } }}>
        <Container maxWidth="xl">
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            mb={1}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            Bestsellers Deals
          </Typography>

          <Typography 
            variant="subtitle1" 
            color="text.secondary" 
            mb={4}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            Grab the hottest accessories at unbeatable prices!
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {accessories.map((item) => (
              <Grid
                item
                key={item.id}
                xs={12}
                sm={6}
                lg={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    width: 360,
                    maxWidth: "100%",
                    height: 430,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Product Image */}
                  <Box sx={{ height: 220, bgcolor: "#fff", p: 1 }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>

                  {/* Product Name */}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        fontWeight: 600,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "56px",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </CardContent>

                  {/* Button */}
                  <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/promo/${item.id}`)}
                      sx={{
                        width: "140px",
                        height: "40px",
                        bgcolor: "#c0974b",
                        color: "#fff",
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": { bgcolor: "#ce8908" },
                      }}
                    >
                      View Deal
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
