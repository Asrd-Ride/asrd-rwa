"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PremiumLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
}

export default function PremiumLogo({
  size = 'md',
  showText = true,
  showTagline = false,
  className = ''
}: PremiumLogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <Link href="/home" className={`flex items-center space-x-2 md:space-x-3 ${className}`}>
      {/* Enhanced Logo Mark */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className={`${sizeClasses[size]} bg-gradient-to-br from-fluid-gold to-fluid-emerald rounded-xl flex items-center justify-center relative overflow-hidden group`}
      >
        {/* Holographic Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Logo Symbol */}
        <div className="relative z-10">
          <span className="text-fluid-black font-black text-xs md:text-sm">AR</span>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-fluid-gold opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300" />
      </motion.div>

      {/* Logo Text and Tagline Container */}
      <div className="flex flex-col">
        {/* Logo Text - Hidden on mobile if specified */}
        {showText && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`${textSizes[size]} font-black text-white tracking-tight block`}
          >
            Asset<span className="text-fluid-gold">Ride</span>
          </motion.span>
        )}

        {/* Tagline - Show only when specified and on desktop */}
        {showTagline && showText && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-fluid-silver text-xs font-medium block mt-[-2px]"
          >
            Elite Assets. Accessible to All.
          </motion.span>
        )}
      </div>
    </Link>
  );
}