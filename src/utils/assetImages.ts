// src/utils/assetImages.ts

// 🎯 All local images only - guaranteed to work
export const ASSET_IMAGES = {
  // Dubai Real Estate
  'dubai-marina': {
    featured: "/images/dubai-marina-1.jpg",
    gallery: [
      "/images/dubai-marina-2.jpg",
      "/images/dubai-marina-3.jpg"
    ]
  },

  'burj-vista': {
    featured: "/images/burj-vista-1.jpg",
    gallery: [
      "/images/burj-vista-2.jpg",
      "/images/burj-vista-3.jpg"
    ]
  },

  // UK Real Estate
  'mayfair': {
    featured: "/images/mayfair-1.jpg",
    gallery: [
      "/images/mayfair-2.jpg",
      "/images/mayfair-3.jpg"
    ]
  },

  // Australia Real Estate
  'collins-street': {
    featured: "/images/collins-street-1.jpg",
    gallery: [
      "/images/collins-street-2.jpg",
      "/images/collins-street-3.jpg"
    ]
  },

  // Horse Racing - Australia
  'blue-diamond': {
    featured: "/images/horse1.jpg",
    gallery: [
      "/images/horse2.jpg",
      "/images/horse3.jpg"
    ]
  },

  // Horse Racing - UK
  'royal-ascot': {
    featured: "/images/horse2.jpg",
    gallery: [
      "/images/horse1.jpg",
      "/images/horse3.jpg"
    ]
  }
} as const;

// 🎯 Fallback image (local)
const FALLBACK_IMAGE = "/images/horse1.jpg"; // safe default

// 🎯 Resolve image for mockAssets
export const resolveAssetImage = (imagePath: string, assetType?: string): string => {
  const pathMap: Record<string, string> = {
    // Real Estate Dubai
    '/assets/dubai-marina-1.jpg': ASSET_IMAGES['dubai-marina'].featured,
    '/assets/dubai-marina-2.jpg': ASSET_IMAGES['dubai-marina'].gallery[0],
    '/assets/dubai-marina-3.jpg': ASSET_IMAGES['dubai-marina'].gallery[1],

    // Dubai Ultra
    '/assets/burj-vista-1.jpg': ASSET_IMAGES['burj-vista'].featured,
    '/assets/burj-vista-2.jpg': ASSET_IMAGES['burj-vista'].gallery[0],
    '/assets/burj-vista-3.jpg': ASSET_IMAGES['burj-vista'].gallery[1],

    // UK
    '/assets/mayfair-1.jpg': ASSET_IMAGES['mayfair'].featured,
    '/assets/mayfair-2.jpg': ASSET_IMAGES['mayfair'].gallery[0],
    '/assets/mayfair-3.jpg': ASSET_IMAGES['mayfair'].gallery[1],

    // Australia
    '/assets/collins-street-1.jpg': ASSET_IMAGES['collins-street'].featured,
    '/assets/collins-street-2.jpg': ASSET_IMAGES['collins-street'].gallery[0],
    '/assets/collins-street-3.jpg': ASSET_IMAGES['collins-street'].gallery[1],

    // Horse Racing Australia
    '/assets/blue-diamond-1.jpg': ASSET_IMAGES['blue-diamond'].featured,
    '/assets/blue-diamond-2.jpg': ASSET_IMAGES['blue-diamond'].gallery[0],
    '/assets/blue-diamond-3.jpg': ASSET_IMAGES['blue-diamond'].gallery[1],

    // Horse Racing UK
    '/assets/royal-ascot-1.jpg': ASSET_IMAGES['royal-ascot'].featured,
    '/assets/royal-ascot-2.jpg': ASSET_IMAGES['royal-ascot'].gallery[0],
    '/assets/royal-ascot-3.jpg': ASSET_IMAGES['royal-ascot'].gallery[1]
  };

  return pathMap[imagePath] || FALLBACK_IMAGE;
};

// 🎯 Get asset images by asset name
export const getAssetImages = (assetName: string) => {
  const key = assetName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return ASSET_IMAGES[key as keyof typeof ASSET_IMAGES] || ASSET_IMAGES['dubai-marina'];
};
