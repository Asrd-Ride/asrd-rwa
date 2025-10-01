'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { TrendingUp, Users, Coins, Package } from 'lucide-react'

export default function PlatformStats() {
  const { platformStats } = useApp()

  const stats = [
    {
      icon: Coins,
      value: `$${platformStats.marketCap / 1000000}M`,
      label: 'Market Cap',
      change: '+12.5%'
    },
    {
      icon: Package,
      value: platformStats.totalAssets.toString(),
      label: 'Total Assets',
      change: '+8'
    },
    {
      icon: TrendingUp,
      value: `$${(platformStats.totalValueLocked / 1000000).toFixed(0)}M`,
      label: 'Value Locked',
      change: '+15.2%'
    },
    {
      icon: Users,
      value: '2,458',
      label: 'Investors',
      change: '+124'
    }
  ]

  return (
    <section className="py-20 relative">
      <div className="container-pro">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent-success to-accent-primary bg-clip-text text-transparent">
              Platform Growth
            </span>
          </h2>
          <p className="text-xl text-neutral-mid max-w-2xl mx-auto">
            Leading the revolution in real-world asset tokenization with proven results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-6 text-center card-hover"
            >
              <stat.icon className="w-8 h-8 text-accent-success mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-neutral-mid text-sm mb-2">{stat.label}</div>
              <div className="text-accent-success text-xs font-semibold">{stat.change}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
