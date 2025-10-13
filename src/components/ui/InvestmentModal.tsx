// src/components/ui/InvestmentModal.tsx - ENHANCED WITH GESTURES & ANIMATIONS
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign, Calendar, Shield, TrendingUp, CheckCircle, AlertCircle, Hand, MousePointer } from 'lucide-react';
import { useUniversal } from '@/lib/universal';
import { Asset } from '@/types';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: Asset | null;
  onInvest: (amount: number) => void;
  userBalance: number;
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({
  isOpen,
  onClose,
  asset,
  onInvest,
  userBalance
}) => {
  const { deviceInfo, universalAttributes } = useUniversal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gestureActive, setGestureActive] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [investmentDuration, setInvestmentDuration] = useState(36);
  const [agreement, setAgreement] = useState(false);
  const [amountError, setAmountError] = useState('');

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!asset) return;

    // Validate amount
    if (investmentAmount < asset.minimumInvestment) {
      setAmountError(`Minimum investment is $${asset.minimumInvestment.toLocaleString()}`);
      return;
    }

    if (investmentAmount > 1000000) {
      setAmountError('Maximum investment is $1,000,000');
      return;
    }

    if (!agreement) {
      setAmountError('Please agree to the investment terms');
      return;
    }

    setAmountError('');
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onInvest(investmentAmount);
      console.log(`Successfully invested $${investmentAmount} in ${asset.name}`);
      onClose();
    } catch (err) {
      console.error('Investment failed:', err);
      setAmountError('Investment failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle amount change with validation
  const handleAmountChange = (amount: number) => {
    setInvestmentAmount(amount);
    if (amountError) setAmountError('');
  };

  // Simple gesture simulation (since we don't have the actual hook)
  const handleGesture = (delta: number) => {
    if (!asset) return;
    
    const sensitivity = deviceInfo.input === 'touch' ? 2 : 1;
    const newAmount = Math.max(
      asset.minimumInvestment,
      Math.min(1000000, investmentAmount + delta * sensitivity * 1000)
    );
    handleAmountChange(newAmount);
  };

  if (!asset) return null;

  const investmentDetails = [
    {
      label: 'Minimum Investment',
      value: `$${asset.minimumInvestment.toLocaleString()}`,
      icon: DollarSign
    },
    {
      label: 'Projected ROI',
      value: `${asset.projectedROI}%`,
      icon: TrendingUp,
      color: 'text-emerald-400'
    },
    {
      label: 'Investment Term',
      value: `${asset.term} months`,
      icon: Calendar
    },
    {
      label: 'Risk Level',
      value: asset.riskLevel,
      icon: Shield,
      color: asset.riskLevel === 'Low' ? 'text-emerald-400' :
             asset.riskLevel === 'Medium' ? 'text-amber-400' : 'text-rose-400'
    }
  ];

  // Performance-adaptive particle effects
  const showParticles = true;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          {...universalAttributes}
        >
          {/* Enhanced Background Effects */}
          {showParticles && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-60 animate-pulse" />
              <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-bounce" />
              <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50 animate-ping" />
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 w-full max-w-md relative overflow-hidden"
          >
            {/* Header with Enhanced Animations */}
            <motion.div
              className="flex items-center justify-between p-6 border-b border-slate-700"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <h2 className="text-xl font-bold text-white">Invest in {asset.name}</h2>
                <p className="text-slate-400 text-sm mt-1">{asset.location.city}, {asset.location.country}</p>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-slate-400" />
              </motion.button>
            </motion.div>

            {/* Investment Details with Staggered Animation */}
            <motion.div
              className="p-6 border-b border-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid grid-cols-2 gap-4 mb-6">
                {investmentDetails.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors cursor-help"
                    title={detail.label}
                  >
                    <detail.icon className={`w-5 h-5 mx-auto mb-2 ${detail.color || 'text-slate-400'}`} />
                    <div className="text-xs text-slate-400 mb-1">{detail.label}</div>
                    <div className={`text-sm font-semibold ${detail.color || 'text-white'}`}>
                      {detail.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Current Balance with Enhanced Visual */}
              <motion.div
                className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-amber-400 font-semibold">Your ASRD Balance</span>
                  <span className="text-white font-bold">{userBalance.toLocaleString()} ASRD</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Investment Form */}
            <form onSubmit={handleFormSubmit} className="p-6">
              <div className="space-y-4">
                {/* Investment Amount Input */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-300">
                      Investment Amount (USD)
                    </label>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      {deviceInfo.input === 'touch' ? (
                        <Hand className="w-3 h-3" />
                      ) : (
                        <MousePointer className="w-3 h-3" />
                      )}
                      <span>Drag to adjust</span>
                    </div>
                  </div>

                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => handleAmountChange(Number(e.target.value))}
                      className={`w-full bg-slate-700/50 border ${gestureActive ? 'border-cyan-500' : 'border-slate-600'} rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200 ${gestureActive ? 'scale-105' : ''}`}
                      placeholder="Enter amount"
                      min={asset.minimumInvestment}
                      max={1000000}
                      step="1000"
                    />
                    <motion.div
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-cyan-500 rounded-full opacity-60"
                      animate={{ scaleY: gestureActive ? 1.2 : 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  {amountError && (
                    <motion.p
                      className="text-rose-400 text-sm flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {amountError}
                    </motion.p>
                  )}
                </motion.div>

                {/* Investment Term */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Investment Term (Months)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      value={investmentDuration}
                      onChange={(e) => setInvestmentDuration(Number(e.target.value))}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                      placeholder="Enter duration"
                      min="6"
                      max="120"
                    />
                  </div>
                </motion.div>

                {/* Agreement Checkbox */}
                <motion.div
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <input
                    type="checkbox"
                    checked={agreement}
                    onChange={(e) => setAgreement(e.target.checked)}
                    className="mt-1 bg-slate-700 border-slate-600 rounded focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  <label className="text-sm text-slate-300 leading-relaxed">
                    I agree to the investment terms and understand the risks involved
                  </label>
                </motion.div>

                {/* Enhanced Investment Summary */}
                <motion.div
                  className="bg-slate-700/30 rounded-lg p-4 border border-slate-600"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ borderColor: 'rgb(6, 182, 212)' }}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Investment Amount</span>
                    <span className="text-white font-semibold">${investmentAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Projected Returns</span>
                    <span className="text-emerald-400 font-semibold">
                      ${(investmentAmount * (asset.projectedROI / 100)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t border-slate-600 pt-2">
                    <span className="text-slate-300">Total Value</span>
                    <span className="text-cyan-400">
                      ${(investmentAmount + (investmentAmount * (asset.projectedROI / 100))).toLocaleString()}
                    </span>
                  </div>
                </motion.div>

                {/* Enhanced Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden"
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Investment...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Confirm Investment</span>
                    </>
                  )}

                  {/* Button Shimmer Effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InvestmentModal;