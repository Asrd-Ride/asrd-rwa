"use client";

import React from 'react';

export default function PerformanceMetrics() {
  const metrics = [
    { label: 'Total Return', value: '+24.7%', description: 'Since inception', color: 'from-emerald-400 to-cyan-400' },
    { label: 'Monthly Average', value: '+2.1%', description: 'Last 12 months', color: 'from-blue-400 to-indigo-400' },
    { label: 'Volatility', value: '8.2%', description: 'Annualized', color: 'from-purple-400 to-pink-400' },
    { label: 'Sharpe Ratio', value: '2.8', description: 'Risk-adjusted', color: 'from-amber-400 to-orange-400' }
  ];

  const assetPerformance = [
    { name: 'Dubai Hills Villa', return: '+32.5%', value: '$2.5M' },
    { name: 'Champion Thoroughbred', return: '+45.2%', value: '$850K' },
    { name: 'Commercial Complex', return: '+18.7%', value: '$1.2M' },
    { name: 'Breeding Stock', return: '+22.1%', value: '$650K' }
  ];

  return (
    <div className="glass-ultimate rounded-3xl border border-white/10 p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h3 className="text-2xl font-bold text-white mb-4 lg:mb-0">Performance Metrics</h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-400/30 text-sm font-medium">
            Real-time
          </button>
          <button className="px-4 py-2 bg-white/5 text-cyan-100 rounded-lg border border-white/20 text-sm font-medium hover:bg-white/10">
            Historical
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
            <div className={`text-2xl font-black bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-1`}>
              {metric.value}
            </div>
            <div className="text-white font-semibold text-sm mb-1">{metric.label}</div>
            <div className="text-cyan-100 text-xs">{metric.description}</div>
          </div>
        ))}
      </div>

      {/* Asset Performance */}
      <div>
        <h4 className="font-semibold text-white mb-4">Top Performing Assets</h4>
        <div className="space-y-3">
          {assetPerformance.map((asset, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-400/20 transition-colors duration-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{asset.name}</div>
                  <div className="text-cyan-100 text-xs">{asset.value}</div>
                </div>
              </div>
              <div className={`text-right ${
                asset.return.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
              } font-bold text-sm`}>
                {asset.return}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-400/20">
          <div className="text-emerald-300 font-bold text-sm">Excellent</div>
          <div className="text-emerald-200 text-xs">Risk Profile</div>
        </div>
        <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-400/20">
          <div className="text-cyan-300 font-bold text-sm">Diversified</div>
          <div className="text-cyan-200 text-xs">Portfolio</div>
        </div>
        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-400/20">
          <div className="text-purple-300 font-bold text-sm">Growing</div>
          <div className="text-purple-200 text-xs">Trend</div>
        </div>
      </div>
    </div>
  );
}
