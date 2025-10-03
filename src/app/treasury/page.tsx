'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign, TrendingUp, Users, PieChart, Shield,
  Clock, BarChart3, Target, Calendar, Coins,
  ArrowUpRight, ArrowDownRight, Eye, Download,
  Building2, Wallet, Landmark, CreditCard,
  Crown, Gem, Zap, Rocket
} from 'lucide-react'

export default function TreasuryPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeframe, setTimeframe] = useState('1y')

  // Treasury Data
  const treasuryData = {
    totalValue: 45280000,
    totalValueChange: 12.5,
    assetsUnderManagement: 31250000,
    platformRevenue: 8560000,
    platformRevenueChange: 8.2,
    investorCount: 45231,
    investorChange: 15.7,
    assets: [
      { name: 'Liquid Assets', value: 12500000, percentage: 27.6, color: 'from-emerald-glow to-sapphire-glow' },
      { name: 'Real Estate NFTs', value: 21800000, percentage: 48.1, color: 'from-sapphire-glow to-amethyst-glow' },
      { name: 'Equine NFTs', value: 8560000, percentage: 18.9, color: 'from-amethyst-glow to-ruby-glow' },
      { name: 'Stablecoin Reserves', value: 2420000, percentage: 5.4, color: 'from-gold-glow to-emerald-glow' }
    ],
    revenueStreams: [
      { name: 'Asset Management Fees', value: 4250000, percentage: 49.6, change: 12.3 },
      { name: 'Transaction Fees', value: 2180000, percentage: 25.5, change: 8.7 },
      { name: 'Platform Services', value: 1560000, percentage: 18.2, change: 15.1 },
      { name: 'Other Revenue', value: 570000, percentage: 6.7, change: 3.2 }
    ],
    financialMetrics: [
      { label: 'Net Asset Value (NAV)', value: '$45.28M', change: 12.5 },
      { label: 'Annual Revenue', value: '$8.56M', change: 8.2 },
      { label: 'Profit Margin', value: '34.2%', change: 2.1 },
      { label: 'Operating Costs', value: '$5.64M', change: -3.2 },
      { label: 'Reserve Ratio', value: '27.6%', change: 1.8 },
      { label: 'ROI (Platform)', value: '18.9%', change: 4.3 }
    ],
    recentTransactions: [
      { id: 1, type: 'Revenue', amount: 125000, description: 'Asset Management Fee - Q1', date: '2024-03-15', status: 'completed' },
      { id: 2, type: 'Expense', amount: -45000, description: 'Platform Maintenance', date: '2024-03-14', status: 'completed' },
      { id: 3, type: 'Revenue', amount: 89000, description: 'Transaction Fees', date: '2024-03-13', status: 'completed' },
      { id: 4, type: 'Investment', amount: 2500000, description: 'New Real Estate Acquisition', date: '2024-03-10', status: 'pending' },
      { id: 5, type: 'Revenue', amount: 156000, description: 'Premium Services', date: '2024-03-08', status: 'completed' }
    ],
    allocationPlans: [
      { category: 'Platform Development', amount: 1250000, percentage: 25, color: 'from-emerald-glow to-sapphire-glow' },
      { category: 'Asset Acquisition', amount: 2500000, percentage: 50, color: 'from-sapphire-glow to-amethyst-glow' },
      { category: 'Marketing & Growth', amount: 750000, percentage: 15, color: 'from-amethyst-glow to-ruby-glow' },
      { category: 'Legal & Compliance', amount: 500000, percentage: 10, color: 'from-gold-glow to-emerald-glow' }
    ]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'allocations', label: 'Allocations', icon: Target },
    { id: 'transactions', label: 'Transactions', icon: BarChart3 }
  ]

  return (
    <div className="min-h-screen immersive-bg">

      {/* Header */}
      <div className="relative overflow-hidden pt-16">
        <div className="container-pro py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black text-3d mb-6">
              TREASURY <span className="text-glow text-emerald-glow">DASHBOARD</span>
            </h1>
            <p className="text-xl text-neutral-light max-w-3xl mx-auto">
              Comprehensive overview of <span className="text-emerald-glow font-semibold">platform finances</span> and 
              <span className="text-sapphire-glow font-semibold"> asset management</span> with institutional-grade security
            </p>
          </motion.div>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="container-pro mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="glass-3d inline-flex items-center px-6 py-3">
            <Calendar className="w-5 h-5 text-emerald-glow mr-3" />
            <span className="text-white font-semibold">FINANCIAL OVERVIEW</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-luxury-dark/50 border border-emerald-glow/30 rounded-2xl px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-glow backdrop-blur-sm"
            >
              <option value="1m" className="bg-luxury-dark">Last Month</option>
              <option value="3m" className="bg-luxury-dark">Last 3 Months</option>
              <option value="1y" className="bg-luxury-dark">Last Year</option>
              <option value="all" className="bg-luxury-dark">All Time</option>
            </select>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-emerald-glow to-sapphire-glow text-luxury-dark px-6 py-3 rounded-2xl font-black hover:shadow-2xl hover:shadow-emerald-glow/30 transition-all duration-300">
              <Download className="w-4 h-4" />
              <span>EXPORT REPORT</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container-pro pb-20">
        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {/* Total Treasury Value */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-3d p-6 text-center group hover:neon-glow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-emerald-glow to-sapphire-glow rounded-2xl">
                <Landmark className="w-6 h-6 text-luxury-deep" />
              </div>
              <div className={`flex items-center ${treasuryData.totalValueChange >= 0 ? 'text-emerald-glow' : 'text-ruby-glow'}`}>
                {treasuryData.totalValueChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span className="text-sm font-black ml-1">
                  {treasuryData.totalValueChange}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-emerald-glow mb-1">
              {formatCurrency(treasuryData.totalValue)}
            </h3>
            <p className="text-neutral-mid text-sm font-semibold">TOTAL TREASURY VALUE</p>
          </motion.div>

          {/* Assets Under Management */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-3d p-6 text-center group hover:neon-glow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-sapphire-glow to-amethyst-glow rounded-2xl">
                <Building2 className="w-6 h-6 text-luxury-deep" />
              </div>
              <div className="text-emerald-glow">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-sapphire-glow mb-1">
              {formatCurrency(treasuryData.assetsUnderManagement)}
            </h3>
            <p className="text-neutral-mid text-sm font-semibold">ASSETS UNDER MANAGEMENT</p>
          </motion.div>

          {/* Platform Revenue */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-3d p-6 text-center group hover:neon-glow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-amethyst-glow to-ruby-glow rounded-2xl">
                <DollarSign className="w-6 h-6 text-luxury-deep" />
              </div>
              <div className={`flex items-center ${treasuryData.platformRevenueChange >= 0 ? 'text-emerald-glow' : 'text-ruby-glow'}`}>
                {treasuryData.platformRevenueChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span className="text-sm font-black ml-1">
                  {treasuryData.platformRevenueChange}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-amethyst-glow mb-1">
              {formatCurrency(treasuryData.platformRevenue)}
            </h3>
            <p className="text-neutral-mid text-sm font-semibold">PLATFORM REVENUE (ANNUAL)</p>
          </motion.div>

          {/* Active Investors */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-3d p-6 text-center group hover:neon-glow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-gold-glow to-emerald-glow rounded-2xl">
                <Users className="w-6 h-6 text-luxury-deep" />
              </div>
              <div className="text-emerald-glow">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-black ml-1">
                  {treasuryData.investorChange}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-gold-glow mb-1">
              {formatNumber(treasuryData.investorCount)}
            </h3>
            <p className="text-neutral-mid text-sm font-semibold">ACTIVE INVESTORS</p>
          </motion.div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-3d mb-8"
        >
          <div className="border-b border-white/10">
            <div className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-black text-sm ${
                      activeTab === tab.id
                        ? 'border-emerald-glow text-emerald-glow'
                        : 'border-transparent text-neutral-mid hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Asset Allocation */}
                <div>
                  <h3 className="text-2xl font-black text-white mb-6 text-glow">ASSET ALLOCATION</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {treasuryData.assets.map((asset, index) => (
                        <motion.div
                          key={asset.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="glass-3d p-6 group hover:neon-glow"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${asset.color}`}></div>
                              <span className="font-black text-white">{asset.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-black text-white">{formatCurrency(asset.value)}</div>
                              <div className="text-sm text-neutral-mid">{asset.percentage}%</div>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-luxury-dark rounded-full h-2 mt-3">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${asset.color} transition-all duration-500`}
                              style={{ width: `${asset.percentage}%` }}
                            ></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Visualization */}
                    <div className="glass-3d p-8 flex items-center justify-center">
                      <div className="text-center">
                        <div className="relative w-48 h-48 mx-auto mb-6">
                          {/* Simplified Pie Chart Visualization */}
                          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-emerald-glow border-r-sapphire-glow border-b-amethyst-glow border-l-gold-glow transform rotate-45"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-black text-emerald-glow">100%</div>
                              <div className="text-neutral-mid text-sm">ALLOCATED</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-neutral-light">Total Asset Distribution</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Metrics Grid */}
                <div>
                  <h3 className="text-2xl font-black text-white mb-6 text-glow">KEY FINANCIAL METRICS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {treasuryData.financialMetrics.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-3d p-6 group hover:neon-glow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-black text-white">{metric.label}</h4>
                          <div className={`flex items-center ${metric.change >= 0 ? 'text-emerald-glow' : 'text-ruby-glow'}`}>
                            {metric.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            <span className="text-sm font-black ml-1">
                              {metric.change}%
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl font-black text-emerald-glow">{metric.value}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Revenue Tab */}
            {activeTab === 'revenue' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-white mb-6 text-glow">REVENUE STREAMS</h3>
                  <div className="space-y-4">
                    {treasuryData.revenueStreams.map((stream, index) => (
                      <motion.div
                        key={stream.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-3d p-6 group hover:neon-glow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-black text-white">{stream.name}</h4>
                          <div className={`flex items-center ${stream.change >= 0 ? 'text-emerald-glow' : 'text-ruby-glow'}`}>
                            {stream.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            <span className="text-sm font-black ml-1">
                              {stream.change}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-black text-emerald-glow">
                            {formatCurrency(stream.value)}
                          </div>
                          <div className="text-lg text-neutral-mid">
                            {stream.percentage}%
                          </div>
                        </div>
                        <div className="w-full bg-luxury-dark rounded-full h-2 mt-3">
                          <div
                            className="bg-gradient-to-r from-emerald-glow to-sapphire-glow h-2 rounded-full transition-all duration-500"
                            style={{ width: `${stream.percentage}%` }}
                          ></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Allocations Tab */}
            {activeTab === 'allocations' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-white mb-6 text-glow">FUND ALLOCATION PLAN</h3>
                  <div className="space-y-4">
                    {treasuryData.allocationPlans.map((plan, index) => (
                      <motion.div
                        key={plan.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-3d p-6 group hover:neon-glow"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-black text-white">{plan.category}</h4>
                          <div className="text-lg font-black text-emerald-glow">
                            {plan.percentage}%
                          </div>
                        </div>
                        <div className="text-2xl font-black text-sapphire-glow mb-3">
                          {formatCurrency(plan.amount)}
                        </div>
                        <div className="w-full bg-luxury-dark rounded-full h-3">
                          <div
                            className={`h-3 rounded-full bg-gradient-to-r ${plan.color} transition-all duration-500`}
                            style={{ width: `${plan.percentage}%` }}
                          ></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-white mb-6 text-glow">RECENT TRANSACTIONS</h3>
                <div className="space-y-4">
                  {treasuryData.recentTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-3d p-6 group hover:neon-glow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-2xl ${
                            transaction.type === 'Revenue' ? 'bg-gradient-to-r from-emerald-glow to-sapphire-glow' :
                            transaction.type === 'Expense' ? 'bg-gradient-to-r from-ruby-glow to-amethyst-glow' :
                            'bg-gradient-to-r from-gold-glow to-emerald-glow'
                          }`}>
                            {transaction.type === 'Revenue' ? <ArrowUpRight className="w-5 h-5 text-luxury-deep" /> :
                             transaction.type === 'Expense' ? <ArrowDownRight className="w-5 h-5 text-luxury-deep" /> :
                             <Coins className="w-5 h-5 text-luxury-deep" />}
                          </div>
                          <div>
                            <div className="font-black text-white">{transaction.description}</div>
                            <div className="text-sm text-neutral-mid">{transaction.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-black text-lg ${
                            transaction.amount >= 0 ? 'text-emerald-glow' : 'text-ruby-glow'
                          }`}>
                            {transaction.amount >= 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                          </div>
                          <div className={`text-sm font-black px-3 py-1 rounded-full ${
                            transaction.status === 'completed' ? 'bg-emerald-glow/20 text-emerald-glow' :
                            'bg-gold-glow/20 text-gold-glow'
                          }`}>
                            {transaction.status.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Security & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-3d p-8 text-center group hover:neon-glow"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-2xl font-black text-white mb-2 text-glow">SECURE & COMPLIANT TREASURY MANAGEMENT</h3>
              <p className="text-neutral-light text-lg">
                All funds are managed with <span className="text-emerald-glow font-semibold">institutional-grade security</span> and 
                <span className="text-sapphire-glow font-semibold"> regulatory compliance</span>
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-emerald-glow">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Bank-Grade Security</span>
              </div>
              <div className="flex items-center space-x-2 text-sapphire-glow">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Quarterly Audits</span>
              </div>
              <div className="flex items-center space-x-2 text-amethyst-glow">
                <Eye className="w-5 h-5" />
                <span className="font-semibold">Transparent Reporting</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
