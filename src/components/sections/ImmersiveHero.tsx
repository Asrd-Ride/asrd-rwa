"use client";

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function ImmersiveHero() {
  const { getFadeStyle } = useScrollAnimation();

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400/30 rounded-full animate-pulse" />
        <div className="absolute bottom-40 right-20 w-6 h-6 bg-blue-400/20 rounded-full animate-pulse" style={{animationDelay: '1.5s'}} />
        <div className="absolute top-60 left-1/2 w-3 h-3 bg-purple-400/40 rounded-full animate-pulse" style={{animationDelay: '2.5s'}} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Pre-headline */}
          <div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full px-6 py-2 mb-8 backdrop-blur-sm"
            style={getFadeStyle(0, 200)}
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-300 font-semibold text-sm uppercase tracking-wider">
              Future of Asset Investment • Powered by Blockchain
            </span>
          </div>

          {/* Main Headline */}
          <div style={getFadeStyle(200, 400)}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
              <span className="block">ELITE ASSETS</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                DEMOCRATIZED
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto leading-relaxed font-light">
              Experience the future of investing. Our platform leverages cutting-edge
              technology to bring exclusive assets within reach.
              <span className="text-cyan-300 font-semibold"> Start your journey with just $50.</span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            style={getFadeStyle(400, 600)}
          >
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 w-full sm:w-auto">
              Explore Investments
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-500 w-full sm:w-auto">
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div 
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            style={getFadeStyle(600, 800)}
          >
            <div className="text-center">
              <div className="text-2xl font-black text-cyan-400 mb-1">30%+</div>
              <div className="text-cyan-200 text-sm">Average Returns</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-blue-400 mb-1">$50</div>
              <div className="text-cyan-200 text-sm">Start Investing</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-purple-400 mb-1">1K+</div>
              <div className="text-cyan-200 text-sm">Active Investors</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        style={getFadeStyle(800, 1000)}
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
