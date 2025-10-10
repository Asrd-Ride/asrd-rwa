"use client";

import React, { useState } from 'react';

interface TokenPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number, tokenAmount: number) => void;
  tokenPrice: number;
}

export default function TokenPurchaseModal({ isOpen, onClose, onConfirm, tokenPrice }: TokenPurchaseModalProps) {
  const [usdAmount, setUsdAmount] = useState(1000);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const tokenAmount = usdAmount / tokenPrice;

  const handleConfirm = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    onConfirm(usdAmount, tokenAmount);
    setIsProcessing(false);
    onClose();
  };

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-ultimate rounded-3xl border border-white/20 p-8 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Purchase ASRD Tokens</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Token Price */}
        <div className="bg-cyan-500/10 rounded-xl p-4 border border-cyan-400/20 mb-6">
          <div className="text-center">
            <div className="text-cyan-300 font-bold text-lg">1 ASRD = ${tokenPrice}</div>
            <div className="text-cyan-200 text-sm">Current Market Price</div>
          </div>
        </div>

        {/* Preset Amounts */}
        <div className="mb-6">
          <label className="block text-cyan-100 text-sm font-medium mb-3">
            Quick Select
          </label>
          <div className="grid grid-cols-3 gap-2">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setUsdAmount(amount)}
                className={`py-2 rounded-lg font-medium transition-all duration-300 ${
                  usdAmount === amount
                    ? 'bg-cyan-500 text-white'
                    : 'bg-white/5 text-cyan-100 hover:bg-white/10'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="mb-6">
          <label className="block text-cyan-100 text-sm font-medium mb-3">
            Custom Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">$</span>
            <input
              type="number"
              value={usdAmount}
              onChange={(e) => setUsdAmount(Number(e.target.value))}
              min={100}
              max={50000}
              className="w-full bg-white/5 border border-white/20 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Token Calculation */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-cyan-100">You pay</span>
            <span className="text-white font-semibold">${usdAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-cyan-100">You receive</span>
            <span className="text-cyan-300 font-semibold">{tokenAmount.toFixed(2)} ASRD</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-white/20 text-white py-3 px-4 rounded-xl font-semibold hover:border-cyan-400/50 hover:bg-cyan-400/10 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isProcessing || usdAmount < 100}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Purchase Tokens'}
          </button>
        </div>
      </div>
    </div>
  );
}
