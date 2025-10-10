"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  TrendingUp,  // Using TrendingUp instead of Horse
  Ship, 
  Plane, 
  Gem, 
  LandPlot,
  Factory,
  Car,
  Zap,         // Using Zap instead of TreePine
  Battery      // Using Battery instead of SolarPanel
} from 'lucide-react';

interface AssetImageProps {
  type: string;
  title: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const getAssetIcon = (type: string) => {
  const typeLower = type.toLowerCase();
  
  if (typeLower.includes('real estate') || typeLower.includes('villa') || typeLower.includes('property')) {
    return Building2;
  } else if (typeLower.includes('thoroughbred') || typeLower.includes('horse')) {
    return TrendingUp;  // Using TrendingUp as alternative
  } else if (typeLower.includes('marine') || typeLower.includes('yacht') || typeLower.includes('ship')) {
    return Ship;
  } else if (typeLower.includes('aviation') || typeLower.includes('plane') || typeLower.includes('jet')) {
    return Plane;
  } else if (typeLower.includes('diamond') || typeLower.includes('gem') || typeLower.includes('luxury')) {
    return Gem;
  } else if (typeLower.includes('land') || typeLower.includes('plot')) {
    return LandPlot;
  } else if (typeLower.includes('factory') || typeLower.includes('industrial')) {
    return Factory;
  } else if (typeLower.includes('car') || typeLower.includes('auto')) {
    return Car;
  } else if (typeLower.includes('forest') || typeLower.includes('timber')) {
    return Zap;  // Using Zap as alternative
  } else if (typeLower.includes('solar') || typeLower.includes('energy')) {
    return Battery;  // Using Battery as alternative
  }
  
  return Building2; // Default icon
};

const getAssetGradient = (type: string) => {
  const typeLower = type.toLowerCase();
  
  if (typeLower.includes('real estate') || typeLower.includes('villa') || typeLower.includes('property')) {
    return 'from-blue-500 to-cyan-500';
  } else if (typeLower.includes('thoroughbred') || typeLower.includes('horse')) {
    return 'from-amber-500 to-orange-500';
  } else if (typeLower.includes('marine') || typeLower.includes('yacht') || typeLower.includes('ship')) {
    return 'from-cyan-500 to-blue-500';
  } else if (typeLower.includes('aviation') || typeLower.includes('plane') || typeLower.includes('jet')) {
    return 'from-slate-500 to-gray-500';
  } else if (typeLower.includes('diamond') || typeLower.includes('gem') || typeLower.includes('luxury')) {
    return 'from-purple-500 to-pink-500';
  } else if (typeLower.includes('land') || typeLower.includes('plot')) {
    return 'from-emerald-500 to-teal-500';
  } else if (typeLower.includes('factory') || typeLower.includes('industrial')) {
    return 'from-orange-500 to-red-500';
  } else if (typeLower.includes('car') || typeLower.includes('auto')) {
    return 'from-red-500 to-pink-500';
  } else if (typeLower.includes('forest') || typeLower.includes('timber')) {
    return 'from-green-500 to-emerald-500';
  } else if (typeLower.includes('solar') || typeLower.includes('energy')) {
    return 'from-yellow-500 to-amber-500';
  }
  
  return 'from-cyan-500 to-blue-500'; // Default gradient
};

const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'w-8 h-8';
    case 'md':
      return 'w-12 h-12';
    case 'lg':
      return 'w-16 h-16';
    default:
      return 'w-12 h-12';
  }
};

export default function AssetImage({ type, title, className = '', size = 'md' }: AssetImageProps) {
  const IconComponent = getAssetIcon(type);
  const gradient = getAssetGradient(type);
  const sizeClasses = getSizeClasses(size);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${sizeClasses} bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center ${className}`}
    >
      <IconComponent className="text-white" size={size === 'sm' ? 16 : size === 'md' ? 24 : 32} />
    </motion.div>
  );
}
