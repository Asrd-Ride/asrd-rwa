'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { useWallet } from '@/contexts/WalletContext'
import { PieChart, BarChart, TrendingUp, DollarSign, Coins, Package } from 'lucide-react'

export default function Dashboard() {
  const { ownedAssets, platformStats, claimEarnings, isLoading } = useApp()
  const { balance, asrdBalance } = useWallet()

  const totalPortfolioValue = ownedAssets.reduce((sum, asset) => sum + asset.price, 0) * 32
  const totalUnclaimedEarnings = ownedAssets.reduce((sum, asset) => 
    sum + (asset.unclaimedWinnings || asset.unclaimedRent || 0), 0
  )

  const portfolioData = [
    { name: 'Horses', value: ownedAssets.filter(a => a.type === 'horse').length, color: 'var(--accent-success)' },
    { name: 'Real Estate', value: ownedAssets.filter(a => a.type === 'real-estate').length, color: 'var(--accent-primary)' }
  ]

  const earningsData = [
    { month: 'Jan', earnings: 45000 },
    { month: 'Feb', earnings: 52000 },
    { month: 'Mar', earnings: 48000 },
    { month: 'Apr', earnings: 61000 },
    { month: 'May', earnings: 55000 },
    { month: 'Jun', earnings: 72000 }
  ]

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
          Track your portfolio performance and earnings
        </motion.p>

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { 
              title: 'Total Portfolio', 
              value: `$${(totalPortfolioValue / 1000000).toFixed(2)}M`, 
              icon: DollarSign,
              color: 'text-accent-success',
              change: '+12.5%'
            },
            { 
              title: 'ASRD Balance', 
              value: asrdBalance.toLocaleString(), 
              icon: Coins,
              color: 'text-accent-primary',
              change: `${platformStats.price} USD`
            },
            { 
              title: 'Unclaimed Earnings', 
              value: `$${totalUnclaimedEarnings.toLocaleString()}`, 
              icon: TrendingUp,
              color: 'text-accent-secondary',
              change: 'Ready to claim'
            },
            { 
              title: 'Total Assets', 
              value: ownedAssets.length, 
              icon: Package,
              color: 'text-chart-4',
              change: `${portfolioData[0].value}H ${portfolioData[1].value}R`
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-sm text-accent-success font-semibold">{stat.change}</span>
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
            className="chart-container"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <PieChart className="w-6 h-6 mr-2 text-accent-success" />
              Portfolio Distribution
            </h3>
            <div className="flex items-center justify-center h-64">
              <div className="relative w-48 h-48">
                {portfolioData.map((item, index) => {
                  const percentage = (item.value / ownedAssets.length) * 100
                  const radius = 40
                  const circumference = 2 * Math.PI * radius
                  const strokeDasharray = circumference
                  const strokeDashoffset = circumference - (percentage / 100) * circumference
                  
                  return (
                    <circle
                      key={item.name}
                      cx="50%"
                      cy="50%"
                      r={radius}
                      fill="none"
                      stroke={item.color}
                      strokeWidth="8"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={index === 0 ? strokeDashoffset : 0}
                      transform="rotate(-90 60 60)"
                      className="transition-all duration-1000 ease-out"
                    />
                  )
                })}
                <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="text-2xl font-bold text-white">
                  {ownedAssets.length}
                </text>
              </div>
            </div>
            <div className="flex justify-center space-x-6 mt-6">
              {portfolioData.map((item, index) => (
                <div key={item.name} className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-neutral-mid text-sm">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Monthly Earnings */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="chart-container"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <BarChart className="w-6 h-6 mr-2 text-accent-primary" />
              Monthly Earnings (USD)
            </h3>
            <div className="flex items-end justify-between h-64 space-x-2">
              {earningsData.map((month, index) => (
                <div key={month.month} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-gradient-to-t from-accent-primary to-accent-success rounded-t transition-all duration-500 hover:opacity-80"
                    style={{ height: `${(month.earnings / 80000) * 100}%` }}
                  />
                  <div className="text-neutral-mid text-xs mt-2">{month.month}</div>
                  <div className="text-white text-xs font-semibold mt-1">
                    ${(month.earnings / 1000).toFixed(0)}K
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Owned Assets */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Your Assets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ownedAssets.map((asset, index) => (
              <motion.div
                key={asset.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-4 border border-white/10"
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
                    <div className="text-white font-semibold">${(asset.price * 32).toLocaleString()}</div>
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
                  className="w-full bg-accent-success text-financial-dark py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Claim Earnings'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
