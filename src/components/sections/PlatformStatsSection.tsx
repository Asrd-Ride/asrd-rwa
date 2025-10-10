"use client";

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChartBarIcon, UsersIcon, BuildingLibraryIcon, CurrencyDollarIcon } from '@/components/ui/ProfessionalIcons';

export default function PlatformStatsSection() {
  const { getFadeStyle } = useScrollAnimation();

  const stats = [
    {
      icon: <ChartBarIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
      value: "30%+",
      label: "Average Returns",
      description: "Proven performance",
      color: "from-emerald-400 to-cyan-400"
    },
    {
      icon: <CurrencyDollarIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
      value: "$50",
      label: "Start Investing",
      description: "Minimum amount",
      color: "from-blue-400 to-indigo-400"
    },
    {
      icon: <UsersIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
      value: "1K+",
      label: "Members",
      description: "Growing community",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: <BuildingLibraryIcon className="w-6 h-6 sm:w-8 sm:h-8" />,
      value: "24/7",
      label: "Access",
      description: "Always available",
      color: "from-amber-400 to-orange-400"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16" style={getFadeStyle(0, 200)}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">
          Democratizing Elite Investments
        </h2>
        <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto leading-relaxed px-4">
          We're breaking down barriers to make premium investments accessible to everyone, 
          not just the wealthy few.
        </p>
      </div>

      {/* Stats Grid - Mobile Optimized */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group text-center p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:scale-105"
            style={getFadeStyle(200 + (index * 100), 600)}
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-xl sm:rounded-2xl border border-white/10 mb-3 sm:mb-6 group-hover:border-cyan-400/30 transition-colors duration-500">
              <div className="text-cyan-300">
                {stat.icon}
              </div>
            </div>

            {/* Value */}
            <div className={`text-xl sm:text-2xl md:text-3xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 sm:mb-3`}>
              {stat.value}
            </div>

            {/* Label */}
            <div className="text-white font-bold text-sm sm:text-base mb-1 sm:mb-2">
              {stat.label}
            </div>

            {/* Description */}
            <div className="text-cyan-200 text-xs sm:text-sm leading-relaxed">
              {stat.description}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Message */}
      <div className="text-center mt-8 sm:mt-12" style={getFadeStyle(600, 800)}>
        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3">
          <span className="text-cyan-300 font-semibold text-sm sm:text-base">No wealth barriers • No elite requirements</span>
        </div>
      </div>
    </div>
  );
}
