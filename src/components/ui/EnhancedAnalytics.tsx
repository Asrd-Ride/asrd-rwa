'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useApp } from '@/contexts/AppContext'
import { useWallet } from '@/contexts/WalletContext'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  LineChart,
  Target,
  Zap,
  Clock,
  Award,
  Users,
  Shield
} from 'lucide-react'

interface PerformanceData {
  timestamp: number
  portfolioValue: number
  earnings: number
  assetsCount: number
}

export default function EnhancedAnalytics() {
  const { ownedAssets } = useApp()
  const { getUsdValue } = useWallet()
  const [timeRange, setTimeRange] = useState<'1d' | '1w' | '1m' | '3m' | '1y'>('1m')
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])
  const [realTimeData, setRealTimeData] = useState<PerformanceData | null>(null)

  // Calculate real-time portfolio metrics
  const totalInvestmentASRD = ownedAssets.reduce((total, asset) => {
    const assetValue = asset.purchasePrice || asset.price || 0
    return total + assetValue
  }, 0)

  const totalInvestmentUSD = getUsdValue(totalInvestmentASRD)
  const totalEarnings = ownedAssets.reduce((total, asset) => {
    const earnings = asset.unclaimedWinnings || asset.unclaimedRent || 0
    return total + earnings
  }, 0)

  const totalEarningsUSD = getUsdValue(totalEarnings)
  const totalPortfolioValueASRD = totalInvestmentASRD + totalEarnings
  const totalPortfolioValueUSD = getUsdValue(totalPortfolioValueASRD)

  // Generate mock performance data based on time range
  useEffect(() => {
    const generatePerformanceData = () => {
      const now = Date.now()
      const dataPoints = timeRange === '1d' ? 24 : timeRange === '1w' ? 7 : timeRange === '1m' ? 30 : timeRange === '3m' ? 12 : 12
      const interval = timeRange === '1d' ? 3600000 : timeRange === '1w' ? 86400000 : timeRange === '1m' ? 86400000 : 2592000000

      const data: PerformanceData[] = []
      let baseValue = totalInvestmentASRD * 0.8 // Start from 80% of current value

      for (let i = dataPoints; i >= 0; i--) {
        const timestamp = now - (i * interval)
        // Simulate realistic growth with some randomness
        const growth = 1 + (Math.random() * 0.1 - 0.02)
        baseValue *= growth

        data.push({
          timestamp,
          portfolioValue: baseValue,
          earnings: baseValue * 0.05 * Math.random(),
          assetsCount: Math.max(1, Math.floor(ownedAssets.length * (0.5 + Math.random() * 0.5)))
        })
      }

      setPerformanceData(data)
      setRealTimeData(data[data.length - 1])
    }

    generatePerformanceData()

    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeData(prev => prev ? {
        ...prev,
        portfolioValue: prev.portfolioValue * (1 + (Math.random() * 0.02 - 0.01)),
        earnings: prev.earnings * (1 + (Math.random() * 0.05 - 0.025))
      } : null)
    }, 5000)

    return () => clearInterval(interval)
  }, [timeRange, totalInvestmentASRD, ownedAssets.length])

  // Calculate metrics
  const performanceChange = performanceData.length > 1
    ? ((performanceData[performanceData.length - 1].portfolioValue - performanceData[0].portfolioValue) / performanceData[0].portfolioValue) * 100
    : 0

  const assetAllocation = ownedAssets.reduce((acc, asset) => {
    const type = asset.type === 'horse' ? 'racehorses' : 'realEstate'
    const value = asset.purchasePrice || asset.price || 0
    acc[type] = (acc[type] || 0) + value
    return acc
  }, {} as Record<string, number>)

  // FIXED: Explicitly type Object.values to number[]
  const totalAllocation = (Object.values(assetAllocation) as number[]).reduce((sum: number, val: number) => sum + val, 0)
  
  // FIXED: Explicitly type the value parameter as number
  const allocationPercentages = Object.entries(assetAllocation).reduce((acc, [type, value]) => {
    acc[type] = ((value as number) / totalAllocation) * 100
    return acc
  }, {} as Record<string, number>)

  const performanceMetrics = [
    {
      label: 'Portfolio Value',
      value: `$${totalPortfolioValueUSD.toLocaleString()}`,
      change: performanceChange,
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/20'
    },
    {
      label: 'Total Earnings',
      value: `${totalEarnings.toFixed(0)} ASRD`,
      change: 8.2,
      icon: TrendingUp,
      color: 'text-sapphire-400',
      bgColor: 'bg-sapphire-500/20'
    },
    {
      label: 'Assets Owned',
      value: ownedAssets.length.toString(),
      change: ownedAssets.length > 0 ? 25 : 0,
      icon: PieChart,
      color: 'text-amethyst-400',
      bgColor: 'bg-amethyst-500/20'
    },
    {
      label: 'Avg. ROI',
      value: '16.8%',
      change: 2.1,
      icon: Target,
      color: 'text-gold-glow',
      bgColor: 'bg-yellow-500/20'
    }
  ]

  const maxPortfolioValue = Math.max(...performanceData.map(d => d.portfolioValue))
  const maxEarnings = Math.max(...performanceData.map(d => d.earnings))

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">Portfolio Analytics</h3>
        <div className="flex space-x-2 glass-3d rounded-2xl p-1">
          {(['1d', '1w', '1m', '3m', '1y'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                timeRange === range
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-3d p-6 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-2">{metric.label}</p>
                  <p className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</p>
                  <div className={`flex items-center text-xs ${metric.change >= 0 ? 'text-emerald-400' : 'text-ruby-glow'}`}>
                    {metric.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {Math.abs(metric.change).toFixed(1)}%
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${metric.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-6 h-6 text-slate-300" />
                </div>
              </div>

              {/* Animated background effect */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-sapphire-500/10 rounded-full blur-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Interactive Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Performance Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-3d p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-white">Performance Trend</h4>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                <span className="text-slate-400">Portfolio Value</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-sapphire-400 rounded"></div>
                <span className="text-slate-400">Earnings</span>
              </div>
            </div>
          </div>

          <div className="h-64 relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-1 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-r border-slate-600/30 last:border-r-0" />
              ))}
            </div>

            {/* Chart Lines */}
            <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
              {performanceData.map((data, index) => (
                <div key={data.timestamp} className="flex flex-col items-center space-y-2 relative" style={{ flex: 1 }}>
                  {/* Portfolio Value Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.portfolioValue / maxPortfolioValue) * 80}%` }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                    className="w-6 bg-gradient-to-t from-emerald-500 to-emerald-600 rounded-t-lg relative group cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ${getUsdValue(data.portfolioValue).toLocaleString()}
                    </div>
                  </motion.div>

                  {/* Earnings Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '4px' }}
                    transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
                    className="w-1 bg-sapphire-400 rounded-full"
                    style={{ height: `${(data.earnings / maxEarnings) * 40}%` }}
                  />

                  {/* Time Label */}
                  <span className="text-slate-400 text-xs">
                    {timeRange === '1d' ? new Date(data.timestamp).getHours() + 'h' :
                     timeRange === '1w' ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date(data.timestamp).getDay()] :
                     new Date(data.timestamp).getDate() + '/' + (new Date(data.timestamp).getMonth() + 1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Asset Allocation & Quick Stats */}
        <div className="space-y-6">
          {/* Asset Allocation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-3d p-6"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Asset Allocation</h4>
            <div className="space-y-4">
              {Object.entries(allocationPercentages).map(([type, percentage], index) => (
                <div key={type} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 capitalize">{type}</span>
                    <span className="text-white font-semibold">{percentage.toFixed(1)}%</span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="h-2 bg-slate-700 rounded-full overflow-hidden"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                      className={`h-full rounded-full ${
                        type === 'racehorses'
                          ? 'bg-gradient-to-r from-emerald-500 to-green-600'
                          : 'bg-gradient-to-r from-sapphire-500 to-blue-600'
                      }`}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-3d p-6"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Portfolio Health</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-400 text-sm">Diversity Score</span>
                </div>
                <span className="text-emerald-400 font-semibold">High</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-sapphire-400" />
                  <span className="text-slate-400 text-sm">Risk Level</span>
                </div>
                <span className="text-sapphire-400 font-semibold">Medium</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-gold-glow" />
                  <span className="text-slate-400 text-sm">Performance</span>
                </div>
                <span className="text-gold-glow font-semibold">Excellent</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Real-time Updates Indicator */}
      {realTimeData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-3d p-4 border border-emerald-500/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-emerald-400 rounded-full"
                />
              </div>
              <div>
                <p className="text-emerald-300 text-sm font-medium">Live Portfolio Update</p>
                <p className="text-slate-400 text-xs">
                  Current value: ${getUsdValue(realTimeData.portfolioValue).toLocaleString()}
                </p>
              </div>
            </div>
            <Clock className="w-4 h-4 text-slate-500" />
          </div>
        </motion.div>
      )}
    </div>
  )
}
