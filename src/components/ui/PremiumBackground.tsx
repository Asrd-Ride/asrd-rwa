"use client";

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function PremiumBackground() {
  const { getParallaxStyle, scrollProgress } = useScrollAnimation();

  const getGradient = () => {
    if (scrollProgress < 20) {
      return 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 100%)';
    } else if (scrollProgress < 40) {
      return 'linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 50%, #64748b 100%)';
    } else if (scrollProgress < 60) {
      return 'linear-gradient(135deg, #334155 0%, #475569 25%, #64748b 50%, #94a3b8 100%)';
    } else {
      return 'linear-gradient(135deg, #475569 0%, #64748b 25%, #94a3b8 50%, #cbd5e1 100%)';
    }
  };

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      {/* Main Gradient Background */}
      <div
        className="absolute inset-0 transition-all duration-2000"
        style={{
          background: getGradient(),
        }}
      />

      {/* Futuristic Grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          ...getParallaxStyle(0.05)
        }}
      />

      {/* Animated Circuit Lines */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent animate-pulse"
          style={getParallaxStyle(0.1)}
        />
        <div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse"
          style={{...getParallaxStyle(0.1), animationDelay: '1s'}}
        />
      </div>

      {/* Floating Holographic Elements */}
      <div className="absolute inset-0">
        {/* Main Hologram */}
        <div
          className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-sky-400/10 to-blue-500/10 rounded-full blur-3xl animate-float-hologram"
          style={{
            ...getParallaxStyle(0.2)
          }}
        />
        
        {/* Secondary Holograms */}
        <div
          className="absolute top-2/3 right-1/4 w-48 h-48 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-3xl animate-float-hologram"
          style={{
            ...getParallaxStyle(0.15),
            animationDelay: '2s'
          }}
        />
        
        <div
          className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-cyan-500/10 rounded-full blur-3xl animate-float-hologram"
          style={{
            ...getParallaxStyle(0.1),
            animationDelay: '4s'
          }}
        />
      </div>

      {/* Data Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-float-data"
          style={{
            left: `${10 + (i * 4)}%`,
            top: `${20 + (i * 3)}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${8 + i * 1}s`,
            ...getParallaxStyle(0.05 + i * 0.02)
          }}
        />
      ))}

      {/* Scan Lines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(14, 165, 233, 0.1) 2px, rgba(14, 165, 233, 0.1) 4px)`,
          ...getParallaxStyle(0.02)
        }}
      />
    </div>
  );
}
