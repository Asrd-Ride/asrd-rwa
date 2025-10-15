// src/components/ui/RealAssetImage.tsx
"use client";

import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';
import { getAssetImages } from '@/utils/assetImages';

interface RealAssetImageProps {
  asset: any; // Asset from mock data
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  imageType?: 'featured' | 'gallery';
  imageIndex?: number;
  priority?: boolean;
}

const getSizeClasses = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  switch (size) {
    case 'sm': return 'w-16 h-16';
    case 'md': return 'w-24 h-24';
    case 'lg': return 'w-32 h-32';
    case 'xl': return 'w-full h-48 md:h-64';
    default: return 'w-24 h-24';
  }
};

export default function RealAssetImage({ 
  asset, 
  className = '', 
  size = 'md', 
  imageType = 'featured',
  imageIndex = 0,
  priority = false 
}: RealAssetImageProps) {
  const [imgSrc, setImgSrc] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [retryCount, setRetryCount] = React.useState(0);

  React.useEffect(() => {
    if (!asset) return;

    const assetImages = getAssetImages(asset.name);
    let initialSrc = '';

    if (imageType === 'featured') {
      initialSrc = asset.image ? asset.image : assetImages.featured;
    } else {
      initialSrc = asset.images && asset.images.length > imageIndex
        ? asset.images[imageIndex]
        : assetImages.gallery[0];
    }

    setImgSrc(initialSrc);
    setIsLoading(true);
  }, [asset, imageType, imageIndex]);

  const handleImageError = () => {
    console.warn(`Image failed to load: ${imgSrc}`);
    const assetImages = getAssetImages(asset.name);

    if (retryCount < (assetImages.gallery.length)) {
      // Try next gallery image
      const nextIndex = retryCount % assetImages.gallery.length;
      setImgSrc(assetImages.gallery[nextIndex]);
      setRetryCount(prev => prev + 1);
    } else {
      // Ultimate local fallback
      setImgSrc(assetImages.featured);
      setIsLoading(false);
    }
  };

  const sizeClasses = getSizeClasses(size);
  const altText = `${asset?.title || 'Asset'} - ${imageType} image`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${sizeClasses} relative rounded-xl overflow-hidden border-2 border-cyan-500/30 bg-gray-800 ${className}`}
      data-device="universal"
      data-performance="high"
    >
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 animate-pulse rounded-lg z-10" />
      )}

      {/* Local Image */}
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          priority={priority}
          onLoad={() => setIsLoading(false)}
          onError={handleImageError}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </motion.div>
  );
}
