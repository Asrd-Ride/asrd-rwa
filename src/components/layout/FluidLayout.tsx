"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PremiumHeader from './PremiumHeader';

interface FluidLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

export default function FluidLayout({ children, showHeader = true }: FluidLayoutProps) {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Fluid scroll animation observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: isMobile ? 0.05 : 0.1, // Lower threshold on mobile
      rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
    });

    // Observe all fluid scroll items
    document.querySelectorAll('.fluid-scroll-item').forEach(item => {
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div className="fluid-bg min-h-screen">
      {/* Fluid Background Elements - Reduced on mobile */}
      <div className="fixed inset-0 pointer-events-none">
        {!isMobile && (
          <>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-fluid-gold rounded-full opacity-5 fluid-float"></div>
            <div className="absolute top-1/3 right-1/4 w-56 h-56 bg-fluid-emerald rounded-full opacity-5 fluid-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-fluid-sapphire rounded-full opacity-5 fluid-float" style={{ animationDelay: '4s' }}></div>
          </>
        )}
      </div>
      
      {/* Main content container */}
      <div className="relative z-10">
        {showHeader && <PremiumHeader />}

        {/* Main content area with mobile-optimized spacing */}
        <main className="w-full">
          <div className={`${showHeader ? 'pt-16 md:pt-24' : 'pt-0'} fluid-header-spacing`}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
