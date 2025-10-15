// Re-export everything from the unified types
export type { Asset, Portfolio, Transaction, InvestmentModalProps, AssetDetailsModalProps } from './index';

// Import Asset type for use in interfaces
import type { Asset } from './index';

// Legacy types for backward compatibility
export interface OwnedAsset {
  id: number;
  asset: Asset;
  investedAmount: number;
  currentValue: number;
  purchaseDate: string;
  returns: number;
  roi: number;
  // Add missing properties from mock data
  shares?: number;
  value?: number;
  payoutAmount?: number;
  payoutFrequency?: string;
  nextPayout?: string;
  status?: string;
  badges?: Array<{ label: string; color: string }>;
  // Legacy name properties for compatibility
  name?: string;
  title?: string;
  type?: string;
  location?: string;
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
  monthlyGrowth?: number;
}