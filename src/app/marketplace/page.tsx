"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { useWallet } from '@/contexts/WalletContext';
import { useAuth } from '@/contexts/AuthContext';
import { Filter, Search, TrendingUp, Clock, Gem, Crown, Coins, MapPin, Eye, LogIn } from 'lucide-react';
import Header from '@/components/layout/Header';
import PurchaseModal from '@/components/ui/PurchaseModal';
import AssetDetailModal from '@/components/ui/AssetDetailModal';
import Link from 'next/link';

export default function MarketplacePage() {
  const { assets, selectedAssetType, setSelectedAssetType, ownedAssets, purchaseAsset } = useApp();
  const { asrdBalance } = useWallet();
  const { user } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
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

  const handlePurchaseClick = (asset: any) => {
    if (!user) {
      // Redirect to dashboard/login if not authenticated
      window.location.href = '/portfolio'
      return
    }
    setSelectedAsset(asset);
    setShowPurchaseModal(true);
  };

  const handleViewDetails = (asset: any) => {
    setSelectedAsset(asset);
    setShowDetailModal(true);
  };

  const handlePurchaseFromDetail = () => {
    if (!user) {
      window.location.href = '/portfolio'
      return
    }
    setShowDetailModal(false);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = async (fraction: number) => {
    if (selectedAsset) {
      const success = await purchaseAsset(selectedAsset.id, fraction);
      if (success) {
        alert(`Successfully purchased ${(fraction * 100).toFixed(0)}% of ${selectedAsset.name}!`);
      } else {
        alert('Purchase failed: Insufficient ASRD balance');
      }
    }
  };

  const getAssetTypeIcon = (type: string) => {
    return type === 'horse' ? Crown : Gem;
  };

  const getAssetTypeColor = (type: string) => {
    return type === 'horse'
      ? 'from-emerald-glow to-sapphire-glow text-emerald-glow'
      : 'from-sapphire-glow to-amethyst-glow text-sapphire-glow';
  };

  return (
    <div className="min-h-screen immersive-bg">
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
            <h1 className="text-5xl md:text-7xl font-black text-3d mb-6">
              PREMIUM MARKETPLACE
            </h1>
            <p className="text-xl text-neutral-light max-w-3xl mx-auto">
              Discover and invest in <span className="text-emerald-glow font-semibold">elite thoroughbreds</span> and{' '}
              <span className="text-sapphire-glow font-semibold">luxury real estate</span> with fractional ownership
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="glass-3d p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-mid w-5 h-5" />
              <input
                type="text"
                placeholder="Search premium assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-luxury-dark/50 border border-emerald-glow/20 rounded-2xl text-white placeholder-neutral-mid focus:outline-none focus:ring-2 focus:ring-emerald-glow focus:border-transparent text-lg backdrop-blur-sm"
              />
            </div>

            {/* Asset Type Filter */}
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-neutral-mid" />
              <select
                value={selectedAssetType}
                onChange={(e) => handleAssetTypeChange(e.target.value)}
                className="bg-luxury-dark/50 border border-emerald-glow/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-glow focus:border-transparent text-lg backdrop-blur-sm"
              >
                {assetTypes.map(type => (
                  <option key={type} value={type} className="capitalize bg-luxury-dark">
                    {type === 'all' ? '🎯 All Assets' : type === 'horse' ? '🐎 Racehorses' : '🏠 Real Estate'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredAssets.map((asset, index) => {
            const AssetTypeIcon = getAssetTypeIcon(asset.type);
            const gradientClass = getAssetTypeColor(asset.type);
            const minInvestmentASRD = asset.price * 0.1;

            return (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-3d group cursor-pointer"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <motion.img
                    src={asset.image}
                    alt={asset.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-deep/80 via-transparent to-transparent" />

                  {/* Asset Type Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`bg-gradient-to-r ${gradientClass} rounded-2xl px-4 py-2 backdrop-blur-sm border border-white/20`}>
                      <AssetTypeIcon className="w-4 h-4 inline mr-2" />
                      <span className="text-sm font-bold">
                        {asset.type === 'horse' ? 'ELITE RACEHORSE' : 'LUXURY PROPERTY'}
                      </span>
                    </div>
                  </div>

                  {/* ROI Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-gold-glow to-ruby-glow rounded-2xl px-4 py-2 backdrop-blur-sm border border-white/20">
                      <span className="text-sm font-bold text-luxury-deep">{asset.roi}% ROI</span>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-16 right-4">
                    <button
                      onClick={() => handleViewDetails(asset)}
                      className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-300 hover:scale-110"
                    >
                      <Eye className="w-5 h-5 text-luxury-deep" />
                    </button>
                  </div>

                  {/* Quick Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-black text-white mb-2 text-glow">{asset.name}</h3>
                    <div className="flex items-center text-emerald-glow text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="font-semibold">{asset.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-neutral-light text-sm mb-6 leading-relaxed">{asset.description}</p>

                  {/* Investment Metrics */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-4 bg-luxury-dark/30 rounded-xl border border-white/10">
                      <span className="text-neutral-mid">Total Value</span>
                      <div className="text-right">
                        <div className="text-2xl font-black text-emerald-glow">{asset.price.toLocaleString()} ASRD</div>
                        <div className="text-neutral-mid text-sm">${(asset.price * 32).toLocaleString()} USD</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-luxury-dark/30 rounded-xl border border-white/10">
                        <div className="text-sapphire-glow text-lg font-black">100%</div>
                        <div className="text-neutral-mid text-xs">Available</div>
                      </div>
                      <div className="text-center p-3 bg-luxury-dark/30 rounded-xl border border-white/10">
                        <div className="text-amethyst-glow text-lg font-black">{asset.roi}%</div>
                        <div className="text-neutral-mid text-xs">Projected ROI</div>
                      </div>
                    </div>
                  </div>

                  {/* Minimum Investment */}
                  <div className="bg-gradient-to-r from-emerald-glow/20 to-sapphire-glow/20 border border-emerald-glow/30 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-emerald-glow font-bold">Minimum Investment:</span>
                      <div className="text-right">
                        <div className="font-black text-white">{minInvestmentASRD.toFixed(0)} ASRD</div>
                        <div className="text-sapphire-glow">${(minInvestmentASRD * 32).toLocaleString()} USD</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleViewDetails(asset)}
                      className="flex-1 px-4 py-3 border border-emerald-glow text-emerald-glow font-bold rounded-xl hover:bg-emerald-glow hover:text-luxury-deep transition-all duration-300 text-sm"
                    >
                      View Details
                    </button>
                    {user ? (
                      <button
                        onClick={() => handlePurchaseClick(asset)}
                        disabled={asrdBalance < minInvestmentASRD}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-glow to-sapphire-glow text-luxury-deep font-bold rounded-xl transition-all duration-300 flex items-center justify-center text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-glow/30"
                      >
                        <Coins className="w-4 h-4 mr-2" />
                        Invest Now
                      </button>
                    ) : (
                      <Link href="/portfolio">
                        <button
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-luxury-deep font-bold rounded-xl transition-all duration-300 flex items-center justify-center text-sm hover:shadow-lg hover:shadow-amber-500/30"
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Login to Purchase
                        </button>
                      </Link>
                    )}
                  </div>

                  {user && asrdBalance < minInvestmentASRD && (
                    <p className="text-ruby-glow text-xs text-center mt-3 font-semibold">
                      Need {minInvestmentASRD.toFixed(0)} ASRD minimum
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredAssets.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <TrendingUp className="w-24 h-24 text-neutral-mid mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-neutral-light mb-4">No Premium Assets Found</h3>
            <p className="text-neutral-mid text-lg">Try adjusting your search criteria or explore all asset categories</p>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onConfirm={confirmPurchase}
        asset={selectedAsset}
      />

      <AssetDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        asset={selectedAsset}
        onPurchaseClick={handlePurchaseFromDetail}
      />
    </div>
  );
}
