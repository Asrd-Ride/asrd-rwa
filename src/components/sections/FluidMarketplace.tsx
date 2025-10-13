'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import EnhancedAssetCard from '@/components/ui/EnhancedAssetCard';
import InvestmentModal from '@/components/ui/InvestmentModal';
import AssetDetailsModal from '@/components/ui/AssetDetailsModal';
import { mockAssets } from '@/data/mockData';
import { Asset } from '@/types';
import { useUniversalDevice } from '@/hooks/useUniversalDevice';

export default function FluidMarketplace() {
  const { user, login, invest } = useAuth();
  const { showNotification } = useNotification();
  const { deviceInfo } = useUniversalDevice();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState<'roi' | 'value' | 'minInvestment' | 'popularity' | 'risk'>('roi');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Enhanced asset list
  const enhancedAssets: Asset[] = mockAssets.map((asset, index) => ({
    ...asset,
    badges: asset.badges?.slice(0, 2 + (index % 3)) || [],
  }));

  const assetTypes = ['all', ...Array.from(new Set(enhancedAssets.map(a => a.type)))];

  // Filter + sort
  const filteredAssets = useMemo(() => {
    return enhancedAssets
      .filter(asset => {
        const matchesSearch = [
          asset.name,
          asset.title,
          asset.description,
          asset.location?.city,
          asset.location?.country,
        ]
          .filter(Boolean)
          .some(field => field!.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesType = selectedType === 'all' || asset.type === selectedType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'roi':
            return (b.projectedROI || 0) - (a.projectedROI || 0);
          case 'value':
            return (b.totalFunding || 0) - (a.totalFunding || 0);
          case 'minInvestment':
            return (a.minimumInvestment || 0) - (b.minimumInvestment || 0);
          case 'popularity':
            return (b.investorCount || 0) - (a.investorCount || 0);
          case 'risk':
            const riskOrder = { Low: 1, Medium: 2, High: 3 };
            return (riskOrder[a.riskLevel as keyof typeof riskOrder] || 0) - (riskOrder[b.riskLevel as keyof typeof riskOrder] || 0);
        }
      });
  }, [searchQuery, selectedType, sortBy]);

  // Investment
  const handleInvest = (asset: Asset) => {
    if (!user) {
      login('/marketplace');
      showNotification({ title: 'Login required', message: 'Please login to invest', type: 'warning' });
      return;
    }
    setSelectedAsset(asset);
    setIsInvestmentModalOpen(true);
  };

  const handleInvestmentConfirm = (amount: number) => {
    if (!selectedAsset || !user) return;
    const success = invest(amount, selectedAsset.name, Number(selectedAsset.id));
    showNotification({
      title: success ? 'Investment Successful!' : 'Investment Failed',
      message: success
        ? `You invested $${amount.toLocaleString()} in ${selectedAsset.title}`
        : 'Insufficient ASRD balance',
      type: success ? 'success' : 'error',
    });
    setIsInvestmentModalOpen(false);
    setSelectedAsset(null);
  };

  const handleViewDetails = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl font-bold text-white mb-4">
            Premium <span className="text-cyan-400">Marketplace</span>
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Discover exclusive real-world assets in Australia, UK, and Dubai with 22-46% returns and blockchain verification
          </motion.p>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div className="flex flex-col lg:flex-row gap-4 mb-8" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search assets, locations, or features..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-600 rounded-xl bg-slate-800/50 backdrop-blur-sm text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-slate-600 rounded-xl bg-slate-800/50 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              {assetTypes.map(type => (
                <option key={type} value={type}>{type === 'all' ? 'All Types' : type}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-4 py-3 border border-slate-600 rounded-xl bg-slate-800/50 backdrop-blur-sm text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="roi">Highest ROI</option>
              <option value="value">Highest Value</option>
              <option value="minInvestment">Lowest Minimum</option>
              <option value="popularity">Most Popular</option>
              <option value="risk">Lowest Risk</option>
            </select>

            {/* View Toggle */}
            <div className="flex border border-slate-600 rounded-xl overflow-hidden bg-slate-800/50">
              <button className={`p-3 ${viewMode === 'grid' ? 'bg-cyan-500 text-white' : 'text-slate-400'}`} onClick={() => setViewMode('grid')}><Grid className="w-5 h-5" /></button>
              <button className={`p-3 ${viewMode === 'list' ? 'bg-cyan-500 text-white' : 'text-slate-400'}`} onClick={() => setViewMode('list')}><List className="w-5 h-5" /></button>
            </div>
          </div>
        </motion.div>

        {/* Asset List */}
        <motion.div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          <AnimatePresence>
            {filteredAssets.map((asset, i) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 hover:scale-105 transition-all duration-300"
              >
                <EnhancedAssetCard asset={asset} onViewDetails={handleViewDetails} onInvest={handleInvest} viewMode={viewMode} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modals */}
      <InvestmentModal
        isOpen={isInvestmentModalOpen}
        onClose={() => setIsInvestmentModalOpen(false)}
        asset={selectedAsset}
        onInvest={handleInvestmentConfirm}
        userBalance={user?.asrdBalance || 0}
      />
      <AssetDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        asset={selectedAsset}
      />
    </div>
  );
}
