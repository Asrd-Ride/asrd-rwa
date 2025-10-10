"use client";

import React from 'react';
import EnhancedLayout from './EnhancedLayout';

interface EnhancedPageWrapperProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export default function EnhancedPageWrapper({ 
  children, 
  showHeader = true 
}: EnhancedPageWrapperProps) {
  return (
    <EnhancedLayout showHeader={showHeader}>
      {children}
    </EnhancedLayout>
  );
}
