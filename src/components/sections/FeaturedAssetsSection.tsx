"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Zap, Shield } from 'lucide-react';
import EnhancedAssetCard from '../ui/EnhancedAssetCard';
import InvestmentModal from '../ui/InvestmentModal';
import AssetDetailsModal from '../ui/AssetDetailsModal';
import { mockAssets } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';

const FeaturedAssetsSection: React.FC = () => {
  const { user, login } = useAuth();
  const { showNotification } = useNotification();
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

    showNotification({
      type: 'premium',
      title: 'Investment Successful!',
      message: `Successfully invested $${amount.toLocaleString()} in ${selectedAsset?.title}!\n\n• ASRD Tokens: ${(amount / 32).toFixed(2)}\n• Asset: ${selectedAsset?.title}\n• ROI: ${selectedAsset?.roi}\n\nYour investment has been added to your portfolio.`,
      duration: 6000
    });

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
    <section className="section-3d">
      <div className="container-3d">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 gradient-3d-cyber rounded-2xl flex items-center justify-center animate-glow-3d">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3d-heading">
              FEATURED <span className="text-3d-glow">ASSETS</span>
            </h2>
          </div>
          <p className="text-3d-body max-w-2xl mx-auto">
            Exclusive premium assets with proven track records and institutional-grade returns
          </p>
        </motion.div>

        {/* 3D Asset Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 30, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300 }
              }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="transform-gpu"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <EnhancedAssetCard
                {...asset}
                onInvest={handleInvest}
                onViewDetails={handleViewDetails}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* 3D CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="card-3d-premium p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 gradient-3d-holographic rounded-2xl flex items-center justify-center animate-float-3d">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Ready to Expand Your Portfolio?
                </h3>
                <p className="text-gray-300">
                  Explore our full marketplace of premium real-world assets
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleExploreAssets}
                className="btn-3d flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                Explore All Assets
              </button>
              <button className="btn-3d-secondary flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                Learn About Security
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <InvestmentModal
        isOpen={isInvestmentModalOpen}
        onClose={() => setIsInvestmentModalOpen(false)}
        asset={selectedAsset}
        onInvest={handleConfirmInvest}
      />

      <AssetDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        asset={selectedAsset}
        onInvest={handleInvest}
      />
    </section>
  );
};

export default FeaturedAssetsSection;
