"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockProposals, mockAssets, ownedAssets, platformStats, testimonialData, howItWorksData } from '@/data/mockData';

// Enhanced treasury data matching our new design
const mockTreasuryData = {
  totalValue: 25420000,
  availableFunds: 5250000,
  allocatedFunds: 20170000,
  monthlyIncome: 825000,
  monthlyExpenses: 225000,
  netCashFlow: 600000,
  assets: [
    { name: 'Real Estate', value: 12500000, percentage: 49.2, color: 'emerald' },
    { name: 'Thoroughbred', value: 5200000, percentage: 20.5, color: 'amber' },
    { name: 'Marine Assets', value: 3200000, percentage: 12.6, color: 'sapphire' },
    { name: 'Venture Capital', value: 2800000, percentage: 11.0, color: 'violet' },
    { name: 'Luxury Goods', value: 1720000, percentage: 6.7, color: 'rose' }
  ],
  growth: {
    monthly: "+8.2%",
    quarterly: "+24.7%", 
    yearly: "+89.3%"
  },
  performance: {
    currentMonth: "+8.2%",
    lastMonth: "+7.5%",
    ytd: "+42.8%"
  }
};

// Enhanced user portfolio using real ownedAssets data
const mockUserPortfolio = {
  totalValue: 890000,
  monthlyIncome: 25950,
  asrdTokens: 15642,
  activeInvestments: ownedAssets.length,
  performance: "+18.4%",
  totalReturns: 156800,
  diversification: [
    { type: 'Real Estate', percentage: 45, value: 400500, color: 'emerald' },
    { type: 'Thoroughbred', percentage: 25, value: 222500, color: 'amber' },
    { type: 'Marine Assets', percentage: 20, value: 178000, color: 'sapphire' },
    { type: 'Other', percentage: 10, value: 89000, color: 'violet' }
  ],
  recentActivity: [
    { id: 1, type: 'investment', asset: 'Dubai Luxury Villa', amount: 50000, date: '2024-01-15', status: 'completed', roi: "32.5%" },
    { id: 2, type: 'income', asset: 'Rental Payment', amount: 4250, date: '2024-01-10', status: 'completed', roi: "N/A" },
    { id: 3, type: 'income', asset: 'Race Winnings', amount: 8500, date: '2024-01-05', status: 'completed', roi: "45.2%" },
    { id: 4, type: 'investment', asset: 'Mediterranean Superyacht', amount: 25000, date: '2024-01-02', status: 'completed', roi: "41.3%" }
  ],
  upcomingPayouts: ownedAssets.map(asset => ({
    id: asset.id,
    asset: asset.title,
    amount: asset.payoutAmount,
    date: asset.nextPayout,
    type: asset.type,
    roi: asset.roi
  })),
  riskProfile: {
    level: "Moderate",
    score: 6.2,
    description: "Well-diversified across asset classes"
  }
};

// Enhanced platform analytics
const platformAnalytics = {
  totalInvestors: platformStats.totalInvestors,
  totalAssets: platformStats.totalAssets,
  averageROI: platformStats.averageRoi,
  totalVolume: 185000000,
  userGrowth: "+12.4%",
  assetGrowth: "+8.7%",
  geographicDistribution: [
    { region: 'North America', percentage: 45, investors: 1561, color: 'emerald' },
    { region: 'Europe', percentage: 30, investors: 1041, color: 'sapphire' },
    { region: 'Asia', percentage: 15, investors: 520, color: 'amber' },
    { region: 'Other', percentage: 10, investors: 348, color: 'violet' }
  ],
  assetDistribution: [
    { type: 'Real Estate', percentage: 42, value: 77700000, count: 18 },
    { type: 'Marine Assets', percentage: 18, value: 33300000, count: 8 },
    { type: 'Thoroughbred', percentage: 15, value: 27750000, count: 6 },
    { type: 'Venture Capital', percentage: 12, value: 22200000, count: 5 },
    { type: 'Luxury Goods', percentage: 8, value: 14800000, count: 4 },
    { type: 'Aviation', percentage: 5, value: 9250000, count: 3 }
  ]
};

// Enhanced community data
const communityData = {
  totalMembers: platformStats.totalInvestors,
  activeProposals: mockProposals.length,
  totalVotes: 4230,
  recentActivities: [
    { id: 1, user: 'Sarah Chen', action: 'invested in', asset: 'Dubai Luxury Villa', amount: 25000, time: '2 hours ago', avatar: 'SC' },
    { id: 2, user: 'Marcus R.', action: 'voted on', proposal: 'Expand Real Estate Portfolio', time: '4 hours ago', avatar: 'MR' },
    { id: 3, user: 'Jennifer Kim', action: 'earned', amount: 3200, asset: 'from Superyacht charter', time: '6 hours ago', avatar: 'JK' },
    { id: 4, user: 'Alex Thompson', action: 'joined the platform', time: '1 day ago', avatar: 'AT' }
  ],
  leaderboard: [
    { rank: 1, user: 'WealthBuilder', portfolio: 1250000, investments: 15, performance: "+22.4%" },
    { rank: 2, user: 'EliteInvestor', portfolio: 980000, investments: 12, performance: "+19.8%" },
    { rank: 3, user: 'CryptoKing', portfolio: 875000, investments: 10, performance: "+25.1%" },
    { rank: 4, user: 'Sarah Chen', portfolio: 765000, investments: 8, performance: "+18.4%" },
    { rank: 5, user: 'RealEstatePro', portfolio: 642000, investments: 9, performance: "+16.7%" }
  ],
  discussionTopics: [
    { id: 1, title: 'Real Estate Market Trends 2024', replies: 42, views: 312, lastActivity: '3 hours ago' },
    { id: 2, title: 'New Asset Proposal: Tech Startups', replies: 28, views: 198, lastActivity: '5 hours ago' },
    { id: 3, title: 'Quarterly Returns Discussion', replies: 65, views: 425, lastActivity: '1 day ago' }
  ]
};

