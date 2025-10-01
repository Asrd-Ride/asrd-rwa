'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play, Star } from 'lucide-react'

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleWatchDemo = () => {
    setIsPlaying(true)
    // Demo video functionality can be added later
    console.log('Starting demo video...')
  }

  const stats = [
    { value: '$2.1B+', label: 'Total Assets' },
    { value: '18.5%', label: 'Avg. ROI' },
    { value: '45K+', label: 'Investors' },
    { value: '99.9%', label: 'Uptime' }
  ]

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
              >
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-blue-200 text-sm font-medium">
                  Trusted by 45,000+ investors worldwide
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Own the Future of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Investing
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl text-gray-300 mb-8 max-w-2xl"
              >
                Fractional ownership of premium real-world assets through blockchain technology. 
                Start investing in thoroughbred racehorses and luxury real estate with as little as $10.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <Link
                  href="/marketplace"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  Explore Assets
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                
                <button
                  onClick={handleWatchDemo}
                  className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white font-semibold text-lg px-8 py-4 rounded-xl border border-white/20 transition-all duration-200 transform hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Asset Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden">
                {/* 3D Card Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm border border-white/10"></div>
                
                {/* Floating Assets with Real Images */}
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotateY: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-8 left-8 w-32 h-40 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 overflow-hidden"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1502262023338-9d5c0b49ea0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    alt="Racehorse"
                    className="w-full h-20 object-cover"
                  />
                  <div className="p-2">
                    <div className="text-white text-sm font-semibold">Racehorse</div>
                    <div className="text-green-400 text-xs">15.2% ROI</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, 15, 0],
                    rotateY: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute bottom-8 right-8 w-36 h-44 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 overflow-hidden"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                    alt="Villa"
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-2">
                    <div className="text-white text-sm font-semibold">Villa</div>
                    <div className="text-green-400 text-xs">8.7% ROI</div>
                  </div>
                </motion.div>

                {/* Central Glowing Orb */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl"
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  )
}
