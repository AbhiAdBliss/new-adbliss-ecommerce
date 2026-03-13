import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
  Backdrop,
  Stack,
  Chip,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Avatar,
  LinearProgress,
} from "@mui/material";

import { useParams, useNavigate } from "react-router-dom";

import { useCart } from "../context/useCart";
import Register from "../Pages/Register";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { motion as Motion } from "framer-motion";
import VerifiedIcon from "@mui/icons-material/Verified";
import SecurityIcon from "@mui/icons-material/Security";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MemoryIcon from "@mui/icons-material/Memory";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import StorageIcon from "@mui/icons-material/Storage";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BoltIcon from "@mui/icons-material/Bolt";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

import Apple1 from "../assets/AppleS-imgs/Apple1.png";
import Apple2 from "../assets/AppleS-imgs/Apple2.png";
import Apple3 from "../assets/AppleS-imgs/Apple3.png";
import Apple4 from "../assets/AppleS-imgs/Apple4.png";
import Apple5 from "../assets/AppleS-imgs/Apple5.png";
import Apple6 from "../assets/AppleS-imgs/Apple6.png";
import Apple7 from "../assets/AppleS-imgs/Apple7.png";
import Apple8 from "../assets/AppleS-imgs/Apple8.png";
import Apple9 from "../assets/AppleS-imgs/Apple9.png";
import RatingsReviews from "../Components/RatingsReviews";

