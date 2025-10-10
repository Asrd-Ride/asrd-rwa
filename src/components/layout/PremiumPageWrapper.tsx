'use client';

import { ReactNode } from 'react';
import PremiumBackground from '@/components/ui/PremiumBackground';

interface PremiumPageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PremiumPageWrapper({ children, className = '' }: PremiumPageWrapperProps) {
  return (
    <div className={`min-h-screen bg-transparent relative overflow-x-hidden ${className}`}>
      <PremiumBackground />
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
