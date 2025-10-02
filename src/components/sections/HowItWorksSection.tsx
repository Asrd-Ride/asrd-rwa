'use client'
import { motion } from 'framer-motion'
import { Search, Coins, TrendingUp, Shield, Gem, Crown, Target, Zap } from 'lucide-react'

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: 'DISCOVER PREMIUM ASSETS',
      description: 'Explore our curated collection of elite thoroughbred racehorses and luxury real estate properties with transparent performance metrics.',
      color: 'text-emerald-glow',
      gradient: 'from-emerald-glow to-sapphire-glow',
      number: '01'
    },
    {
      icon: Coins,
      title: 'INVEST WITH ASRD TOKENS',
      description: 'Purchase fractional ownership using ASRD tokens. Start with as little as $50 and build your diversified portfolio of real-world assets.',
      color: 'text-sapphire-glow',
      gradient: 'from-sapphire-glow to-amethyst-glow',
      number: '02'
    },
    {
      icon: TrendingUp,
      title: 'EARN PASSIVE RETURNS',
      description: 'Receive automatic distributions from rental income, race winnings, and asset appreciation directly to your digital wallet.',
      color: 'text-amethyst-glow',
      gradient: 'from-amethyst-glow to-ruby-glow',
      number: '03'
    },
    {
      icon: Shield,
      title: 'SECURE & LIQUID',
      description: 'Your assets are blockchain-verified with institutional-grade security. Trade your fractional ownership 24/7 on our global marketplace.',
      color: 'text-gold-glow',
      gradient: 'from-gold-glow to-emerald-glow',
      number: '04'
    }
  ]

  return (
    <section className="py-20 immersive-bg relative overflow-hidden">
      {/* Background Particles */}
      <div className="particles">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              background: i % 4 === 0 ? 'var(--emerald-glow)' : 
                          i % 4 === 1 ? 'var(--sapphire-glow)' : 
                          i % 4 === 2 ? 'var(--amethyst-glow)' : 'var(--gold-glow)'
            }}
            animate={{
              y: [0, -400],
              x: [0, Math.random() * 80 - 40],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              delay: Math.random() * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container-pro relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black text-3d mb-6">
            HOW <span className="text-glow text-emerald-glow">ASSET RIDE</span> WORKS
          </h2>
          <p className="text-xl text-neutral-light max-w-3xl mx-auto">
            Simple, transparent, and secure process to invest in premium real-world assets through 
            <span className="text-emerald-glow font-semibold"> blockchain technology</span> and 
            <span className="text-sapphire-glow font-semibold"> fractional ownership</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 -left-4 z-20">
                <div className={`bg-gradient-to-r ${step.gradient} rounded-2xl px-4 py-2 backdrop-blur-sm border border-white/20 shadow-2xl`}>
                  <span className="text-luxury-deep font-black text-sm">{step.number}</span>
                </div>
              </div>

              {/* Main Card */}
              <div className="glass-3d p-8 h-full text-center group-hover:neon-glow">
                {/* Icon Container */}
                <div className={`relative mb-6 mx-auto w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <step.icon className="w-10 h-10 text-luxury-deep" />
                  
                  {/* Floating Animation */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-white/30"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>

                {/* Content */}
                <h3 className={`text-xl font-black mb-4 ${step.color} text-glow`}>
                  {step.title}
                </h3>

                <p className="text-neutral-light leading-relaxed text-sm">
                  {step.description}
                </p>

                {/* Hover Effect Line */}
                <motion.div
                  className={`h-1 bg-gradient-to-r ${step.gradient} rounded-full mt-6 mx-auto`}
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                />
              </div>

              {/* Connection Lines for Desktop */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-emerald-glow to-sapphire-glow z-10"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-3d inline-block px-8 py-6">
            <div className="flex items-center space-x-4">
              <Zap className="w-8 h-8 text-emerald-glow" />
              <div className="text-left">
                <h4 className="text-xl font-black text-white mb-1">READY TO START?</h4>
                <p className="text-neutral-light text-sm">Join thousands of investors building wealth with real-world assets</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-3d text-sm px-6 py-3"
              >
                GET STARTED
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
