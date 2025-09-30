'use client'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react'
import { treasuryData } from '@/data/mockData'

export default function Treasury() {
  const netFlow = treasuryData.monthlyInflow - treasuryData.monthlyOutflow

  return (
    <section id="treasury" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-primary-cyan to-primary-violet bg-clip-text text-transparent">
            Treasury Management
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xl text-white/60 text-center mb-12"
        >
          Transparent financial operations and asset management
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 max-w-4xl mx-auto mb-12 border border-primary-cyan/20"
        >
          <div className="text-center mb-8">
            <DollarSign className="w-12 h-12 text-primary-cyan mx-auto mb-4" />
            <div className="text-4xl font-bold text-primary-cyan mb-2">
              ${(treasuryData.balance / 1000000).toFixed(1)}M
            </div>
            <div className="text-white/60">Total Treasury Balance</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                +${(treasuryData.monthlyInflow / 1000000).toFixed(1)}M
              </div>
              <div className="text-white/60">Monthly Inflow</div>
            </div>
            
            <div className="text-center">
              <TrendingDown className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">
                -${(treasuryData.monthlyOutflow / 1000000).toFixed(1)}M
              </div>
              <div className="text-white/60">Monthly Outflow</div>
            </div>
            
            <div className="text-center">
              <PieChart className="w-8 h-8 text-primary-violet mx-auto mb-2" />
              <div className={`text-2xl font-bold ${netFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {netFlow >= 0 ? '+' : ''}${(netFlow / 1000000).toFixed(1)}M
              </div>
              <div className="text-white/60">Net Monthly Flow</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Asset Allocation</h3>
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary-cyan rounded"></div>
                <span className="text-white/80">Real Estate: {treasuryData.assets.realEstate}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary-violet rounded"></div>
                <span className="text-white/80">Horses: {treasuryData.assets.horses}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4 mt-2 max-w-md mx-auto">
              <div 
                className="bg-gradient-to-r from-primary-cyan to-primary-violet h-4 rounded-full transition-all duration-1000"
                style={{ width: `${treasuryData.assets.realEstate}%` }}
              ></div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-cyan to-primary-violet text-white px-6 py-3 rounded-xl font-semibold glow-cyan flex items-center justify-center space-x-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Simulate Monthly Rent</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-violet to-purple-600 text-white px-6 py-3 rounded-xl font-semibold glow-violet flex items-center justify-center space-x-2"
            >
              <DollarSign className="w-4 h-4" />
              <span>Simulate Race Result</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { value: '98%', label: 'Asset Performance', color: 'text-green-400' },
            { value: '6.2%', label: 'Average Yield', color: 'text-primary-cyan' },
            { value: '45', label: 'Active Assets', color: 'text-primary-violet' },
            { value: '$2.1M', label: 'Monthly Revenue', color: 'text-yellow-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-xl p-6 text-center border border-white/10"
            >
              <div className={`text-2xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
