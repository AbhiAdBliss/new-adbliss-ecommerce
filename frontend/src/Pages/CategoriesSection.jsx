// import React from "react";
// import { Box, Typography, Container, Divider } from "@mui/material";

// import mobile from "../assets/Categories-imgs/cs1.png";
// import headphone from "../assets/Categories-imgs/cs2.png";
// import tablet from "../assets/Categories-imgs/cs3.png";
// import laptop from "../assets/Categories-imgs/cs4.png";
// import speaker from "../assets/Categories-imgs/cs5.png";
// import more from "../assets/Categories-imgs/cs6.png";

// const categories = [
//   { label: "Mobile", icon: mobile },
//   { label: "Headphone", icon: headphone },
//   { label: "Tablets", icon: tablet },
//   { label: "Laptop", icon: laptop },
//   { label: "Speakers", icon: speaker },
//   { label: "More", icon: more }
// ];

// const CategoriesSection = () => {
//   return (
//     <Box sx={{ py: { xs: 4, md: 6 } }}>
//       <Container maxWidth="lg">
        
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 4,
//             px: { xs: 1, md: 0 }
//           }}
//         >
//           <Typography variant="h4" sx={{ fontWeight: 700, color: "#222", fontSize: { xs: "1.6rem", md: "2.2rem" } }}>
//             Categories
//           </Typography>
//         </Box>

//         {/* One Line Layout - Scrollable on Mobile */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: { xs: "flex-start", md: "center" },
//             alignItems: "center",
//             gap: { xs: 2, md: 3 },
//             overflowX: { xs: "auto", md: "visible" },
//             pb: 2,
//             "::-webkit-scrollbar": { display: "none" },
//             msOverflowStyle: "none",
//             scrollbarWidth: "none",
//           }}
//         >
//           {categories.map((cat, index) => (
//             <Box
//               key={index}
//               sx={{
//                 flex: "0 0 auto",
//                 width: { xs: 100, sm: 140, md: 180, lg: 200 },
//                 height: { xs: 100, sm: 140, md: 180, lg: 200 },
//                 backgroundColor: "#fff",
//                 borderRadius: { xs: "12px", sm: "20px" },
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 boxShadow: "0 6px 16px rgba(0,0,0,0.05)",
//                 cursor: "pointer",
//                 border: "1px solid #f0f0f0",
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   transform: "translateY(-5px)",
//                   boxShadow: "0 10px 24px rgba(250, 210, 172, 1)",
//                   borderColor: "#f2b876ff"
//                 }
//               }}
//             >
//               <Box
//                 sx={{
//                   width: { xs: 40, sm: 70, md: 100, lg: 120 },
//                   height: { xs: 40, sm: 70, md: 100, lg: 120 },
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   mb: 1
//                 }}
//               >
//                 <Box
//                   component="img"
//                   src={cat.icon}
//                   alt={cat.label}
//                   sx={{
//                     maxWidth: "100%",
//                     maxHeight: "100%",
//                     objectFit: "contain"
//                   }}
//                 />
//               </Box>

//               <Typography
//                 sx={{
//                   fontWeight: 600,
//                   color: "#444",
//                   fontSize: { xs: "0.7rem", sm: "0.85rem", md: "1rem" },
//                   textAlign: "center"
//                 }}
//               >
//                 {cat.label}
//               </Typography>
//             </Box>
//           ))}
//         </Box>

//         {/* Bottom Divider */}
//         <Divider sx={{ mt: { xs: 5, md: 7 }, borderColor: "#f2d6b6ff" }} />

//       </Container>
//     </Box>
//   );
// };

// export default CategoriesSection;