// Enhanced educational content
const educationalContent = {
  featuredArticles: [
    { id: 1, title: 'Fractional Ownership: The Future of Asset Investment', readTime: '5 min', category: 'Education', featured: true },
    { id: 2, title: 'Understanding Real World Asset (RWA) Tokenization', readTime: '8 min', category: 'Blockchain', featured: true },
    { id: 3, title: 'Diversifying Your Portfolio with Alternative Assets', readTime: '6 min', category: 'Strategy', featured: false },
    { id: 4, title: 'Risk Management in Real World Asset Investing', readTime: '7 min', category: 'Strategy', featured: false }
  ],
  upcomingWebinars: [
    { id: 1, title: 'Introduction to Real World Asset Investing', date: '2024-02-20', speaker: 'Dr. Emily Chen', attendees: 124 },
    { id: 2, title: 'Advanced Portfolio Diversification Strategies', date: '2024-02-25', speaker: 'Marcus Rodriguez', attendees: 89 },
    { id: 3, title: 'Blockchain Security for Asset Tokenization', date: '2024-03-05', speaker: 'Sarah Kim', attendees: 67 }
  ],
  learningPaths: [
    { id: 1, title: 'Beginner Investor', duration: '2 weeks', courses: 4, completed: 65 },
    { id: 2, title: 'Advanced Portfolio Management', duration: '4 weeks', courses: 6, completed: 42 },
    { id: 3, title: 'Blockchain & Assets Expert', duration: '6 weeks', courses: 8, completed: 28 }
  ]
};

// Enhanced market insights
const marketInsights = {
  trendingAssets: mockAssets.slice(0, 3).map(asset => ({
    ...asset,
    trend: 'rising',
    demand: 'high'
  })),
  marketSentiment: {
    overall: "Bullish",
    confidence: 78,
    factors: [
      { factor: 'Real Estate Market', sentiment: 'positive', impact: 'high' },
      { factor: 'Tech Investments', sentiment: 'positive', impact: 'medium' },
      { factor: 'Global Economy', sentiment: 'neutral', impact: 'medium' }
    ]
  },
  regulatoryUpdates: [
    { id: 1, title: 'New Digital Asset Regulations', impact: 'positive', date: '2024-01-15' },
    { id: 2, title: 'Tax Benefits for Real Estate Investors', impact: 'positive', date: '2024-01-10' },
    { id: 3, title: 'International Investment Guidelines', impact: 'neutral', date: '2024-01-05' }
  ]
};

interface AppContextType {
  // Core data
  proposals: any[];
  treasury: any;
  userPortfolio: any;
  
  // Enhanced data
  platformAnalytics: any;
  communityData: any;
  educationalContent: any;
  marketInsights: any;
  testimonials: any[];
  howItWorks: any[];
  
  // Functions
  refreshData: () => void;
  getAssetPerformance: (assetId: number) => any;
  getUserRank: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [proposals, setProposals] = useState(mockProposals);
  const [treasury, setTreasury] = useState(mockTreasuryData);
  const [userPortfolio, setUserPortfolio] = useState(mockUserPortfolio);

  const refreshData = () => {
    // Simulate data refresh - in real app, this would fetch from API
    setProposals([...mockProposals]);
    setTreasury({ ...mockTreasuryData });
    setUserPortfolio({ ...mockUserPortfolio });
  };

  const getAssetPerformance = (assetId: number) => {
    const asset = mockAssets.find(a => a.id === assetId);
    return asset ? {
      performance: asset.performance,
      roi: asset.roi,
      investorCount: asset.investorCount,
      timeLeft: asset.timeLeft
    } : null;
  };

  const getUserRank = () => {
    // Mock user rank calculation
    return 4; // Sarah Chen's rank from leaderboard
  };

  const value: AppContextType = {
    // Core data
    proposals,
    treasury,
    userPortfolio,
    
    // Enhanced data
    platformAnalytics,
    communityData,
    educationalContent,
    marketInsights,
    testimonials: testimonialData,
    howItWorks: howItWorksData,
    
    // Functions
    refreshData,
    getAssetPerformance,
    getUserRank
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}