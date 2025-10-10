"use client";

import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';

interface PremiumLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function PremiumLogo({ size = 'md', showText = true, className = '' }: PremiumLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <Link href="/home" className={`flex items-center space-x-3 group ${className}`}>
      {/* Premium Logo Symbol */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        className={`${sizeClasses[size]} relative bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-all duration-300`}
      >
        {/* Diamond/Crystal Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
        
        {/* AR Symbol */}
        <div className="relative z-10">
          <div className="text-white font-black tracking-tighter leading-none">
            {size === 'sm' && 'AR'}
            {size === 'md' && 'AR'}
            {size === 'lg' && 'AR'}
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-cyan-400/20 rounded-xl blur-sm group-hover:bg-cyan-400/30 transition-colors" />
      </motion.div>

      {/* Logo Text */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className={`${textSizes[size]} font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent leading-none`}>
            AssetRide
          </span>
          <span className="text-cyan-300 text-xs font-medium tracking-wider">
            REAL WORLD ASSETS
          </span>
        </motion.div>
      )}
    </Link>
  );
}
