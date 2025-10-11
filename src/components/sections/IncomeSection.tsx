"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Calendar, Download, Zap, Crown, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import { ownedAssets } from '@/data/mockData';

export default function IncomeSection() {
  const { user, claimRental, claimWinnings } = useAuth();
  const { showNotification } = useNotification();
  const [claimedRent, setClaimedRent] = useState(false);
  const [claimedWinnings, setClaimedWinnings] = useState(false);

  const totalMonthlyIncome = ownedAssets.reduce((sum, asset) => sum + asset.payoutAmount, 0);
  const totalASRDTokens = totalMonthlyIncome / 32;

  const handleClaimRent = () => {
    // Call the actual claim function from AuthContext
    claimRental(1); // Pass any asset ID
    
    // Simulate API call
    setTimeout(() => {
      setClaimedRent(true);
      
      // Show notification instead of alert
      showNotification({
        type: 'success',
        title: 'Rental Income Claimed!',
        message: 'Successfully claimed $4,250 rent! +132 ASRD tokens added to your balance.',
        duration: 6000
      });
    }, 1000);
  };

  const handleClaimWinnings = () => {
    // Call the actual claim function from AuthContext
    claimWinnings(1); // Pass any asset ID
    
    // Simulate API call
    setTimeout(() => {
      setClaimedWinnings(true);
      
      // Show notification instead of alert
      showNotification({
        type: 'success',
        title: 'Winnings Claimed!',
        message: 'Successfully claimed $8,500 winnings! +265 ASRD tokens added to your balance.',
        duration: 6000
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            INCOME <span className="text-cyan-400">DASHBOARD</span>
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
            Track your earnings, claim rewards, and monitor your investment performance
          </p>
        </motion.div>

        {/* Income Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          {/* Total Income Card */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Monthly Income</h3>
              <DollarSign className="w-8 h-8 text-cyan-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">${totalMonthlyIncome.toLocaleString()}</p>
            <p className="text-cyan-300">+{totalASRDTokens.toFixed(0)} ASRD tokens</p>
            <div className="flex items-center text-emerald-400 text-sm mt-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+15.2% from last month</span>
            </div>
          </div>

          {/* Available for Claim */}
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Ready to Claim</h3>
              <Zap className="w-8 h-8 text-amber-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">$12,750</p>
            <p className="text-amber-300">+398 ASRD tokens available</p>
            <div className="text-amber-400 text-sm mt-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              <span>Next claim: Today</span>
            </div>
          </div>

          {/* Portfolio Value */}
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Portfolio Value</h3>
              <Crown className="w-8 h-8 text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-white mb-2">${user?.portfolioValue?.toLocaleString() || '490,000'}</p>
            <p className="text-purple-300">All-time returns</p>
            <div className="flex items-center text-emerald-400 text-sm mt-2">
              <Target className="w-4 h-4 mr-1" />
              <span>+38.7% overall ROI</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Claimable Income */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-800/50 rounded-2xl border border-gray-700 p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Claimable Income</h2>

            {/* Rent Income */}
            <div className="bg-gray-800/30 rounded-xl p-4 mb-4 border border-gray-600">
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
                className={`w-full py-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 ${
                  claimedRent
                    ? 'bg-emerald-500 text-white'
                    : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>{claimedRent ? 'Claimed Successfully!' : 'Claim Rent Income'}</span>
              </button>
            </div>

            {/* Winnings Income */}
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-600">
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
                className={`w-full py-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 ${
                  claimedWinnings
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>{claimedWinnings ? 'Claimed Successfully!' : 'Claim Winnings'}</span>
              </button>
            </div>
          </motion.div>

          {/* Income History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-800/50 rounded-2xl border border-gray-700 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Income History</h2>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>

            <div className="space-y-4">
              {ownedAssets.map((asset) => (
                <div key={asset.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700">
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

            {/* Total Summary */}
            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
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
      </div>
    </div>
  );
}
