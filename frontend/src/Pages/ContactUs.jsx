import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Chip,
  Stack,
  CircularProgress,
  Container,
} from "@mui/material";
import { motion as Motion } from "framer-motion";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SendIcon from "@mui/icons-material/Send";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

/* ── Framer variants ──────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/* ── Data ─────────────────────────────────────────────────────────────── */
const CONTACT_INFO = [
  {
    icon: <EmailOutlinedIcon sx={{ fontSize: 26, color: "#2F80ED" }} />,
    title: "Email Us",
    lines: ["support@shopnbliss.in", "business@shopnbliss.in"],
    badge: "Replies within 2 hrs",
    badgeColor: "#e0f2fe",
    badgeText: "#0369a1",
  },
  {
    icon: <PhoneOutlinedIcon sx={{ fontSize: 26, color: "#22c55e" }} />,
    title: "Call Us",
    lines: ["+91 98400 XXXXX", "+91 44 4000 XXXX"],
    badge: "Mon–Sat 9AM–7PM",
    badgeColor: "#dcfce7",
    badgeText: "#16a34a",
  },
  {
    icon: <WhatsAppIcon sx={{ fontSize: 26, color: "#25D366" }} />,
    title: "WhatsApp",
    lines: ["+91 98400 XXXXX"],
    badge: "Instant replies",
    badgeColor: "#dcfce7",
    badgeText: "#16a34a",
  },
  {
    icon: <LocationOnOutlinedIcon sx={{ fontSize: 26, color: "#f59e0b" }} />,
    title: "Visit Us",
    lines: ["12, Anna Salai, T. Nagar", "Chennai, Tamil Nadu 600017"],
    badge: "Mon–Sat 10AM–6PM",
    badgeColor: "#fef3c7",
    badgeText: "#d97706",
  },
];

const SUBJECTS = [
  "Order Enquiry",
  "Product Question",
  "Return / Refund",
  "Technical Support",
  "Bulk / Corporate Order",
  "Partnership",
  "Other",
];

const FAQ = [
  {
    q: "How long does delivery take?",
    a: "We deliver pan-India within 3 business days. Same-day dispatch for orders placed before 2 PM.",
  },
  {
    q: "Are your Apple products genuine?",
    a: "Yes — 100%. We are an authorised Apple reseller and all products come with Apple India warranty.",
  },
  {
    q: "Can I return a product?",
    a: "Yes, we offer a 7-day hassle-free return policy on all products in original condition.",
  },
  {
    q: "How do I track my order?",
    a: "Once shipped, you'll receive an SMS and email with a tracking link within 24 hours.",
  },
];

/* ══════════════════════════════════════════════════════════════════════
   CONTACT US PAGE
══════════════════════════════════════════════════════════════════════ */
export default function ContactUs() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
//   const [openFaq, setOpenFaq] = useState(null);

//   const validate = () => {
//     const e = {};
//     if (!form.name.trim()) e.name = "Name is required";
//     if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
//       e.email = "Valid email is required";
//     if (!form.subject) e.subject = "Please select a subject";
//     if (!form.message.trim() || form.message.length < 10)
//       e.message = "Message must be at least 10 characters";
//     return e;
//   };

//   const handleChange = (field) => (e) => {
//     setForm((prev) => ({ ...prev, [field]: e.target.value }));
//     setErrors((prev) => ({ ...prev, [field]: "" }));
//   };

