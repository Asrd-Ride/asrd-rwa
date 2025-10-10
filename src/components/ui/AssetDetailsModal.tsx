"use client";

import { motion } from 'framer-motion';
import React from 'react';
import { X, MapPin, Calendar, TrendingUp, DollarSign, Users, Building, Shield, Star, Target } from 'lucide-react';
import RealAssetImage from './RealAssetImage';

interface AssetDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: any;
  onInvest: (assetId: number) => void;
}

export default function AssetDetailsModal({ isOpen, onClose, asset, onInvest }: AssetDetailsModalProps) {
  if (!isOpen || !asset) return null;

  const features = [
    { icon: Shield, label: 'Fully Collateralized', color: 'text-emerald-400' },
    { icon: Target, label: 'Proven Track Record', color: 'text-amber-400' },
    { icon: Users, label: 'Professional Management', color: 'text-cyan-400' },
    { icon: Star, label: 'Premium Asset Class', color: 'text-purple-400' }
  ];

  const performanceMetrics = [
    { label: 'Historical ROI', value: asset.roi, color: 'from-amber-500 to-orange-500' },
    { label: 'Asset Value', value: `$${asset.value.toLocaleString()}`, color: 'from-cyan-500 to-blue-500' },
    { label: 'Minimum Investment', value: `$${asset.minInvestment}`, color: 'from-emerald-500 to-teal-500' },
    { label: 'Investment Timeline', value: asset.timeline, color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between p-6 border-b border-gray-700 sticky top-0 bg-slate-900 z-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4 sm:mb-0">
            <RealAssetImage type={asset.type} title={asset.title} size="lg" />
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-white mb-2 break-words">{asset.title}</h2>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{asset.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Building className="w-4 h-4 flex-shrink-0" />
                  <span>{asset.type}</span>
                </div>
                <div className="flex items-center space-x-1 text-amber-400">
                  <TrendingUp className="w-4 h-4 flex-shrink-0" />
                  <span className="font-semibold">{asset.roi} ROI</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors flex-shrink-0 self-start sm:self-auto"
          >
            <X className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Asset Description */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Asset Overview</h3>
              <p className="text-gray-300 leading-relaxed">{asset.description}</p>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 rounded-2xl border border-gray-700 hover:border-cyan-400/30 transition-all group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center mx-auto mb-3 transform group-hover:scale-110 transition-transform`}>
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-gray-400 text-sm">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700"
                  >
                    <feature.icon className={`w-5 h-5 ${feature.color} flex-shrink-0`} />
                    <span className="text-gray-300">{feature.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Investment Info */}
          <div className="space-y-6">
            {/* Investment Card */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Investment Details</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Asset Value</span>
                  <span className="text-white font-semibold">${asset.value.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Minimum Investment</span>
                  <span className="text-cyan-400 font-semibold">${asset.minInvestment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Projected ROI</span>
                  <span className="text-amber-400 font-semibold">{asset.roi}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Timeline</span>
                  <span className="text-white font-semibold">{asset.timeline}</span>
                </div>
              </div>

              <button
                onClick={() => onInvest(asset.id)}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
              >
                <DollarSign className="w-5 h-5" />
                <span>Invest in this Asset</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800/30 rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Asset Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                  <span className="text-gray-400">Funding Progress</span>
                  <span className="text-cyan-400 font-semibold">78%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                  <span className="text-gray-400">Investor Count</span>
                  <span className="text-emerald-400 font-semibold">247</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg">
                  <span className="text-gray-400">Asset Rating</span>
                  <div className="flex items-center space-x-1 text-amber-400">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">4.8/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
