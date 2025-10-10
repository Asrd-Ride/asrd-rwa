"use client";

import React from 'react';
import EnhancedPageWrapper from '@/components/layout/EnhancedPageWrapper';
import PremiumHero from '@/components/sections/PremiumHero';
import PlatformExperienceDemo from '@/components/sections/PlatformExperienceDemo';
import PlatformStatsSection from '@/components/sections/PlatformStatsSection';
import FeaturedAssetsSection from '@/components/sections/FeaturedAssetsSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import EnhancedCTASection from '@/components/sections/EnhancedCTASection';
import CommunityDemo from '@/components/demo/CommunityDemo';

export default function HomePage() {
  return (
    <EnhancedPageWrapper showHeader={true}>
      {/* Premium Hero Section with Enhanced Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-premium-dark">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-premium"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float-premium" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float-premium" style={{ animationDelay: '4s' }}></div>
        </div>
        <PremiumHero />
      </section>

      {/* Platform Stats with Luxury Glass Effect */}
      <section className="section-premium bg-gradient-to-b from-transparent via-slate-900/40 to-transparent">
        <div className="container-premium">
          <PlatformStatsSection />
        </div>
      </section>

      {/* Ultra Premium Platform Experience Demo */}
      <section id="platform-demo" className="section-premium bg-gradient-to-br from-slate-900 via-purple-900/20 to-cyan-900/20">
        <PlatformExperienceDemo />
      </section>

      {/* Community Demo with Premium Cards */}
      <section className="section-premium bg-gradient-to-b from-slate-900/30 to-transparent">
        <div className="container-premium">
          <CommunityDemo />
        </div>
      </section>

      {/* Featured Assets - Luxury Showcase */}
      <section className="section-premium bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="container-premium">
          <FeaturedAssetsSection />
        </div>
      </section>

      {/* How It Works - Premium Process Flow */}
      <section id="how-it-works" className="section-premium bg-gradient-to-br from-cyan-900/10 via-blue-900/10 to-purple-900/10">
        <div className="container-premium">
          <HowItWorksSection />
        </div>
      </section>

      {/* Enhanced CTA Section with Luxury Finish */}
      <section className="section-premium bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="container-premium">
          <EnhancedCTASection />
        </div>
      </section>
    </EnhancedPageWrapper>
  );
}
