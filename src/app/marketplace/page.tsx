"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { useWallet } from '@/contexts/WalletContext';
import { Filter, Search, TrendingUp, Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import PurchaseModal from '@/components/ui/PurchaseModal';

export default function MarketplacePage() {
  const { assets, selectedAssetType, setSelectedAssetType, ownedAssets, purchaseAsset } = useApp();
  const { asrdBalance } = useWallet();
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get user's purchased assets from ownedAssets
  const purchasedAssets = ownedAssets || [];

  const availableAssets = assets.filter(asset =>
    !purchasedAssets.some(owned => owned?.id === asset.id)
  );

  const filteredAssets = availableAssets.filter(asset => {
    const matchesType = selectedAssetType === 'all' || asset.type === selectedAssetType;
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const assetTypes = ['all', 'horse', 'real-estate'] as const;

  const handleAssetTypeChange = (value: string) => {
    setSelectedAssetType(value as 'all' | 'horse' | 'real-estate');
  };

  const handlePurchase = async (fraction: number) => {
    if (selectedAsset) {
      const success = await purchaseAsset(selectedAsset.id, fraction);
      if (success) {
        alert(`Successfully purchased ${(fraction * 100).toFixed(0)}% of ${selectedAsset.name}!`);
      } else {
        alert('Purchase failed: Insufficient ASRD balance');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      {/* Header */}
      <div className="relative overflow-hidden pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Asset Marketplace
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Discover and invest in premium real-world assets with fractional ownership
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-slate-800/50 rounded-2xl p-6 backdrop-blur-sm border border-slate-600/30">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Asset Type Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={selectedAssetType}
                onChange={(e) => handleAssetTypeChange(e.target.value)}
                className="bg-slate-700/50 border border-slate-600/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {assetTypes.map(type => (
                  <option key={type} value={type} className="capitalize">
                    {type === 'all' ? 'All Assets' : type.replace('-', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 rounded-2xl overflow-hidden border border-slate-600/30 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm"
            >
              <div className="relative">
                <img
                  src={asset.image}
                  alt={asset.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    asset.type === 'horse'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-green-500/20 text-green-300 border border-green-500/30'
                  }`}>
                    {asset.type === 'horse' ? '🐎 Horse' : '🏠 Real Estate'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{asset.name}</h3>
                <p className="text-slate-300 text-sm mb-4 line-clamp-2">{asset.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Price</span>
                    <span className="text-white font-semibold">{asset.price.toLocaleString()} ASRD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Available</span>
                    <span className="text-green-400 font-semibold">100%</span>
                  </div>
                  {asset.dividends && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Dividends</span>
                      <span className="text-yellow-400 font-semibold">${asset.dividends}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedAsset(asset);
                    setShowPurchaseModal(true);
                  }}
                  className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-200"
                >
                  Invest Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-16">
            <TrendingUp className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No assets found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onConfirm={handlePurchase}
        asset={selectedAsset}
      />
    </div>
  );
}
