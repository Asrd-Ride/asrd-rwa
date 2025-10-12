// Create the file manually - copy and paste this content into src/types/asset.ts
export interface Badge {
  label: string;
  color: string;
}

export interface Asset {
  id: number;
  title: string;
  type: string;
  location: string;
  value: number;
  minInvestment: number;
  roi: string;
  investorCount: number;
  performance?: string;
  badges?: Badge[];
  sharesAvailable?: number;
  sharesSold?: number;
  enhanced?: boolean;
  
  // Optional properties for different components
  category?: string;
  totalValue?: number;
  expectedROI?: string;
  timeline?: string;
  investmentHorizon?: string;
  status?: string;
  description?: string;
  currency?: string;
  image?: string;
  progress?: number;
  riskLevel?: string;
  liquidity?: string;
  tags?: string[];
  nextPayout?: string;
  payoutAmount?: number;
  investment?: number;
  shares?: number;
  
  [key: string]: any;
}