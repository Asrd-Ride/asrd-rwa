"use client";

import React from 'react';
import FluidLayout from '@/components/layout/FluidLayout';
import dynamicImport from 'next/dynamic';
import ClientOnly from '@/components/ClientOnly';

const FluidDashboard = dynamicImport(() => import('@/components/sections/FluidDashboard'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 animate-pulse rounded-2xl" />
});

export default function DashboardPage() {
  return (
    <FluidLayout>
      <ClientOnly>
        <FluidDashboard />
      </ClientOnly>
    </FluidLayout>
  );
}
