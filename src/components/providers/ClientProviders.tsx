"use client";

import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import PremiumBackground from '@/components/ui/PremiumBackground';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Premium Background - Applied globally */}
      <PremiumBackground intensity="medium" theme="tech" />

      <AuthProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </AuthProvider>
    </>
  );
}
