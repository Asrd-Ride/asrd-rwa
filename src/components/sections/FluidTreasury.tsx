"use client";

import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, PieChart, Building, Ship, Plane, Gem, Zap, ArrowUpRight, ArrowDownRight, Users, Calendar } from 'lucide-react';

export default function FluidTreasury() {
  const [treasuryData, setTreasuryData] = useState<any>(null);
  const [timeframe, setTimeframe] = useState<'1m' | '3m' | '1y' | 'all'>('1y');

  useEffect(() => {
    const fetchTreasuryData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTreasuryData({
        totalValue: 15420000,
        totalInvestors: 2470,
        averageRoi: "38.7%",
        activeAssets: 28,
        monthlyReturns: 425000,
        totalReturns: 3850000,
        assetsByType: [
          { type: 'Real Estate', value: 6200000, percentage: 40.2, icon: Building },
          { type: 'Thoroughbred', value: 3800000, percentage: 24.6, icon: Zap },
          { type: 'Marine', value: 2850000, percentage: 18.5, icon: Ship },
          { type: 'Aviation', value: 1570000, percentage: 10.2, icon: Plane },
          { type: 'Luxury Goods', value: 1000000, percentage: 6.5, icon: Gem }
        ],
        performance: [
          { month: 'Jan', returns: 385000, growth: 12.5 },
          { month: 'Feb', returns: 412000, growth: 15.2 },
          { month: 'Mar', returns: 398000, growth: 13.8 },
          { month: 'Apr', returns: 425000, growth: 16.1 },
          { month: 'May', returns: 441000, growth: 18.3 },
          { month: 'Jun', returns: 468000, growth: 21.5 }
        ]
      });
    };

    fetchTreasuryData();
  }, []);

  const stats = [
    {
      label: "Total Platform Value",
      value: `$${(treasuryData?.totalValue / 1000000).toFixed(1)}M`,
      change: "+18.3%",
      icon: DollarSign,
      color: "text-fluid-gold"
    },
    {
      label: "Active Investors",
      value: treasuryData?.totalInvestors.toLocaleString(),
      change: "+247",
      icon: Users,
      color: "text-fluid-emerald"
    },
    {
      label: "Average ROI",
      value: treasuryData?.averageRoi,
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-fluid-sapphire"
    },
    {
      label: "Monthly Returns",
      value: `$${(treasuryData?.monthlyReturns / 1000).toFixed(0)}K`,
      change: "+16.1%",
      icon: PieChart,
      color: "text-fluid-gold"
    }
  ];

  if (!treasuryData) {
    return (
      <div className="fluid-section">
        <div className="fluid-container">
          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-fluid-gold border-t-transparent rounded-full animate-spin mx-auto mb-3 md:mb-4"></div>
            <p className="fluid-caption">Loading treasury data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fluid-section">
      <div className="fluid-container">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 fluid-scroll-item mobile:text-center">
          <h1 className="fluid-hero">
            Platform <span className="text-fluid-gold">Treasury</span>
          </h1>
          <p className="fluid-body max-w-2xl mx-auto mobile:px-4">
            Comprehensive overview of platform assets, performance, and investor returns
          </p>
        </div>

        {/* Stats Grid */}
        <div className="fluid-grid fluid-grid-cols-2 lg:fluid-grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="fluid-card fluid-scroll-item mobile:w-full"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
                  <stat.icon className="w-4 h-4 md:w-6 md:h-6" />
                </div>
                <div className="flex items-center space-x-1 text-xs md:text-sm font-semibold text-fluid-emerald">
                  <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">{stat.value}</h3>
              <p className="fluid-caption text-xs md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="fluid-grid lg:fluid-grid-cols-2 gap-6 md:gap-8">
          {/* Asset Allocation */}
          <div className="fluid-card-panel fluid-scroll-item mobile:px-4 mobile:py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 space-y-2 md:space-y-0">
              <h2 className="fluid-subheading">Asset Allocation</h2>
              <div className="flex items-center space-x-2 text-fluid-silver">
                <Calendar className="w-4 h-4" />
                <span className="text-sm md:text-base">Current</span>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4">
              {treasuryData.assetsByType.map((asset: any, index: number) => (
                <div key={asset.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className={`p-1 md:p-2 rounded-lg bg-opacity-10 ${
                      asset.type === 'Real Estate' ? 'bg-fluid-gold' : 
                      asset.type === 'Thoroughbred' ? 'bg-fluid-emerald' : 'bg-fluid-sapphire'
                    }`}>
                      <asset.icon className="w-3 h-3 md:w-4 md:h-4" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm md:text-base">{asset.type}</p>
                      <p className="fluid-caption text-xs md:text-sm">${(asset.value / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold text-sm md:text-base">{asset.percentage}%</p>
                    <div className="w-20 md:w-32 h-2 bg-fluid-slate rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          asset.type === 'Real Estate' ? 'bg-fluid-gold' : 
                          asset.type === 'Thoroughbred' ? 'bg-fluid-emerald' : 'bg-fluid-sapphire'
                        }`}
                        style={{ width: `${asset.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <div className="fluid-card-panel fluid-scroll-item mobile:px-4 mobile:py-4" style={{ transitionDelay: '200ms' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 space-y-2 md:space-y-0">
              <h2 className="fluid-subheading">Performance Trend</h2>
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value as any)}
                className="px-3 py-2 bg-fluid-charcoal border border-fluid-slate rounded-lg text-white text-sm focus:border-fluid-gold focus:outline-none"
              >
                <option value="1m">1 Month</option>
                <option value="3m">3 Months</option>
                <option value="1y">1 Year</option>
                <option value="all">All Time</option>
              </select>
            </div>

            <div className="space-y-3 md:space-y-4">
              {treasuryData.performance.map((month: any, index: number) => (
                <div key={month.month} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 md:space-x-4">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-fluid-gold bg-opacity-20 flex items-center justify-center">
                      <span className="text-fluid-gold text-xs md:text-sm font-semibold">{month.month}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm md:text-base">${(month.returns / 1000).toFixed(0)}K Returns</p>
                      <p className="fluid-caption text-xs">Monthly Performance</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 text-xs md:text-sm font-semibold ${
                    month.growth >= 0 ? 'text-fluid-emerald' : 'text-red-400'
                  }`}>
                    {month.growth >= 0 ? <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" /> : <ArrowDownRight className="w-3 h-3 md:w-4 md:h-4" />}
                    <span>{month.growth >= 0 ? '+' : ''}{month.growth}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Returns Summary */}
        <div className="fluid-card-panel mt-6 md:mt-8 fluid-scroll-item mobile:px-4 mobile:py-4" style={{ transitionDelay: '400ms' }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
            <div>
              <h3 className="fluid-subheading">Total Platform Returns</h3>
              <p className="fluid-caption">Cumulative returns distributed to investors</p>
            </div>
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-bold text-fluid-gold">${(treasuryData.totalReturns / 1000000).toFixed(1)}M</p>
              <p className="fluid-caption">Since inception</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
