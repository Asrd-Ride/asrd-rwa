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
      asrdBalance: user.asrdBalance + asrdTokens
    };
    setUser(updatedUser);
    localStorage.setItem('assetRideUser', JSON.stringify(updatedUser));
  };

  const claimRental = (assetId: number) => {
    if (!user) return;
    const rentalAmount = 4250;
    const asrdTokens = 132;
    const updatedUser = {
      ...user,
      asrdBalance: user.asrdBalance + asrdTokens,
      portfolioValue: user.portfolioValue + rentalAmount
    };
    setUser(updatedUser);
    localStorage.setItem('assetRideUser', JSON.stringify(updatedUser));
    alert(`🏠 Successfully claimed $${rentalAmount} rental income! Received ${asrdTokens} ASRD tokens.`);
  };

  const claimWinnings = (assetId: number) => {
    if (!user) return;
    const winningsAmount = 8500;
    const asrdTokens = 265;
    const updatedUser = {
      ...user,
      asrdBalance: user.asrdBalance + asrdTokens,
      portfolioValue: user.portfolioValue + winningsAmount
    };
    setUser(updatedUser);
    localStorage.setItem('assetRideUser', JSON.stringify(updatedUser));
    alert(`🏆 Successfully claimed $${winningsAmount} race winnings! Received ${asrdTokens} ASRD tokens.`);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, buyASRD, claimRental, claimWinnings }}>
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
