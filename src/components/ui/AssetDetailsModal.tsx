// Enhanced AssetDetailsModal.tsx
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { 
  X, MapPin, Calendar, TrendingUp, DollarSign, Users, Building, Shield, Star, Target,
  BadgeCheck, Clock, Zap, BarChart3, Crown, Gem, Coins, Lock, Sparkles, Eye, ArrowRight,
  CheckCircle, Home, Trophy, Ship, Plane, Palette, Briefcase
} from 'lucide-react';
import RealAssetImage from './RealAssetImage';

interface AssetDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: any;
  onInvest: (assetId: number) => void;
  context?: 'marketplace' | 'dashboard' | 'featured';
}

export default function AssetDetailsModal({ 
  isOpen, 
  onClose, 
  asset, 
  onInvest,
  context = 'marketplace'
}: AssetDetailsModalProps) {
  if (!isOpen || !asset) return null;

  // Determine if this is an owned asset (dashboard context)
  const isOwnedAsset = context === 'dashboard';
  const canInvest = context !== 'dashboard' && onInvest;

  const getAssetIcon = (type: string) => {
    const icons = {
      'Real Estate': Home,
      'Thoroughbred': Trophy,
      'Marine Asset': Ship,
      'Aviation': Plane,
      'Fine Art': Palette,
      'Venture Capital': Briefcase,
      'Luxury Goods': Gem
    };
    return icons[type as keyof typeof icons] || Building;
  };

  const AssetIcon = getAssetIcon(asset.type);

  const features = [
    { icon: Shield, label: 'Blockchain Verified', color: 'emerald', description: 'Every transaction recorded on immutable blockchain' },
    { icon: Target, label: 'Proven Track Record', color: 'amber', description: 'Consistent returns with verified performance history' },
    { icon: Users, label: 'Professional Management', color: 'cyan', description: 'Managed by industry experts and asset specialists' },
    { icon: Star, label: 'Premium Asset Class', color: 'purple', description: 'Exclusive access to elite investment opportunities' },
    { icon: Lock, label: 'Fully Secured', color: 'blue', description: 'Bank-level security and comprehensive insurance' },
    { icon: Zap, label: 'Instant Liquidity', color: 'amber', description: 'Secondary market trading available' }
  ];

  const performanceMetrics = [
    { 
      label: 'Historical ROI', 
      value: asset.roi, 
      color: 'from-amber-500 to-orange-500',
      icon: TrendingUp,
      description: 'Average annual returns'
    },
    { 
      label: 'Asset Value', 
      value: `$${(asset.value / 1000000).toFixed(1)}M`, 
      color: 'from-cyan-500 to-blue-500',
      icon: DollarSign,
      description: 'Current market valuation'
    },
    { 
      label: 'Minimum Investment', 
      value: `$${asset.minInvestment}`, 
      color: 'from-emerald-500 to-teal-500',
      icon: Coins,
      description: 'Start with fractional ownership'
    },
    { 
      label: 'Investment Timeline', 
      value: asset.timeline, 
      color: 'from-purple-500 to-pink-500',
      icon: Calendar,
      description: 'Recommended holding period'
    }
  ];

  const assetStats = [
    { label: 'Funding Progress', value: `${asset.sharesSold || 78}%`, color: 'cyan', icon: BarChart3 },
    { label: 'Investor Count', value: asset.investorCount?.toString() || '247', color: 'emerald', icon: Users },
    { label: 'Time Remaining', value: asset.timeLeft || '5 days', color: 'amber', icon: Clock },
    { label: 'Asset Rating', value: '4.8/5', color: 'amber', icon: Star }
  ];

  const getContextBadge = () => {
    switch (context) {
      case 'dashboard':
        return { label: 'Owned Asset', color: 'emerald', icon: CheckCircle };
      case 'featured':
        return { label: 'Featured', color: 'amber', icon: Star };
      default:
        return { label: 'Available', color: 'cyan', icon: BadgeCheck };
    }
  };

  const contextBadge = getContextBadge();
  const ContextBadgeIcon = contextBadge.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-900/80 backdrop-blur-sm z-10 rounded-t-3xl">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4 sm:mb-0">
                <div className="relative">
                  <RealAssetImage type={asset.type} title={asset.title} size="xl" />
                  <div className="absolute -top-2 -right-2 bg-amber-500 rounded-full p-1">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`flex items-center space-x-2 bg-${contextBadge.color}-500/20 px-3 py-1 rounded-full border border-${contextBadge.color}-500/30`}>
                      <ContextBadgeIcon className={`w-4 h-4 text-${contextBadge.color}-400`} />
                      <span className={`text-${contextBadge.color}-400 text-sm font-medium`}>{contextBadge.label}</span>
                    </div>
                    {asset.badges && asset.badges.slice(0, 2).map((badge: any, index: number) => (
                      <div key={index} className={`flex items-center space-x-2 bg-${badge.color}-500/20 px-3 py-1 rounded-full border border-${badge.color}-500/30`}>
                        <span className={`text-${badge.color}-400 text-sm font-medium`}>{badge.label}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white mb-2 break-words">{asset.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-slate-300">
                    <div className="flex items-center space-x-2">
                      <AssetIcon className="w-5 h-5 text-cyan-400" />
                      <span className="font-medium">{asset.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-amber-400" />
                      <span>{asset.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-amber-400">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-semibold">{asset.roi} ROI</span>
                    </div>
                    {asset.performance && (
                      <div className="flex items-center space-x-2 text-emerald-400">
                        <BarChart3 className="w-5 h-5" />
                        <span className="font-medium">{asset.performance}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-600 transition-colors flex-shrink-0 self-start sm:self-auto"
              >
                <X className="w-5 h-5 text-slate-300" />
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Asset Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
                >
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Eye className="w-6 h-6 text-cyan-400" />
                    <span>Asset Overview</span>
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-lg">{asset.description}</p>
                </motion.div>

                {/* Performance Metrics */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-amber-400" />
                    <span>Performance Metrics</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {performanceMetrics.map((metric, index) => {
                      const MetricIcon = metric.icon;
                      return (
                        <motion.div
                          key={metric.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="text-center p-6 rounded-2xl border border-slate-700 hover:border-cyan-400/30 transition-all group bg-gradient-to-br from-slate-800/50 to-slate-900/50"
                        >
                          <div className={`w-16 h-16 bg-gradient-to-r ${metric.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform`}>
                            <MetricIcon className="w-8 h-8 text-white" />
                          </div>
                          <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
                          <div className="text-slate-300 font-medium mb-2">{metric.label}</div>
                          <div className="text-slate-400 text-sm">{metric.description}</div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <span>Key Features & Benefits</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((feature, index) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <motion.div
                          key={feature.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-start space-x-4 p-4 bg-slate-700/30 rounded-xl border border-slate-600 hover:border-slate-500 transition-all group"
                        >
                          <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                            <FeatureIcon className={`w-6 h-6 text-${feature.color}-400`} />
                          </div>
                          <div>
                            <h4 className={`text-${feature.color}-400 font-semibold text-lg mb-1`}>{feature.label}</h4>
                            <p className="text-slate-300 text-sm">{feature.description}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Investment Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <DollarSign className="w-6 h-6 text-cyan-400" />
                    <span>Investment Details</span>
                  </h3>

                  <div className="space-y-4 mb-6">
                    {[
                      { label: 'Asset Value', value: `$${(asset.value / 1000000).toFixed(1)}M`, color: 'white' },
                      { label: 'Minimum Investment', value: `$${asset.minInvestment}`, color: 'cyan-400' },
                      { label: 'Projected ROI', value: asset.roi, color: 'amber-400' },
                      { label: 'Investment Timeline', value: asset.timeline, color: 'white' },
                      { label: 'Asset Category', value: asset.type, color: 'cyan-400' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-cyan-500/20 last:border-b-0">
                        <span className="text-slate-300">{item.label}</span>
                        <span className={`text-${item.color} font-semibold`}>{item.value}</span>
                      </div>
                    ))}
                  </div>

                  {isOwnedAsset ? (
                    <div className="bg-emerald-500/20 rounded-xl p-4 border border-emerald-500/30 text-center">
                      <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <div className="text-emerald-400 font-semibold">Asset Owned</div>
                      <div className="text-emerald-300 text-sm">In your portfolio</div>
                    </div>
                  ) : canInvest ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onInvest(asset.id)}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                    >
                      <DollarSign className="w-5 h-5" />
                      <span>Invest in this Asset</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  ) : null}
                </motion.div>

                {/* Asset Statistics */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
                >
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                    <BarChart3 className="w-6 h-6 text-emerald-400" />
                    <span>Asset Statistics</span>
                  </h3>
                  <div className="space-y-4">
                    {assetStats.map((stat, index) => {
                      const StatIcon = stat.icon;
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl border border-slate-600">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 bg-${stat.color}-500/20 rounded-lg flex items-center justify-center`}>
                              <StatIcon className={`w-4 h-4 text-${stat.color}-400`} />
                            </div>
                            <span className="text-slate-300">{stat.label}</span>
                          </div>
                          <span className={`text-${stat.color}-400 font-semibold`}>{stat.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Security Badge */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700 text-center"
                >
                  <div className="flex items-center justify-center space-x-2 text-slate-400 text-sm mb-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Secured by Blockchain Technology</span>
                  </div>
                  <div className="text-slate-500 text-xs">
                    Fully insured • Regulated platform • Instant settlements
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}