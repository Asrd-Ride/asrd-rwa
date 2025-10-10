"use client";

import React from 'react';
import { AppProvider } from '@/contexts/AppContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { WalletProvider } from '@/contexts/WalletContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AuthProvider>
        <WalletProvider>
          {children}
        </WalletProvider>
      </AuthProvider>
    </AppProvider>
  );
}
