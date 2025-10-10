"use client";

import React from 'react';

export default function AnalyticsChart() {
  // Mock data for the chart
  const performanceData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 90 },
    { month: 'Apr', value: 81 },
    { month: 'May', value: 56 },
    { month: 'Jun', value: 55 },
    { month: 'Jul', value: 40 },
    { month: 'Aug', value: 45 },
    { month: 'Sep', value: 60 },
    { month: 'Oct', value: 75 },
    { month: 'Nov', value: 85 },
    { month: 'Dec', value: 95 }
  ];

  const maxValue = Math.max(...performanceData.map(d => d.value));

  return (
    <div className="glass-ultimate rounded-3xl border border-white/10 p-8">
      <h3 className="text-2xl font-bold text-white mb-6">Portfolio Performance</h3>
      
      {/* Chart Container */}
      <div className="h-64 relative">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 25, 50, 75, 100].map((line) => (
            <div key={line} className="flex items-center">
              <div className="text-blue-300 text-xs w-8 mr-2 text-right">{line}%</div>
              <div className="flex-1 border-t border-white/10" />
            </div>
          ))}
        </div>

        {/* Chart Bars */}
        <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
          {performanceData.map((point, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div
                className="w-6 bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-lg transition-all duration-500 hover:from-cyan-400 hover:to-blue-500 cursor-pointer relative"
                style={{ height: `${(point.value / maxValue) * 80}%` }}
              >
                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {point.month}: {point.value}%
                </div>
              </div>
              <div className="text-blue-300 text-xs mt-2">{point.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="text-2xl font-black text-emerald-400">+24.7%</div>
          <div className="text-cyan-100 text-sm">Total Growth</div>
        </div>
        <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="text-2xl font-black text-cyan-400">12.8%</div>
          <div className="text-cyan-100 text-sm">Avg. Monthly</div>
        </div>
        <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="text-2xl font-black text-purple-400">$1.2M</div>
          <div className="text-cyan-100 text-sm">Portfolio Value</div>
        </div>
        <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="text-2xl font-black text-orange-400">8</div>
          <div className="text-cyan-100 text-sm">Active Assets</div>
        </div>
      </div>
    </div>
  );
}