const products = [
  {
    id: 1,
    brand: "Apple",
    name: "iPhone 17 (256GB Storage, Black)",
    slug: "apple-iphone-17-256gb-storage-black",
    image: Apple1,
    price: 89900,
    rating: 4.5,
    reviewCount: 2847,
    stock: "In Stock",
    colors: ["#1a1a1a", "#f5f5f0", "#c9b6a0", "#2d4a6e"],
    colorNames: ["Black", "White", "Natural", "Blue"],
    specs: {
      Display: '6.3" Super Retina XDR OLED',
      Processor: "A19 Bionic Chip",
      RAM: "8 GB",
      Storage: "256 GB",
      "Rear Camera": "48MP + 12MP Ultra Wide",
      "Front Camera": "12MP TrueDepth",
      Battery: "3,279 mAh",
      OS: "iOS 18",
      "SIM Type": "Nano SIM + eSIM",
      Weight: "170g",
    },
    features: ["256 GB ROM", "6.3 inch Super Retina XDR", "48MP Camera", "A19 Chip"],
    highlights: [
      { title: "256 GB ROM", desc: "Store thousands of photos & videos" },
      { title: "A19 Chip", desc: "Ultra-fast performance and smooth gaming" },
      { title: "48MP Camera", desc: "Professional photography with great zoom" },
      { title: "12MP Front Camera", desc: "Sharp selfies and FaceTime calls" },
      { title: '6.3" OLED Display', desc: "Immersive Super Retina XDR viewing" },
    ],
    reviews: [
      { name: "Rahul S.", rating: 5, date: "Feb 2025", comment: "Absolutely amazing phone! The camera quality is outstanding and performance is top-notch. Battery lasts the whole day.", helpful: 142 },
      { name: "Priya M.", rating: 4, date: "Jan 2025", comment: "Great phone overall. Build quality is premium and the display is gorgeous. Slightly expensive but worth every rupee.", helpful: 98 },
      { name: "Arjun K.", rating: 5, date: "Jan 2025", comment: "Switched from Android and I'm loving it. Smooth experience, great ecosystem, A19 chip is blazing fast.", helpful: 76 },
    ],
    ratingBreakdown: { 5: 68, 4: 19, 3: 8, 2: 3, 1: 2 },
  },
  {
    id: 2,
    brand: "Apple",
    name: "iPhone Air (256GB Storage, Sky Blue)",
    slug: "apple-iphone-air-256gb-storage-sky-blue",
    image: Apple2,
    price: 139990,
    rating: 4.3,
    reviewCount: 1124,
    stock: "Limited Stock",
    colors: ["#a8d8ea", "#f5f5f0", "#f4a261", "#2a9d8f"],
    colorNames: ["Sky Blue", "White", "Peach", "Teal"],
    specs: {
      Display: '6.7" OLED ProMotion',
      Processor: "A18 Bionic Chip",
      RAM: "8 GB",
      Storage: "256 GB",
      "Rear Camera": "64MP Main + 12MP Ultra",
      "Front Camera": "12MP TrueDepth",
      Battery: "4,000 mAh",
      OS: "iOS 18",
      "SIM Type": "Nano SIM + eSIM",
      Weight: "185g",
    },
    features: ["256 GB ROM", "6.7 inch OLED Display", "64MP Camera", "A18 Chip"],
    highlights: [
      { title: "256 GB ROM", desc: "Large storage for apps, photos and videos" },
      { title: "A18 Chip", desc: "High speed processing and multitasking" },
      { title: "64MP Camera", desc: "Detailed photos with improved zoom" },
      { title: "12MP Front Camera", desc: "Clear selfies and video calls" },
      { title: '6.7" OLED Display', desc: "Large immersive viewing experience" },
    ],
    reviews: [
      { name: "Sneha R.", rating: 4, date: "Mar 2025", comment: "Very slim and lightweight. Great for daily use. Camera is excellent!", helpful: 55 },
      { name: "Vikram P.", rating: 5, date: "Feb 2025", comment: "The thin form factor is unreal. Premium build quality and great performance.", helpful: 83 },
      { name: "Neha T.", rating: 4, date: "Feb 2025", comment: "Love the sky blue colour. Display is stunning and A18 chip handles everything smoothly.", helpful: 44 },
    ],
    ratingBreakdown: { 5: 58, 4: 24, 3: 10, 2: 5, 1: 3 },
  },
  {
    id: 3,
    brand: "Apple",
    name: "Macbook Air M4 Chip",
    slug: "apple-macbook-air-m4-chip",
    image: Apple3,
    price: 114900,
    rating: 4.7,
    reviewCount: 3210,
    stock: "In Stock",
    colors: ["#c0c0c0", "#f5e6c8", "#1a1a1a", "#d4a0a0"],
    colorNames: ["Silver", "Starlight", "Midnight", "Rose"],
    specs: {
      Display: '13.6" Liquid Retina',
      Processor: "Apple M4 Chip",
      RAM: "8 GB Unified",
      Storage: "256 GB SSD",
      Graphics: "10-core GPU",
      Camera: "1080p FaceTime HD",
      Battery: "52.6 Wh / 18 hrs",
      OS: "macOS Sequoia",
      Ports: "2x Thunderbolt 4, MagSafe",
      Weight: "1.24 kg",
    },
    features: ["8GB RAM | 256GB SSD", "13.6 inch Retina", "M4 Chip", "18hr Battery"],
    highlights: [
      { title: "M4 Chip", desc: "Next-generation Apple Silicon performance" },
      { title: '13.6" Retina Display', desc: "Stunning colors and sharp text" },
      { title: "256GB SSD", desc: "Fast storage and quick app loading" },
      { title: "18 Hour Battery", desc: "All-day battery for work and travel" },
      { title: "Lightweight Design", desc: "Ultra portable aluminium body" },
    ],
    reviews: [
      { name: "Karthik N.", rating: 5, date: "Mar 2025", comment: "Best laptop I've ever owned. M4 chip is incredibly fast, battery lasts all day. macOS is just perfect.", helpful: 215 },
      { name: "Meera L.", rating: 5, date: "Feb 2025", comment: "Shifted from Windows and never looking back. Fan-less design, lightweight, handles design work flawlessly.", helpful: 167 },
      { name: "Dev A.", rating: 4, date: "Jan 2025", comment: "Great machine for programming and design. Only wish it had more base RAM.", helpful: 99 },
    ],
    ratingBreakdown: { 5: 74, 4: 16, 3: 6, 2: 2, 1: 2 },
  },
  {
    id: 4,
    brand: "Apple",
    name: "iPad 11th Gen 2025",
    slug: "apple-ipad-11th-gen-2025",
    image: Apple4,
    price: 49900,
    rating: 4.4,
    reviewCount: 1876,
    stock: "In Stock",
    colors: ["#a0c4e8", "#f5f5f0", "#f4a261", "#c8b8d8"],
    colorNames: ["Blue", "Silver", "Pink", "Purple"],
    specs: {
      Display: '11" Liquid Retina',
      Processor: "A16 Bionic Chip",
      RAM: "4 GB",
      Storage: "128 GB",
      "Rear Camera": "12MP Wide",
      "Front Camera": "12MP Ultra Wide",
      Battery: "28.65 Wh / 10 hrs",
      OS: "iPadOS 18",
      Connectivity: "Wi-Fi 6E, Bluetooth 5.3",
      Weight: "477g",
    },
    features: ["128 GB", "11 inch Display", "12MP Camera", "A16 Chip"],
    highlights: [
      { title: "128 GB Storage", desc: "Store apps, photos and files easily" },
      { title: "A16 Chip", desc: "Smooth performance and gaming" },
      { title: '11" Display', desc: "Large immersive screen for movies & work" },
      { title: "12MP Camera", desc: "Clear photos and video calls" },
    ],
    reviews: [
      { name: "Ananya B.", rating: 5, date: "Mar 2025", comment: "Perfect for students! Use it for notes, Netflix and light work. Display is stunning.", helpful: 88 },
      { name: "Suresh G.", rating: 4, date: "Feb 2025", comment: "Great iPad for the price. Apple Pencil support is excellent.", helpful: 62 },
      { name: "Riya M.", rating: 4, date: "Jan 2025", comment: "Solid performer. Great for reading, streaming and productivity.", helpful: 41 },
    ],
    ratingBreakdown: { 5: 61, 4: 23, 3: 9, 2: 4, 1: 3 },
  },
  {
    id: 5,
    brand: "Apple",
    name: "Watch SE 3 GPS 44mm",
    slug: "apple-watch-se-3-gps-44mm",
    image: Apple5,
    price: 29900,
    rating: 4.2,
    reviewCount: 942,
    stock: "In Stock",
    colors: ["#1a1a1a", "#f5f5f0", "#e8c4a0", "#c8d8e8"],
    colorNames: ["Midnight", "Starlight", "Gold", "Blue"],
    specs: {
      Display: '1.78" LTPO OLED Retina',
      Processor: "S9 SiP",
      Storage: "32 GB",
      Sensors: "Heart Rate, Blood Oxygen, Crash Detection",
      GPS: "Built-in L1 GPS",
      "Water Resistance": "50m WR",
      Battery: "Up to 18 hours",
      OS: "watchOS 11",
      Connectivity: "Bluetooth 5.3, Wi-Fi",
      Weight: "39g (case only)",
    },
    features: ["44mm Display", "Heart Rate", "GPS", "Water Resistant"],
    highlights: [
      { title: "44mm Retina Display", desc: "Bright display for easy viewing" },
      { title: "Heart Rate Sensor", desc: "Track your health and fitness" },
      { title: "Built-in GPS", desc: "Track outdoor workouts accurately" },
      { title: "Water Resistant", desc: "Perfect for swimming and workouts" },
    ],
    reviews: [
      { name: "Rohan S.", rating: 4, date: "Feb 2025", comment: "Great smartwatch. Health tracking is accurate and battery is decent.", helpful: 53 },
      { name: "Divya P.", rating: 4, date: "Jan 2025", comment: "Looks beautiful. Sleep tracking and workout tracking work perfectly.", helpful: 38 },
      { name: "Arun V.", rating: 5, date: "Dec 2024", comment: "Best value Apple Watch. Does everything I need at a great price.", helpful: 70 },
    ],
    ratingBreakdown: { 5: 55, 4: 26, 3: 11, 2: 5, 1: 3 },
  },
  {
    id: 6,
    brand: "Apple",
    name: "Apple TV 4K",
    slug: "apple-tv-4k",
    image: Apple6,
    price: 19900,
    rating: 4.3,
    reviewCount: 684,
    stock: "In Stock",
    colors: ["#1a1a1a"],
    colorNames: ["Black"],
    specs: {
      Resolution: "4K HDR (Dolby Vision)",
      Processor: "A15 Bionic Chip",
      Storage: "128 GB",
      Audio: "Dolby Atmos",
      Connectivity: "Wi-Fi 6, Bluetooth 5.0, HDMI 2.1",
      "Remote Type": "Siri Remote with Touch",
      OS: "tvOS 18",
      "Power Consumption": "3.5W",
    },
    features: ["128 GB", "4K HDR", "Dolby Atmos", "A15 Chip"],
    highlights: [
      { title: "4K HDR", desc: "Ultra-high definition streaming quality" },
      { title: "Dolby Atmos", desc: "Immersive surround sound experience" },
      { title: "A15 Chip", desc: "Fast navigation and smooth apps" },
      { title: "Apple Ecosystem", desc: "Works seamlessly with iPhone & iPad" },
    ],
    reviews: [
      { name: "Sanjay K.", rating: 5, date: "Feb 2025", comment: "Brilliant device. Picture quality in 4K Dolby Vision is jaw-dropping.", helpful: 45 },
      { name: "Kavya R.", rating: 4, date: "Jan 2025", comment: "Great streaming box. Integrates perfectly with all my Apple devices.", helpful: 32 },
      { name: "Mohan P.", rating: 4, date: "Dec 2024", comment: "Very smooth interface, loads content quickly. Siri remote is easy to use.", helpful: 28 },
    ],
    ratingBreakdown: { 5: 59, 4: 23, 3: 10, 2: 5, 1: 3 },
  },
  {
    id: 7,
    brand: "Apple",
    name: "AirPods Pro 3",
    slug: "apple-airpods-pro-3",
    image: Apple7,
    price: 24900,
    rating: 4.6,
    reviewCount: 4123,
    stock: "In Stock",
    colors: ["#f5f5f0", "#1a1a1a"],
    colorNames: ["White", "Black"],
    specs: {
      Driver: "Custom Apple H2 chip",
      ANC: "Active Noise Cancellation",
      Audio: "Spatial Audio with Head Tracking",
      "Transparency Mode": "Adaptive Transparency",
      Charging: "MagSafe / Lightning / Qi",
      "Battery (Buds)": "6 hours (ANC on)",
      "Battery (Total)": "30 hours with case",
      "Water Resistance": "IPX4",
      Connectivity: "Bluetooth 5.3",
      Weight: "5.3g per earbud",
    },
    features: ["Noise Cancellation", "Spatial Audio", "MagSafe", "30hr Battery"],
    highlights: [
      { title: "Active Noise Cancellation", desc: "Block unwanted noise" },
      { title: "Spatial Audio", desc: "Theatre-like sound experience" },
      { title: "MagSafe Charging", desc: "Easy magnetic charging support" },
      { title: "30 Hour Battery", desc: "Long listening time with case" },
    ],
    reviews: [
      { name: "Tanvi S.", rating: 5, date: "Mar 2025", comment: "Best earbuds ever! ANC is incredible, blocks out everything. Sound quality is top tier.", helpful: 312 },
      { name: "Nikhil V.", rating: 5, date: "Feb 2025", comment: "Spatial audio makes music sound live. Fit is comfortable for long hours. Love them!", helpful: 245 },
      { name: "Pooja R.", rating: 4, date: "Feb 2025", comment: "Great ANC and sound. Battery with the case is excellent. A bit pricey but worth it.", helpful: 178 },
    ],
    ratingBreakdown: { 5: 72, 4: 17, 3: 7, 2: 2, 1: 2 },
  },
  {
    id: 8,
    brand: "Apple",
    name: "iPhone 17 Pro",
    slug: "apple-iphone-17-pro",
    image: Apple8,
    price: 129900,
    rating: 4.8,
    reviewCount: 1534,
    stock: "Limited Stock",
    colors: ["#b0b8b0", "#1a1a1a", "#d4a0a0", "#c0c8b8"],
    colorNames: ["Natural Titanium", "Black Titanium", "Desert Titanium", "White Titanium"],
    specs: {
      Display: '6.3" Super Retina XDR ProMotion',
      Processor: "A19 Pro Chip",
      RAM: "8 GB",
      Storage: "256 GB",
      "Rear Camera": "50MP Fusion + 48MP Ultra + 12MP Telephoto",
      "Front Camera": "12MP TrueDepth",
      Battery: "3,274 mAh",
      OS: "iOS 18",
      "SIM Type": "Nano SIM + eSIM",
      Build: "Titanium Frame + Ceramic Shield",
    },
    features: ["256 GB", "OLED Display", "50MP Camera", "A19 Pro Chip"],
    highlights: [
      { title: "A19 Pro Chip", desc: "Extreme speed and performance" },
      { title: "50MP Camera", desc: "Professional photography system" },
      { title: "256GB Storage", desc: "Store thousands of photos and apps" },
      { title: "OLED Display", desc: "Vibrant colours and sharp visuals" },
    ],
    reviews: [
      { name: "Aditya C.", rating: 5, date: "Mar 2025", comment: "This is the best iPhone ever made. Camera system is pro-level, titanium build is premium.", helpful: 198 },
      { name: "Ishaan M.", rating: 5, date: "Feb 2025", comment: "Worth every rupee. The ProMotion display is buttery smooth and camera in low light is mind-blowing.", helpful: 152 },
      { name: "Shreya B.", rating: 4, date: "Feb 2025", comment: "Stunning phone. Pro camera system is exceptional. A19 Pro handles everything effortlessly.", helpful: 91 },
    ],
    ratingBreakdown: { 5: 79, 4: 14, 3: 4, 2: 2, 1: 1 },
  },
  {
    id: 9,
    brand: "Apple",
    name: "MagSafe Battery",
    slug: "apple-magsafe-battery",
    image: Apple9,
    price: 10900,
    rating: 4.0,
    reviewCount: 428,
    stock: "In Stock",
    colors: ["#f5f5f0", "#1a1a1a"],
    colorNames: ["White", "Black"],
    specs: {
      Capacity: "5,000 mAh",
      Output: "15W MagSafe / 7.5W Qi",
      Input: "USB-C PD (20W)",
      Compatibility: "iPhone 12 and later",
      "Pass-through Charging": "Supported",
      Dimensions: "103.7 x 59.0 x 14.4 mm",
      Weight: "103.9g",
      "Cable Included": "USB-C (1m)",
    },
    features: ["5000mAh", "MagSafe", "Fast Charging", "Compact Design"],
    highlights: [
      { title: "5000mAh Battery", desc: "Extra power for your iPhone" },
      { title: "MagSafe", desc: "Perfect magnetic alignment charging" },
      { title: "Fast Charging", desc: "Quick power boost when needed" },
      { title: "Compact Design", desc: "Slim portable battery pack" },
    ],
    reviews: [
      { name: "Hari K.", rating: 4, date: "Feb 2025", comment: "Snaps on magnetically and charges my iPhone 17. Very convenient for travel.", helpful: 35 },
      { name: "Latha S.", rating: 4, date: "Jan 2025", comment: "Good battery pack. Works perfectly with MagSafe. Wish it had a bigger capacity.", helpful: 22 },
      { name: "Ravi N.", rating: 4, date: "Dec 2024", comment: "Solid build, charges fast. Perfect travel companion for iPhone users.", helpful: 18 },
    ],
    ratingBreakdown: { 5: 49, 4: 30, 3: 13, 2: 5, 1: 3 },
  },
];

