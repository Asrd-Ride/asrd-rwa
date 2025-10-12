"use client";

import { motion } from "framer-motion";
import React from "react";
import RealAssetImage from "./RealAssetImage";
import { Eye, TrendingUp, Users, DollarSign, Clock, Building, MapPin, Crown } from "lucide-react";
import { Asset } from '@/types/asset';

interface Props {
  asset: Asset;
  onViewDetails: (asset: Asset) => void;
  onInvest?: (asset: Asset) => void;
  enhanced?: boolean;
}

export default function EnhancedAssetCard({ asset, onViewDetails, onInvest, enhanced = true }: Props) {
  const calculateProgress = () => {
    if (asset.sharesAvailable && asset.sharesSold) {
      return (asset.sharesSold / asset.sharesAvailable) * 100;
    }
    return 75; // Default progress
  };

  const progress = calculateProgress();

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700 p-6 hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] cursor-pointer group"
      onClick={() => onViewDetails(asset)}
    >
      {/* Header with Image and Badges */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <RealAssetImage type={asset.type} title={asset.title} size="lg" />
          {enhanced && (
            <div className="absolute -top-2 -right-2 bg-amber-500 rounded-full p-1">
              <Crown className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg mb-1 group-hover:text-cyan-400 transition-colors line-clamp-1">
                {asset.title}
              </h3>
              <p className="text-slate-300 text-sm mb-2">{asset.location}</p>
            </div>
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold border border-amber-500/30">
              {asset.roi}
            </span>
          </div>

          {/* Badges */}
          {asset.badges && asset.badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {asset.badges.slice(0, 2).map((badge, i) => (
                <span
                  key={i}
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${
                    badge.color === "emerald"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : badge.color === "amber"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : badge.color === "rose"
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                      : "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                  }`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Investment Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Funding Progress</span>
          <span className="text-cyan-400">{progress}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Enhanced Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-slate-400 text-sm">Asset Value</p>
          <p className="text-white font-semibold">${(asset.value / 1000000).toFixed(1)}M</p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Minimum</p>
          <p className="text-cyan-400 font-semibold">${asset.minInvestment}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-slate-400 text-sm">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{asset.investorCount} investors</span>
          </div>
          {asset.performance && (
            <div className="flex items-center space-x-1 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <span>{asset.performance}</span>
            </div>
          )}
        </div>
        <button
          className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm group-hover:bg-cyan-600"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(asset);
          }}
        >
          <Eye className="w-4 h-4" />
          <span>View Details</span>
        </button>
      </div>
    </motion.div>
  );
}