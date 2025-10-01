'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { TrendingUp, Users, Coins, Package } from 'lucide-react'

export default function PlatformStatsSection() {
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
      icon: TrendingUp
cat > src/components/sections/PlatformStatsSection.tsx << 'EOF'
'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { TrendingUp, Users, Coins, Package, Shield, Zap } from 'lucide-react'

export default function PlatformStatsSection() {
  const { platformStats } = useApp()

  const stats = [
    {
      icon: Coins,
      value: `$${platformStats.marketCap / 1000000}M`,
      label: 'Market Cap',
      change: '+12.5%',
      color: 'text-accent-success'
    },
    {
      icon: Package,
      value: platformStats.totalAssets.toString(),
      label: 'Total Assets',
      change: '+8',
      color: 'text-accent-primary'
    },
    {
      icon: TrendingUp,
      value: `$${(platformStats.totalValueLocked / 1000000).toFixed(0)}M`,
      label: 'Value Locked',
      change: '+15.2%',
      color: 'text-accent-secondary'
    },
    {
      icon: Users,
      value: '2,458',
      label: 'Active Investors',
      change: '+124',
      color: 'text-warning'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'Enterprise-level security protocols and insurance coverage'
    },
    {
      icon: Zap,
      title: 'Instant Settlement',
      description: '24/7 trading with instant settlement and global access'
    }
  ]

  return (
    <section className="py-20 relative">
      <div className="container-pro">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent-success to-accent-primary bg-clip-text text-transparent">
              Platform Excellence
            </span>
          </h2>
          <p className="text-xl text-neutral-mid max-w-2xl mx-auto">
            Trusted by thousands of investors worldwide with proven track record
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-6 text-center card-hover border border-white/10"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-neutral-mid text-sm mb-2">{stat.label}</div>
              <div className="text-accent-success text-xs font-semibold">{stat.change}</div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass-card rounded-2xl p-6 border border-accent-success/20"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent-success/20 rounded-xl">
                  <feature.icon className="w-6 h-6 text-accent-success" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-neutral-mid">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
