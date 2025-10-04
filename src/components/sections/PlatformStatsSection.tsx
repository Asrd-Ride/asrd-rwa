'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { TrendingUp, Users, Coins, Package, Shield, Zap, Target, Award } from 'lucide-react'

export default function PlatformStatsSection() {
  const { platformStats } = useApp()

  const stats = [
    {
      icon: Coins,
      value: `$${platformStats.marketCap / 1000000}M`,
      label: 'Market Cap',
      change: '+12.5%',
      color: 'text-emerald-glow',
      gradient: 'from-emerald-glow to-sapphire-glow'
    },
    {
      icon: Package,
      value: platformStats.totalAssets.toString(),
      label: 'Premium Assets',
      change: '+8',
      color: 'text-sapphire-glow',
      gradient: 'from-sapphire-glow to-amethyst-glow'
    },
    {
      icon: TrendingUp,
      value: `$${(platformStats.totalValueLocked / 1000000).toFixed(0)}M`,
      label: 'Value Locked',
      change: '+15.2%',
      color: 'text-amethyst-glow',
      gradient: 'from-amethyst-glow to-ruby-glow'
    },
    {
      icon: Users,
      value: '45,231',
      label: 'Active Investors',
      change: '+1,247',
      color: 'text-gold-glow',
      gradient: 'from-gold-glow to-emerald-glow'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'INSTITUTIONAL SECURITY',
      description: 'Bank-grade security protocols with $50M insurance coverage and regular third-party audits',
      color: 'text-emerald-glow'
    },
    {
      icon: Zap,
      title: 'REAL-TIME SETTLEMENT',
      description: '24/7 global trading with instant settlement and transparent blockchain verification',
      color: 'text-sapphire-glow'
    },
    {
      icon: Target,
      title: 'PROVEN PERFORMANCE',
      description: 'Consistent 15-25% ROI across asset classes with transparent performance tracking',
      color: 'text-amethyst-glow'
    },
    {
      icon: Award,
      title: 'PREMIUM CURATION',
      description: 'Rigorous due diligence process selecting only top-tier horses and luxury properties',
      color: 'text-gold-glow'
    }
  ]

  return (
    <section className="py-20 immersive-bg relative">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-emerald-glow/5 to-transparent" />
      
      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-emerald-glow rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-sapphire-glow rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1.2, 1, 1.2],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="container-pro relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-3d mb-6">
            PLATFORM <span className="text-glow text-emerald-glow">EXCELLENCE</span>
          </h2>
          <p className="text-xl text-neutral-light max-w-3xl mx-auto">
            Trusted by <span className="text-emerald-glow font-semibold">45,231+ investors</span> worldwide with 
            <span className="text-sapphire-glow font-semibold"> proven track record</span> and 
            <span className="text-amethyst-glow font-semibold"> institutional-grade security</span>
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="glass-3d p-8 text-center group-hover:neon-glow">
                {/* Icon with Gradient Background */}
                <div className={`relative mb-6 mx-auto w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon className="w-8 h-8 text-luxury-deep" />
                  
                  {/* Pulsing Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-white/40"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Value */}
                <div className={`text-3xl font-black mb-2 ${stat.color} text-glow`}>
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-neutral-light text-sm font-semibold mb-3 uppercase tracking-wider">
                  {stat.label}
                </div>

                {/* Change Indicator */}
                <div className="inline-flex items-center px-3 py-1 bg-luxury-dark/50 rounded-full border border-emerald-glow/30">
                  <TrendingUp className="w-3 h-3 text-emerald-glow mr-1" />
                  <span className="text-emerald-glow text-xs font-bold">{stat.change}</span>
                </div>

                {/* Hover Line */}
                <motion.div
                  className={`h-1 bg-gradient-to-r ${stat.gradient} rounded-full mt-4 mx-auto`}
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="glass-3d p-8 group-hover:neon-glow">
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className={`p-4 bg-gradient-to-r from-luxury-dark to-luxury-mid rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`text-xl font-black mb-3 ${feature.color} text-glow`}>
                      {feature.title}
                    </h3>
                    <p className="text-neutral-light leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Animated Underline */}
                    <motion.div
                      className={`h-0.5 bg-gradient-to-r ${feature.color === 'text-emerald-glow' ? 'from-emerald-glow to-sapphire-glow' : 
                                 feature.color === 'text-sapphire-glow' ? 'from-sapphire-glow to-amethyst-glow' :
                                 feature.color === 'text-amethyst-glow' ? 'from-amethyst-glow to-ruby-glow' : 
                                 'from-gold-glow to-emerald-glow'} rounded-full mt-4`}
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-3d inline-flex items-center space-x-6 px-8 py-6">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-emerald-glow" />
              <span className="text-white font-bold">$50M INSURANCE COVERAGE</span>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-gold-glow" />
              <span className="text-white font-bold">REGULAR SECURITY AUDITS</span>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div className="flex items-center space-x-2">
              <Target className="w-6 h-6 text-sapphire-glow" />
              <span className="text-white font-bold">99.9% UPTIME</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
