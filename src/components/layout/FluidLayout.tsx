'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversal } from '@/lib/universal';
import PremiumHeader from './PremiumHeader';

interface FluidLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

// Throttle helper
function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export default function FluidLayout({ children, showHeader = true }: FluidLayoutProps) {
  const { user } = useAuth();
  const { deviceInfo, universalAttributes } = useUniversal();
  const [isMobile, setIsMobile] = useState(deviceInfo.type === 'mobile');

  useEffect(() => {
    const handleResize = throttle(() => {
      setIsMobile(deviceInfo.type === 'mobile');
    }, 100);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [deviceInfo.type]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30"
      {...universalAttributes}
    >
      {showHeader && <PremiumHeader />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
