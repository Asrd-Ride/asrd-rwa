"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  email: string;
  asrdBalance: number;
  portfolioValue: number;
  investments?: Array<{
    id: string;
    assetId: number;
    assetName: string;
    amount: number;
    date: string;
    tokensUsed: number;
  }>;
}

interface AuthContextType {
  user: User | null;
  login: (redirectPath?: string) => void;
  logout: () => void;
  buyASRD: (amount: number) => void;
  invest: (amount: number, assetName: string, assetId: number) => boolean;
  claimRental: (assetId: number) => void;
  claimWinnings: (assetId: number) => void;
  getInvestmentHistory: () => Array<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('assetRideUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('assetRideUser');
      }
    }
  }, []);

  const login = (redirectPath: string = '/dashboard') => {
    const newUser: User = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      asrdBalance: 5000, // CORRECT: 5,000 ASRD tokens
      portfolioValue: 490000, // USD value of owned assets
      investments: []
    };
    setUser(newUser);
    localStorage.setItem('assetRideUser', JSON.stringify(newUser));
    router.push(redirectPath);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('assetRideUser');
    router.push('/');
  };

  const buyASRD = (amount: number) => {
    if (!user) return;
    // $100 USD buys 100/32 = 3.125 ASRD tokens
    const asrdTokens = amount / 32;
    const updatedUser = {
      ...user,
      asrdBalance: user.asrdBalance + asrdTokens
    };
    setUser(updatedUser);
    localStorage.setItem('assetRideUser', JSON.stringify(updatedUser));
  };

  const invest = (amount: number, assetName: string, assetId: number): boolean => {
    if (!user) return false;
    
    // CORRECT: 1 ASRD = 32 USD, so $10,000 = 312.5 ASRD
    const asrdTokensCost = amount / 32;

    // Check if user has enough ASRD balance
    if (user.asrdBalance < asrdTokensCost) {
      if (typeof window !== 'undefined') {
        alert(`Insufficient ASRD Balance: You need ${asrdTokensCost.toFixed(2)} ASRD but only have ${user.asrdBalance.toFixed(2)}.`);
      }
      return false;
    }

    // Create investment record
    const investment = {
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      assetId,
      assetName,
      amount,
      date: new Date().toISOString(),
      tokensUsed: asrdTokensCost
    };

    // CORRECT: Deduct ASRD tokens, add USD to portfolio
    const updatedUser = {
      ...user,
      asrdBalance: user.asrdBalance - asrdTokensCost,
      portfolioValue: user.portfolioValue + amount,
      investments: [...(user.investments || []), investment]
    };

    setUser(updatedUser);
    localStorage.setItem('assetRideUser', JSON.stringify(updatedUser));
    return true;
  };

  const claimRental = (assetId: number) => {
    if (!user) return;
    const rentalAmount = 8500; // USD
    const asrdTokens = rentalAmount / 32; // CORRECT: 265.625 ASRD
    const updatedUser = {
      ...user,
      asrdBalance: user.asrdBalance + asrdTokens,
      portfolioValue: user.portfolioValue + rentalAmount
    };
    setUser(updatedUser);
    localStorage.setItem('assetRideUser', JSON.stringify(updatedUser));
  };

  const claimWinnings = (assetId: number) => {
    if (!user) return;
    const winningsAmount = 12200; // USD
    const asrdTokens = winningsAmount / 32; // CORRECT: 381.25 ASRD
    const updatedUser = {
      ...user,
      asrdBalance: user.asrdBalance + asrdTokens,
      portfolioValue: user.portfolioValue + winningsAmount
    };
    setUser(updatedUser);
    localStorage.setItem('assetRideUser', JSON.stringify(updatedUser));
  };

  const getInvestmentHistory = () => {
    return user?.investments || [];
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      buyASRD,
      invest,
      claimRental,
      claimWinnings,
      getInvestmentHistory
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}