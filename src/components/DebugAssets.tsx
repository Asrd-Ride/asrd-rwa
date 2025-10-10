"use client";

import { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

export default function DebugAssets() {
  const { userPortfolio } = useApp();

  useEffect(() => {
    console.log('=== ASSETS DEBUG ===');
    console.log('User Portfolio:', userPortfolio);
    console.log('===================');
  }, [userPortfolio]);

  return null; // This component doesn't render anything
}
