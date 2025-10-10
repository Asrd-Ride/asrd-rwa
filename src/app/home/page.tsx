"use client";

import React from 'react';
import EnhancedPageWrapper from '@/components/layout/EnhancedPageWrapper';
import PremiumHero from '@/components/sections/PremiumHero';
import PlatformExperienceDemo from '@/components/sections/PlatformExperienceDemo';
import FeaturedAssetsSection from '@/components/sections/FeaturedAssetsSection';
import EnhancedCTASection from '@/components/sections/EnhancedCTASection';

export default function HomePage() {
  return (
    <EnhancedPageWrapper showHeader={true}>
      {/* Premium Hero Section with 3D Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-3d-cosmic">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-3d"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-3d" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float-3d" style={{ animationDelay: '4s' }}></div>
        </div>
        <PremiumHero />
      </section>

      {/* Ultra Premium Platform Experience Demo */}
      <section id="platform-demo" className="section-3d bg-3d-deep">
        <PlatformExperienceDemo />
      </section>

      {/* Featured Assets - 3D Showcase */}
      <section className="section-3d-sm bg-3d-space">
        <div className="container-3d">
          <FeaturedAssetsSection />
        </div>
      </section>

      {/* Enhanced CTA Section with 3D Finish */}
      <section className="section-3d bg-3d-cosmic">
        <div className="container-3d">
          <EnhancedCTASection />
        </div>
      </section>
    </EnhancedPageWrapper>
  );
}
