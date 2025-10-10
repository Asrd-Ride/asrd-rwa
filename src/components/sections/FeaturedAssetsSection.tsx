"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Zap, Shield, ArrowRight } from 'lucide-react';
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

  const features = [
    { icon: Shield, text: "Institutional Security", description: "Bank-grade asset protection" },
    { icon: Zap, text: "Instant Liquidity", description: "24/7 trading availability" },
    { icon: TrendingUp, text: "Proven Returns", description: "38.7% average ROI" },
    { icon: Star, text: "Elite Assets", description: "$50M+ asset classes" }
  ];

  return (
    <section className="fluid-section">
      <div className="fluid-container">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 fluid-scroll-item mobile:text-center">
          <h2 className="fluid-heading">
            Featured <span className="text-fluid-gold">Opportunities</span>
          </h2>
          <p className="fluid-body max-w-2xl mx-auto mobile:px-4">
            Hand-picked premium assets with exceptional returns and institutional-grade management
          </p>
        </div>

        {/* Features Grid */}
        <div className="fluid-grid fluid-grid-cols-2 lg:fluid-grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {features.map((feature, index) => (
            <div 
              key={feature.text} 
              className="fluid-card text-center fluid-scroll-item mobile:p-3"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-fluid-gold mx-auto mb-2 md:mb-3" />
              <h3 className="text-white font-semibold text-sm md:text-base mb-1">{feature.text}</h3>
              <p className="fluid-caption text-xs">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Featured Assets Grid */}
        <div className="fluid-grid fluid-grid-cols-1 md:fluid-grid-cols-2 lg:fluid-grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {featuredAssets.map((asset, index) => (
            <div 
              key={asset.id} 
              className="fluid-scroll-item"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <EnhancedAssetCard
                {...asset}
                onInvest={handleInvest}
                onViewDetails={handleViewDetails}
                layout="grid"
              />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center fluid-scroll-item">
          <button
            onClick={handleExploreAssets}
            className="btn-fluid text-lg px-6 md:px-8 py-3 md:py-4 flex items-center justify-center mx-auto space-x-2 mobile:w-full md:w-auto"
          >
            <span>Explore All Investment Opportunities</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="fluid-caption mt-3 md:mt-4 mobile:px-4">
            Join 2,470+ investors already building wealth with AssetRide
          </p>
        </div>
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
