"use client";

import { useState } from 'react';
import { 
  ArrowUpRight, Download, Eye, Coins, CalendarDays,
  BadgeCheck, Users, Clock, Star, Shield, Target
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ownedAssets, platformStats } from '@/data/mockData';
import RealAssetImage from '@/components/ui/RealAssetImage';
import AssetDetailsModal from '@/components/ui/AssetDetailsModal';
import { useNotification } from '@/contexts/NotificationContext';
import { motion } from 'framer-motion';
import { OwnedAsset } from '@/types';

export default function FluidDashboard() {
  const { user, claimRental, claimWinnings } = useAuth();
  const { showNotification } = useNotification();
  const [selectedAsset, setSelectedAsset] = useState<OwnedAsset | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [claimedRent, setClaimedRent] = useState(false);
  const [claimedWinnings, setClaimedWinnings] = useState(false);

  // Fixed calculations with proper type handling
  const totalMonthlyIncome = ownedAssets.reduce((sum, asset) => sum + (asset.payoutAmount || 0), 0);
  const totalInvested = ownedAssets.reduce((sum, asset) => sum + asset.investedAmount, 0);
  const totalCurrentValue = ownedAssets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalReturns = totalCurrentValue - totalInvested;
  const overallROI = totalInvested > 0 ? (totalReturns / totalInvested) * 100 : 0;

  const handleClaimRental = () => {
    const assetId = ownedAssets.length > 0 ? ownedAssets[0].id : 1;
    claimRental(assetId);
    setClaimedRent(true);
    showNotification({
      type: "success",
      title: "Rental Income Claimed",
      message: "Rental income claimed successfully! $8,500 has been added to your wallet."
    });
  };

  const handleClaimWinnings = () => {
    const assetId = ownedAssets.length > 0 ? ownedAssets[0].id : 1;
    claimWinnings(assetId);
    setClaimedWinnings(true);
    showNotification({
      type: "success",
      title: "Race Winnings Claimed",
      message: "Race winnings claimed! $12,200 prize money deposited."
    });
  };

  const openAssetDetails = (asset: OwnedAsset) => {
    setSelectedAsset(asset);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 p-6"
      >
        {/* Total Portfolio Value */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Portfolio Value</p>
              <h3 className="text-2xl font-bold text-white">${(totalCurrentValue / 1000).toFixed(0)}K</h3>
              <p className="text-green-400 text-sm">+${(totalReturns / 1000).toFixed(1)}K returns</p>
            </div>
            <div className="p-3 bg-cyan-500/10 rounded-xl">
              <Coins className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </motion.div>

        {/* Monthly Income */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Monthly Income</p>
              <h3 className="text-2xl font-bold text-white">${totalMonthlyIncome.toLocaleString()}</h3>
              <p className="text-green-400 text-sm">Next: Dec 1, 2025</p>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <Download className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </motion.div>

        {/* Total ROI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total ROI</p>
              <h3 className="text-2xl font-bold text-white">{overallROI.toFixed(1)}%</h3>
              <p className="text-green-400 text-sm">+${(totalReturns / 1000).toFixed(1)}K profit</p>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Target className="w-6 h-6 text-amber-400" />
            </div>
          </div>
        </motion.div>

        {/* Active Investments */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active Investments</p>
              <h3 className="text-2xl font-bold text-white">{ownedAssets.length}</h3>
              <p className="text-slate-400 text-sm">Diversified portfolio</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <BadgeCheck className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 px-6 pb-6">
        {/* Left Column - Portfolio Assets */}
        <div className="xl:col-span-2 space-y-6">
          {/* Portfolio Assets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Your Portfolio Assets</h2>
              <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
                View All
              </button>
            </div>

            <div className="space-y-4">
              {ownedAssets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 p-4 hover:border-slate-600 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <RealAssetImage
                        asset={asset.asset || asset}
                        className="w-12 h-12 rounded-lg flex-shrink-0"
                        size="sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">
                          {asset.name || asset.asset?.name}
                        </h3>
                        <p className="text-slate-400 text-sm truncate">
                          {asset.location || asset.asset?.location?.city}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => openAssetDetails(asset)}
                      className="p-2 hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0 ml-3"
                    >
                      <Eye className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Invested</p>
                      <p className="text-white font-semibold">${asset.investedAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Current Value</p>
                      <p className="text-white font-semibold">${asset.currentValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">ROI</p>
                      <p className="text-emerald-400 font-semibold">{asset.roi}%</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Monthly</p>
                      <p className="text-cyan-400 font-semibold">${asset.payoutAmount?.toLocaleString()}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleClaimRental}
                disabled={claimedRent}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  claimedRent
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                    : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-semibold">Claim Rental Income</p>
                    <p className="text-sm opacity-80">$8,500 available</p>
                  </div>
                </div>
              </button>

              <button
                onClick={handleClaimWinnings}
                disabled={claimedWinnings}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  claimedWinnings
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Coins className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-semibold">Claim Race Winnings</p>
                    <p className="text-sm opacity-80">$12,200 prize money</p>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Platform Stats & Activity */}
        <div className="space-y-6">
          {/* Platform Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Platform Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300">Total Investors</span>
                </div>
                <span className="text-white font-semibold">{platformStats.totalUsers.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Coins className="w-5 h-5 text-amber-400" />
                  <span className="text-slate-300">Total Investments</span>
                </div>
                <span className="text-white font-semibold">${(platformStats.totalInvestments / 1000000).toFixed(0)}M</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-300">Average ROI</span>
                </div>
                <span className="text-emerald-400 font-semibold">{platformStats.averageROI}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-cyan-400" />
                  <span className="text-slate-300">Platform Growth</span>
                </div>
                <span className="text-cyan-400 font-semibold">+{platformStats.platformGrowth}%</span>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Download className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-white text-sm">Rental income received</p>
                  <p className="text-slate-400 text-xs">2 hours ago</p>
                </div>
                <div className="ml-auto text-green-400 font-semibold">+$8,500</div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <BadgeCheck className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-sm">Investment verified</p>
                  <p className="text-slate-400 text-xs">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Target className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-white text-sm">ROI target exceeded</p>
                  <p className="text-slate-400 text-xs">3 days ago</p>
                </div>
                <div className="ml-auto text-amber-400 font-semibold">+2.4%</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Asset Details Modal */}
      <AssetDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        asset={selectedAsset?.asset || null}
      />
    </div>
  );
}