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
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      title: "UK Real Estate & Race Horses",
      subtitle: "Invest in premium UK properties and thoroughbred racehorses",
      gradient: "from-cyan-600 to-blue-500"
    },
    {
      title: "Dubai & Australia Markets",
      subtitle: "Diversify with international real estate opportunities",
      gradient: "from-blue-500 to-indigo-500"
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
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Clean Light Blue Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container-pro relative z-10">
        <div className="text-center">
          {/* Animated Logo/Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="bg-white/80 backdrop-blur-sm inline-block px-6 py-3 rounded-2xl mb-8 border border-blue-300 shadow-lg"
          >
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent font-semibold">
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
                <p className="text-xl md:text-2xl text-gray-700 max-w-4xl leading-relaxed">
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold border border-blue-500 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Buy ASRD Tokens
            </button>
            <button className="bg-white/80 hover:bg-white text-gray-800 px-8 py-4 text-lg font-semibold border border-blue-300 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl backdrop-blur-sm">
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
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl text-center border border-blue-300 shadow-lg"
              >
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Purchase Modal - Fixed props */}
      <TokenPurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleBuyASRD}
      />
    </section>
  )
}

export default ImmersiveHero
