// src/app/home/page.tsx - CONSISTENT DARK THEME
"use client";

import React from 'react';
import FluidLayout from '@/components/layout/FluidLayout';
import FluidHero from '@/components/sections/FluidHero';
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

      {/* 4. How It Works Section - Updated to dark theme */}
      <section id="how-it-works" className="fluid-section-sm bg-slate-900">
        <div className="fluid-container">
          <HowItWorksSection />
        </div>
      </section>

      {/* 5. Featured Assets Section */}
      <section id="featured-assets" className="fluid-section-sm bg-slate-800">
        <div className="fluid-container">
          <FeaturedAssetsSection />
        </div>
      </section>

      {/* 6. Platform Statistics */}
      <PlatformStats />

      {/* 7. Testimonials Section - Updated to dark theme */}
      <TestimonialsSection />

      {/* 8. Final CTA Section */}
      <FinalCTASection />
    </FluidLayout>
  );
}