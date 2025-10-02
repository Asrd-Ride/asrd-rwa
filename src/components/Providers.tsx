"use client";

import { WalletProvider } from '@/contexts/WalletContext';
import { AppProvider } from '@/contexts/AppContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <AppProvider>
        {children}
      </AppProvider>
    </WalletProvider>
  );
}
