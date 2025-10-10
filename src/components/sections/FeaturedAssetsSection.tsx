"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Zap, Shield } from 'lucide-react';
import EnhancedAssetCard from '../ui/EnhancedAssetCard';
import InvestmentModal from '../ui/InvestmentModal';
import AssetDetailsModal from '../ui/AssetDetailsModal';
import { mockAssets } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const FeaturedAssetsSection: React.FC = () => {
  const { user, login } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Transform mockAssets to match EnhancedAssetCard interface
  const featuredAssets = mockAssets.slice(0, 3).map(asset => ({
    ...asset,
    category: asset.type,
    currency: "USD",
    image: "",
    sharesAvailable: 100,
    sharesSold: Math.floor(Math.random() * 100)
  }));

  const handleInvest = (assetId: number) => {
    if (!user) {
      login('/home');
      return;
    }

    const asset = featuredAssets.find(a => a.id === assetId);
    if (asset) {
      setSelectedAsset(asset);
      setIsInvestmentModalOpen(true);
    }
  };

  const handleConfirmInvest = async (assetId: number, amount: number) => {
    // Simulate investment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    alert(`🎉 Successfully invested $${amount.toLocaleString()} in ${selectedAsset?.title}!\n\n• ASRD Tokens: ${(amount / 32).toFixed(2)}\n• Asset: ${selectedAsset?.title}\n• ROI: ${selectedAsset?.roi}\n\nYour investment has been added to your portfolio.`);

    setIsInvestmentModalOpen(false);
    setSelectedAsset(null);
  };

  const handleViewDetails = (assetId: number) => {
    const asset = featuredAssets.find(a => a.id === assetId);
    if (asset) {
      setSelectedAsset(asset);
      setIsDetailsModalOpen(true);
    }
  };

  const handleExploreAssets = () => {
    // Navigate to marketplace
    window.location.href = '/marketplace';
  };

  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              FEATURED <span className="text-cyan-400">ASSETS</span>
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Hand-picked premium assets with exceptional returns and proven track records
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-gray-700">
            <TrendingUp className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Premium Returns</h3>
            <p className="text-gray-300">Average 38.7% ROI across all assets</p>
          </div>
          <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-gray-700">
            <Zap className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Instant Access</h3>
            <p className="text-gray-300">Start investing with just $100 minimum</p>
          </div>
          <div className="text-center p-6 bg-slate-800/50 rounded-2xl border border-gray-700">
            <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Fully Secured</h3>
            <p className="text-gray-300">All assets are insured and collateralized</p>
          </div>
        </motion.div>

        {/* Featured Assets Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <EnhancedAssetCard
                {...asset}
                onInvest={handleInvest}
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Your Investment Journey?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of investors already earning premium returns from real world assets
            </p>
            <button 
              onClick={handleExploreAssets}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Explore All Assets
            </button>
          </div>
        </motion.div>
      </div>

      {/* Investment Modal */}
      <InvestmentModal
        isOpen={isInvestmentModalOpen}
        onClose={() => {
          setIsInvestmentModalOpen(false);
          setSelectedAsset(null);
        }}
        asset={selectedAsset}
        onInvest={handleConfirmInvest}
      />

      {/* Asset Details Modal */}
      <AssetDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedAsset(null);
        }}
        asset={selectedAsset}
        onInvest={handleInvest}
      />
    </section>
  );
};

export default FeaturedAssetsSection;
