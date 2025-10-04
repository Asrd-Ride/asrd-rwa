'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useApp } from '@/contexts/AppContext'
import { useWallet } from '@/contexts/WalletContext'
import { TrendingUp, TrendingDown, Target, Zap, Clock, Award, BarChart3, PieChart } from 'lucide-react'

export default function PerformanceMetrics() {
  const { ownedAssets } = useApp()
  const { getUsdValue } = useWallet()
  const [timeRange, setTimeRange] = useState<'1w' | '1m' | '3m' | '1y'>('1m')

  // Calculate performance metrics
  const totalInvestmentASRD = ownedAssets.reduce((total, asset) => {
    const assetValue = asset.purchasePrice || asset.price || 0
    return total + assetValue
  }, 0)

  const totalEarnings = ownedAssets.reduce((total, asset) => {
    const earnings = asset.unclaimedWinnings || asset.unclaimedRent || 0
    return total + earnings
  }, 0)

  const totalDashboardValueASRD = totalInvestmentASRD + totalEarnings
  const totalDashboardValueUSD = getUsdValue(totalDashboardValueASRD)

  // Calculate asset performance
  const assetPerformance = ownedAssets.map(asset => {
    const value = asset.purchasePrice || asset.price || 0
    const earnings = asset.unclaimedWinnings || asset.unclaimedRent || 0
    const totalValue = value + earnings
    const roi = asset.roi || 12
    
    return {
      id: asset.id,
      name: asset.name,
      type: asset.type,
      value: totalValue,
      earnings,
      roi,
      growth: roi > 15 ? 'high' : roi > 10 ? 'medium' : 'low'
    }
  })

  // Generate performance history
  const performanceHistory = Array.from({ length: 12 }, (_, i) => {
    const baseValue = totalDashboardValueASRD * 0.7
    const growth = 1 + (i * 0.08) + (Math.random() * 0.1 - 0.05)
    return {
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      value: baseValue * growth,
      earnings: baseValue * growth * 0.15 * Math.random()
    }
  })

  const maxValue = Math.max(...performanceHistory.map(h => h.value))

  const performanceStats = [
    {
      label: 'Total Return',
      value: `${((totalEarnings / totalInvestmentASRD) * 100).toFixed(1)}%`,
      change: 12.5,
      icon: TrendingUp,
      color: 'text-emerald-400'
    },
    {
      label: 'Best Performer',
      value: assetPerformance.length > 0 
        ? assetPerformance.reduce((best, current) => current.roi > best.roi ? current : assetPerformance[0]).name
        : 'N/A',
      change: assetPerformance.length > 0 
        ? Math.max(...assetPerformance.map(a => a.roi))
        : 0,
      icon: Award,
      color: 'text-gold-glow'
    },
    {
      label: 'Avg. Holding Period',
      value: '4.2 months',
      change: 1.2,
      icon: Clock,
      color: 'text-sapphire-400'
    },
    {
      label: 'Dashboard Diversity',
      value: ownedAssets.length >= 2 ? 'Good' : 'Low',
      change: ownedAssets.length * 15,
      icon: PieChart,
      color: 'text-amethyst-400'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-3d p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm font-medium mb-2">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                  <div className={`flex items-center text-xs ${stat.change >= 0 ? 'text-emerald-400' : 'text-ruby-glow'}`}>
                    {stat.change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {Math.abs(stat.change).toFixed(1)}%
                  </div>
                </div>
                <div className="p-3 bg-slate-700/50 rounded-xl">
                  <Icon className="w-6 h-6 text-slate-300" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-3d p-6"
        >
          <h4 className="text-lg font-semibold text-white mb-6">Dashboard Growth</h4>
          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
              {performanceHistory.map((month, index) => (
                <div key={month.month} className="flex flex-col items-center space-y-2" style={{ flex: 1 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(month.value / maxValue) * 80}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="w-6 bg-gradient-to-t from-emerald-500 to-green-600 rounded-t-lg relative group cursor-pointer"
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      ${getUsdValue(month.value).toLocaleString()}
                    </div>
                  </motion.div>
                  <span className="text-slate-400 text-xs">{month.month}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Asset Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-3d p-6"
        >
          <h4 className="text-lg font-semibold text-white mb-6">Asset Performance</h4>
          <div className="space-y-4">
            {assetPerformance.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl"
              >
                <div>
                  <p className="text-white font-medium text-sm">{asset.name}</p>
                  <p className="text-slate-400 text-xs capitalize">{asset.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-semibold">{asset.roi}% ROI</p>
                  <p className={`text-xs ${
                    asset.growth === 'high' ? 'text-emerald-400' : 
                    asset.growth === 'medium' ? 'text-amber-400' : 'text-slate-400'
                  }`}>
                    {asset.growth === 'high' ? 'High Growth' : asset.growth === 'medium' ? 'Steady' : 'Developing'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
