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
      gradient: "from-[#00D1FF] to-[#7B61FF]"
    },
    {
      title: "UK Real Estate & Race Horses",
      subtitle: "Invest in premium UK properties and thoroughbred racehorses",
      gradient: "from-[#7B61FF] to-[#00D1FF]"
    },
    {
      title: "Dubai & Australia Markets",
      subtitle: "Diversify with international real estate opportunities",
      gradient: "from-[#00D1FF] to-[#00FF88]"
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
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0F2C]">
      {/* Enhanced Space Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F2C] to-[#050517]" />
      
      {/* Subtle Star Field */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00D1FF] rounded-full animate-pulse"
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
            className="bg-white/5 backdrop-blur-lg border border-white/10 inline-block px-6 py-3 rounded-2xl mb-8 border-[#00D1FF]/30 shadow-lg"
          >
            <span className="bg-gradient-to-r from-[#00D1FF] to-[#7B61FF] bg-clip-text text-transparent font-semibold">
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
              className="bg-white/5 backdrop-blur-lg border border-[#00D1FF]/30 text-[#00D1FF] hover:bg-[#00D1FF] hover:text-[#0A0F2C] px-8 py-4 text-lg font-semibold transition-all duration-300 rounded-2xl hover:scale-105 shadow-lg"
            >
              Buy ASRD Tokens
            </button>
            <button className="bg-white/5 backdrop-blur-lg border border-[#7B61FF]/30 text-[#7B61FF] hover:bg-[#7B61FF] hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300 rounded-2xl hover:scale-105 shadow-lg">
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
                className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl text-center hover:border-[#00D1FF]/30 transition-all duration-300 shadow-lg"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#00D1FF] mb-2">
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
