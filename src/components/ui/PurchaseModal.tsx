"use client";

import React, { useState } from 'react';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  asset: {
    title: string;
    minInvestment: number;
    value: number;
  };
}

export default function PurchaseModal({ isOpen, onClose, onConfirm, asset }: PurchaseModalProps) {
  const [investmentAmount, setInvestmentAmount] = useState(asset.minInvestment);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    onConfirm(investmentAmount);
    setIsProcessing(false);
    onClose();
  };

  const percentage = (investmentAmount / asset.value) * 100;
  const maxInvestment = Math.min(asset.value * 0.1, 1000000); // 10% or 1M max

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass-ultimate rounded-3xl border border-white/20 p-8 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Invest in {asset.title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Investment Details */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-cyan-100">Minimum Investment</span>
            <span className="text-white font-semibold">${asset.minInvestment.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-cyan-100">Asset Value</span>
            <span className="text-white font-semibold">${(asset.value / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-cyan-100">Your Share</span>
            <span className="text-cyan-300 font-semibold">{percentage.toFixed(2)}%</span>
          </div>
        </div>

        {/* Investment Amount Input */}
        <div className="mb-6">
          <label className="block text-cyan-100 text-sm font-medium mb-3">
            Investment Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white">$</span>
            <input
              type="number"
              value={investmentAmount}
              onChange={(e) => setInvestmentAmount(Number(e.target.value))}
              min={asset.minInvestment}
              max={maxInvestment}
              className="w-full bg-white/5 border border-white/20 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            />
          </div>
          <div className="flex justify-between text-xs text-blue-300 mt-2">
            <span>Min: ${asset.minInvestment.toLocaleString()}</span>
            <span>Max: ${maxInvestment.toLocaleString()}</span>
          </div>
        </div>

        {/* Amount Slider */}
        <div className="mb-6">
          <input
            type="range"
            min={asset.minInvestment}
            max={maxInvestment}
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-blue-300 mt-2">
            <span>${asset.minInvestment.toLocaleString()}</span>
            <span>${maxInvestment.toLocaleString()}</span>
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
            disabled={isProcessing || investmentAmount < asset.minInvestment || investmentAmount > maxInvestment}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Confirm Investment'}
          </button>
        </div>

        {/* Processing Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <div className="text-cyan-300 text-sm">Processing transaction...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
