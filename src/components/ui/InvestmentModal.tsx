"use client";

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { X, DollarSign, TrendingUp, Calendar, MapPin, Zap, Building, Shield, Check } from 'lucide-react';
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      onClose();
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
          <>
            {/* Asset Header */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
              <RealAssetImage type={asset.type} title={asset.title} size="lg" />
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-white mb-2 break-words">{asset.title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{asset.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-400">
                    <TrendingUp className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold">{asset.roi} ROI</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-cyan-500/10 rounded-2xl p-4 border border-cyan-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-cyan-300 font-semibold text-sm">Investment Amount</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white break-words">${investmentAmount.toLocaleString()}</div>
              </div>
              <div className="bg-purple-500/10 rounded-2xl p-4 border border-purple-500/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-purple-300 font-semibold text-sm">ASRD Tokens</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white break-words">{asrdTokens.toFixed(2)}</div>
              </div>
            </div>

            {/* Amount Selection */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-3 font-semibold">Select Investment Amount</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setInvestmentAmount(amount)}
                    className={`p-3 rounded-xl border transition-all text-sm sm:text-base ${
                      investmentAmount === amount
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                        : 'bg-gray-800/50 border-gray-600 text-gray-300 hover:border-cyan-400/50'
                    }`}
                  >
                    ${amount.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  min={asset.minInvestment}
                  max={maxInvestment}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 text-sm sm:text-base"
                  placeholder="Enter custom amount"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-400 mt-2 gap-1">
                <span>Min: ${asset.minInvestment.toLocaleString()}</span>
                <span>Max: ${maxInvestment.toLocaleString()}</span>
              </div>
            </div>

            {/* Investment Summary */}
            <div className="bg-gray-800/30 rounded-2xl p-4 mb-6 border border-gray-600">
              <h4 className="font-semibold text-white mb-3 text-sm sm:text-base">Investment Summary</h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Asset Value:</span>
                  <span className="text-white">${asset.value.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Projected ROI:</span>
                  <span className="text-amber-400">{asset.roi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Timeline:</span>
                  <span className="text-white">{asset.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">ASRD Rate:</span>
                  <span className="text-cyan-400">$32 = 1 ASRD</span>
                </div>
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <div className="text-center py-6 sm:py-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4 sm:mb-6"></div>
            <h3 className="text-xl font-bold text-white mb-3 sm:mb-4">Processing Investment</h3>
            <p className="text-gray-300 text-sm sm:text-base">Completing your investment in {asset.title}</p>
            <div className="mt-4 space-y-2 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Securing transaction</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Building className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Allocating asset shares</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Minting ASRD tokens</span>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center py-6 sm:py-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 sm:mb-4">Investment Successful!</h3>
            <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">You've successfully invested in {asset.title}</p>
            <div className="bg-emerald-500/10 rounded-2xl p-4 border border-emerald-500/20">
              <div className="text-emerald-400 font-semibold mb-2 text-sm sm:text-base">Investment Details</div>
              <div className="space-y-1 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span>${investmentAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>ASRD Tokens:</span>
                  <span>{asrdTokens.toFixed(2)} ASRD</span>
                </div>
                <div className="flex justify-between">
                  <span>Asset:</span>
                  <span className="truncate">{asset.title}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 sticky top-0 bg-slate-900 z-10">
          <h2 className="text-xl font-bold text-white">
            {step === 1 && 'Invest in Asset'}
            {step === 2 && 'Processing Investment'}
            {step === 3 && 'Investment Complete'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
          >
            <X className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        <div className="p-6">
          {getStepContent()}

          {/* Action Buttons */}
          {step === 1 && (
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleInvest}
                disabled={isProcessing || investmentAmount < asset.minInvestment}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <DollarSign className="w-4 h-4" />
                <span>Confirm Investment</span>
              </button>
            </div>
          )}

          {step === 3 && (
            <button
              onClick={onClose}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl transition-colors mt-6"
            >
              Done
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
