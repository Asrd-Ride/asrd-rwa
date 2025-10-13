// src/components/ui/AssetDetailsModal.tsx - ENHANCED WITH REAL IMAGES & INVESTMENT
"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, TrendingUp, Users, Shield, Star, Building, Zap, Cpu, Eye, ArrowRight, DollarSign } from 'lucide-react';
import { useUniversal } from '@/lib/universal';
import { Asset } from '@/types';
import RealAssetImage from '@/components/ui/RealAssetImage';
import { useAuth } from '@/contexts/AuthContext';

interface AssetDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  onInvest?: (asset: Asset) => void;
}

const AssetDetailsModal: React.FC<AssetDetailsModalProps> = ({
  isOpen,
  onClose,
  asset,
  onInvest
}) => {
  const { deviceInfo, universalAttributes } = useUniversal();
  const { user, login } = useAuth();

  if (!asset) return null;

  const features = [
    { icon: MapPin, label: 'Location', value: `${asset.location.city}, ${asset.location.country}` },
    { icon: Calendar, label: 'Term', value: `${asset.term} months` },
    { icon: TrendingUp, label: 'Projected ROI', value: `${asset.projectedROI}%` },
    { icon: Users, label: 'Investors', value: asset.investorCount.toLocaleString() },
    { icon: Shield, label: 'Risk Level', value: asset.riskLevel },
    { icon: Star, label: 'Rating', value: asset.rating.toString() },
  ];

  // Financial details if available
  const financialDetails = asset.financials ? [
    { label: 'Current Valuation', value: `$${(asset.financials.currentValuation / 1000000).toFixed(1)}M` },
    { label: 'Total Invested', value: `$${(asset.financials.totalInvested / 1000000).toFixed(1)}M` },
    { label: 'Total Returns', value: `$${(asset.financials.totalReturns / 1000000).toFixed(1)}M` },
    { label: 'Annualized Return', value: `${asset.financials.annualizedReturn}%` },
  ] : [];

  // 3D Experience Features
  const threeDFeatures = asset._3dConfig ? [
    { icon: Zap, label: '3D Particles', value: `${asset._3dConfig.particles} particles` },
    { icon: Cpu, label: 'Animations', value: asset._3dConfig.animations },
    { icon: Eye, label: 'Shadows', value: asset._3dConfig.shadows ? 'Enabled' : 'Disabled' },
  ] : [];

  const handleInvestClick = () => {
    if (!user) {
      login('/marketplace');
      return;
    }
    if (onInvest) {
      onInvest(asset);
      onClose();
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'high': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          {...universalAttributes}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div className="flex items-center space-x-4">
                <RealAssetImage
                  asset={asset}
                  size="md"
                  className="rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-bold text-white">{asset.name}</h2>
                  <p className="text-slate-400 text-sm">{asset.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getRiskColor(asset.riskLevel)}`}>
                      {asset.riskLevel} Risk
                    </span>
                    <span className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-full">
                      {asset.type.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-6">
                {/* Asset Image Gallery */}
                <div className="mb-6">
                  <RealAssetImage
                    asset={asset}
                    size="xl"
                    className="w-full h-64 rounded-xl"
                  />
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-3">Asset Overview</h3>
                  <p className="text-slate-300 leading-relaxed">{asset.description}</p>
                </div>

                {/* Key Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-700/30 rounded-lg p-4 text-center hover:bg-slate-700/50 transition-colors"
                    >
                      <feature.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                      <div className="text-sm text-slate-400 mb-1">{feature.label}</div>
                      <div className="text-white font-semibold">{feature.value}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Financial Details */}
                {financialDetails.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Financial Performance</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {financialDetails.map((detail, index) => (
                        <div key={detail.label} className="bg-slate-700/30 rounded-lg p-3 text-center">
                          <div className="text-sm text-slate-400 mb-1">{detail.label}</div>
                          <div className="text-white font-semibold">{detail.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Asset Features */}
                {asset.features && asset.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {asset.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-slate-300">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3D Features */}
                {threeDFeatures.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-white mb-4">3D Experience</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {threeDFeatures.map((feature, index) => (
                        <div key={feature.label} className="bg-slate-700/30 rounded-lg p-3 text-center">
                          <feature.icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                          <div className="text-xs text-slate-400 mb-1">{feature.label}</div>
                          <div className="text-white text-sm font-semibold">{feature.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Investment CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 text-center"
                >
                  <h3 className="text-xl font-bold text-white mb-2">Ready to Invest?</h3>
                  <p className="text-slate-300 mb-4">
                    Minimum investment: <span className="text-cyan-400 font-semibold">${asset.minimumInvestment.toLocaleString()}</span>
                  </p>
                  <button
                    onClick={handleInvestClick}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto transform hover:scale-105"
                  >
                    <DollarSign className="w-5 h-5" />
                    <span>Invest in {asset.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AssetDetailsModal;