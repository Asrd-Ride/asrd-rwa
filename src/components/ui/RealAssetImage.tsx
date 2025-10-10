"use client";

import { motion } from 'framer-motion';
import React from 'react';

interface RealAssetImageProps {
  type: string;
  title: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const getAssetImage = (type: string, title: string) => {
  const typeLower = type.toLowerCase();

  // Real estate assets - using reliable Unsplash sources
  if (typeLower.includes('real estate') || typeLower.includes('villa') || typeLower.includes('property') || typeLower.includes('commercial')) {
    const realEstateImages = [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop'
    ];
    return {
      src: realEstateImages[Math.floor(Math.random() * realEstateImages.length)],
      alt: `${title} - Premium Real Estate Asset`
    };
  }

  // Thoroughbred assets
  if (typeLower.includes('thoroughbred') || typeLower.includes('horse')) {
    const horseImages = [
      'https://images.unsplash.com/photo-1546975490-e8b92a96b9fd?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1513279922550-250c2129b13a?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1577881590157-6d6035524cf5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&h=400&fit=crop'
    ];
    return {
      src: horseImages[Math.floor(Math.random() * horseImages.length)],
      alt: `${title} - Champion Thoroughbred Asset`
    };
  }

  // Marine assets
  if (typeLower.includes('marine') || typeLower.includes('yacht') || typeLower.includes('ship')) {
    const marineImages = [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop'
    ];
    return {
      src: marineImages[Math.floor(Math.random() * marineImages.length)],
      alt: `${title} - Luxury Marine Asset`
    };
  }

  // Aviation assets
  if (typeLower.includes('aviation') || typeLower.includes('plane') || typeLower.includes('jet')) {
    const aviationImages = [
      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25856cd49?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551887373-3c5bd1f0fa27?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1529074963764-98f45dc5d00f?w=600&h=400&fit=crop'
    ];
    return {
      src: aviationImages[Math.floor(Math.random() * aviationImages.length)],
      alt: `${title} - Aviation Asset`
    };
  }

  // Venture assets
  if (typeLower.includes('venture') || typeLower.includes('startup') || typeLower.includes('tech')) {
    const ventureImages = [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=600&h=400&fit=crop'
    ];
    return {
      src: ventureImages[Math.floor(Math.random() * ventureImages.length)],
      alt: `${title} - Venture Capital Asset`
    };
  }

  // Luxury assets
  if (typeLower.includes('luxury') || typeLower.includes('diamond') || typeLower.includes('gem')) {
    const luxuryImages = [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=600&h=400&fit=crop'
    ];
    return {
      src: luxuryImages[Math.floor(Math.random() * luxuryImages.length)],
      alt: `${title} - Luxury Asset`
    };
  }

  // Default premium asset image
  return {
    src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
    alt: `${title} - Premium Real World Asset`
  };
};

const getSizeClasses = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  switch (size) {
    case 'sm':
      return 'w-16 h-16';
    case 'md':
      return 'w-24 h-24';
    case 'lg':
      return 'w-32 h-32';
    case 'xl':
      return 'w-full h-48';
    default:
      return 'w-24 h-24';
  }
};

export default function RealAssetImage({ type, title, className = '', size = 'md' }: RealAssetImageProps) {
  const { src, alt } = getAssetImage(type, title);
  const sizeClasses = getSizeClasses(size);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${sizeClasses} relative rounded-xl overflow-hidden border-2 border-cyan-500/30 bg-gray-800 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </motion.div>
  );
}
