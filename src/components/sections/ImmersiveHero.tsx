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
      subtitle: "Fractional ownership of premium assets through blockchain technology",
      gradient: "from-electric-cyan to-neon-purple"
    },
    {
      title: "UK Real Estate & Race Horses",
      subtitle: "Invest in premium UK properties and thoroughbred racehorses",
      gradient: "from-neon-purple to-electric-cyan"
    },
    {
      title: "Dubai & Australia Markets",
      subtitle: "Diversify with international real estate opportunities",
      gradient: "from-electric-cyan to-matrix-green"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [slides.length])

  const handleBuyASRD = (usdAmount: number) => {
    console.log('Buying ASRD tokens for USD:', usdAmount)
    setIsModalOpen(false)
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-space">
      {/* Enhanced Space Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-space-dark to-space-deep" />
      
      {/* Subtle Star Field */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-electric-cyan rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container-pro relative z-10">
        <div className="text-center">
          {/* Animated Logo/Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="glass-ref inline-block px-6 py-3 rounded-2xl mb-8 border border-electric-cyan/30"
          >
            <span className="bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent font-semibold">
              ASRD Price: $32.00 ↗
            </span>
          </motion.div>

          {/* Main Headline with Slide Animation */}
          <div className="relative h-48 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <h1 className="text-6xl md:text-8xl font-black mb-6">
                  <span className={`bg-gradient-to-r ${slides[currentSlide].gradient} bg-clip-text text-transparent`}>
                    {slides[currentSlide].title}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl leading-relaxed">
                  {slides[currentSlide].subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="glass-ref px-8 py-4 text-lg font-semibold border border-electric-cyan/30 text-electric-cyan hover:bg-electric-cyan hover:text-space-dark transition-all duration-300 rounded-2xl hover:scale-105"
            >
              Buy ASRD Tokens
            </button>
            <button className="glass-ref px-8 py-4 text-lg font-semibold border border-neon-purple/30 text-neon-purple hover:bg-neon-purple hover:text-white transition-all duration-300 rounded-2xl hover:scale-105">
              Explore Assets
            </button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: '$45M+', label: 'Total Value' },
              { value: '2.3K+', label: 'Investors' },
              { value: '98%', label: 'Success Rate' },
              { value: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-ref p-6 rounded-2xl text-center border border-electric-cyan/10 hover:border-electric-cyan/30 transition-all duration-300"
              >
                <div className="text-2xl md:text-3xl font-bold text-electric-cyan mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
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
