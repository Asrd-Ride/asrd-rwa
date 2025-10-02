'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Zap, Crown, Gem, Rocket, Users, Shield } from 'lucide-react'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 immersive-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-glow rounded-full blur-3xl opacity-15"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sapphire-glow rounded-full blur-3xl opacity-15"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-amethyst-glow rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Particles */}
      <div className="particles">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: i % 5 === 0 ? 'var(--emerald-glow)' : 
                          i % 5 === 1 ? 'var(--sapphire-glow)' : 
                          i % 5 === 2 ? 'var(--amethyst-glow)' : 
                          i % 5 === 3 ? 'var(--gold-glow)' : 'var(--ruby-glow)'
            }}
            animate={{
              y: [0, -500],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              delay: Math.random() * 3,
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
          className="text-center"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center glass-3d px-6 py-3 mb-8"
          >
            <Crown className="w-5 h-5 text-gold-glow mr-2" />
            <span className="text-gold-glow text-sm font-black tracking-wider">
              ELITE INVESTMENT PLATFORM
            </span>
            <Gem className="w-4 h-4 text-gold-glow ml-2" />
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-black text-3d mb-6"
          >
            READY TO <span className="text-glow text-emerald-glow">REVOLUTIONIZE</span><br />
            YOUR <span className="text-glow text-sapphire-glow">INVESTING</span>?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-neutral-light mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Join <span className="text-emerald-glow font-semibold">45,231+ elite investors</span> already building generational wealth through 
            <span className="text-sapphire-glow font-semibold"> tokenized real-world assets</span>. Start with as little as $50 and access 
            <span className="text-amethyst-glow font-semibold"> institutional-grade opportunities</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <Link href="/marketplace">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-3d text-lg px-12 py-6 flex items-center"
              >
                <Rocket className="w-6 h-6 mr-3" />
                START INVESTING NOW
                <ArrowRight className="w-6 h-6 ml-3" />
              </motion.button>
            </Link>

            <Link href="/portfolio">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="btn-3d-outline text-lg px-12 py-6 flex items-center"
              >
                <Zap className="w-6 h-6 mr-3" />
                VIEW PORTFOLIO
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="glass-3d inline-flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 px-8 py-6"
          >
            {/* Rating */}
            <div className="flex items-center space-x-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold-glow fill-current" />
                ))}
              </div>
              <div className="text-left">
                <div className="text-white font-black text-lg">4.9/5</div>
                <div className="text-neutral-mid text-sm">Platform Rating</div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-white/20 hidden sm:block"></div>

            {/* Investors */}
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-emerald-glow" />
              <div className="text-left">
                <div className="text-white font-black text-lg">45,231+</div>
                <div className="text-neutral-mid text-sm">Active Investors</div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-white/20 hidden sm:block"></div>

            {/* Uptime */}
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5 text-sapphire-glow" />
              <div className="text-left">
                <div className="text-white font-black text-lg">99.9%</div>
                <div className="text-neutral-mid text-sm">Platform Uptime</div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-white/20 hidden sm:block"></div>

            {/* Assets */}
            <div className="flex items-center space-x-3">
              <Gem className="w-5 h-5 text-amethyst-glow" />
              <div className="text-left">
                <div className="text-white font-black text-lg">$95M+</div>
                <div className="text-neutral-mid text-sm">Assets Managed</div>
              </div>
            </div>
          </motion.div>

          {/* Security Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-8"
          >
            <div className="inline-flex items-center space-x-2 text-neutral-mid text-sm">
              <Shield className="w-4 h-4 text-emerald-glow" />
              <span>Bank-Grade Security • $50M Insurance • Regular Audits</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-emerald-glow/10 to-transparent pointer-events-none" />
    </section>
  )
}
