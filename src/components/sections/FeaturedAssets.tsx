"use client";

import React from 'react';
import { mockAssets } from '@/data/mockData';
import RealAssetImage from '@/components/ui/RealAssetImage';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function FeaturedAssets() {
  const { getFadeStyle } = useScrollAnimation();
  const featuredAssets = mockAssets.slice(0, 3);

  const getROIColor = (roi: string) => {
    const roiValue = parseFloat(roi);
    if (roiValue >= 40) return 'text-emerald-400';
    if (roiValue >= 30) return 'text-cyan-400';
    if (roiValue >= 20) return 'text-blue-400';
    return 'text-gray-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30';
      case 'Coming Soon': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'Auction': return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
      default: return 'bg-gray-500/20 text-gray-200 border-gray-400/30';
    }
  };

  return (
    <section id="featured-assets" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16" style={getFadeStyle(0, 200)}>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            FEATURED ASSETS
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed font-light">
            Hand-picked investment opportunities with proven track records and premium returns
          </p>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredAssets.map((asset, index) => (
            <div
              key={asset.id}
              className="group"
              style={getFadeStyle(200 + index * 100, 600)}
            >
              <div className="glass-ultimate rounded-3xl border border-white/10 p-6 hover:border-cyan-400/30 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl overflow-hidden h-full flex flex-col">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Real Asset Image */}
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4 border border-gray-700">
                  <RealAssetImage
                    type={asset.type}
                    title={asset.title}
                    size="xl"
                    className="w-full h-full"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusColor(asset.status)}`}>
                      {asset.status.toUpperCase()}
                    </div>
                  </div>

                  {/* ROI Badge */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-400/30">
                      {asset.roi} ROI
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-bold text-xl text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300">
                    {asset.title}
                  </h3>

                  <div className="flex items-center text-cyan-200 mb-3 text-sm">
                    <span>📍 {asset.location}</span>
                  </div>

                  <p className="text-white text-sm leading-relaxed mb-4 flex-1">
                    Premium {asset.type.toLowerCase()} investment with exceptional returns and professional management.
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-2xl font-black text-white">
                        ${(asset.value / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-blue-300 text-sm">Total Value</p>
                    </div>

                    <div className="text-right">
                      <p className={`text-xl font-black ${getROIColor(asset.roi)}`}>{asset.roi}</p>
                      <p className="text-blue-300 text-sm">Annual ROI</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <p className="text-blue-300 text-sm mb-4">
                      Min. Investment: ${asset.minInvestment.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-sm">
                      Invest Now
                    </button>
                    <button className="flex-1 border border-white/20 text-white py-3 px-4 rounded-xl font-semibold hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300 text-sm">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16" style={getFadeStyle(500, 800)}>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-cyan-400/30">
            View All Assets
          </button>
        </div>
      </div>
    </section>
  );
}
