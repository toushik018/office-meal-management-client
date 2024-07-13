// components/HeroSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/UI/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Office Meal Management
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Simplify your meal planning and management at the workplace with our
          comprehensive and user-friendly platform.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/login">
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-8 rounded-lg text-lg shadow-lg">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
