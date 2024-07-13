// components/HeroSection.js
"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { ImagesSlider } from "../../ImageSlider/ImageSlider";

const HeroSection = () => {
  const images = [
    "/assets/Images/slider.jpg",
    "/assets/Images/slider2.jpg",
    "/assets/Images/slider3.jpg",
    "/assets/Images/slider4.jpg",
    "/assets/Images/slider5.jpg",
  ];
  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <ImagesSlider className="h-full" images={images}>
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 2,
              backgroundClip: "text",
              textFillColor: "transparent",
              backgroundImage: "linear-gradient(to bottom, #ffffff, #cccccc)",
            }}
          >
            Find Your Perfect Flat Mate Today!
          </Typography>
          <Typography
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "rgba(76, 175, 80, 0.7)",
              color: "white",
            }}
          >
            Share Your Flat Now
          </Typography>
        </motion.div>
      </ImagesSlider>
    </Box>
  );
};

export default HeroSection;
