'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-dark/90 to-black"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-primary-cyan via-primary-violet to-primary-cyan bg-clip-text text-transparent">
            Own Premium Assets
          </span>
          <br />
          <span className="text-white">With Asset Ride</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl text-white/80 mb-12 max-w-2xl mx-auto"
        >
          Tokenized horses and real estate NFTs. Experience the future of asset ownership with blockchain technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary-cyan to-primary-violet text-white px-8 py-4 rounded-xl font-semibold text-lg glow-cyan"
          >
            Explore Marketplace
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-primary-cyan text-primary-cyan px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-cyan/10 transition-colors"
          >
            Buy ASRD
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto"
        >
          {[
            { value: '150+', label: 'Total NFTs' },
            { value: '$2.5M', label: 'Rent Distributed' },
            { value: '$15M', label: 'Treasury Balance' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="glass rounded-xl p-6 border border-primary-cyan/20"
            >
              <div className="text-2xl font-bold text-primary-cyan">{stat.value}</div>
              <div className="text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
