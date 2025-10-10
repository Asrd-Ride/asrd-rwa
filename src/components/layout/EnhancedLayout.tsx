"use client";

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PremiumHeader from './PremiumHeader';
import { Premium3DBackground } from '@/components/ui/Premium3DBackground';

interface EnhancedLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export default function EnhancedLayout({ children, showHeader = true }: EnhancedLayoutProps) {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-3d-space relative overflow-hidden">
      {/* Premium 3D Background with proper z-index */}
      <Premium3DBackground />
      
      {/* Main content container with proper spacing */}
      <div className="relative z-10">
        {showHeader && <PremiumHeader />}

        {/* Main content area with enhanced 3D spacing */}
        <main className="w-full">
          <div className={`${showHeader ? 'pt-32' : 'pt-0'} min-h-screen`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
