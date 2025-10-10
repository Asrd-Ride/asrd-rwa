"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PremiumHeader from './PremiumHeader';

interface EnhancedLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export default function EnhancedLayout({ children, showHeader = true }: EnhancedLayoutProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* Enhanced Cosmic Background */}
      <div className="fixed inset-0 cosmic-bg -z-10" />

      {/* Main Content with Proper Mobile Padding */}
      <div className="relative z-10 min-h-screen">
        {showHeader && <PremiumHeader />}

        {/* Main content area - modals will render above this */}
        <main className="w-full">
          <div className={`${showHeader ? 'pt-24' : 'pt-0'} min-h-screen`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
