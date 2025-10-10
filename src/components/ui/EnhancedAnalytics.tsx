"use client";

import React from 'react';

export default function EnhancedAnalytics() {
  const metrics = [
    { label: 'Current Value', value: '$1,247,500', change: '+12.8%', color: 'text-emerald-400' },
    { label: '24h Volume', value: '$45,280', change: '+5.2%', color: 'text-cyan-400' },
    { label: 'Active Assets', value: '8', change: '+2', color: 'text-blue-400' },
    { label: 'Avg. ROI', value: '15.3%', change: '+1.2%', color: 'text-purple-400' }
  ];

  const allocationData = [
    { asset: 'Real Estate', percentage: 45, color: 'from-blue-500 to-cyan-500' },
    { asset: 'Thoroughbred', percentage: 30, color: 'from-purple-500 to-pink-500' },
    { asset: 'Liquid Assets', percentage: 15, color: 'from-emerald-500 to-teal-500' },
    { asset: 'Development', percentage: 10, color: 'from-amber-500 to-orange-500' }
  ];

  return (
    <div className="glass-ultimate rounded-3xl border border-white/10 p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h3 className="text-2xl font-bold text-white mb-4 lg:mb-0">Portfolio Analytics</h3>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-400/30 text-sm font-medium">
            Live
          </button>
          <button className="px-4 py-2 bg-white/5 text-cyan-100 rounded-lg border border-white/20 text-sm font-medium hover:bg-white/10">
            1D
          </button>
          <button className="px-4 py-2 bg-white/5 text-cyan-100 rounded-lg border border-white/20 text-sm font-medium hover:bg-white/10">
            1W
          </button>
          <button className="px-4 py-2 bg-white/5 text-cyan-100 rounded-lg border border-white/20 text-sm font-medium hover:bg-white/10">
            1M
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className={`text-2xl font-black ${metric.color} mb-1`}>{metric.value}</div>
            <div className="text-cyan-100 text-sm mb-1">{metric.label}</div>
            <div className="text-emerald-400 text-xs font-semibold">{metric.change}</div>
          </div>
        ))}
      </div>

      {/* Asset Allocation */}
      <div>
        <h4 className="font-semibold text-white mb-4">Asset Allocation</h4>
        <div className="space-y-3">
          {allocationData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded bg-gradient-to-br ${item.color}`}></div>
                <span className="text-white font-medium text-sm">{item.asset}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-32 bg-white/10 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${item.color} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-white font-bold w-10 text-sm">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
