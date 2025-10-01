'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { Clock, Zap } from 'lucide-react'

export default function AuctionBar() {
  const { auctionTimeLeft } = useApp()

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-30 mt-16"
    >
      <div className="bg-gradient-to-r from-accent-success/10 to-accent-primary/10 border-y border-accent-success/20 backdrop-blur-sm">
        <div className="container-pro">
          <div className="flex flex-col sm:flex-row items-center justify-center py-3 space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-accent-success" />
              <span className="text-accent-success font-semibold text-sm">LIVE AUCTION</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-warning" />
              <span className="text-white font-medium text-sm">Ending in:</span>
              <span className="text-warning font-mono font-bold text-sm">{formatTime(auctionTimeLeft)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-neutral-mid text-sm">Minimum:</span>
              <span className="text-accent-success font-semibold text-sm">$10 (0.3125 ASRD)</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
