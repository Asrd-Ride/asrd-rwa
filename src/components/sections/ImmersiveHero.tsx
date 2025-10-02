'use client'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useApp } from '@/contexts/AppContext'
import { platformStats } from '@/data/mockData'
import TokenPurchaseModal from '../ui/TokenPurchaseModal'
import { ArrowRight, Play, Star, TrendingUp, Coins, Gem, Crown, Sparkles } from 'lucide-react'

export default function ImmersiveHero() {
  const { buyASRD, isLoading } = useApp()
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

  // Particle system
  const Particle = ({ style, delay }: any) => (
    <motion.div
      className="particle"
      style={style}
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: [0, 1, 0],
        y: [-100, -500],
        x: [0, Math.random() * 100 - 50]
      }}
      transition={{
        duration: Math.random() * 3 + 2,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )

  return (
    <>
      <section ref={containerRef} className="min-h-screen immersive-bg relative overflow-hidden">
        {/* Animated Particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <Particle
              key={i}
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                background: i % 3 === 0 ? 'var(--emerald-glow)' : i % 3 === 1 ? 'var(--sapphire-glow)' : 'var(--amethyst-glow)'
              }}
              delay={Math.random() * 2}
            />
          ))}
        </div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-glow rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
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
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sapphire-glow rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-amethyst-glow rounded-full blur-3xl opacity-15"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        <div className="container-pro relative z-10">
          <div className="min-h-screen flex items-center justify-center pt-20">
            <div className="text-center max-w-6xl mx-auto">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center glass-3d px-6 py-3 mb-8"
              >
                <Crown className="w-5 h-5 text-gold-glow mr-2" />
                <span className="text-gold-glow text-sm font-bold tracking-wider">
                  PREMIUM REAL-WORLD ASSETS
                </span>
                <Sparkles className="w-4 h-4 text-gold-glow ml-2" />
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-3d leading-tight">
                  ASSET RIDE
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-2xl md:text-3xl text-neutral-light mb-8 max-w-4xl mx-auto leading-relaxed"
                >
                  Where <span className="text-glow text-emerald-glow">Elite Thoroughbreds</span> meet{' '}
                  <span className="text-glow text-sapphire-glow">Luxury Real Estate</span> in the{' '}
                  <span className="text-glow text-amethyst-glow">Blockchain Revolution</span>
                </motion.p>
              </motion.div>

              {/* ASRD Token Showcase */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="glass-3d inline-block px-8 py-6 mb-12 neon-glow"
              >
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-black text-3d mb-2">ASRD</div>
                    <div className="text-emerald-glow text-lg font-semibold">Utility Token</div>
                  </div>
                  <div className="h-16 w-px bg-gradient-to-b from-emerald-glow to-sapphire-glow"></div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-sapphire-glow mb-2">${platformStats.price}</div>
                    <div className="text-neutral-mid text-sm">Per Token</div>
                  </div>
                  <div className="h-16 w-px bg-gradient-to-b from-sapphire-glow to-amethyst-glow"></div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-amethyst-glow mb-2">
                      ${(platformStats.marketCap / 1000000).toFixed(0)}M
                    </div>
                    <div className="text-neutral-mid text-sm">Market Cap</div>
                  </div>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              >
                <motion.button
                  onClick={() => setShowTokenModal(true)}
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-3d text-lg px-12 py-6"
                >
                  <Coins className="w-6 h-6 mr-3" />
                  {isLoading ? 'PROCESSING...' : 'BUY ASRD TOKENS'}
                </motion.button>

                <motion.a
                  href="/marketplace"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-3d-outline text-lg px-12 py-6"
                >
                  <Gem className="w-6 h-6 mr-3" />
                  EXPLORE ASSETS
                </motion.a>
              </motion.div>

              {/* Real Asset Previews */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              >
                {/* Racehorse Card */}
                <motion.div
                  className="glass-3d p-6 text-center group cursor-pointer"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-glow to-sapphire-glow rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-10 h-10 text-luxury-deep" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-glow mb-2">Elite Racehorses</h3>
                  <p className="text-neutral-mid text-sm mb-4">Champion thoroughbreds with proven track records</p>
                  <div className="text-emerald-glow font-semibold">15-25% ROI</div>
                </motion.div>

                {/* Real Estate Card */}
                <motion.div
                  className="glass-3d p-6 text-center group cursor-pointer"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-sapphire-glow to-amethyst-glow rounded-2xl flex items-center justify-center">
                    <Gem className="w-10 h-10 text-luxury-deep" />
                  </div>
                  <h3 className="text-xl font-bold text-sapphire-glow mb-2">Luxury Real Estate</h3>
                  <p className="text-neutral-mid text-sm mb-4">Premium properties in global prime locations</p>
                  <div className="text-sapphire-glow font-semibold">8-12% ROI</div>
                </motion.div>

                {/* Token Benefits Card */}
                <motion.div
                  className="glass-3d p-6 text-center group cursor-pointer"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amethyst-glow to-emerald-glow rounded-2xl flex items-center justify-center">
                    <Coins className="w-10 h-10 text-luxury-deep" />
                  </div>
                  <h3 className="text-xl font-bold text-amethyst-glow mb-2">ASRD Tokens</h3>
                  <p className="text-neutral-mid text-sm mb-4">Governance, staking, and premium access</p>
                  <div className="text-amethyst-glow font-semibold">$32 per token</div>
                </motion.div>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-14 border-2 border-emerald-glow/50 rounded-full flex justify-center"
                >
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1 h-4 bg-emerald-glow rounded-full mt-3"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Token Purchase Modal */}
      <TokenPurchaseModal
        isOpen={showTokenModal}
        onClose={() => setShowTokenModal(false)}
        onConfirm={handleBuyASRD}
      />
    </>
  )
}