const highlightIcons = [
  <StorageIcon sx={{ fontSize: 28, color: "#555" }} />,
  <MemoryIcon sx={{ fontSize: 28, color: "#555" }} />,
  <CameraAltIcon sx={{ fontSize: 28, color: "#555" }} />,
  <PhotoCameraFrontIcon sx={{ fontSize: 28, color: "#555" }} />,
  <PhoneIphoneIcon sx={{ fontSize: 28, color: "#555" }} />,
];

// ── Star Rating Component ──────────────────────────────────────────────
function StarRating({ rating, size = "small" }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<StarIcon key={i} sx={{ fontSize: size === "small" ? 16 : 20, color: "#f59e0b" }} />);
    } else if (i - rating < 1) {
      stars.push(<StarHalfIcon key={i} sx={{ fontSize: size === "small" ? 16 : 20, color: "#f59e0b" }} />);
    } else {
      stars.push(<StarBorderIcon key={i} sx={{ fontSize: size === "small" ? 16 : 20, color: "#f59e0b" }} />);
    }
  }
  return <Box sx={{ display: "flex", alignItems: "center" }}>{stars}</Box>;
}

// ── Delivery Estimator ─────────────────────────────────────────────────
function getDeliveryDate() {
  const today = new Date();
  const delivery = new Date(today);
  delivery.setDate(today.getDate() + 3);
  return delivery.toLocaleDateString("en-IN", { weekday: "long", month: "short", day: "numeric" });
}

