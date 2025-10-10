"use client";

import { motion } from "framer-motion";
import React, { useState } from 'react';
import { 
  DollarSign, TrendingUp, Building, Zap, 
  ArrowUpRight, Download, Eye, Coins, CalendarDays
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ownedAssets } from '@/data/mockData';
import RealAssetImage from '@/components/ui/RealAssetImage';
import AssetDetailsModal from '@/components/ui/AssetDetailsModal';
import { useNotification } from '@/contexts/NotificationContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function EnhancedDashboard() {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [claimedRent, setClaimedRent] = useState(false);
  const [claimedWinnings, setClaimedWinnings] = useState(false);

  // PRESERVE ALL INCOME LOGIC
  const totalMonthlyIncome = ownedAssets.reduce((sum, asset) => sum + asset.payoutAmount, 0);
  const totalASRDTokens = totalMonthlyIncome / 32;

  const handleClaimRent = () => {
    // Simulate API call - PRESERVED LOGIC
    setTimeout(() => {
      setClaimedRent(true);
      showNotification({
        type: 'premium',
        title: 'Rent Income Claimed!',
        message: '$4,250 rent successfully claimed! +132 ASRD tokens added to your balance.',
        duration: 5000
      });
    }, 1000);
  };

  const handleClaimWinnings = () => {
    // Simulate API call - PRESERVED LOGIC
    setTimeout(() => {
      setClaimedWinnings(true);
      showNotification({
        type: 'premium', 
        title: 'Investment Winnings Claimed!',
        message: '$8,500 winnings successfully claimed! +265 ASRD tokens added to your balance.',
        duration: 5000
      });
    }, 1000);
  };

  const handleViewDetails = (asset: any) => {
    setSelectedAsset(asset);
    setIsDetailsModalOpen(true);
  };

  const handleInvest = (assetId: number) => {
    // This would open investment modal - PRESERVED LOGIC
    console.log('Invest in asset:', assetId);
  };

  // Dashboard stats - COMBINED FROM BOTH COMPONENTS
  const stats = [
    {
      label: "Portfolio Value",
      value: `$${user?.portfolioValue?.toLocaleString() || '490,000'}`,
      change: "+12.8%",
      icon: DollarSign,
      gradient: "gradient-3d-cyber",
      trend: "up"
    },
    {
      label: "Monthly Income",
      value: `$${totalMonthlyIncome.toLocaleString()}`,
      change: "+15.2%",
      icon: TrendingUp,
      gradient: "gradient-3d-cosmic",
      trend: "up"
    },
    {
      label: "Active Assets",
      value: ownedAssets.length.toString(),
      change: "+2",
      icon: Building,
      gradient: "gradient-3d-matrix",
      trend: "up"
    },
    {
      label: "ASRD Tokens",
      value: user?.asrdBalance?.toLocaleString() || "5,000",
      change: "+265",
      icon: Zap,
      gradient: "gradient-3d-holographic",
      trend: "up"
    }
  ];

  return (
    <div className="min-h-screen bg-3d-cosmic">
      <div className="container-3d py-8">
        {/* Header Section - 3D STYLING */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-3d-hero mb-6">
            PORTFOLIO <span className="text-3d-glow">DASHBOARD</span>
          </h1>
          <p className="text-3d-body max-w-2xl mx-auto leading-relaxed">
            Track your premium real-world asset investments and income with comprehensive 3D analytics
          </p>
        </motion.div>

        {/* Stats Grid - 3D ENHANCED */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="stats-card-3d group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.gradient} transition-transform duration-300 group-hover:scale-110`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4 transform rotate-90" />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-16">
          {/* Income Section - 3D PRESERVED */}
          <div className="xl:col-span-2 space-y-8">
            {/* Claimable Income Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card-3d p-6"
            >
              <h2 className="text-3d-subheading mb-6">Claimable Income</h2>

              {/* Rent Income - 3D PRESERVED LOGIC */}
              <div className="glass-3d rounded-xl p-4 mb-4 border-3d-glow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">Rental Income</h3>
                    <p className="text-gray-400 text-sm">From real estate assets</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-cyan-400">$4,250</p>
                    <p className="text-cyan-300 text-sm">+132 ASRD</p>
                  </div>
                </div>
                <button
                  onClick={handleClaimRent}
                  disabled={claimedRent}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    claimedRent
                      ? 'btn-3d bg-gradient-3d-matrix'
                      : 'btn-3d'
                  }`}
                >
                  <Coins className="w-4 h-4" />
                  <span>{claimedRent ? 'Claimed Successfully!' : 'Claim Rent Income'}</span>
                </button>
              </div>

              {/* Winnings Income - 3D PRESERVED LOGIC */}
              <div className="glass-3d rounded-xl p-4 border-3d-glow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">Investment Winnings</h3>
                    <p className="text-gray-400 text-sm">From thoroughbred and venture assets</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-amber-400">$8,500</p>
                    <p className="text-amber-300 text-sm">+265 ASRD</p>
                  </div>
                </div>
                <button
                  onClick={handleClaimWinnings}
                  disabled={claimedWinnings}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    claimedWinnings
                      ? 'btn-3d bg-gradient-3d-matrix'
                      : 'btn-3d bg-gradient-3d-cosmic'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  <span>{claimedWinnings ? 'Claimed Successfully!' : 'Claim Winnings'}</span>
                </button>
              </div>
            </motion.div>

            {/* Income History - 3D PRESERVED */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="card-3d p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3d-subheading">Income History</h2>
                <button className="btn-3d-secondary flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>

              <div className="space-y-4">
                {ownedAssets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between p-3 glass-3d rounded-lg border-3d">
                    <div>
                      <h3 className="font-semibold text-white text-sm">{asset.title}</h3>
                      <p className="text-gray-400 text-xs">Next payout: {asset.nextPayout}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 font-semibold">${asset.payoutAmount.toLocaleString()}</p>
                      <p className="text-cyan-300 text-xs">+{(asset.payoutAmount / 32).toFixed(0)} ASRD</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Summary - 3D PRESERVED LOGIC */}
              <div className="mt-6 p-4 bg-gradient-3d-matrix rounded-xl border-3d-glow">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-300 font-semibold">Total Monthly</span>
                  <span className="text-white font-bold text-lg">${totalMonthlyIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-cyan-300 text-sm">ASRD Tokens</span>
                  <span className="text-cyan-400 font-semibold">+{totalASRDTokens.toFixed(0)}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Your Assets Section - 3D ENHANCED */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="card-3d p-6"
          >
            <h2 className="text-3d-subheading mb-6">Your Assets</h2>
            <div className="space-y-6">
              {ownedAssets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="asset-card-3d p-4 cursor-pointer"
                  onClick={() => handleViewDetails(asset)}
                >
                  <div className="flex items-start space-x-4">
                    {/* REAL ASSET IMAGE - 3D ENHANCED */}
                    <RealAssetImage type={asset.type} title={asset.title} size="md" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-white text-lg mb-1">{asset.title}</h3>
                          <p className="text-gray-400 text-sm">{asset.location}</p>
                        </div>
                        <span className="text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-1 rounded-lg text-sm">
                          {asset.roi}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div>
                          <p className="text-gray-500">Investment</p>
                          <p className="text-white font-semibold">${asset.investment.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Shares</p>
                          <p className="text-cyan-400 font-semibold">{asset.shares}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Value: ${asset.value.toLocaleString()}</span>
                        <button 
                          className="btn-3d-secondary text-xs px-3 py-1 flex items-center space-x-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(asset);
                          }}
                        >
                          <Eye className="w-3 h-3" />
                          <span>Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Asset Details Modal */}
      <AssetDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        asset={selectedAsset}
        onInvest={handleInvest}
      />
    </div>
  );
}
