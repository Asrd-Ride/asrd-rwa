'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, TrendingUp, Users, PieChart, Shield, 
  Clock, BarChart3, Target, Calendar, Coins,
  ArrowUpRight, ArrowDownRight, Eye, Download,
  Building2, Wallet, Landmark, CreditCard
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
      { name: 'Liquid Assets', value: 12500000, percentage: 27.6, color: 'bg-green-500' },
      { name: 'Real Estate NFTs', value: 21800000, percentage: 48.1, color: 'bg-blue-500' },
      { name: 'Equine NFTs', value: 8560000, percentage: 18.9, color: 'bg-purple-500' },
      { name: 'Stablecoin Reserves', value: 2420000, percentage: 5.4, color: 'bg-yellow-500' }
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
      { category: 'Platform Development', amount: 1250000, percentage: 25 },
      { category: 'Asset Acquisition', amount: 2500000, percentage: 50 },
      { category: 'Marketing & Growth', amount: 750000, percentage: 15 },
      { category: 'Legal & Compliance', amount: 500000, percentage: 10 }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Treasury Dashboard</h1>
              <p className="text-gray-600 text-lg">
                Comprehensive overview of platform finances and asset management
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1m">Last Month</option>
                <option value="3m">Last 3 Months</option>
                <option value="1y">Last Year</option>
                <option value="all">All Time</option>
              </select>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Total Treasury Value */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Landmark className="w-6 h-6 text-blue-600" />
              </div>
              <div className={`flex items-center ${treasuryData.totalValueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {treasuryData.totalValueChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span className="text-sm font-semibold ml-1">
                  {treasuryData.totalValueChange}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(treasuryData.totalValue)}
            </h3>
            <p className="text-gray-600 text-sm">Total Treasury Value</p>
          </div>

          {/* Assets Under Management */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-green-600">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(treasuryData.assetsUnderManagement)}
            </h3>
            <p className="text-gray-600 text-sm">Assets Under Management</p>
          </div>

          {/* Platform Revenue */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div className={`flex items-center ${treasuryData.platformRevenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {treasuryData.platformRevenueChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span className="text-sm font-semibold ml-1">
                  {treasuryData.platformRevenueChange}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(treasuryData.platformRevenue)}
            </h3>
            <p className="text-gray-600 text-sm">Platform Revenue (Annual)</p>
          </div>

          {/* Active Investors */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-green-600">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-semibold ml-1">
                  {treasuryData.investorChange}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatNumber(treasuryData.investorCount)}
            </h3>
            <p className="text-gray-600 text-sm">Active Investors</p>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
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
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Asset Allocation</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      {treasuryData.assets.map((asset, index) => (
                        <div key={asset.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full ${asset.color}`}></div>
                            <span className="font-medium text-gray-900">{asset.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">{formatCurrency(asset.value)}</div>
                            <div className="text-sm text-gray-600">{asset.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 flex items-center justify-center">
                      <div className="text-center">
                        <div className="relative w-48 h-48 mx-auto mb-4">
                          {/* Pie chart visualization would go here */}
                          <div className="absolute inset-0 rounded-full border-8 border-green-500"></div>
                          <div className="absolute inset-0 rounded-full border-8 border-blue-500 transform -rotate-45"></div>
                          <div className="absolute inset-0 rounded-full border-8 border-purple-500 transform -rotate-90"></div>
                          <div className="absolute inset-0 rounded-full border-8 border-yellow-500 transform -rotate-135"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-gray-900">100%</div>
                              <div className="text-sm text-gray-600">Allocated</div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">Total Asset Distribution</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Metrics Grid */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Key Financial Metrics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {treasuryData.financialMetrics.map((metric, index) => (
                      <div key={metric.label} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{metric.label}</h4>
                          <div className={`flex items-center ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {metric.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            <span className="text-sm font-semibold ml-1">
                              {metric.change}%
                            </span>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Revenue Tab */}
            {activeTab === 'revenue' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Streams</h3>
                  <div className="space-y-4">
                    {treasuryData.revenueStreams.map((stream, index) => (
                      <div key={stream.name} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{stream.name}</h4>
                          <div className={`flex items-center ${stream.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stream.change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            <span className="text-sm font-semibold ml-1">
                              {stream.change}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-gray-900">
                            {formatCurrency(stream.value)}
                          </div>
                          <div className="text-lg text-gray-600">
                            {stream.percentage}%
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${stream.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Allocations Tab */}
            {activeTab === 'allocations' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Fund Allocation Plan</h3>
                  <div className="space-y-4">
                    {treasuryData.allocationPlans.map((plan, index) => (
                      <div key={plan.category} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{plan.category}</h4>
                          <div className="text-lg font-bold text-blue-600">
                            {plan.percentage}%
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-3">
                          {formatCurrency(plan.amount)}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full" 
                            style={{ width: `${plan.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Transactions</h3>
                <div className="space-y-4">
                  {treasuryData.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${
                          transaction.type === 'Revenue' ? 'bg-green-100 text-green-600' :
                          transaction.type === 'Expense' ? 'bg-red-100 text-red-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {transaction.type === 'Revenue' ? <ArrowUpRight className="w-5 h-5" /> :
                           transaction.type === 'Expense' ? <ArrowDownRight className="w-5 h-5" /> :
                           <Coins className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{transaction.description}</div>
                          <div className="text-sm text-gray-600">{transaction.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold text-lg ${
                          transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount >= 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                        </div>
                        <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </div>
                      </div>
                    </div>
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
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-2xl font-bold mb-2">Secure & Compliant Treasury Management</h3>
              <p className="text-blue-100 text-lg">
                All funds are managed with institutional-grade security and regulatory compliance
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Bank-Grade Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Quarterly Audits</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Transparent Reporting</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
