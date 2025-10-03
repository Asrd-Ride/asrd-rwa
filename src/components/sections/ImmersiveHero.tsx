"use client"
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TokenPurchaseModal from '@/components/ui/TokenPurchaseModal'

const ImmersiveHero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const slides = [
    {
      title: "Tokenize Real World Assets",
      subtitle: "Fractional ownership of premium UK real estate and thoroughbred racehorses through blockchain technology",
      accent: "text-ocean-teal"
    },
    {
      title: "Premium Asset Investment",
      subtitle: "Access elite properties in UK, Dubai, and Australia with transparent performance metrics",
      accent: "text-royal-blue"
    },
    {
      title: "Blockchain-Powered Ownership",
      subtitle: "Secure, transparent fractional ownership with automated distributions and real-time tracking",
      accent: "text-emerald"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const handleBuyASRD = (usdAmount: number) => {
    console.log('Buying ASRD tokens for USD:', usdAmount)
    setIsModalOpen(false)
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-professional-dark">
      {/* Enhanced Professional Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-navy via-space-blue to-midnight" />
        
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        {/* Subtle Floating Elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-32 h-32 bg-gradient-to-r from-ocean-teal/10 to-royal-blue/10 rounded-full blur-xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${6 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-pro relative z-10">
        <div className="text-center">
          {/* Professional Badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="glass-professional inline-flex items-center gap-3 px-6 py-3 mb-12"
          >
            <div className="w-3 h-3 bg-emerald rounded-full animate-pulse" />
            <span className="text-lg font-semibold text-gray-200">
              ASRD Token: <span className="text-emerald font-bold">$32.00</span> ↗
            </span>
          </motion.div>

          {/* Main Headline with Professional Typography */}
          <div className="relative h-64 mb-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <h1 className="text-hero font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl leading-relaxed font-light">
                  {slides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Professional CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative bg-gradient-to-r from-ocean-teal to-royal-blue text-white px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-105 min-w-[200px]"
            >
              <span className="relative z-10">Buy ASRD Tokens</span>
              <div className="absolute inset-0 bg-gradient-to-r from-royal-blue to-ocean-teal rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button className="glass-professional text-white px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 min-w-[200px] border-ocean-teal/30">
              Explore Marketplace
            </button>
          </motion.div>

          {/* Professional Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: '$45M+', label: 'Total Asset Value', color: 'text-ocean-teal' },
              { value: '2,300+', label: 'Active Investors', color: 'text-royal-blue' },
              { value: '98%', label: 'Success Rate', color: 'text-emerald' },
              { value: '24/7', label: 'Platform Uptime', color: 'text-gold' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="glass-professional p-6 text-center hover:border-ocean-teal/50"
              >
                <div className={`text-2xl lg:text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Purchase Modal */}
      <TokenPurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBuyASRD}
      />
    </section>
  )
}

export default ImmersiveHero
