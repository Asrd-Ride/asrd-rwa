"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Star, TrendingUp, MapPin, Calendar, Shield, Users, ArrowRight, Eye, Target } from 'lucide-react';
import { mockAssets } from '@/data/mockData';
import { useUniversal } from '@/lib/universal';
import InvestmentModal from '@/components/ui/InvestmentModal';
import AssetDetailsModal from '@/components/ui/AssetDetailsModal';
import { Asset } from '@/types';
import RealAssetImage from '@/components/ui/RealAssetImage';
import { useAuth } from '@/contexts/AuthContext';
import { useSafeNotification } from '@/contexts/NotificationContext';

export default function FeaturedAssetsSection() {
  const { universalAttributes, deviceInfo } = useUniversal();
  const { user, login, invest } = useAuth();
  const { showNotification } = useSafeNotification();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const featuredAssets = mockAssets.slice(0, 3);

  const handleInvest = (asset: Asset) => {
    if (!user) {
      login('/home');
      showNotification({ 
        title: 'Connect Your Wallet', 
        message: 'Please connect your wallet to start investing', 
        type: 'warning',
        duration: 4000
      });
      return;
    }
    
    setSelectedAsset(asset);
    setIsInvestmentModalOpen(true);
  };

  const handleInvestmentConfirm = (amount: number) => {
    if (!selectedAsset || !user) return;
    
    const success = invest(amount, selectedAsset.name, Number(selectedAsset.id));
    
    if (success) {
      showNotification({
        title: 'Investment Successful! 🎉',
        message: `You've invested $${amount.toLocaleString()} in ${selectedAsset.title}. Welcome to the investor community!`,
        type: 'success',
        duration: 6000
      });
    } else {
      showNotification({
        title: 'Insufficient Balance',
        message: 'You need more ASRD tokens to complete this investment. Visit the treasury to purchase more.',
        type: 'error',
        duration: 5000
      });
    }
    
    setIsInvestmentModalOpen(false);
    setSelectedAsset(null);
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
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">Investment</span> Opportunities
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Hand-picked premium assets with verified track records and exceptional returns. Start investing from just $100.
          </p>
        </motion.div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500/30 transition-all duration-300 group"
            >
              {/* Asset Image */}
              <div className="relative h-48 overflow-hidden">
                <RealAssetImage
                  asset={asset}
                  size="lg"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                
                {/* Risk Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(asset.riskLevel)}`}>
                    {asset.riskLevel} Risk
                  </span>
                </div>

                {/* ROI Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    {asset.projectedROI}% ROI
                  </span>
                </div>
              </div>

              {/* Asset Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{asset.location.city}</span>
                  </div>
                  <div className="text-slate-400 text-sm">
                    {asset.term} months
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {asset.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {asset.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">{asset.projectedROI}%</div>
                    <div className="text-xs text-slate-400">ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{asset.term}</div>
                    <div className="text-xs text-slate-400">Months</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-400">${asset.minimumInvestment}</div>
                    <div className="text-xs text-slate-400">Min. Invest</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Funding Progress</span>
                    <span className="font-semibold text-cyan-400">{asset.fundingProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${asset.fundingProgress}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => handleInvest(asset)}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Target className="w-4 h-4" />
                    Invest from ${asset.minimumInvestment}
                  </motion.button>
                  
                  <motion.button
                    onClick={() => handleViewDetails(asset)}
                    className="flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-all duration-300 border border-slate-600 hover:border-cyan-500/50 rounded-xl px-4 py-3"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="font-semibold">Learn More</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.button
            className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              View All Investment Opportunities
              <ArrowRight className="w-5 h-5" />
            </span>
          </motion.button>
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
        onInvest={handleInvest}
      />
    </section>
  );
}
