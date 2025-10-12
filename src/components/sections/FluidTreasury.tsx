"use client";

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, TrendingUp, PieChart, Building, Ship, Plane, Gem, 
  Zap, ArrowUpRight, ArrowDownRight, Users, Calendar, Shield,
  BarChart3, Target, Globe, Clock, CheckCircle, AlertTriangle,
  Eye, FileText, Cpu, Activity
} from 'lucide-react';

export default function EnhancedTreasury() {
  const [treasuryData, setTreasuryData] = useState<any>(null);
  const [timeframe, setTimeframe] = useState<'1m' | '3m' | '1y' | 'all'>('1y');
  const [activeView, setActiveView] = useState<'overview' | 'assets' | 'performance' | 'transparency'>('overview');

  useEffect(() => {
    const fetchTreasuryData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTreasuryData({
        // Enhanced financial metrics
        totalValue: 15420000,
        totalInvestors: 2470,
        averageRoi: "32.7%",
        activeAssets: 28,
        monthlyReturns: 425000,
        totalReturns: 3850000,
        platformGrowth: 184.3,
        investorGrowth: 67.8,
        
        // Enhanced asset allocation
        assetsByType: [
          { type: 'Commercial Real Estate', value: 6200000, percentage: 40.2, icon: Building, risk: 'Medium', geography: 'Global' },
          { type: 'Thoroughbred Assets', value: 3800000, percentage: 24.6, icon: Zap, risk: 'High', geography: 'US & Europe' },
          { type: 'Marine Finance', value: 2850000, percentage: 18.5, icon: Ship, risk: 'Medium', geography: 'International' },
          { type: 'Aviation Leases', value: 1570000, percentage: 10.2, icon: Plane, risk: 'Medium', geography: 'Global' },
          { type: 'Luxury Collectibles', value: 1000000, percentage: 6.5, icon: Gem, risk: 'Low', geography: 'Global' }
        ],
        
        // Enhanced performance data
        performance: [
          { month: 'Jan', returns: 385000, growth: 12.5, investors: 1890 },
          { month: 'Feb', returns: 412000, growth: 15.2, investors: 2015 },
          { month: 'Mar', returns: 398000, growth: 13.8, investors: 2150 },
          { month: 'Apr', returns: 425000, growth: 16.1, investors: 2240 },
          { month: 'May', returns: 441000, growth: 18.3, investors: 2330 },
          { month: 'Jun', returns: 468000, growth: 21.5, investors: 2470 }
        ],
        
        // New transparency data
        platformHealth: {
          liquidityRatio: 0.85,
          diversificationScore: 92,
          complianceStatus: 'Fully Compliant',
          auditStatus: 'Last Audit: Q2 2025',
          insuranceCoverage: 'Fully Insured'
        },
        
        // Growth timeline starting from 2025
        milestones: [
          { date: '2025 Q1', event: 'Platform Launch', aum: 2500000, investors: 450 },
          { date: '2025 Q2', event: 'Real Estate Expansion', aum: 5800000, investors: 890 },
          { date: '2025 Q3', event: 'Marine Assets Added', aum: 8200000, investors: 1320 },
          { date: '2025 Q4', event: 'International Expansion', aum: 11200000, investors: 1780 },
          { date: '2026 Q1', event: 'Thoroughbred Market Entry', aum: 15420000, investors: 2470 }
        ],
        
        // Risk metrics
        riskMetrics: {
          var95: 12.4, // Value at Risk 95%
          sharpeRatio: 2.1,
          maxDrawdown: 8.7,
          volatility: 15.3
        }
      });
    };

    fetchTreasuryData();
  }, []);

  // Enhanced stats with professional financial styling
  const stats = [
    {
      label: "Total Platform Value",
      value: `$${(treasuryData?.totalValue / 1000000).toFixed(1)}M`,
      change: "+184.3%",
      description: "Since 2025 Launch",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      label: "Active Investors",
      value: treasuryData?.totalInvestors.toLocaleString(),
      change: "+67.8%",
      description: "Quarterly Growth",
      icon: Users,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      label: "Average ROI",
      value: treasuryData?.averageRoi,
      change: "+2.1%",
      description: "vs. Market Average",
      icon: TrendingUp,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    },
    {
      label: "Monthly Returns",
      value: `$${(treasuryData?.monthlyReturns / 1000).toFixed(0)}K`,
      change: "+16.1%",
      description: "Current Month",
      icon: PieChart,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  // Navigation tabs
  const viewTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'assets', label: 'Asset Allocation', icon: PieChart },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'transparency', label: 'Transparency', icon: Eye }
  ];

  if (!treasuryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading treasury data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Platform <span className="text-blue-600">Treasury</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Complete transparency into platform assets, performance metrics, and investor returns
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {viewTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeView === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center space-x-1 text-sm font-semibold text-emerald-600">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-slate-700 font-semibold mb-1">{stat.label}</p>
              <p className="text-slate-500 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="space-y-8">
          {/* Asset Allocation */}
          {activeView === 'assets' && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Asset Allocation</h2>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm">Current Allocation</span>
                </div>
              </div>

              <div className="space-y-6">
                {treasuryData.assetsByType.map((asset: any) => (
                  <div key={asset.type} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        asset.type.includes('Real Estate') ? 'bg-blue-100 text-blue-600' :
                        asset.type.includes('Thoroughbred') ? 'bg-emerald-100 text-emerald-600' :
                        asset.type.includes('Marine') ? 'bg-cyan-100 text-cyan-600' :
                        asset.type.includes('Aviation') ? 'bg-amber-100 text-amber-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        <asset.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-slate-900 font-semibold">{asset.type}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <span>Risk: {asset.risk}</span>
                          <span>•</span>
                          <span>{asset.geography}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-900 font-semibold text-lg">{asset.percentage}%</p>
                      <p className="text-slate-600 text-sm">${(asset.value / 1000000).toFixed(1)}M</p>
                      <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
                        <div 
                          className={`h-full rounded-full ${
                            asset.type.includes('Real Estate') ? 'bg-blue-500' :
                            asset.type.includes('Thoroughbred') ? 'bg-emerald-500' :
                            asset.type.includes('Marine') ? 'bg-cyan-500' :
                            asset.type.includes('Aviation') ? 'bg-amber-500' :
                            'bg-purple-500'
                          }`}
                          style={{ width: `${asset.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance View */}
          {activeView === 'performance' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Performance Trend</h2>
                  <select 
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value as any)}
                    className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="1m">1 Month</option>
                    <option value="3m">3 Months</option>
                    <option value="1y">1 Year</option>
                    <option value="all">All Time</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {treasuryData.performance.map((month: any) => (
                    <div key={month.month} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">{month.month}</span>
                        </div>
                        <div>
                          <p className="text-slate-900 font-semibold">${(month.returns / 1000).toFixed(0)}K Returns</p>
                          <p className="text-slate-600 text-sm">{month.investors.toLocaleString()} Investors</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-2 text-lg font-semibold ${
                        month.growth >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {month.growth >= 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                        <span>{month.growth >= 0 ? '+' : ''}{month.growth}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth Timeline */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Platform Growth Timeline</h2>
                <div className="space-y-6">
                  {treasuryData.milestones.map((milestone: any, index: number) => (
                    <div key={milestone.date} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{milestone.event}</h3>
                          <span className="text-slate-600 font-medium">{milestone.date}</span>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-slate-600">
                          <span>${(milestone.aum / 1000000).toFixed(1)}M AUM</span>
                          <span>•</span>
                          <span>{milestone.investors.toLocaleString()} Investors</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Transparency View */}
          {activeView === 'transparency' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Platform Health */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Platform Health</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <span className="text-slate-700">Liquidity Ratio</span>
                    </div>
                    <span className="text-lg font-semibold text-slate-900">{treasuryData.platformHealth.liquidityRatio}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Cpu className="w-5 h-5 text-emerald-600" />
                      <span className="text-slate-700">Diversification Score</span>
                    </div>
                    <span className="text-lg font-semibold text-slate-900">{treasuryData.platformHealth.diversificationScore}%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-slate-700">Compliance Status</span>
                    </div>
                    <span className="text-lg font-semibold text-green-600">{treasuryData.platformHealth.complianceStatus}</span>
                  </div>
                </div>
              </div>

              {/* Risk Metrics */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Risk Metrics</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-700">Value at Risk (95%)</span>
                    <span className="text-lg font-semibold text-slate-900">{treasuryData.riskMetrics.var95}%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-700">Sharpe Ratio</span>
                    <span className="text-lg font-semibold text-slate-900">{treasuryData.riskMetrics.sharpeRatio}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-700">Maximum Drawdown</span>
                    <span className="text-lg font-semibold text-slate-900">{treasuryData.riskMetrics.maxDrawdown}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Total Returns Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mt-12 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Total Platform Returns</h3>
              <p className="text-blue-100">Cumulative returns distributed to investors since 2025</p>
            </div>
            <div className="text-right mt-4 md:mt-0">
              <p className="text-4xl font-bold">${(treasuryData.totalReturns / 1000000).toFixed(1)}M</p>
              <p className="text-blue-100">Distributed to Investors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}