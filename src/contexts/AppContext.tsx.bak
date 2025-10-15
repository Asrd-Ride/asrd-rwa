"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  mockProposals,
  mockAssets,
  ownedAssets,
  platformStats,
  howItWorksData,
  treasuryData,
  userPortfolioData,
  platformFeatures
} from '@/data/mockData';

// Define proper TypeScript interfaces for our data
interface TreasuryAsset {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface TreasuryData {
  totalValue: number;
  availableFunds: number;
  allocatedFunds: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netCashFlow: number;
  assets: TreasuryAsset[];
  growth: {
    monthly: string;
    quarterly: string;
    yearly: string;
  };
  performance: {
    currentMonth: string;
    lastMonth: string;
    ytd: string;
  };
}

interface Proposal {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  status: string;
  endDate: string;
  type: string;
  impact: string;
  budget: string;
  timeline: string;
}

interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

interface PlatformFeature {
  title: string;
  description: string;
  icon: string;
}

interface UserPortfolio {
  totalValue: number;
  monthlyIncome: number;
  activeInvestments: number;
  totalReturns: number;
  averageROI: number;
  assets: Array<{
    id: number;
    name: string;
    value: number;
    shares: number;
    monthlyIncome: number;
    roi: number;
  }>;
}

interface AppContextType {
  // Core platform data
  proposals: Proposal[];
  assets: any[];
  ownedAssets: any[];
  platformStats: any;
  treasuryData: TreasuryData;

  // Marketing and educational data
  howItWorks: HowItWorksStep[];
  platformFeatures: PlatformFeature[];

  // User-specific data
  userPortfolio: UserPortfolio;

  // UI state
  isLoading: boolean;
  isMobile: boolean;

  // Methods
  refreshData: () => void;
  setIsMobile: (isMobile: boolean) => void;
  voteOnProposal: (proposalId: number, vote: 'for' | 'against') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);

  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsLoading(false);
      console.log('Platform data refreshed');
    }, 1000);
  };

  const voteOnProposal = (proposalId: number, vote: 'for' | 'against') => {
    setProposals(prevProposals =>
      prevProposals.map(proposal =>
        proposal.id === proposalId
          ? {
              ...proposal,
              votesFor: vote === 'for' ? proposal.votesFor + 1 : proposal.votesFor,
              votesAgainst: vote === 'against' ? proposal.votesAgainst + 1 : proposal.votesAgainst
            }
          : proposal
      )
    );

    console.log(`Voted ${vote} on proposal ${proposalId}`);
  };

  const value: AppContextType = {
    // Core platform data
    proposals,
    assets: mockAssets,
    ownedAssets: ownedAssets,
    platformStats: platformStats,
    treasuryData: treasuryData,

    // Marketing and educational data
    howItWorks: howItWorksData,
    platformFeatures: platformFeatures,

    // User-specific data
    userPortfolio: userPortfolioData,

    // UI state
    isLoading,
    isMobile,

    // Methods
    refreshData,
    setIsMobile,
    voteOnProposal,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};