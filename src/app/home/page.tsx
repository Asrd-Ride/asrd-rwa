// src/app/home/page.tsx - Updated with new flow
"use client";

import React from 'react';
import FluidLayout from '@/components/layout/FluidLayout';
import FluidHero from '@/components/sections/FluidHero'; // This is now EnhancedHero content
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import FeaturedAssetsSection from '@/components/sections/FeaturedAssetsSection';
import PlatformStats from '@/components/sections/PlatformStats';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FinalCTASection from '@/components/sections/FinalCTASection';

export default function HomePage() {
  return (
    <FluidLayout showHeader={true}>
      {/* 1. Enhanced Hero Section */}
      <FluidHero />

      {/* 2. Problem Section */}
      <section className="fluid-section-sm bg-white">
        <div className="fluid-container">
          <ProblemSection />
        </div>
      </section>

      {/* 3. Solution Section */}
      <section className="fluid-section-sm bg-slate-50">
        <div className="fluid-container">
          <SolutionSection />
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="fluid-section-sm bg-white">
        <div className="fluid-container">
          <HowItWorksSection />
        </div>
      </section>

      {/* 5. Featured Assets Section */}
      <section className="fluid-section-sm bg-fluid-charcoal">
        <div className="fluid-container">
          <FeaturedAssetsSection />
        </div>
      </section>

      {/* 6. Platform Statistics */}
      <PlatformStats />

      {/* 7. Testimonials Section */}
      <TestimonialsSection />

      {/* 8. Final CTA Section */}
      <FinalCTASection />
    </FluidLayout>
  );
}