"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  email: string;
  asrdBalance: number;
  portfolioValue: number;
}

interface AuthContextType {
  user: User | null;
  login: (redirectPath?: string) => void;
  logout: () => void;
  buyASRD: (amount: number) => void;
  invest: (amount: number, assetName: string) => boolean;
  claimRental: (assetId: number) => void;
  claimWinnings: (assetId: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('assetRideUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (redirectPath: string = '/dashboard') => {
    const demoUser = {
      name: "Premium Investor",
      email: "demo@assetride.com",
      asrdBalance: 5000,
      portfolioValue: 490000
    };
    setUser(demoUser);
    localStorage.setItem('assetRideUser', JSON.stringify(demoUser));

    // Redirect to dashboard after login
    router.push(redirectPath);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('assetRideUser');
    router.push('/home');
  };

  const buyASRD = (amount: number) => {
    if (!user) return;
    const asrdTokens = amount / 32; // $32 per ASRD token
    const updatedUser = {
      ...user,
      asrdBalance: user.asrdBalance + asrdTokens,
      portfolioValue: user.portfolioValue + amount // Increase portfolio when buying ASRD
    };
    setUser(updatedUser);
    localStorage.setItem('assetRideUser', JSON.stringify(updatedUser));
  };

  const invest = (amount: number, assetName: string): boolean => {
    if (!user) return false;
    const asrdTokensCost = amount / 32; // Calculate ASRD tokens needed

    // Check if user has enough ASRD balance
    if (user.asrdBalance < asrdTokensCost) {
      // Show notification instead of alert
      if (typeof window !== 'undefined' && (window as any).showNotification) {
        (window as any).showNotification({
          type: 'error',
          title: 'Insufficient Balance',
          message: `You need ${asrdTokensCost.toFixed(2)} ASRD but only have ${user.asrdBalance.toFixed(2)}.`,
          duration: 5000
        });
      }
      return false;
    }

    // CORRECT: When investing ASRD tokens, portfolio USD value decreases proportionally
    const updatedUser = {
      ...user,
      asrdBalance: user.asrdBalance - asrdTokensCost,
      portfolioValue: user.portfolioValue - amount // Decrease portfolio value by investment amount
    };
    setUser(updatedUser);
    localStorage.setItem('assetRideUser', JSON.stringify(updatedUser));

    console.log(`Invested $${amount} in ${assetName}. Deducted ${asrdTokensCost.toFixed(2)} ASRD tokens.`);
    return true;
  };

  const claimRental = (assetId: number) => {
    if (!user) return;
    const rentalAmount = 4250;
    const asrdTokens = 132;
    const updatedUser = {
      ...user,
      asrdBalance: user.asrdBalance + asrdTokens,
      portfolioValue: user.portfolioValue + rentalAmount // Increase portfolio when claiming rental
    };
    setUser(updatedUser);
    localStorage.setItem('assetRideUser', JSON.stringify(updatedUser));

    // Show notification instead of alert
    if (typeof window !== 'undefined' && (window as any).showNotification) {
      (window as any).showNotification({
        type: 'success',
        title: 'Rental Income Claimed!',
        message: `Successfully claimed $${rentalAmount} rental income! Received ${asrdTokens} ASRD tokens.`,
        duration: 6000
      });
    }
  };

  const claimWinnings = (assetId: number) => {
    if (!user) return;
    const winningsAmount = 8500;
    const asrdTokens = 265;
    const updatedUser = {
      ...user,
      asrdBalance: user.asrdBalance + asrdTokens,
      portfolioValue: user.portfolioValue + winningsAmount // Increase portfolio when claiming winnings
    };
    setUser(updatedUser);
    localStorage.setItem('assetRideUser', JSON.stringify(updatedUser));

    // Show notification instead of alert
    if (typeof window !== 'undefined' && (window as any).showNotification) {
      (window as any).showNotification({
        type: 'success',
        title: 'Winnings Claimed!',
        message: `Successfully claimed $${winningsAmount} race winnings! Received ${asrdTokens} ASRD tokens.`,
        duration: 6000
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, buyASRD, invest, claimRental, claimWinnings }}>
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
