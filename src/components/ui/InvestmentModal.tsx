// Enhanced InvestmentModal.tsx
"use client";

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { 
  X, DollarSign, TrendingUp, MapPin, Zap, Building, Shield, Check, 
  BadgeCheck, Users, Clock, Star, ArrowRight, Target, BarChart3, 
  Percent, Calendar, Crown, Gem, Coins, Lock, Sparkles
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import RealAssetImage from './RealAssetImage';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: any;
  onInvest: (assetId: number, amount: number) => void;
}

export default function InvestmentModal({ isOpen, onClose, asset, onInvest }: InvestmentModalProps) {
  const { user } = useAuth();
  const [investmentAmount, setInvestmentAmount] = useState(asset?.minInvestment || 100);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  if (!isOpen || !asset) return null;

  const asrdTokens = investmentAmount / 32;
  const userPortfolioValue = user?.portfolioValue || 0;
  const maxInvestment = Math.min(userPortfolioValue * 0.1 || 10000, asset.value * 0.05);
  const ownershipPercentage = (investmentAmount / asset.value) * 100;

  const predefinedAmounts = [100, 500, 1000, 5000, 10000].filter(amount =>
    amount >= asset.minInvestment && amount <= maxInvestment
  );

  const handleInvest = async () => {
    if (investmentAmount < asset.minInvestment) {
      alert(`Minimum investment is $${asset.minInvestment}`);
      return;
    }

    if (investmentAmount > maxInvestment) {
      alert(`Maximum investment for this asset is $${maxInvestment.toLocaleString()}`);
      return;
    }

    setIsProcessing(true);
    setStep(2);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onInvest(asset.id, investmentAmount);
      setStep(3);
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error('Investment failed:', error);
    } finally {
      setIsProcessing(false);
      setStep(1);
    }
  };

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Enhanced Asset Header */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-2">
              <div className="relative">
                <RealAssetImage type={asset.type} title={asset.title} size="lg" />
                <div className="absolute -top-2 -right-2 bg-amber-500 rounded-full p-1">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <BadgeCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-medium">Verified Asset</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 break-words">{asset.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <div className="flex items-center space-x-1 text-slate-300">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{asset.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-400">
                    <TrendingUp className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold">{asset.roi} ROI</span>
                  </div>
                  {asset.performance && (
                    <div className="flex items-center space-x-1 text-emerald-400">
                      <BarChart3 className="w-4 h-4" />
                      <span className="font-medium">{asset.performance}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Investment Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-5 border border-cyan-500/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-cyan-300 font-semibold text-sm">Investment Amount</div>
                    <div className="text-2xl font-bold text-white">${investmentAmount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="text-slate-400 text-sm">
                  <div className="flex justify-between">
                    <span>Ownership:</span>
                    <span className="text-cyan-400">{ownershipPercentage.toFixed(4)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-5 border border-amber-500/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-amber-300 font-semibold text-sm">ASRD Tokens</div>
                    <div className="text-2xl font-bold text-white">{asrdTokens.toFixed(2)}</div>
                  </div>
                </div>
                <div className="text-slate-400 text-sm">
                  <div className="flex justify-between">
                    <span>Rate:</span>
                    <span className="text-amber-400">$32 = 1 ASRD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Amount Selection */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Coins className="w-5 h-5 text-amber-400" />
                <span>Select Investment Amount</span>
              </h4>
              
              {/* Quick Amounts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {predefinedAmounts.map((amount) => (
                  <motion.button
                    key={amount}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setInvestmentAmount(amount)}
                    className={`p-4 rounded-xl border transition-all font-medium ${
                      investmentAmount === amount
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-500 shadow-lg'
                        : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-cyan-400/50 hover:bg-slate-700'
                    }`}
                  >
                    ${amount.toLocaleString()}
                  </motion.button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="space-y-3">
                <label className="text-slate-300 font-medium">Custom Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    min={asset.minInvestment}
                    max={maxInvestment}
                    className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-lg font-medium"
                    placeholder="Enter amount"
                  />
                </div>
                <div className="flex justify-between text-sm text-slate-400">
                  <span>Min: ${asset.minInvestment.toLocaleString()}</span>
                  <span>Max: ${maxInvestment.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Enhanced Investment Summary */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/20">
              <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-emerald-400" />
                <span>Investment Summary</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Asset Value</span>
                    <span className="text-white font-semibold">${(asset.value / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Projected ROI</span>
                    <span className="text-amber-400 font-semibold">{asset.roi}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Timeline</span>
                    <span className="text-white font-semibold">{asset.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Asset Type</span>
                    <span className="text-cyan-400 font-semibold">{asset.type}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700">
              <div className="flex items-center justify-center space-x-6 text-slate-400 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Blockchain Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>Fully Insured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Instant Settlement</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold text-white mb-4">Processing Your Investment</h3>
            <p className="text-slate-300 mb-6">Securing your ownership in {asset.title}</p>
            
            <div className="grid grid-cols-1 gap-4 max-w-xs mx-auto">
              {[
                { icon: Shield, text: 'Verifying transaction', color: 'emerald' },
                { icon: Building, text: 'Allocating asset shares', color: 'cyan' },
                { icon: Zap, text: 'Minting ASRD tokens', color: 'amber' },
                { icon: Check, text: 'Finalizing ownership', color: 'emerald' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex items-center space-x-3 text-slate-400"
                >
                  <div className={`w-8 h-8 bg-${item.color}-500/20 rounded-lg flex items-center justify-center`}>
                    <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                  </div>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-3">Investment Successful!</h3>
            <p className="text-slate-300 mb-6">Welcome to the elite club of {asset.title} owners</p>
            
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-6 border border-emerald-500/20 mb-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">Investment Amount</span>
                  <span className="text-white font-semibold">${investmentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">ASRD Tokens</span>
                  <span className="text-cyan-400 font-semibold">{asrdTokens.toFixed(2)} ASRD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Ownership</span>
                  <span className="text-emerald-400 font-semibold">{ownershipPercentage.toFixed(4)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Asset</span>
                  <span className="text-white font-semibold truncate">{asset.title}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 text-emerald-400 text-sm">
              <Gem className="w-4 h-4" />
              <span>Your digital ownership certificate has been minted</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700 sticky top-0 bg-slate-900/80 backdrop-blur-sm z-10 rounded-t-3xl">
              <h2 className="text-xl font-bold text-white">
                {step === 1 && 'Invest in Elite Asset'}
                {step === 2 && 'Securing Investment'}
                {step === 3 && 'Ownership Confirmed'}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-600 transition-colors"
              >
                <X className="w-4 h-4 text-slate-300" />
              </motion.button>
            </div>

            <div className="p-6">
              {getStepContent()}

              {/* Enhanced Action Buttons */}
              {step === 1 && (
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl transition-all duration-300 font-semibold"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleInvest}
                    disabled={isProcessing || investmentAmount < asset.minInvestment}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-4 rounded-xl transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <DollarSign className="w-5 h-5" />
                    <span>Confirm Investment</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}

              {step === 3 && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 rounded-xl transition-all duration-300 font-semibold mt-6 shadow-lg hover:shadow-xl"
                >
                  View My Portfolio
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}