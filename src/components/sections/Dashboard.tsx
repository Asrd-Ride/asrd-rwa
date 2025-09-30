'use client'
import { motion } from 'framer-motion'
import { Coins, TrendingUp, Package } from 'lucide-react'
import { ownedAssets } from '@/data/mockData'
import { useWallet } from '@/contexts/WalletContext'

export default function Dashboard() {
  const { asrdBalance } = useWallet()

  const totalUnclaimed = ownedAssets.reduce((sum, asset) => {
    return sum + (asset.unclaimedWinnings || 0) + (asset.unclaimedRent || 0)
  }, 0)

  return (
    <section id="dashboard" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-primary-cyan to-primary-violet bg-clip-text text-transparent">
            Your Dashboard
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xl text-white/60 text-center mb-12"
        >
          Manage your tokenized assets and track your earnings
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="glass rounded-2xl p-6 text-center border border-primary-cyan/20">
            <Coins className="w-8 h-8 text-primary-cyan mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{asrdBalance.toLocaleString()} ASRD</div>
            <div className="text-white/60">Wallet Balance</div>
          </div>
          
          <div className="glass rounded-2xl p-6 text-center border border-primary-violet/20">
            <TrendingUp className="w-8 h-8 text-primary-violet mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{totalUnclaimed} ASRD</div>
            <div className="text-white/60">Unclaimed Earnings</div>
          </div>
          
          <div className="glass rounded-2xl p-6 text-center border border-green-500/20">
            <Package className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{ownedAssets.length}</div>
            <div className="text-white/60">Owned Assets</div>
          </div>
        </motion.div>

        {totalUnclaimed > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-primary-cyan text-white px-8 py-4 rounded-xl font-semibold text-lg glow-cyan"
            >
              Claim All Earnings ({totalUnclaimed} ASRD)
            </motion.button>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ownedAssets.map((asset, index) => (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-primary-cyan/50 transition-all"
            >
              <div className="relative h-48 bg-gradient-to-br from-primary-cyan/20 to-primary-violet/20 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-4 right-4 bg-primary-cyan text-primary-dark px-3 py-1 rounded-full text-sm font-semibold">
                  {asset.type === 'horse' ? '🐎 Horse' : '🏠 Real Estate'}
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{asset.name}</h3>
                  <div className="text-white/80 text-sm">{asset.location}</div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-white/70 text-sm mb-4">{asset.description}</p>
                  
                  {asset.type === 'horse' && asset.unclaimedWinnings && (
                    <div className="bg-primary-cyan/10 border border-primary-cyan/30 rounded-lg p-4 mb-4">
                      <div className="text-primary-cyan font-semibold mb-1">
                        🏆 Unclaimed Winnings
                      </div>
                      <div className="text-white font-bold text-lg">{asset.unclaimedWinnings} ASRD</div>
                      <div className="text-white/60 text-sm">From recent races</div>
                    </div>
                  )}

                  {asset.type === 'real-estate' && asset.unclaimedRent && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                      <div className="text-green-400 font-semibold mb-1">
                        💰 Unclaimed Rent
                      </div>
                      <div className="text-white font-bold text-lg">{asset.unclaimedRent} ASRD</div>
                      <div className="text-white/60 text-sm">Monthly rental income</div>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-primary-cyan to-primary-violet text-white py-3 rounded-xl font-semibold glow-cyan"
                >
                  {asset.type === 'horse' ? 'Claim Winnings' : 'Claim Rent'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
