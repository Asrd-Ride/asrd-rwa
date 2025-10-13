'use client';

import React, { useState } from 'react';
import { mockAssets } from '@/data/mockData';
import EnhancedAssetCard from './EnhancedAssetCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Filter, Search, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Asset } from '@/types';

export default function AssetGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [assets] = useState<Asset[]>(mockAssets);
  const { getFadeStyle } = useScrollAnimation();

  const categories = ['all', ...new Set(assets.map(a => a.type))];
  const riskLevels = ['all', ...new Set(assets.map(a => a.riskLevel || 'Medium'))];

  const handleFilter = (category: string, risk: string) => {
    setSelectedCategory(category);
    setSelectedRisk(risk);
  };

  const filteredAssets = assets.filter(asset => {
    const categoryMatch = selectedCategory === 'all' || asset.type === selectedCategory;
    const riskMatch = selectedRisk === 'all' || (asset.riskLevel || 'Medium') === selectedRisk;
    const searchMatch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.location.city.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && riskMatch && searchMatch;
  });

  const getCategoryLabel = (c: string) => (c === 'all' ? 'All Assets' : c);
  const getRiskLabel = (r: string) => (r === 'all' ? 'All Risk Levels' : r);

  const handleInvest = (asset: Asset) => console.log('Invest in:', asset.id);
  const handleViewDetails = (asset: Asset) => console.log('View details:', asset.id);

  return (
    <div className="space-y-8">
      {/* Filters Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6"
      >
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* Search Bar */}
          <div className="flex-1 w-full lg:max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search assets by name, location, or description..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-amber-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-slate-900/50 rounded-xl p-2 border border-slate-600 backdrop-blur-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-amber-500 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category & Risk Filters */}
        <div className="mt-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2 text-slate-300 mr-4">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Category:</span>
            </div>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleFilter(category, selectedRisk)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm border ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-400/50 shadow-lg'
                    : 'bg-slate-700/50 text-slate-300 border-slate-600 hover:border-amber-400/30 hover:bg-slate-700'
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-slate-300 text-sm font-medium mr-4">Risk Level:</span>
            {riskLevels.map(risk => (
              <button
                key={risk}
                onClick={() => handleFilter(selectedCategory, risk)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                  selectedRisk === risk
                    ? risk === 'Low'
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-emerald-400/50'
                      : risk === 'Medium'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-400/50'
                      : 'bg-gradient-to-r from-rose-500 to-rose-600 text-white border-rose-400/50'
                    : 'bg-slate-700/50 text-slate-300 border-slate-600 hover:border-emerald-400/30 hover:bg-slate-700'
                }`}
              >
                {getRiskLabel(risk)}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-slate-300 text-sm">
            Showing <span className="text-white font-semibold">{filteredAssets.length}</span> of{' '}
            <span className="text-white font-semibold">{assets.length}</span> premium assets
          </div>
          <div className="text-slate-400 text-sm">{viewMode === 'grid' ? 'Grid View' : 'List View'}</div>
        </div>
      </motion.div>

      {/* Asset Grid/List */}
      <AnimatePresence mode="wait">
        {filteredAssets.length > 0 ? (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}
          >
            {filteredAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <EnhancedAssetCard
                  asset={asset}
                  onInvest={handleInvest}
                  onViewDetails={handleViewDetails}
                  viewMode={viewMode}
                  enhanced={true}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700"
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Assets Found</h3>
              <p className="text-slate-300 mb-6">
                Try adjusting your search criteria or filters to find more investment opportunities.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedRisk('all');
                }}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
