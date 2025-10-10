"use client";

import React, { useState } from 'react';
import { mockAssets } from '@/data/mockData';
import AssetCard from './AssetCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Asset {
  id: number;
  title: string;
  category: string;
  type: string;
  location: string;
  value: number;
  currency: string;
  status: string;
  image: string;
  description: string;
  roi: string;
  timeline: string;
  minInvestment: number;
}

// Extend mock assets with required properties for AssetCard
const enhancedAssets = mockAssets.map(asset => ({
  ...asset,
  category: asset.type, // Use type as category
  currency: "USD",
  image: "/api/placeholder/400/300", // Placeholder
  description: `Premium ${asset.type.toLowerCase()} investment located in ${asset.location} with ${asset.roi} ROI.`
}));

export default function AssetGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [assets] = useState<Asset[]>(enhancedAssets);
  const { getFadeStyle } = useScrollAnimation();

  const categories = ['all', ...new Set(assets.map(asset => asset.type))];
  const statuses = ['all', ...new Set(assets.map(asset => asset.status))];

  const handleFilter = (category: string, status: string) => {
    setSelectedCategory(category);
    setSelectedStatus(status);
  };

  const filteredAssets = assets.filter(asset => {
    const categoryMatch = selectedCategory === 'all' || asset.type === selectedCategory;
    const statusMatch = selectedStatus === 'all' || asset.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  const getCategoryLabel = (category: string) => {
    return category === 'all' ? 'All Assets' : category;
  };

  const getStatusLabel = (status: string) => {
    return status === 'all' ? 'All Status' : status;
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="glass-ultimate rounded-3xl border border-white/10 p-8" style={getFadeStyle(0, 200)}>
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleFilter(category, selectedStatus)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm border ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400/50 shadow-lg'
                    : 'bg-white/5 text-cyan-100 border-white/20 hover:border-cyan-400/30 hover:bg-white/10'
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-3">
            {statuses.map(status => (
              <button
                key={status}
                onClick={() => handleFilter(selectedCategory, status)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border ${
                  selectedStatus === status
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white border-purple-400/50'
                    : 'bg-white/5 text-cyan-100 border-white/20 hover:border-purple-400/30 hover:bg-white/10'
                }`}
              >
                {getStatusLabel(status)}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 text-sm text-blue-300">
          Showing {filteredAssets.length} of {assets.length} premium assets
        </div>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAssets.map((asset, index) => (
          <div key={asset.id} style={getFadeStyle(200 + index * 100, 600)}>
            <AssetCard
              {...asset}
              onInvest={(id) => console.log('Invest in:', id)}
              onViewDetails={(id) => console.log('View details:', id)}
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAssets.length === 0 && (
        <div className="text-center py-16 glass-ultimate rounded-3xl border border-white/10" style={getFadeStyle(200, 400)}>
          <div className="text-cyan-400 text-6xl mb-4">🔍</div>
          <p className="text-cyan-100 text-lg mb-4">No assets found matching your filters.</p>
          <button
            onClick={() => handleFilter('all', 'all')}
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
