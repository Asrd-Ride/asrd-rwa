'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { useWallet } from '@/contexts/WalletContext'
import { PieChart, BarChart, TrendingUp, DollarSign, Coins, Package, ArrowUpRight } from 'lucide-react'

export default function Dashboard() {
  const { ownedAssets, platformStats, claimEarnings, isLoading } = useApp()
  const { cashBalance, asrdBalance, getUsdValue } = useWallet()

  const totalPortfolioValue = ownedAssets.reduce((sum, asset) => sum + getUsdValue(asset.price), 0)
  const totalUnclaimedEarnings = ownedAssets.reduce((sum, asset) => 
    sum + (asset.unclaimedWinnings || asset.unclaimedRent || 0), 0
  )

  const portfolioData = [
    { name: 'Horses', value: ownedAssets.filter(a => a.type === 'horse').length, color: 'var(--accent-success)', percentage: ownedAssets.length > 0 ? (ownedAssets.filter(a => a.type === 'horse').length / ownedAssets.length) * 100 : 0 },
    { name: 'Real Estate', value: ownedAssets.filter(a => a.type === 'real-estate').length, color: 'var(--accent-primary)', percentage: ownedAssets.length > 0 ? (ownedAssets.filter(a => a.type === 'real-estate').length / ownedAssets.length) * 100 : 0 }
  ]

  const earningsData = [
    { month: 'Jan', earnings: 4500 },
    { month: 'Feb', earnings: 5200 },
    { month: 'Mar', earnings: 4800 },
    { month: 'Apr', earnings: 6100 },
    { month: 'May', earnings: 5500 },
    { month: 'Jun', earnings: 7200 }
  ]

  const maxEarnings = Math.max(...earningsData.map(d => d.earnings))

  return (
    <section id="dashboard" className="py-20 relative">
      <div className="container-pro">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-accent-success to-accent-primary bg-clip-text text-transparent">
            Investment Dashboard
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xl text-neutral-mid text-center mb-12"
        >
          Track your portfolio performance and earnings in real-time
        </motion.p>

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { 
              title: 'Total Portfolio', 
              value: `$${totalPortfolioValue.toLocaleString()}`, 
              icon: DollarSign,
              color: 'text-accent-success',
              change: '+12.5%',
              trend: 'up'
            },
            { 
              title: 'ASRD Balance', 
              value: asrdBalance.toFixed(2), 
              icon: Coins,
              color: 'text-accent-primary',
              change: `${platformStats.price} USD`,
              trend: 'price'
            },
            { 
              title: 'Unclaimed Earnings', 
              value: `$${totalUnclaimedEarnings.toLocaleString()}`, 
              icon: TrendingUp,
              color: 'text-accent-secondary',
              change: 'Ready to claim',
              trend: 'earnings'
            },
            { 
              title: 'Total Assets', 
              value: ownedAssets.length, 
              icon: Package,
              color: 'text-chart-4',
              change: `${portfolioData[0].value}H ${portfolioData[1].value}R`,
              trend: 'assets'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-6 card-hover border border-white/10"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-current/10 to-transparent ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                {stat.trend === 'up' && (
                  <div className="flex items-center text-accent-success text-sm font-semibold">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    {stat.change}
                  </div>
                )}
                {stat.trend !== 'up' && (
                  <div className="text-neutral-mid text-sm">{stat.change}</div>
                )}
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-neutral-mid text-sm">{stat.title}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Portfolio Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="chart-container border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <PieChart className="w-6 h-6 mr-2 text-accent-success" />
              Portfolio Distribution
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="relative w-48 h-48 mx-auto">
                  {/* Animated Pie Chart */}
                  <svg width="200" height="200" viewBox="0 0 42 42" className="transform -rotate-90">
                    {portfolioData.map((item, index) => {
                      const circumference = 2 * Math.PI * 16;
                      const strokeDasharray = circumference;
                      const strokeDashoffset = circumference - (item.percentage / 100) * circumference;
                      
                      return (
                        <motion.circle
                          key={item.name}
                          cx="21"
                          cy="21"
                          r="16"
                          fill="none"
                          stroke={item.color}
                          strokeWidth="3"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={index === 0 ? strokeDashoffset : 0}
                          initial={{ strokeDashoffset: circumference }}
                          animate={{ strokeDashoffset: index === 0 ? strokeDashoffset : 0 }}
                          transition={{ duration: 1.5, delay: index * 0.3 }}
                        />
                      )
                    })}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{ownedAssets.length}</div>
                      <div className="text-neutral-mid text-sm">Assets</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                {portfolioData.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-white text-sm">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{item.value}</div>
                      <div className="text-neutral-mid text-xs">{item.percentage.toFixed(0)}%</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Monthly Earnings */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="chart-container border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <BarChart className="w-6 h-6 mr-2 text-accent-primary" />
              Monthly Earnings (USD)
            </h3>
            <div className="flex items-end justify-between h-48 space-x-3 px-4">
              {earningsData.map((month, index) => (
                <motion.div
                  key={month.month}
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ 
                    height: `${(month.earnings / maxEarnings) * 80}%`,
                    opacity: 1 
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: "easeOut" 
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center flex-1 group cursor-pointer"
                >
                  <div 
                    className="w-full bg-gradient-to-t from-accent-primary to-accent-success rounded-t transition-all duration-300 group-hover:from-accent-success group-hover:to-accent-primary relative"
                    style={{ height: '100%' }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      ${month.earnings.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-neutral-mid text-xs mt-2">{month.month}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Owned Assets */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Your Assets</h3>
          {ownedAssets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ownedAssets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-4 border border-white/10 hover:border-accent-success/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{asset.name}</h4>
                      <p className="text-neutral-mid text-sm">{asset.location}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      asset.type === 'horse' 
                        ? 'bg-accent-success/20 text-accent-success' 
                        : 'bg-accent-primary/20 text-accent-primary'
                    }`}>
                      {asset.type === 'horse' ? 'Horse' : 'Real Estate'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-neutral-mid text-sm">Value</div>
                      <div className="text-white font-semibold">${getUsdValue(asset.price).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-neutral-mid text-sm">Unclaimed</div>
                      <div className="text-accent-success font-semibold">
                        ${(asset.unclaimedWinnings || asset.unclaimedRent || 0).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => claimEarnings(asset.id)}
                    disabled={isLoading || !(asset.unclaimedWinnings || asset.unclaimedRent)}
                    className="w-full bg-accent-success text-financial-dark py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-accent-success/90"
                  >
                    {isLoading ? 'Processing...' : 'Claim Earnings'}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-neutral-mid mx-auto mb-4" />
              <p className="text-neutral-mid text-lg">No assets owned yet</p>
              <p className="text-neutral-mid text-sm mt-2">Start building your portfolio in the marketplace</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
// Build fix - proper wallet context usage
