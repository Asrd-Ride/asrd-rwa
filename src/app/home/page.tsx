"use client";

import React from 'react';
import FluidLayout from '@/components/layout/FluidLayout';
import FluidHero from '@/components/sections/FluidHero';
import FeaturedAssetsSection from '@/components/sections/FeaturedAssetsSection';

export default function HomePage() {
  return (
    <FluidLayout showHeader={true}>
      {/* Fluid Hero Section */}
      <FluidHero />
      
      {/* Featured Assets Section */}
      <section className="fluid-section-sm bg-fluid-charcoal">
        <div className="fluid-container">
          <FeaturedAssetsSection />
        </div>
      </section>
    </FluidLayout>
  );
}
