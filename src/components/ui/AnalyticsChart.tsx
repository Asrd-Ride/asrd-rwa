'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { useWallet } from '@/contexts/WalletContext'
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react'

export default function AnalyticsChart() {
  const { ownedAssets } = useApp()
  const { getUsdValue } = useWallet()

  // Calculate dashboard metrics
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
  
  // Mock performance data
  const performanceData = [
    { month: 'Jan', value: 10000, earnings: 500 },
    { month: 'Feb', value: 12000, earnings: 800 },
    { month: 'Mar', value: 15000, earnings: 1200 },
    { month: 'Apr', value: 14000, earnings: 1000 },
    { month: 'May', value: 18000, earnings: 1500 },
    { month: 'Jun', value: 22000, earnings: 2000 },
  ]

  const maxValue = Math.max(...performanceData.map(d => d.value))
  const maxEarnings = Math.max(...performanceData.map(d => d.earnings))

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-3d p-6 text-center"
        >
          <DollarSign className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">${totalInvestmentUSD.toLocaleString()}</div>
          <div className="text-slate-400 text-sm">Total Investment</div>
          <div className="text-emerald-400 text-sm mt-1">+12.5%</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-3d p-6 text-center"
        >
          <TrendingUp className="w-8 h-8 text-sapphire-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">${totalEarningsUSD.toLocaleString()}</div>
          <div className="text-slate-400 text-sm">Total Earnings</div>
          <div className="text-sapphire-400 text-sm mt-1">+8.2% ROI</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-3d p-6 text-center"
        >
          <PieChart className="w-8 h-8 text-amethyst-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white">{ownedAssets.length}</div>
          <div className="text-slate-400 text-sm">Assets Owned</div>
          <div className="text-amethyst-400 text-sm mt-1">Diversified</div>
        </motion.div>
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-3d p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Dashboard Performance</h3>
        <div className="h-64 relative">
          {/* Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-1 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border-r border-slate-600/30 last:border-r-0" />
            ))}
          </div>

          {/* Chart Bars */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-8">
            {performanceData.map((data, index) => (
              <motion.div
                key={data.month}
                initial={{ height: 0 }}
                animate={{ height: `${(data.value / maxValue) * 80}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex flex-col items-center space-y-2"
              >
                {/* Earnings Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '4px' }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                  className="w-1 bg-sapphire-400 rounded-full"
                  style={{ height: `${(data.earnings / maxEarnings) * 40}%` }}
                />
                
                {/* Value Bar */}
                <motion.div
                  className="w-8 bg-gradient-to-t from-emerald-500 to-emerald-600 rounded-t-lg relative group"
                  whileHover={{ scale: 1.1 }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${data.value.toLocaleString()}
                  </div>
                </motion.div>
                
                <span className="text-slate-400 text-xs">{data.month}</span>
              </motion.div>
            ))}
          </div>

          {/* Y-axis Labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-slate-400 text-xs py-4">
            <span>${maxValue.toLocaleString()}</span>
            <span>${(maxValue / 2).toLocaleString()}</span>
            <span>$0</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center space-x-6 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded"></div>
            <span className="text-slate-400 text-sm">Dashboard Value</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-sapphire-400 rounded"></div>
            <span className="text-slate-400 text-sm">Monthly Earnings</span>
          </div>
        </div>
      </motion.div>

      {/* Asset Allocation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-3d p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Asset Allocation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart Placeholder */}
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-sapphire-500 rounded-full"
              />
              <div className="absolute inset-4 bg-luxury-dark rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-lg">100%</span>
              </div>
            </div>
          </div>
          
          {/* Allocation Details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Racehorses</span>
              <span className="text-emerald-400 font-bold">65%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Real Estate</span>
              <span className="text-sapphire-400 font-bold">35%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Total Diversity</span>
              <span className="text-amethyst-400 font-bold">High</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
