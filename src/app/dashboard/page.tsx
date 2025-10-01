'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { useWallet } from '@/contexts/WalletContext'
import {
  DollarSign, TrendingUp, Users, PieChart, Coins,
  Clock, Calendar, MapPin, Star, Award,
  Home, Horse, Download, ArrowUpRight,
  ChevronRight, Zap, Gift
} from 'lucide-react'

export default function DashboardPage() {
  const { ownedAssets, claimEarnings, isLoading } = useApp()
  const { asrdBalance, cashBalance, getUsdValue } = useWallet()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for earnings that can be claimed
  const claimableEarnings = [
    {
      id: 1,
      type: 'rental',
      assetName: 'Luxury Miami Beach Villa',
      amount: 12500,
      currency: 'USD',
      description: 'Monthly rental income',
      claimDate: '2024-03-15',
      icon: Home
    },
    {
      id: 2,
      type: 'winnings',
      assetName: 'Thoroughbred Racehorse "Velocity"',
      amount: 8500,
      currency: 'USD',
      description: 'Race winnings - Kentucky Derby',
      claimDate: '2024-03-14',
      icon: Horse
    },
    {
      id: 3,
      type: 'rental',
      assetName: 'Commercial Office Complex',
      amount: 8900,
      currency: 'USD',
      description: 'Monthly rental income',
      claimDate: '2024-03-15',
      icon: Home
    }
  ]

  // Enhanced owned assets with proper images and details
  const enhancedAssets = ownedAssets.map(asset => ({
    ...asset,
    // Add proper image URLs based on category
    image: asset.image || (asset.category === 'Equine' 
      ? 'https://images.unsplash.com/photo-1502262023338-9d5c0b49ea0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
      : 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'),
    monthlyEarnings: asset.category === 'Equine' 
      ? Math.floor(Math.random() * 5000) + 2000
      : Math.floor(Math.random() * 8000) + 3000,
    nextPayout: '2024-04-01',
    totalEarned: Math.floor(Math.random() * 50000) + 10000
  }))

  const totalPortfolioValue = enhancedAssets.reduce((sum, asset) => sum + (asset.purchasePrice || asset.price), 0)
  const totalEarnings = enhancedAssets.reduce((sum, asset) => sum + (asset.totalEarned || 0), 0)
  const monthlyIncome = enhancedAssets.reduce((sum, asset) => sum + (asset.monthlyEarnings || 0), 0)

  const handleClaimEarnings = (earning: any) => {
    alert(`Successfully claimed ${earning.amount.toLocaleString()} ${earning.currency} from ${earning.assetName}`)
    // In a real app, this would call claimEarnings function
  }

  const handleClaimAll = () => {
    const total = claimableEarnings.reduce((sum, earning) => sum + earning.amount, 0)
    alert(`Successfully claimed all earnings: $${total.toLocaleString()} USD`)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const tabs = [
    { id: 'overview', label: 'Portfolio Overview', icon: PieChart },
    { id: 'assets', label: 'My Assets', icon: Home },
    { id: 'earnings', label: 'Earnings', icon: DollarSign }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Investment Dashboard</h1>
              <p className="text-gray-600 text-lg">
                Manage your portfolio and track your earnings
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Portfolio Value */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <PieChart className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-green-600">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(totalPortfolioValue)}
            </h3>
            <p className="text-gray-600 text-sm">Portfolio Value</p>
          </div>

          {/* ASRD Balance */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Coins className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {asrdBalance.toLocaleString()} ASRD
            </h3>
            <p className="text-gray-600 text-sm">ASRD Balance</p>
          </div>

          {/* Monthly Income */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(monthlyIncome)}
            </h3>
            <p className="text-gray-600 text-sm">Monthly Income</p>
          </div>

          {/* Total Earned */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(totalEarnings)}
            </h3>
            <p className="text-gray-600 text-sm">Total Earned</p>
          </div>
        </motion.div>

        {/* Claimable Earnings Banner */}
        {claimableEarnings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white mb-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Gift className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Earnings Ready to Claim!</h3>
                </div>
                <p className="text-green-100">
                  You have {claimableEarnings.length} earnings waiting to be claimed
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleClaimAll}
                  className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors flex items-center space-x-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Claim All Earnings</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
                        ? 'border-purple-500 text-purple-600'
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
                {/* Claimable Earnings */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Ready to Claim</h3>
                  <div className="space-y-4">
                    {claimableEarnings.map((earning, index) => {
                      const Icon = earning.icon
                      return (
                        <motion.div
                          key={earning.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm">
                              <Icon className="w-6 h-6 text-gray-700" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{earning.assetName}</h4>
                              <p className="text-gray-600 text-sm">{earning.description}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <div className="flex items-center space-x-1 text-sm text-gray-500">
                                  <Calendar className="w-4 h-4" />
                                  <span>Available {earning.claimDate}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">
                                {formatCurrency(earning.amount)}
                              </div>
                              <div className="text-sm text-gray-600">{earning.currency}</div>
                            </div>
                            <button
                              onClick={() => handleClaimEarnings(earning)}
                              className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center space-x-2"
                            >
                              <Zap className="w-4 h-4" />
                              <span>Claim</span>
                            </button>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Asset Performance */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Asset Performance</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {enhancedAssets.map((asset, index) => (
                      <motion.div
                        key={asset.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start space-x-4">
                          <img
                            src={asset.image}
                            alt={asset.name}
                            className="w-20 h-20 object-cover rounded-xl"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{asset.name}</h4>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                                {asset.roi}% ROI
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm mb-3">
                              <MapPin className="w-4 h-4 mr-1" />
                              {asset.location}
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-gray-600">Monthly Income</div>
                                <div className="font-semibold text-green-600">
                                  {formatCurrency(asset.monthlyEarnings)}
                                </div>
                              </div>
                              <div>
                                <div className="text-gray-600">Next Payout</div>
                                <div className="font-semibold">{asset.nextPayout}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* My Assets Tab */}
            {activeTab === 'assets' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Your NFT Assets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enhancedAssets.map((asset, index) => (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={asset.image}
                          alt={asset.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                            {asset.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {asset.roi}% ROI
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h4 className="font-bold text-gray-900 text-lg mb-2">{asset.name}</h4>
                        <div className="flex items-center text-gray-600 text-sm mb-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          {asset.location}
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Your Share:</span>
                            <span className="font-semibold">
                              {asset.fractionOwned ? `${(asset.fractionOwned * 100).toFixed(1)}%` : '100%'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Investment:</span>
                            <span className="font-semibold">
                              {asset.purchasePrice ? asset.purchasePrice.toLocaleString() : asset.price.toLocaleString()} ASRD
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Monthly Income:</span>
                            <span className="font-semibold text-green-600">
                              {formatCurrency(asset.monthlyEarnings)}
                            </span>
                          </div>
                        </div>

                        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                          <span>Manage Asset</span>
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Earnings Tab */}
            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Earnings History</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Export History
                  </button>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Asset</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {claimableEarnings.map((earning, index) => {
                        const Icon = earning.icon
                        return (
                          <tr key={earning.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-3">
                                <Icon className="w-5 h-5 text-gray-600" />
                                <span className="font-medium text-gray-900">{earning.assetName}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="capitalize">{earning.type}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-green-600 font-semibold">
                                {formatCurrency(earning.amount)}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">{earning.claimDate}</td>
                            <td className="px-6 py-4">
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                Ready to Claim
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-2xl font-bold mb-2">Need Help With Your Investments?</h3>
              <p className="text-blue-100 text-lg">
                Our team is here to help you maximize your returns and manage your portfolio.
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Contact Support
              </button>
              <button className="bg-transparent border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Investment Guide
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
