import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { useWallet } from '@/contexts/WalletContext'
import {
  DollarSign, TrendingUp, Users, PieChart, Coins,
  Clock, Calendar, MapPin, Star, Award, Zap,
  Home, Horse, Download, ArrowUpRight, ArrowDownRight,
  ChevronRight, Gift, BarChart3, Target, Shield,
  Wallet, Landmark, CreditCard, Activity, Building
} from 'lucide-react'

export default function DashboardPage() {
  const { ownedAssets, isLoading } = useApp()
  const { asrdBalance, cashBalance, getUsdValue } = useWallet()
  const [activeTab, setActiveTab] = useState('overview')
  const [timeframe, setTimeframe] = useState('1y')
  const [portfolioData, setPortfolioData] = useState<number[]>([])

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
      icon: Home,
      status: 'ready'
    },
    {
      id: 2,
      type: 'winnings',
      assetName: 'Thoroughbred Racehorse "Velocity"',
      amount: 8500,
      currency: 'USD',
      description: 'Race winnings - Kentucky Derby',
      claimDate: '2024-03-14',
      icon: Horse,
      status: 'ready'
    },
    {
      id: 3,
      type: 'dividend',
      assetName: 'Commercial Office Complex',
      amount: 6200,
      currency: 'USD',
      description: 'Quarterly dividend distribution',
      claimDate: '2024-03-16',
      icon: Building,
      status: 'ready'
    }
  ]

  // Enhanced portfolio metrics
  const portfolioMetrics = {
    totalValue: 125000,
    totalValueChange: 12.5,
    monthlyIncome: 27200,
    monthlyIncomeChange: 8.2,
    totalEarned: 85600,
    totalEarnedChange: 15.7,
    activeInvestments: ownedAssets.length,
    portfolioDiversity: 65,
    averageROI: 14.2
  }


  // Enhanced owned assets with proper images and detailed metrics
  const enhancedAssets = ownedAssets.map(asset => ({
    ...asset,
    monthlyEarnings: asset.category === "Equine" ? Math.floor(Math.random() * 5000) + 2000 : Math.floor(Math.random() * 8000) + 3000,
    nextPayout: "2024-04-01",
    totalEarned: Math.floor(Math.random() * 50000) + 10000,
    performance: Math.random() > 0.5 ? "up" : "down",
    performanceValue: (Math.random() * 20 - 5).toFixed(1),
    riskLevel: asset.category === "Equine" ? "Medium-High" : "Medium",
    liquidity: asset.category === "Equine" ? "Quarterly" : "Monthly"
  }))
  }))

  const totalPortfolioValue = enhancedAssets.reduce((sum, asset) => sum + ((asset as any).purchasePrice || asset.price * 32), 0)
  const totalEarnings = enhancedAssets.reduce((sum, asset) => sum + ((asset as any).totalEarned || 0), 0)
  const monthlyIncome = enhancedAssets.reduce((sum, asset) => sum + ((asset as any).monthlyEarnings || 0), 0)

  const handleClaimEarnings = (earning: any) => {
    alert(`Successfully claimed ${earning.amount.toLocaleString()} ${earning.currency} from ${earning.assetName}`)
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
    { id: 'investments', label: 'My Investments', icon: BarChart3 },
    { id: 'earnings', label: 'Earnings & Claims', icon: DollarSign },
    { id: 'performance', label: 'Performance', icon: Activity }
  ]

  // Mock chart data
  // Mock chart data
  useEffect(() => {
    // Simulate fetching portfolio data
    const data = timeframe === "1m" ? [12000, 19000, 15000, 25000, 22000, 30000, 28000, 32000, 30000, 35000, 33000, 38000] :
               timeframe === "3m" ? [45000, 52000, 48000, 62000] :
               timeframe === "1y" ? [185000, 225000] :
               [185000, 225000];
    setPortfolioData(data);
  }, [timeframe])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Header with 3D Effect */}
      <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
        <div className="relative container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">Investment Dashboard</h1>
              <p className="text-blue-200 text-lg">
                Comprehensive overview of your portfolio performance and assets
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="1m">Last Month</option>
                <option value="3m">Last 3 Months</option>
                <option value="1y">Last Year</option>
                <option value="all">All Time</option>
              </select>
              <button className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats Grid with 3D Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Portfolio Value */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="flex items-center text-green-300">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-semibold ml-1">
                  +{portfolioMetrics.totalValueChange}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {formatCurrency(portfolioMetrics.totalValue)}
            </h3>
            <p className="text-blue-100 text-sm">Total Portfolio Value</p>
          </motion.div>

          {/* Monthly Income */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="flex items-center text-green-300">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-semibold ml-1">
                  +{portfolioMetrics.monthlyIncomeChange}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {formatCurrency(portfolioMetrics.monthlyIncome)}
            </h3>
            <p className="text-green-100 text-sm">Monthly Income</p>
          </motion.div>

          {/* ASRD Balance */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Coins className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {asrdBalance.toLocaleString()} ASRD
            </h3>
            <p className="text-orange-100 text-sm">ASRD Balance</p>
            <p className="text-orange-200 text-sm mt-1">
              {formatCurrency(getUsdValue(asrdBalance))} USD
            </p>
          </motion.div>

          {/* Total Earned */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="flex items-center text-green-300">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-semibold ml-1">
                  +{portfolioMetrics.totalEarnedChange}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {formatCurrency(portfolioMetrics.totalEarned)}
            </h3>
            <p className="text-purple-100 text-sm">Total Earned</p>
          </motion.div>
        </motion.div>

        {/* Claimable Earnings Banner */}
        {claimableEarnings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-2xl p-6 text-white mb-8 shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Gift className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Earnings Ready to Claim!</h3>
                </div>
                <p className="text-green-100">
                  You have {claimableEarnings.length} earnings distributions waiting to be claimed
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleClaimAll}
                  className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors flex items-center space-x-2 shadow-lg"
                >
                  <Zap className="w-4 h-4" />
                  <span>Claim All (${claimableEarnings.reduce((sum, e) => sum + e.amount, 0).toLocaleString()})</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Portfolio Overview */}
          <div className="xl:col-span-2 space-y-8">
            {/* Tabs Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
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
                  <div className="space-y-6">
                    {/* Performance Chart Section */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Portfolio Performance</h3>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="flex items-center space-x-1 text-green-600">
                            <ArrowUpRight className="w-4 h-4" />
                            <span>+{portfolioMetrics.totalValueChange}%</span>
                          </div>
                          <span className="text-gray-500">Past {timeframe}</span>
                        </div>
                      </div>
                      <div className="h-64 bg-white/50 rounded-xl p-4 backdrop-blur-sm">
                        {/* Chart would be implemented with a charting library */}
                        <div className="flex items-end justify-between h-full">
                          {portfolioData.map((value, index) => (
                            <div key={index} className="flex flex-col items-center space-y-2">
                              <div 
                                className="w-6 bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg transition-all duration-300 hover:opacity-80"
                                style={{ height: `${(value / 40000) * 100}%` }}
                              ></div>
                              <span className="text-xs text-gray-600">{value / 1000}k</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">{portfolioMetrics.activeInvestments}</div>
                        <div className="text-sm text-gray-600">Active Investments</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                        <div className="text-2xl font-bold text-green-600">{portfolioMetrics.averageROI}%</div>
                        <div className="text-sm text-gray-600">Avg. ROI</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                        <div className="text-2xl font-bold text-blue-600">{portfolioMetrics.portfolioDiversity}%</div>
                        <div className="text-sm text-gray-600">Diversity</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                        <div className="text-2xl font-bold text-purple-600">{enhancedAssets.length}</div>
                        <div className="text-sm text-gray-600">Total Assets</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Investments Tab */}
                {activeTab === 'investments' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Your Investment Portfolio</h3>
                    <div className="space-y-4">
                      {enhancedAssets.map((asset, index) => (
                        <motion.div
                          key={asset.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-start space-x-4">
                            <img
                              src={asset.image}
                              alt={asset.name}
                              className="w-16 h-16 object-cover rounded-xl"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{asset.name}</h4>
                                  <div className="flex items-center text-gray-600 text-sm mt-1">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {asset.location}
                                  </div>
                                </div>
                                <div className={`flex items-center space-x-1 ${
                                  asset.performance === 'up' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {asset.performance === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                  <span className="text-sm font-semibold">{asset.performanceValue}%</span>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <div className="text-gray-600">Your Share</div>
                                  <div className="font-semibold">{((asset.fractionOwned || 1) * 100).toFixed(1)}%</div>
                                </div>
                                <div>
                                  <div className="text-gray-600">Monthly Income</div>
                                  <div className="font-semibold text-green-600">{formatCurrency((asset as any).monthlyEarnings)}</div>
                                </div>
                                <div>
                                  <div className="text-gray-600">Risk Level</div>
                                  <div className="font-semibold">{asset.riskLevel}</div>
                                </div>
                                <div>
                                  <div className="text-gray-600">Liquidity</div>
                                  <div className="font-semibold">{asset.liquidity}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Earnings Tab */}
                {activeTab === 'earnings' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Earnings & Distribution</h3>
                    <div className="space-y-4">
                      {claimableEarnings.map((earning, index) => {
                        const Icon = earning.icon
                        return (
                          <motion.div
                            key={earning.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-r from-white to-green-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-shadow"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="p-3 bg-green-100 rounded-xl">
                                  <Icon className="w-6 h-6 text-green-600" />
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
                                  className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center space-x-2 shadow-lg"
                                >
                                  <Zap className="w-4 h-4" />
                                  <span>Claim</span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Performance Tab */}
                {activeTab === 'performance' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Portfolio Analytics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-2xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Asset Allocation</h4>
                        <div className="space-y-3">
                          {enhancedAssets.map((asset, index) => (
                            <div key={asset.id} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">{asset.name}</span>
                              <span className="font-semibold">{((asset.fractionOwned || 1) * 100).toFixed(1)}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Performance Metrics</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-700">Total Return</span>
                            <span className="font-semibold text-green-600">+{portfolioMetrics.totalValueChange}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-700">Volatility</span>
                            <span className="font-semibold">12.3%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-700">Sharpe Ratio</span>
                            <span className="font-semibold">1.8</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Purchase', asset: 'Vineyard Estate', amount: '1,200 ASRD', time: '2 hours ago' },
                  { action: 'Earning', asset: 'Miami Villa', amount: '$2,500', time: '1 day ago' },
                  { action: 'Purchase', asset: 'Racehorse Velocity', amount: '800 ASRD', time: '3 days ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{activity.action}</div>
                      <div className="text-sm text-gray-600">{activity.asset}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{activity.amount}</div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-2xl"
            >
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-colors flex items-center space-x-3">
                  <Coins className="w-5 h-5" />
                  <span>Buy ASRD Tokens</span>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-colors flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5" />
                  <span>Explore Investments</span>
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-4 text-left hover:bg-white/30 transition-colors flex items-center space-x-3">
                  <Download className="w-5 h-5" />
                  <span>Download Tax Report</span>
                </button>
              </div>
            </motion.div>

            {/* Portfolio Health */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Portfolio Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Diversity Score</span>
                    <span className="font-semibold">{portfolioMetrics.portfolioDiversity}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${portfolioMetrics.portfolioDiversity}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Risk Level</span>
                    <span className="font-semibold text-orange-600">Medium</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Liquidity</span>
                    <span className="font-semibold text-blue-600">Good</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
