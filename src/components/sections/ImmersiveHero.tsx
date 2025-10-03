'use client'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useApp } from '@/contexts/AppContext'
import { useAuth } from '@/contexts/AuthContext'
import { platformStats } from '@/data/mockData'
import TokenPurchaseModal from '../ui/TokenPurchaseModal'
import { ArrowRight, Play, Star, TrendingUp, Coins, Gem, Crown, Sparkles, Users } from 'lucide-react'

export default function ImmersiveHero() {
  const { buyASRD, isLoading } = useApp()
  const { isAuthenticated } = useAuth()
  const [showTokenModal, setShowTokenModal] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 5])

  const handleBuyASRD = async (usdAmount: number) => {
    const success = await buyASRD(usdAmount)
    if (success) {
      console.log(`Successfully purchased $${usdAmount} worth of ASRD tokens`)
    } else {
      alert('Purchase failed: Insufficient cash balance')
    }
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-deep via-luxury-mid to-luxury-light" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 gap-4 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <motion.div
                key={i}
                className="border border-emerald-glow/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container-pro relative z-10">
        <motion.div
          className="text-center"
          style={{ y, opacity, scale, rotateY }}
        >
          {/* ASRD Price Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-3d inline-block px-6 py-3 rounded-2xl mb-8 border border-emerald-glow/30"
          >
            <div className="flex items-center space-x-3">
              <Coins className="w-6 h-6 text-emerald-glow" />
              <div className="text-left">
                <div className="text-2xl font-black text-emerald-glow">ASRD: $32</div>
                <div className="text-neutral-light text-sm">Platform Token</div>
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-black mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <span className="bg-gradient-to-r from-emerald-glow via-sapphire-glow to-amethyst-glow bg-clip-text text-transparent">
              ASSET RIDE
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-neutral-light max-w-3xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Fractional ownership of premium thoroughbreds and luxury real estate
            across <span className="text-emerald-glow font-semibold">UK, Australia & Dubai</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {isAuthenticated ? (
              <motion.a
                href="/portfolio"
                className="btn-3d px-8 py-4 text-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Go to Dashboard
              </motion.a>
            ) : (
              <motion.button
                onClick={() => {
                  const mockAddress = "0x" + Math.random().toString(16).slice(2, 42)
                  // This would be handled by AuthContext in real implementation
                  window.location.reload() // Simulate login
                }}
                className="btn-3d px-8 py-4 text-lg font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Connect Wallet to Invest
              </motion.button>
            )}
            
            <motion.a
              href="/marketplace"
              className="glass-3d px-8 py-4 text-lg font-semibold border border-emerald-glow/30 text-emerald-glow hover:bg-emerald-glow hover:text-luxury-deep transition-all duration-300 rounded-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Assets
            </motion.a>
          </motion.div>

          {/* Platform Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {[
              { value: '$42M+', label: 'Total Value', icon: TrendingUp },
              { value: '1,240+', label: 'Premium Assets', icon: Star },
              { value: '18.5%', label: 'Avg. ROI', icon: TrendingUp },
              { value: '5,200+', label: 'Investors', icon: Users },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-3d p-6 rounded-2xl text-center border border-emerald-glow/10"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-2xl md:text-3xl font-black text-emerald-glow mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-light text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Token Purchase Modal */}
      <TokenPurchaseModal
        isOpen={showTokenModal}
        onClose={() => setShowTokenModal(false)}
        onPurchase={handleBuyASRD}
      />
    </section>
  )
}
