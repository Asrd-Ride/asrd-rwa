// src/app/home/page.tsx - CONSISTENT DARK THEME
"use client";

import React, { useState, useEffect } from 'react';
import dynamicImport from 'next/dynamic';
import FluidLayout from '@/components/layout/FluidLayout';

// Dynamically import components with loading states
const FluidHero = dynamicImport(() => import('@/components/sections/FluidHero'), {
  ssr: false,
  loading: () => <div className="h-screen bg-gradient-to-br from-slate-900 to-slate-800 animate-pulse" />
});

const ProblemSection = dynamicImport(() => import('@/components/sections/ProblemSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-900 animate-pulse rounded-2xl" />
});

const SolutionSection = dynamicImport(() => import('@/components/sections/SolutionSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-800 animate-pulse rounded-2xl" />
});

const FeaturedAssetsSection = dynamicImport(() => import('@/components/sections/FeaturedAssetsSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-800 animate-pulse rounded-2xl" />
});

const PlatformStats = dynamicImport(() => import('@/components/sections/PlatformStats'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 animate-pulse rounded-2xl" />
});

const TestimonialsSection = dynamicImport(() => import('@/components/sections/TestimonialsSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-slate-900 animate-pulse rounded-2xl" />
});

const FinalCTASection = dynamicImport(() => import('@/components/sections/FinalCTASection'), {
  ssr: false,
  loading: () => <div className="h-80 bg-gradient-to-r from-purple-900/20 to-pink-900/20 animate-pulse rounded-2xl" />
});

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a simple loading state during SSR and initial hydration
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <FluidLayout showHeader={true}>
      {/* 1. Enhanced Hero Section */}
      <FluidHero />

      {/* 2. Problem Section - Updated to dark theme */}
      <section id="problem" className="fluid-section-sm bg-slate-900">
        <div className="fluid-container">
          <ProblemSection />
        </div>
      </section>

      {/* 3. Solution Section - Updated to dark theme */}
      <section id="solution" className="fluid-section-sm bg-slate-800">
        <div className="fluid-container">
          <SolutionSection />
        </div>
      </section>

      {/* 4. Featured Assets Section */}
      <section id="featured-assets" className="fluid-section-sm bg-slate-800">
        <div className="fluid-container">
          <FeaturedAssetsSection />
        </div>
      </section>

      {/* 5. Platform Statistics */}
      <PlatformStats />

      {/* 6. Testimonials Section - Updated to dark theme */}
      <TestimonialsSection />

      {/* 7. Final CTA Section */}
      <FinalCTASection />
    </FluidLayout>
  );
}

// Disable static generation for this page
export const dynamic = 'force-dynamic';