export default function ProductDetails() {
  const navigate = useNavigate();
  const { param } = useParams();

  const product = React.useMemo(() => {
    return (
      products.find((p) => p.id === Number(param)) ||
      products.find((p) => p.slug === param)
    );
  }, [param]);

  const discount = 8;
  const originalPrice = product ? Math.round(product.price / (1 - discount / 100)) : 0;

  const { addToCart } = useCart();

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  const [openToast, setOpenToast] = React.useState(false);
  const [toastMsg, setToastMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [wishlist, setWishlist] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedColor, setSelectedColor] = React.useState(0);
//  const [copied, setCopied] = React.useState(false);

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h5">Product not found</Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Box>
    );
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setToastMsg("🔐 Please login or register first");
      setOpenToast(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        for (let i = 0; i < quantity; i++) addToCart(product);
        setLoading(false);
        setToastMsg(`🛒 ${quantity} item${quantity > 1 ? "s" : ""} added to cart`);
        setOpenToast(true);
      }, 700);
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      setToastMsg("🔐 Please login or register first");
      setOpenToast(true);
    } else {
      setLoading(true);
      setTimeout(() => {
        for (let i = 0; i < quantity; i++) addToCart(product);
        navigate("/checkout");
      }, 700);
    }
  };

const handleShare = () => {
  navigator.clipboard.writeText(window.location.href);
  setToastMsg("🔗 Link copied to clipboard!");
  setOpenToast(true);
};

  const emiAmount = Math.round((product.price * 1.015) / 9);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <Box>
      {/* LOADER */}
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 9999, backgroundColor: "rgba(0,0,0,0.85)" }}>
        <Stack spacing={3} alignItems="center">
          <ShoppingBagIcon sx={{ fontSize: 60, color: "#2F80ED" }} />
          <Typography variant="h6">Preparing your order...</Typography>
          <CircularProgress size={45} sx={{ color: "#2F80ED" }} />
        </Stack>
      </Backdrop>

      <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 4, md: 8 }, bgcolor: "#f7f7f7ff", minHeight: "100vh" }}>
        <Grid container spacing={5} sx={{ maxWidth: "1600px", margin: "0 auto" }}>

          {/* ── PRODUCT IMAGE SECTION ─────────────────────────────── */}
          <Grid item xs={12} md={isLoggedIn ? 4 : 4}>
            {/* Stock badge */}
            <Box sx={{ mb: 1 }}>
              <Chip
                icon={product.stock === "In Stock" ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : <BoltIcon sx={{ fontSize: 16 }} />}
                label={product.stock}
                size="small"
                sx={{
                  bgcolor: product.stock === "In Stock" ? "#dcfce7" : "#fef3c7",
                  color: product.stock === "In Stock" ? "#16a34a" : "#d97706",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                }}
              />
            </Box>

            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 4,
                bgcolor: "#fff",
                border: "1px solid #e4e3e3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: { md: "400px" },
                position: "relative",
              }}
            >
              {/* Wishlist & Share top-right */}
              <Box sx={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 0.5 }}>
                <Tooltip title={wishlist ? "Remove from Wishlist" : "Add to Wishlist"}>
                  <IconButton
                    onClick={() => {
                      setWishlist(!wishlist);
                      setToastMsg(wishlist ? "💔 Removed from wishlist" : "❤️ Added to wishlist");
                      setOpenToast(true);
                    }}
                    sx={{ bgcolor: "#f9fafb", "&:hover": { bgcolor: "#fee2e2" } }}
                  >
                    {wishlist ? (
                      <FavoriteIcon sx={{ color: "#ef4444", fontSize: 20 }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ color: "#9ca3af", fontSize: 20 }} />
                    )}
                  </IconButton>
                </Tooltip>

                <Tooltip title="Share Product">
                  <IconButton onClick={handleShare} sx={{ bgcolor: "#f9fafb", "&:hover": { bgcolor: "#dbeafe" } }}>
                    <ShareIcon sx={{ color: "#6b7280", fontSize: 20 }} />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{ width: "100%", maxWidth: isLoggedIn ? 460 : 340, height: "auto", objectFit: "contain" }}
              />
            </Paper>

            {/* Color Selector */}
            {product.colors && product.colors.length > 1 && (
              <Box sx={{ mt: 2.5, p: 2, bgcolor: "#fff", borderRadius: 3, border: "1px solid #e4e3e3" }}>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", mb: 1.5 }}>
                  Colour: <span style={{ fontWeight: 700 }}>{product.colorNames[selectedColor]}</span>
                </Typography>
                <Stack direction="row" spacing={1.5} flexWrap="wrap">
                  {product.colors.map((color, idx) => (
                    <Tooltip key={idx} title={product.colorNames[idx]}>
                      <Box
                        onClick={() => setSelectedColor(idx)}
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          bgcolor: color,
                          border: selectedColor === idx ? "3px solid #2F80ED" : "2px solid #d1d5db",
                          cursor: "pointer",
                          transition: "transform 0.15s",
                          "&:hover": { transform: "scale(1.15)" },
                          boxShadow: selectedColor === idx ? "0 0 0 2px #bfdbfe" : "none",
                        }}
                      />
                    </Tooltip>
                  ))}
                </Stack>
              </Box>
            )}

            {/* Quantity Selector */}
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: "#fff",
                borderRadius: 3,
                border: "1px solid #e4e3e3",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151" }}>Quantity</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <IconButton
                  size="small"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  sx={{ bgcolor: "#f3f4f6", width: 30, height: 30 }}
                >
                  <RemoveIcon sx={{ fontSize: 16 }} />
                </IconButton>
                <Typography sx={{ fontWeight: 700, minWidth: 24, textAlign: "center" }}>{quantity}</Typography>
                <IconButton
                  size="small"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  sx={{ bgcolor: "#f3f4f6", width: 30, height: 30 }}
                >
                  <AddIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Stack>
            </Box>

            {/* CTA Buttons */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddToCart}
                sx={{
                  bgcolor: "#374151",
                  fontWeight: 700,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "#1f2937",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.35)",
                  },
                }}
              >
                ADD TO CART
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={handleBuyNow}
                sx={{
                  bgcolor: "#2F80ED",
                  fontWeight: 700,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "#1e6fd9",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 16px rgba(37,99,235,0.4)",
                  },
                }}
              >
                BUY NOW
              </Button>
            </Stack>

            {/* Delivery info */}
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: "#f0fdf4",
                borderRadius: 3,
                border: "1px solid #bbf7d0",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <LocalShippingIcon sx={{ color: "#16a34a", fontSize: 22 }} />
              <Box>
                <Typography sx={{ fontSize: "0.78rem", color: "#16a34a", fontWeight: 700 }}>
                  FREE Delivery
                </Typography>
                <Typography sx={{ fontSize: "0.78rem", color: "#374151", fontWeight: 500 }}>
                  Estimated by <strong>{getDeliveryDate()}</strong>
                </Typography>
              </Box>
            </Box>

            {/* Exchange offer */}
            <Box
              sx={{
                mt: 1.5,
                p: 1.5,
                bgcolor: "#fffbeb",
                borderRadius: 3,
                border: "1px solid #fde68a",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <SwapHorizIcon sx={{ color: "#d97706", fontSize: 20 }} />
              <Typography sx={{ fontSize: "0.78rem", color: "#374151", fontWeight: 500 }}>
                Exchange your old device & save up to{" "}
                <strong style={{ color: "#d97706" }}>₹15,000</strong>
              </Typography>
            </Box>
          </Grid>

          {/* ── PRODUCT DETAILS SECTION ───────────────────────────── */}
          <Grid
            item
            xs={12}
            sx={{
              maxWidth: {
                xs: "100%",
                sm: isLoggedIn ? 420 : 340,
                md: isLoggedIn ? 460 : 360,
                lg: isLoggedIn ? 580 : 380,
              },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Box sx={{ height: "100%", mt: 1 }}>
              {/* Brand */}
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#2F80ED", textTransform: "uppercase", letterSpacing: 1 }}>
                {product.brand}
              </Typography>

              <Typography
                variant="h5"
                fontWeight={800}
                sx={{ fontSize: { xs: "1.5rem", md: "1.6rem" }, mt: 0.5 }}
              >
                {product.name}
              </Typography>

              {/* Rating Row */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mt: 1.5,
                  justifyContent: { xs: "center", md: "flex-start" },
                  flexWrap: "wrap",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, bgcolor: "#f59e0b", px: 1, py: 0.3, borderRadius: 1 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: "0.85rem", color: "#fff" }}>{product.rating}</Typography>
                  <StarIcon sx={{ fontSize: 14, color: "#fff" }} />
                </Box>
                <StarRating rating={product.rating} />
                <Typography sx={{ fontSize: "0.85rem", color: "#6b7280" }}>
                  {product.reviewCount.toLocaleString("en-IN")} ratings
                </Typography>
                <Chip label="Apple Verified" size="small" sx={{ bgcolor: "#e0f2fe", color: "#0369a1", fontWeight: 600, fontSize: "0.7rem" }} />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                Premium Apple product with guaranteed performance.
              </Typography>

              {/* Price */}
              <Box sx={{ mt: { xs: 1.5, md: 2 } }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    color: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", md: "flex-start" },
                    gap: { xs: 0.8, md: 1.2 },
                    flexWrap: "wrap",
                    fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem" },
                  }}
                >
                  ₹{product.price.toLocaleString("en-IN")}
                  <Typography
                    component="span"
                    sx={{ textDecoration: "line-through", color: "#6b7280", fontSize: { xs: "1rem", sm: "1.2rem", md: "1.6rem" }, fontWeight: 500 }}
                  >
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{ color: "#38cb49ff", fontWeight: 700, fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.3rem" } }}
                  >
                    {discount}% OFF
                  </Typography>
                </Typography>
                <Typography sx={{ color: "#9b810fff", fontWeight: 600, fontSize: { xs: "0.8rem", md: "0.9rem" }, mt: 0.5, textAlign: { xs: "center", md: "left" } }}>
                  Inclusive of all taxes
                </Typography>
              </Box>

              {/* EMI Strip */}
              <Box
                sx={{
                  mt: 2,
                  p: 1.5,
                  bgcolor: "#f0f9ff",
                  borderRadius: 2.5,
                  border: "1px solid #bae6fd",
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  justifyContent: { xs: "center", md: "flex-start" },
                  flexWrap: "wrap",
                }}
              >
                <CreditCardIcon sx={{ color: "#0284c7", fontSize: 20 }} />
                <Typography sx={{ fontSize: "0.82rem", color: "#0c4a6e", fontWeight: 600 }}>
                  No Cost EMI from{" "}
                  <strong>₹{emiAmount.toLocaleString("en-IN")}/mo</strong> · Available on all major cards
                </Typography>
              </Box>

              {/* Bank Offer */}
              <Box
                sx={{
                  mt: 1.5,
                  p: 1.5,
                  bgcolor: "#fdf4ff",
                  borderRadius: 2.5,
                  border: "1px solid #e9d5ff",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: { xs: "center", md: "flex-start" },
                  flexWrap: "wrap",
                }}
              >
                <Typography sx={{ fontSize: "1rem" }}>🏦</Typography>
                <Typography sx={{ fontSize: "0.82rem", color: "#6b21a8", fontWeight: 600 }}>
                  10% instant discount on SBI & HDFC Credit Cards · T&C apply
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Product Highlights (logged in) */}
              {isLoggedIn && (
                <Box sx={{ mt: { xs: 4, md: 6 } }}>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, mb: { xs: 3, md: 4 }, fontSize: { xs: "1.6rem", md: "2rem" }, textAlign: { xs: "center", md: "left" } }}
                  >
                    Product highlights
                  </Typography>

                  <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ alignItems: { xs: "center", md: "flex-start" } }}>
                    {product.highlights.map((hl, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          gap: { xs: 1.5, md: 2 },
                          alignItems: "center",
                          justifyContent: { xs: "center", md: "flex-start" },
                          textAlign: { xs: "center", md: "left" },
                          flexDirection: { xs: "column", sm: "row" },
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: { xs: 50, md: 60 },
                            height: { xs: 50, md: 60 },
                            borderRadius: 3,
                            bgcolor: "#e9eff6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mx: { xs: "auto", sm: 0 },
                          }}
                        >
                          {highlightIcons[index]}
                        </Box>
                        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
                          <Typography sx={{ fontSize: { xs: "15px", md: "18px" }, fontWeight: 500, color: "#666" }}>{hl.title}</Typography>
                          <Typography sx={{ fontSize: { xs: "18px", md: "22px" }, fontWeight: 500, color: "#222" }}>{hl.desc}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </Grid>

          {/* REGISTER CARD (not logged in) */}
          {!isLoggedIn && (
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  border: "1px solid #e4e3e3",
                  bgcolor: "#fafafa",
                  borderRadius: 4,
                  width: "100%",
                  maxWidth: { md: 550 },
                  mx: "auto",
                  overflow: "hidden",
                }}
              >
                <Register isEmbedded />
              </Box>
            </Grid>
          )}
        </Grid>

        {/* ── EXTRA SECTIONS (logged-in only) ──────────────────────── */}
        {isLoggedIn && (
          <Motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: "90%", margin: "0 auto" }}>
            <Divider sx={{ my: 4, opacity: 0.6 }} />

            {/* Product Overview */}
            <Motion.div variants={item}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                <div style={{ width: 4, height: 24, backgroundColor: "#000", borderRadius: 2 }} />
                <Typography variant="h6" fontWeight={800} letterSpacing="-0.02em">Product Overview</Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", lineHeight: 1.8, fontSize: "1.05rem", mb: 4, textAlign: "justify" }}
              >
                Experience cutting-edge Apple technology designed for performance, elegance, and reliability. This
                device delivers exceptional speed, stunning display quality, and seamless integration with the Apple
                ecosystem. Whether you're a student, creative professional, or power user — this product is built
                to keep up with your ambitions. Backed by Apple's industry-leading after-sales support and
                warranty, your investment is always protected.
              </Typography>
            </Motion.div>

            <Divider sx={{ my: 4 }} />

            {/* ── Specifications Table ─────────────────────────────── */}
            <Motion.div variants={item}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
                <div style={{ width: 4, height: 24, backgroundColor: "#2F80ED", borderRadius: 2 }} />
                <Typography variant="h6" fontWeight={800} letterSpacing="-0.02em">Specifications</Typography>
              </Box>
              <Paper sx={{ borderRadius: 3, overflow: "hidden", border: "1px solid #e5e7eb" }}>
                <Table size="small">
                  <TableBody>
                    {Object.entries(product.specs).map(([key, value], idx) => (
                      <TableRow key={key} sx={{ bgcolor: idx % 2 === 0 ? "#fafafa" : "#fff" }}>
                        <TableCell
                          sx={{ fontWeight: 600, color: "#374151", fontSize: "0.88rem", width: "35%", borderColor: "#f0f0f0", py: 1.5 }}
                        >
                          {key}
                        </TableCell>
                        <TableCell sx={{ color: "#111827", fontSize: "0.88rem", borderColor: "#f0f0f0", py: 1.5 }}>
                          {value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Motion.div>

            <Divider sx={{ my: 5 }} />

            {/* ── Ratings & Reviews ────────────────────────────────── */}
          <RatingsReviews product={product} />

            <Divider sx={{ my: 5 }} />

            {/* Trust Badges */}
            <Motion.div variants={item}>
              <Box
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: 4,
                  background: "linear-gradient(135deg,#f8fbff,#eef4ff)",
                  border: "1px solid #e3ecff",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={800}
                  sx={{ mb: 2.5, display: "flex", alignItems: "center", gap: 1, color: "#1e293b" }}
                >
                  Why Shop With Us?
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { icon: <VerifiedIcon sx={{ color: "#2F80ED" }} />, text: "100% Genuine Apple Products" },
                    { icon: <SecurityIcon sx={{ color: "#22c55e" }} />, text: "Secure Payments via Razorpay" },
                    { icon: <LocalShippingIcon sx={{ color: "#f59e0b" }} />, text: "Fast Nationwide Delivery" },
                    { icon: <EmojiEventsIcon sx={{ color: "#eab308" }} />, text: "Earn Loyalty Coins on Purchases" },
                  ].map((badge, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          p: 1.2,
                          borderRadius: 2,
                          transition: "all .25s",
                          "&:hover": { background: "#ffffff", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" },
                        }}
                      >
                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            background: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                          }}
                        >
                          {badge.icon}
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
                          {badge.text}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Motion.div>
          </Motion.div>
        )}
      </Box>

      {/* TOAST */}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenToast(false)}
          severity="warning"
          variant="filled"
          sx={{ width: "100%", borderRadius: 3, bgcolor: "#031e2dff", color: "white", fontWeight: 500 }}
        >
          {toastMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}