"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/contexts/AppContext';
import { useWallet } from '@/contexts/WalletContext';
import { useAuth } from '@/contexts/AuthContext';
import { Filter, Search, TrendingUp, Clock, Gem, Crown, Coins, MapPin, Eye, LogIn, SlidersHorizontal } from 'lucide-react';
import PurchaseModal from '@/components/ui/PurchaseModal';
import AssetDetailModal from '@/components/ui/AssetDetailModal';
import AdvancedFilters from '@/components/ui/AdvancedFilters';
import Link from 'next/link';

interface FilterState {
  priceRange: [number, number]
  roiRange: [number, number]
  locations: string[]
  assetTypes: string[]
  sortBy: 'name' | 'price' | 'roi' | 'recent'
  sortOrder: 'asc' | 'desc'
}

export default function MarketplacePage() {
  const { assets, selectedAssetType, setSelectedAssetType, ownedAssets, purchaseAsset } = useApp();
  const { asrdBalance } = useWallet();
  const { user } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // FIXED: Updated price range to accommodate all assets (up to 200,000 ASRD)
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    priceRange: [0, 200000],  // ✅ Fixed: Now includes all assets up to $6.4M USD
    roiRange: [5, 25],
    locations: [],
    assetTypes: [],
    sortBy: 'price',
    sortOrder: 'desc'
  });

  // Get user's purchased assets from ownedAssets
  const purchasedAssets = ownedAssets || [];

  const availableAssets = assets.filter(asset =>
    !purchasedAssets.some(owned => owned?.id === asset.id)
  );

  // Get unique locations for filters
  const availableLocations = useMemo(() => {
    return [...new Set(assets.map(asset => asset.location))];
  }, [assets]);

  // Apply advanced filtering
  const filteredAssets = useMemo(() => {
    let filtered = availableAssets.filter(asset => {
      const matchesType = selectedAssetType === 'all' || asset.type === selectedAssetType;
      const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           asset.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = asset.price >= advancedFilters.priceRange[0] &&
                          asset.price <= advancedFilters.priceRange[1];
      const matchesROI = asset.roi >= advancedFilters.roiRange[0] &&
                        asset.roi <= advancedFilters.roiRange[1];
      const matchesLocation = advancedFilters.locations.length === 0 ||
                             advancedFilters.locations.includes(asset.location);
      const matchesAssetType = advancedFilters.assetTypes.length === 0 ||
                              advancedFilters.assetTypes.includes(asset.type);

      return matchesType && matchesSearch && matchesPrice && matchesROI && matchesLocation && matchesAssetType;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (advancedFilters.sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'roi':
          aValue = a.roi;
          bValue = b.roi;
          break;
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'recent':
          aValue = a.id; // Using ID as proxy for recentness
          bValue = b.id;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string') {
        return advancedFilters.sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return advancedFilters.sortOrder === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      }
    });

    return filtered;
  }, [availableAssets, selectedAssetType, searchQuery, advancedFilters]);

  const assetTypes = ['all', 'horse', 'real-estate'] as const;

  const handleAssetTypeChange = (value: string) => {
    setSelectedAssetType(value as 'all' | 'horse' | 'real-estate');
  };

  const handlePurchaseClick = (asset: any) => {
    if (!user) {
      window.location.href = '/dashboard'
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
      window.location.href = '/dashboard'
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

  const handleApplyAdvancedFilters = (filters: FilterState) => {
    setAdvancedFilters(filters);
  };

  const getAssetTypeIcon = (type: string) => {
    return type === 'horse' ? Crown : Gem;
  };

  const getAssetTypeColor = (type: string) => {
    return type === 'horse'
      ? 'from-emerald-glow to-sapphire-glow text-emerald-glow'
      : 'from-sapphire-glow to-amethyst-glow text-sapphire-glow';
  };

  const activeFilterCount =
    (advancedFilters.priceRange[0] > 0 || advancedFilters.priceRange[1] < 200000 ? 1 : 0) +
    (advancedFilters.roiRange[0] > 5 || advancedFilters.roiRange[1] < 25 ? 1 : 0) +
    advancedFilters.locations.length +
    advancedFilters.assetTypes.length;

  return (
    <div className="min-h-screen immersive-bg">

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

            {/* Advanced Filters Button */}
            <button
              onClick={() => setShowAdvancedFilters(true)}
              className="flex items-center space-x-2 px-6 py-4 bg-gradient-to-r from-sapphire-glow to-amethyst-glow text-luxury-deep font-semibold rounded-2xl hover:shadow-lg hover:shadow-sapphire-glow/30 transition-all duration-300 relative"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Advanced Filters</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-ruby-glow text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 pt-6 border-t border-white/10"
            >
              <div className="flex flex-wrap gap-2">
                {advancedFilters.priceRange[0] > 0 || advancedFilters.priceRange[1] < 200000 ? (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm rounded-full border border-emerald-500/30">
                    Price: {advancedFilters.priceRange[0]}-{advancedFilters.priceRange[1]} ASRD
                  </span>
                ) : null}
                {advancedFilters.roiRange[0] > 5 || advancedFilters.roiRange[1] < 25 ? (
                  <span className="px-3 py-1 bg-sapphire-500/20 text-sapphire-300 text-sm rounded-full border border-sapphire-500/30">
                    ROI: {advancedFilters.roiRange[0]}-{advancedFilters.roiRange[1]}%
                  </span>
                ) : null}
                {advancedFilters.locations.map(location => (
                  <span key={location} className="px-3 py-1 bg-amethyst-500/20 text-amethyst-300 text-sm rounded-full border border-amethyst-500/30">
                    📍 {location}
                  </span>
                ))}
                {advancedFilters.assetTypes.map(type => (
                  <span key={type} className="px-3 py-1 bg-gold-glow/20 text-yellow-300 text-sm rounded-full border border-yellow-500/30">
                    {type === 'horse' ? '🐎 Racehorses' : '🏠 Real Estate'}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <p className="text-neutral-light">
            Showing <span className="text-emerald-glow font-semibold">{filteredAssets.length}</span> of{' '}
            <span className="text-sapphire-glow font-semibold">{availableAssets.length}</span> available assets
            {activeFilterCount > 0 && ' with applied filters'}
          </p>
        </motion.div>
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
                      <Link href="/dashboard">
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
            <h3 className="text-2xl font-bold text-neutral-light mb-4">No Assets Match Your Criteria</h3>
            <p className="text-neutral-mid text-lg mb-6">Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setAdvancedFilters({
                  priceRange: [0, 200000],
                  roiRange: [5, 25],
                  locations: [],
                  assetTypes: [],
                  sortBy: 'price',
                  sortOrder: 'desc'
                });
              }}
              className="btn-3d px-8 py-4"
            >
              Reset All Filters
            </button>
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

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        onApplyFilters={handleApplyAdvancedFilters}
        availableLocations={availableLocations}
      />
    </div>
  );
}
