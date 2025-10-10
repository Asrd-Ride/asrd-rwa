"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockProposals, mockAssets } from '@/data/mockData';

// Mock treasury data
const mockTreasuryData = {
  totalValue: 15420000,
  availableFunds: 3250000,
  allocatedFunds: 12170000,
  monthlyIncome: 425000,
  monthlyExpenses: 125000,
  netCashFlow: 300000,
  assets: [
    { name: 'Real Estate', value: 8500000, percentage: 55.2 },
    { name: 'Thoroughbred', value: 3200000, percentage: 20.8 },
    { name: 'Marine Assets', value: 2200000, percentage: 14.3 },
    { name: 'Other Investments', value: 1520000, percentage: 9.7 }
  ]
};

// Mock user portfolio
const mockUserPortfolio = {
  totalValue: 490000,
  monthlyIncome: 12500,
  asrdTokens: 5000,
  activeInvestments: 8,
  recentActivity: [
    { id: 1, type: 'investment', asset: 'Dubai Villa', amount: 50000, date: '2024-01-15' },
    { id: 2, type: 'income', asset: 'Rental Payment', amount: 4250, date: '2024-01-10' },
    { id: 3, type: 'income', asset: 'Race Winnings', amount: 8500, date: '2024-01-05' }
  ]
};

interface AppContextType {
  proposals: any[];
  treasury: any;
  userPortfolio: any;
  refreshData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [proposals, setProposals] = useState(mockProposals);
  const [treasury, setTreasury] = useState(mockTreasuryData);
  const [userPortfolio, setUserPortfolio] = useState(mockUserPortfolio);

  const refreshData = () => {
    // Simulate data refresh
    setProposals([...mockProposals]);
    setTreasury({ ...mockTreasuryData });
    setUserPortfolio({ ...mockUserPortfolio });
  };

  return (
    <AppContext.Provider value={{ proposals, treasury, userPortfolio, refreshData }}>
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
