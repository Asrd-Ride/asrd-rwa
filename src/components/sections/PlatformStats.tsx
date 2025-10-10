"use client";

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function PlatformStats() {
  const { getFadeStyle } = useScrollAnimation();

  const stats = [
    { value: "$125M+", label: "Total Volume", color: "text-cyan-400" },
    { value: "1,247+", label: "Active Users", color: "text-blue-400" },
    { value: "45", label: "Premium Assets", color: "text-purple-400" },
    { value: "12.8%", label: "Avg. ROI", color: "text-emerald-400" }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12" style={getFadeStyle(0, 200)}>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              TRUSTED PLATFORM
            </h2>
            <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed font-light">
              Join thousands of investors who trust our platform for premium real world asset investments
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center"
                style={getFadeStyle(200 + index * 100, 600)}
              >
                <div className={`text-3xl md:text-4xl font-black ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-cyan-200 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div 
            className="inline-flex flex-wrap justify-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6"
            style={getFadeStyle(600, 800)}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-300 text-sm font-medium">Blockchain Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-300 text-sm font-medium">Regulatory Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">Secure Platform</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
