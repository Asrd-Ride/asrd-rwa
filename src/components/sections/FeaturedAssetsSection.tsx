"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Star, TrendingUp, MapPin, Calendar, Shield, Users, ArrowRight } from 'lucide-react';
import { mockAssets } from '@/data/mockData';
import { useUniversal } from '@/lib/universal';
import InvestmentModal from '@/components/ui/InvestmentModal';
import AssetDetailsModal from '@/components/ui/AssetDetailsModal';
import { Asset } from '@/types';
import RealAssetImage from '@/components/ui/RealAssetImage';
import { useAuth } from '@/contexts/AuthContext';

export default function FeaturedAssetsSection() {
  const { universalAttributes, deviceInfo } = useUniversal();
  const { user } = useAuth();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const featuredAssets = mockAssets.slice(0, 3);

  const handleInvest = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsInvestmentModalOpen(true);
  };

  const handleViewDetails = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDetailsModalOpen(true);
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
    <section 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800"
      {...universalAttributes}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-cyan-400">Investment</span> Opportunities
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Curated selection of premium real estate and thoroughbred assets in Australia, UK, and Dubai with proven 22-46% returns.
          </p>
        </motion.div>

        {/* Featured Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:transform hover:scale-105 glass-morphism depth-3"
            >
              {/* Asset Image */}
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <RealAssetImage
                  asset={asset}
                  size="xl"
                  className="w-full h-full"
                />
                
                {/* Badges */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {asset.badges?.map((badge, badgeIndex) => (
                    <span
                      key={badgeIndex}
                      className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${
                        badge.color === 'emerald' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                        badge.color === 'amber' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                        badge.color === 'blue' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                        badge.color === 'rose' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                        'bg-purple-500/20 text-purple-300 border-purple-500/30'
                      }`}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>

                {/* Risk Level */}
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm border ${getRiskColor(asset.riskLevel)}`}>
                    {asset.riskLevel} Risk
                  </span>
                </div>
              </div>

              {/* Asset Content */}
              <div className="p-6">
                {/* Location & Type */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{asset.location.city}, {asset.location.country}</span>
                  </div>
                  <span className="text-sm font-semibold text-cyan-600 bg-cyan-50 px-2 py-1 rounded">
                    {asset.type.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                  {asset.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {asset.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-600">{asset.projectedROI}%</div>
                    <div className="text-xs text-slate-500">Projected ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{asset.term} mos</div>
                    <div className="text-xs text-slate-500">Term</div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 mb-6 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{asset.investorCount} investors</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    <span>{asset.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Funding Progress</span>
                    <span>{asset.fundingProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${asset.fundingProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleInvest(asset)}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Invest Now
                  </button>
                  <button
                    onClick={() => handleViewDetails(asset)}
                    className="flex items-center justify-center gap-2 text-slate-700 hover:text-slate-900 transition-colors duration-300 border border-slate-300 hover:border-slate-400 rounded-xl px-4 py-3"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
            View All Investment Opportunities
          </button>
        </motion.div>
      </div>

      {/* Modals */}
      <InvestmentModal
        isOpen={isInvestmentModalOpen}
        onClose={() => setIsInvestmentModalOpen(false)}
        asset={selectedAsset}
        onInvest={(amount) => {
          console.log(`Investing $${amount} in ${selectedAsset?.name}`);
          setIsInvestmentModalOpen(false);
        }}
        userBalance={user?.asrdBalance || 0}
      />

      <AssetDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        asset={selectedAsset}
      />
    </section>
  );
}