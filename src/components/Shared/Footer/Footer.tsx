// components/Footer.js
import React from "react";
import { Container, Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "primary.main",
        color: "white",
        py: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center" color="white">
          © 2024 Flat Share. All rights reserved.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Link href="#" color="inherit" sx={{ mx: 2 }}>
            Terms of Use
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 2 }}>
            Privacy Policy
          </Link>
          <Link href="#" color="inherit" sx={{ mx: 2 }}>
            Contact
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
