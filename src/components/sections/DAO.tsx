'use client'
import { motion } from 'framer-motion'
import { Check, X, Users, Clock, Coins } from 'lucide-react'
import { mockProposals, platformStats } from '@/data/mockData'

export default function DAO() {
  return (
    <section id="dao" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-primary-cyan to-primary-violet bg-clip-text text-transparent">
            DAO Governance
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xl text-white/60 text-center mb-12"
        >
          Govern the future of Asset Ride. 1 ASRD = 1 Vote
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockProposals.map((proposal, index) => (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-primary-cyan/30 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{proposal.title}</h3>
                <div className="flex items-center space-x-1 px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400 border border-green-500/30">
                  <Clock className="w-3 h-3" />
                  <span>Active</span>
                </div>
              </div>
              
              <p className="text-white/60 mb-6">{proposal.description}</p>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-green-400">For: {proposal.votesFor.toLocaleString()} ASRD</span>
                  <span className="text-red-400">Against: {proposal.votesAgainst.toLocaleString()} ASRD</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-primary-cyan h-3 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-white/60 mt-1">
                  <span>${(proposal.votesFor * platformStats.price).toLocaleString()}</span>
                  <span>${(proposal.votesAgainst * platformStats.price).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 glow-cyan hover:glow-violet transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Vote For</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Vote Against</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 mt-12 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Users className="w-8 h-8 text-primary-cyan mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-white/60">DAO Members</div>
            </div>
            <div>
              <Check className="w-8 h-8 text-primary-cyan mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">18</div>
              <div className="text-white/60">Proposals Passed</div>
            </div>
            <div>
              <Coins className="w-8 h-8 text-primary-cyan mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{platformStats.circulatingSupply.toLocaleString()}</div>
              <div className="text-white/60">ASRD in Governance</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