//   const handleSubmit = () => {
//     const e = validate();
//     if (Object.keys(e).length > 0) {
//       setErrors(e);
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setSuccess(true);
//       setForm({ name: "", email: "", phone: "", subject: "", message: "" });
//     }, 1400);
//   };

  return (
    <Box sx={{ bgcolor: "#f7f7f7", minHeight: "100vh" }}>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <Box
        sx={{
          bgcolor: "#0f0f0f",
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 12 },
          px: { xs: 2, md: 6 },
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute", top: -60, left: "30%",
            width: 400, height: 300, borderRadius: "50%",
            bgcolor: "#2F80ED", opacity: 0.06, filter: "blur(80px)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute", bottom: -40, right: "20%",
            width: 300, height: 260, borderRadius: "50%",
            bgcolor: "#22c55e", opacity: 0.05, filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        <Motion.div variants={stagger} initial="hidden" animate="show">
          <Motion.div variants={fadeUp}>
            <Chip
              icon={<SupportAgentIcon sx={{ fontSize: 14, color: "#fff !important" }} />}
              label="We're here to help · Always"
              sx={{
                bgcolor: "rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.65)",
                fontWeight: 600,
                fontSize: "0.75rem",
                mb: 3,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </Motion.div>

          <Motion.div variants={fadeUp}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: "#fff",
                fontSize: { xs: "2.2rem", sm: "3rem", md: "3.8rem" },
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                mb: 3,
              }}
            >
              Get in{" "}
              <Box component="span" sx={{ color: "#2F80ED" }}>touch</Box>
            </Typography>
          </Motion.div>

          <Motion.div variants={fadeUp}>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                maxWidth: 520,
                mx: "auto",
                lineHeight: 1.8,
              }}
            >
              Have a question, need help with an order, or just want to say hello? We'd love to hear from you.
            </Typography>
          </Motion.div>
        </Motion.div>
      </Box>

      {/* ── CONTACT INFO CARDS ────────────────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {CONTACT_INFO.map((info, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Motion.div variants={fadeUp} style={{ height: "100%" }}>
                  <Paper
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      borderRadius: 4,
                      border: "1px solid #e5e7eb",
                      height: 250,
                      width: 270,
                      display: "flex",
                      flexDirection: "column",
                      boxSizing: "border-box",
                      transition: "all 0.25s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
                        borderColor: "#2F80ED",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 3,
                        bgcolor: "#f8faff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                        flexShrink: 0,
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#111", mb: 1 }}>
                      {info.title}
                    </Typography>
                    {info.lines.map((line, j) => (
                      <Typography key={j} sx={{ fontSize: "0.85rem", color: "#374151", lineHeight: 1.7, wordBreak: "break-word" }}>
                        {line}
                      </Typography>
                    ))}
                    <Box sx={{ mt: "auto", pt: 1.5 }}>
                      <Chip
                        label={info.badge}
                        size="small"
                        sx={{
                          bgcolor: info.badgeColor,
                          color: info.badgeText,
                          fontWeight: 600,
                          fontSize: "0.7rem",
                        }}
                      />
                    </Box>
                  </Paper>
                </Motion.div>
              </Grid>
            ))}
          </Grid>
        </Motion.div>
      </Container>

      {/* ── FORM + SIDEBAR ────────────────────────────────────────────── */}
      {/* <Container maxWidth="lg" sx={{ pb: { xs: 8, md: 12 } }}>
        <Motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="flex-start">

          
            <Grid item xs={12} md={7}>
              <Motion.div variants={fadeUp}>
                <Paper
                  sx={{
                    p: { xs: 2.5, sm: 3.5, md: 4.5 },
                    borderRadius: 4,
                    border: "1px solid #e5e7eb",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3.5 }}>
                    <Box sx={{ width: 4, height: 28, bgcolor: "#2F80ED", borderRadius: 2, flexShrink: 0 }} />
                    <Typography variant="h6" fontWeight={800}>Send us a message</Typography>
                  </Box>

                  <Grid container spacing={2.5}>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Full Name"
                        fullWidth
                        value={form.name}
                        onChange={handleChange("name")}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email Address"
                        fullWidth
                        value={form.email}
                        onChange={handleChange("email")}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Phone (optional)"
                        fullWidth
                        value={form.phone}
                        onChange={handleChange("phone")}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} width={150}>
                      <FormControl
                        fullWidth
                        error={!!errors.subject}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
                      >
                        <InputLabel>Subject</InputLabel>
                        <Select
                          value={form.subject}
                          label="Subject"
                          onChange={handleChange("subject")}
                          sx={{ borderRadius: 2.5 }}
                        >
                          {SUBJECTS.map((s) => (
                            <MenuItem key={s} value={s}>{s}</MenuItem>
                          ))}
                        </Select>
                        {errors.subject && (
                          <Typography sx={{ color: "#d32f2f", fontSize: "0.75rem", mt: 0.5, ml: 1.5 }}>
                            {errors.subject}
                          </Typography>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        label="Your Message"
                        fullWidth
                        multiline
                        rows={5}
                        value={form.message}
                        onChange={handleChange("message")}
                        error={!!errors.message}
                        helperText={errors.message}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2.5 } }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        endIcon={
                          loading
                            ? <CircularProgress size={18} sx={{ color: "#fff" }} />
                            : <SendIcon />
                        }
                        sx={{
                          bgcolor: "#2F80ED",
                          py: 1.6,
                          borderRadius: 2.5,
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          textTransform: "none",
                          "&:hover": {
                            bgcolor: "#1e6fd9",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 20px rgba(47,128,237,0.35)",
                          },
                          "&.Mui-disabled": { bgcolor: "#93c5fd", color: "#fff" },
                          transition: "all 0.2s",
                        }}
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </Grid>

                  </Grid>
                </Paper>
              </Motion.div>
            </Grid>

           
            <Grid item xs={12} md={5}>
              <Motion.div variants={fadeUp}>
                <Stack spacing={4}>

               
                  <Paper
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      borderRadius: 4,
                      border: "1px solid #e5e7eb",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
                      <AccessTimeOutlinedIcon sx={{ color: "#2F80ED", fontSize: 22 }} />
                      <Typography fontWeight={700} fontSize="0.95rem">Business Hours</Typography>
                    </Box>
                    {[
                      { day: "Monday – Friday", hrs: "9:00 AM – 7:00 PM" },
                      { day: "Saturday", hrs: "10:00 AM – 6:00 PM" },
                      { day: "Sunday", hrs: "Closed" },
                    ].map((row, i) => (
                      <Box
                        key={i}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          py: 1.3,
                          borderBottom: i < 2 ? "1px solid #f3f4f6" : "none",
                          gap: 1,
                        }}
                      >
                        <Typography sx={{ fontSize: "0.85rem", color: "#374151", fontWeight: 500 }}>
                          {row.day}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            color: row.hrs === "Closed" ? "#ef4444" : "#111",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.hrs}
                        </Typography>
                      </Box>
                    ))}
                  </Paper>

                 
                  <Paper
                    sx={{
                      p: { xs: 2.5, md: 3 },
                      borderRadius: 4,
                      border: "1px solid #e5e7eb",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <Typography fontWeight={700} fontSize="0.95rem" sx={{ mb: 2 }}>
                      Quick Answers
                    </Typography>
                    <Stack spacing={0}>
                      {FAQ.map((item, i) => (
                        <Box
                          key={i}
                          sx={{ borderBottom: i < FAQ.length - 1 ? "1px solid #f3f4f6" : "none" }}
                        >
                          <Box
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              cursor: "pointer",
                              py: 1.4,
                              px: 1,
                              borderRadius: 2,
                              bgcolor: openFaq === i ? "#f0f9ff" : "transparent",
                              "&:hover": { bgcolor: "#f9fafb" },
                              transition: "background 0.2s",
                              gap: 1,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.83rem",
                                fontWeight: 600,
                                color: "#111",
                                flex: 1,
                                lineHeight: 1.5,
                              }}
                            >
                              {item.q}
                            </Typography>
                            <Typography
                              sx={{
                                color: "#2F80ED",
                                fontSize: "1.3rem",
                                fontWeight: 300,
                                lineHeight: 1,
                                flexShrink: 0,
                                userSelect: "none",
                              }}
                            >
                              {openFaq === i ? "−" : "+"}
                            </Typography>
                          </Box>
                          {openFaq === i && (
                            <Box sx={{ px: 1, pb: 1.5 }}>
                              <Typography sx={{ fontSize: "0.8rem", color: "#6b7280", lineHeight: 1.8 }}>
                                {item.a}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Stack>
                  </Paper>

                </Stack>
              </Motion.div>
            </Grid>

          </Grid>
        </Motion.div>
      </Container> */}

      {/* ── Success Toast ─────────────────────────────────────────────── */}
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSuccess(false)}
          icon={<CheckCircleOutlineIcon />}
          severity="success"
          variant="filled"
          sx={{ borderRadius: 3, fontWeight: 600, bgcolor: "#16a34a" }}
        >
          Message sent! We'll get back to you within 2 hours.
        </Alert>
      </Snackbar>

    </Box>
  );
}
