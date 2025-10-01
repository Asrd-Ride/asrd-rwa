'use client'
import { motion } from 'framer-motion'
import { useWallet } from '@/contexts/WalletContext'
import { X, Coins, AlertTriangle, Wallet } from 'lucide-react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'purchase' | 'warning' | 'info'
  asset?: any
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'purchase',
  asset
}: ConfirmationModalProps) {
  const { asrdBalance, getUsdValue } = useWallet()

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const assetPriceUSD = asset ? getUsdValue(asset.price) : 0
  const canAfford = asset ? asrdBalance >= asset.price : true

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card rounded-2xl p-6 max-w-md w-full border border-white/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {type === 'purchase' && (
              <div className="p-2 bg-accent-success/20 rounded-lg">
                <Coins className="w-6 h-6 text-accent-success" />
              </div>
            )}
            {type === 'warning' && (
              <div className="p-2 bg-warning/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
            )}
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-mid" />
          </button>
        </div>

        {/* Asset Preview */}
        {asset && (
          <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
            <div className="flex items-center space-x-3">
              <img 
                src={asset.image} 
                alt={asset.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-white">{asset.name}</h4>
                <p className="text-neutral-mid text-sm">{asset.location}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Coins className="w-4 h-4 text-accent-success" />
                  <span className="text-accent-success font-semibold">
                    {asset.price} ASRD
                  </span>
                  <span className="text-neutral-mid text-sm">
                    (${assetPriceUSD.toLocaleString()})
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Balance Check */}
        {asset && (
          <div className={`flex items-center space-x-2 p-3 rounded-lg mb-4 ${
            canAfford ? 'bg-accent-success/10 border border-accent-success/20' : 'bg-error/10 border border-error/20'
          }`}>
            <Wallet className={`w-4 h-4 ${canAfford ? 'text-accent-success' : 'text-error'}`} />
            <div className="flex-1">
              <div className={`text-sm font-semibold ${canAfford ? 'text-accent-success' : 'text-error'}`}>
                {canAfford ? 'Sufficient Balance' : 'Insufficient Balance'}
              </div>
              <div className="text-neutral-mid text-xs">
                Your balance: {asrdBalance.toFixed(2)} ASRD • Needed: {asset.price} ASRD
              </div>
            </div>
          </div>
        )}

        {/* Message */}
        <p className="text-neutral-mid mb-6 leading-relaxed">{message}</p>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all duration-200 border border-white/20"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canAfford}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-accent-success to-accent-primary text-financial-dark rounded-xl font-semibold hover:shadow-lg hover:shadow-accent-success/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
