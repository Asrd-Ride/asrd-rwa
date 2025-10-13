// ==================== UNIFIED ASSET TYPE ====================
export interface Asset {
  // Core Identification
  id: string | number;
  name: string;
  title: string;
  description: string;
  
  // Classification
  type: 'real-estate' | 'horse-racing' | string;
  category: string;
  
  // Location (Unified structure)
  location: {
    country: string;
    city: string;
    address?: string;
    coordinates?: { lat: number; lng: number };
    _3dModel?: string;
    panorama?: string;
  };
  
  // Financial Information (Unified property names)
  currency: string;
  minimumInvestment: number;
  minInvestment: number; // Legacy alias
  totalFunding: number;
  fundedAmount: number;
  fundingProgress: number;
  projectedROI: number;
  expectedReturn: number; // Legacy alias
  roi: number;
  term: number;
  riskLevel: string;
  
  // Platform Metrics
  investorCount: number;
  rating: number;
  
  // Enhanced Media & Presentation
  images: string[];
  image: string;
  featuredImage?: string;
  gallery?: string[];
  virtualTour?: string;
  floorPlans?: string[];
  features: string[];
  tags: string[];
  badges: Array<{ label: string; color: string }>;
  
  // Financial Details
  financials?: {
    currentValuation: number;
    totalInvested: number;
    totalReturns: number;
    annualizedReturn: number;
    currentROI: number;
    projectedROI: number;
    volatility: number;
  };
  
  // 3D Experience Features
  _3dConfig?: {
    particles: number;
    animations: string;
    shadows: boolean;
  };
  
  // Enhanced details for comprehensive investor experience
  details?: {
    // Real Estate Properties
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    units?: number;
    yearBuilt?: number;
    floors?: number;
    parking?: number;
    
    // Horse Racing Properties  
    horseAge?: number;
    breed?: string;
    trainer?: string;
    racesWon?: number;
    prizeMoney?: number;
  };
}

// ==================== OWNED ASSET TYPE ====================
export interface OwnedAsset {
  id: number;
  asset: Asset;
  investedAmount: number;
  currentValue: number;
  purchaseDate: string;
  returns: number;
  roi: number;
  // Additional properties from mock data
  shares?: number;
  value?: number;
  payoutAmount?: number;
  payoutFrequency?: string;
  nextPayout?: string;
  status?: string;
  badges?: Array<{ label: string; color: string }>;
  // Legacy flat structure compatibility
  name?: string;
  title?: string;
  type?: string;
  location?: string;
}

// ==================== SUPPORTING TYPES ====================
export interface Portfolio {
  id: string;
  name: string;
  value: number;
  return: number;
  assets: Asset[];
}

export interface Transaction {
  id: string;
  assetId: string;
  type: 'investment' | 'withdrawal';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface InvestmentModalProps {
  asset: Asset;
  onClose: () => void;
  onInvest: (amount: number) => void;
}

export interface AssetDetailsModalProps {
  asset: Asset;
  onClose: () => void;
  onInvest: () => void;
}

export interface PlatformStats {
  totalUsers: number;
  activeInvestors: number;
  totalInvestments: number;
  totalReturns: number;
  platformGrowth: number;
  averageROI: number;
  // Additional properties from mock data
  totalValue?: number;
  successRate?: number;
  activeAssets?: number;
}

// ==================== COMPATIBILITY EXPORTS ====================
// Re-export everything from asset.ts for backward compatibility
export type { Asset as AssetLegacy } from './asset';