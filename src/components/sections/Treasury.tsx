'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { TrendingUp, TrendingDown, DollarSign, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function Treasury() {
  const { treasury, platformStats } = useApp()

  const treasuryValueUSD = treasury.balance * 32
  const monthlyNetFlow = treasury.monthlyInflow - treasury.monthlyOutflow

  return (
    <section id="treasury" className="py-20 relative">
      <div className="container-pro">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
            Platform Treasury
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xl text-neutral-mid text-center mb-12"
        >
          Transparent management of platform funds and reserves
        </motion.p>

        {/* Treasury Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Treasury Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 lg:col-span-2"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Treasury Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent-success mb-2">
                  ${(treasuryValueUSD / 1000000).toFixed(1)}M
                </div>
                <div className="text-neutral-mid">Total Value</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {treasury.balance.toLocaleString()} ASRD
                </div>
                <div className="text-neutral-mid">Token Balance</div>
              </div>
            </div>

            {/* Cash Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center text-accent-success mb-1">
                  <ArrowUpRight className="w-5 h-5 mr-1" />
                  <span className="text-lg font-semibold">${(treasury.monthlyInflow * 32 / 1000).toFixed(0)}K</span>
                </div>
                <div className="text-neutral-mid text-sm">Monthly Inflow</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-error mb-1">
                  <ArrowDownRight className="w-5 h-5 mr-1" />
                  <span className="text-lg font-semibold">${(treasury.monthlyOutflow * 32 / 1000).toFixed(0)}K</span>
                </div>
                <div className="text-neutral-mid text-sm">Monthly Outflow</div>
              </div>
              <div className="text-center">
                <div className={`flex items-center justify-center ${
                  monthlyNetFlow >= 0 ? 'text-accent-success' : 'text-error'
                } mb-1`}>
                  {monthlyNetFlow >= 0 ? <TrendingUp className="w-5 h-5 mr-1" /> : <TrendingDown className="w-5 h-5 mr-1" />}
                  <span className="text-lg font-semibold">${Math.abs(monthlyNetFlow * 32 / 1000).toFixed(0)}K</span>
                </div>
                <div className="text-neutral-mid text-sm">Net Flow</div>
              </div>
            </div>
          </motion.div>

          {/* Asset Allocation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
              <PieChart className="w-6 h-6 mr-2 text-accent-primary" />
              Asset Allocation
            </h3>
            
            <div className="space-y-4">
              {[
                { name: 'Real Estate', percentage: treasury.assets.realEstate, color: 'var(--accent-primary)' },
                { name: 'Horses', percentage: treasury.assets.horses, color: 'var(--accent-success)' }
              ].map((asset, index) => (
                <div key={asset.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-neutral-mid">{asset.name}</span>
                    <span className="text-white font-semibold">{asset.percentage}%</span>
                  </div>
                  <div className="w-full bg-neutral-dark rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${asset.percentage}%`,
                        backgroundColor: asset.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Platform Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Platform Statistics</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { 
                label: 'Total Value Locked', 
                value: `$${(platformStats.totalValueLocked / 1000000).toFixed(0)}M`,
                change: '+15.2%',
                positive: true
              },
              { 
                label: 'Market Cap', 
                value: `$${(platformStats.marketCap / 1000000).toFixed(0)}M`,
                change: '+8.7%',
                positive: true
              },
              { 
                label: 'Total Assets', 
                value: platformStats.totalAssets.toString(),
                change: '+3',
                positive: true
              },
              { 
                label: 'ASRD Price', 
                value: `$${platformStats.price}`,
                change: '+2.4%',
                positive: true
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-neutral-mid text-sm mb-1">{stat.label}</div>
                <div className={`text-xs font-semibold ${
                  stat.positive ? 'text-accent-success' : 'text-error'
                }`}>
                  {stat.change}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Treasury Usage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mt-8"
        >
          <h4 className="text-lg font-semibold text-white mb-4">Treasury Usage</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-mid">
            <div>
              <div className="text-accent-success font-semibold mb-2">Asset Acquisition</div>
              <p>65% of treasury funds are allocated to acquiring premium real-world assets with proven revenue streams.</p>
            </div>
            <div>
              <div className="text-accent-success font-semibold mb-2">Platform Development</div>
              <p>20% supports ongoing platform development, security audits, and feature enhancements.</p>
            </div>
            <div>
              <div className="text-accent-success font-semibold mb-2">Community Rewards</div>
              <p>10% is distributed as staking rewards and governance participation incentives.</p>
            </div>
            <div>
              <div className="text-accent-success font-semibold mb-2">Emergency Reserve</div>
              <p>5% maintained as liquid reserve for market opportunities and risk management.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
