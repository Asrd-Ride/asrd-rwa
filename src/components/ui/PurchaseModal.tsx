'use client'
import { useState } from 'react'
import { Coins, DollarSign, PieChart, TrendingUp, Calendar, MapPin, Sparkles, Target } from 'lucide-react'
import Modal from './Modal'
import { useWallet } from '@/contexts/WalletContext'

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (fraction: number) => void
  asset: any
}

export default function PurchaseModal({ isOpen, onClose, onConfirm, asset }: PurchaseModalProps) {
  const { asrdBalance, getUsdValue, getAsrdValue } = useWallet()
  const [selectedFraction, setSelectedFraction] = useState(1) // 1 = 100%
  const [customPercentage, setCustomPercentage] = useState('')
  const [isPurchasing, setIsPurchasing] = useState(false)

  const fractions = [
    { value: 0.1, label: '10%', description: 'Starter Investment', color: 'from-blue-500 to-cyan-500' },
    { value: 0.25, label: '25%', description: 'Standard Share', color: 'from-purple-500 to-pink-500' },
    { value: 0.5, label: '50%', description: 'Majority Stake', color: 'from-orange-500 to-red-500' },
    { value: 1, label: '100%', description: 'Full Ownership', color: 'from-emerald-500 to-green-500' }
  ]

  if (!asset) return null

  // Calculate prices based on selected fraction or custom percentage
  const getSelectedFraction = () => {
    if (customPercentage) {
      const percentage = parseFloat(customPercentage) / 100
      return Math.max(0.1, Math.min(1, percentage)) // Ensure between 10% and 100%
    }
    return selectedFraction
  }

  const currentFraction = getSelectedFraction()
  const totalPriceASRD = asset.price
  const selectedPriceASRD = totalPriceASRD * currentFraction
  const selectedPriceUSD = getUsdValue(selectedPriceASRD)
  const canAfford = asrdBalance >= selectedPriceASRD

  // Minimum investment check ($50 USD)
  const minimumASRD = getAsrdValue(50) // $50 minimum in ASRD
  const meetsMinimum = selectedPriceUSD >= 50

  const handleCustomPercentageChange = (value: string) => {
    // Allow only numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, '')
    if (numericValue === '' || (parseFloat(numericValue) >= 10 && parseFloat(numericValue) <= 100)) {
      setCustomPercentage(numericValue)
      setSelectedFraction(parseFloat(numericValue) / 100 || 1)
    }
  }

  const handleFractionSelect = (fraction: number) => {
    setSelectedFraction(fraction)
    setCustomPercentage('') // Clear custom when preset is selected
  }

  const handlePurchase = async () => {
    if (canAfford && meetsMinimum) {
      setIsPurchasing(true)
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate purchase delay
      onConfirm(currentFraction)
      setIsPurchasing(false)
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Purchase Fractional Share"
      type="info"
      size="lg"
    >
      <div className="p-6 space-y-6">
        {/* Asset Overview - 3D Enhanced */}
        <div className="glass-3d p-4 rounded-2xl group hover:scale-105 transition-transform duration-300">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={asset.image || '/images/placeholder-asset.jpg'}
                alt={asset.name}
                className="w-20 h-20 object-cover rounded-xl border-2 border-emerald-500/30"
              />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <Target className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">{asset.name}</h3>
              <div className="flex items-center text-emerald-300 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {asset.location}
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center text-cyan-400 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {asset.roi}% Projected ROI
                </div>
                <div className="text-sm text-slate-400">
                  Total: {totalPriceASRD} ASRD (${getUsdValue(totalPriceASRD).toLocaleString()} USD)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fraction Selection - Enhanced with 3D */}
        <div>
          <h4 className="font-bold text-white mb-3 text-lg">Select Ownership Percentage</h4>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {fractions.map((fraction) => (
              <button
                key={fraction.value}
                onClick={() => handleFractionSelect(fraction.value)}
                className={`p-4 rounded-xl text-left transition-all duration-300 relative overflow-hidden group ${
                  selectedFraction === fraction.value && !customPercentage
                    ? `bg-gradient-to-r ${fraction.color} text-white shadow-lg scale-105`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600/30'
                }`}
              >
                <div className="relative z-10">
                  <div className="font-bold text-lg">{fraction.label}</div>
                  <div className="text-sm opacity-90 mt-1">{fraction.description}</div>
                  <div className="text-sm font-medium mt-2">
                    {fraction.value * 100}% of asset
                  </div>
                </div>
                {/* Hover effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${fraction.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              </button>
            ))}
          </div>

          {/* Custom Percentage Input */}
          <div className="glass-3d p-4 rounded-2xl">
            <h5 className="font-semibold text-white mb-3 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-emerald-400" />
              Custom Percentage
            </h5>
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={customPercentage}
                  onChange={(e) => handleCustomPercentageChange(e.target.value)}
                  placeholder="Enter percentage (10-100)"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  %
                </div>
              </div>
              <button
                onClick={() => setCustomPercentage('')}
                className="px-4 py-3 bg-slate-700/50 text-slate-300 rounded-xl hover:bg-slate-600/50 transition-colors"
              >
                Clear
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-2">
              Minimum investment: $50 USD ({minimumASRD.toFixed(2)} ASRD)
            </p>
          </div>
        </div>

        {/* Investment Details - 3D Enhanced */}
        <div className="glass-3d border border-emerald-500/20 rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl"></div>
          <h4 className="font-bold text-white mb-3 text-lg">Investment Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Ownership Percentage:</span>
              <span className="font-bold text-emerald-400 text-lg">
                {(currentFraction * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Investment Amount:</span>
              <div className="text-right">
                <div className="font-bold text-white text-lg">{selectedPriceASRD.toFixed(2)} ASRD</div>
                <div className="text-sm text-slate-400">${selectedPriceUSD.toLocaleString()} USD</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Projected Annual Returns:</span>
              <div className="text-right">
                <div className="font-bold text-cyan-400">
                  +{((selectedPriceASRD * asset.roi) / 100).toFixed(2)} ASRD
                </div>
                <div className="text-sm text-slate-400">
                  ${(((selectedPriceUSD * asset.roi) / 100)).toLocaleString()} USD
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Validation Messages */}
        {!meetsMinimum && selectedPriceUSD > 0 && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4">
            <div className="flex items-center text-red-400">
              <Coins className="w-5 h-5 mr-2" />
              <span className="font-semibold">Minimum Investment Required</span>
            </div>
            <p className="text-red-300 text-sm mt-1">
              Minimum investment is $50 USD. Current: ${selectedPriceUSD.toFixed(2)} USD
            </p>
          </div>
        )}

        {/* Balance Check */}
        {!canAfford && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4">
            <div className="flex items-center text-red-400">
              <Coins className="w-5 h-5 mr-2" />
              <span className="font-semibold">Insufficient ASRD Balance</span>
            </div>
            <p className="text-red-300 text-sm mt-1">
              You need {selectedPriceASRD.toFixed(2)} ASRD but only have {asrdBalance.toFixed(2)} ASRD
            </p>
          </div>
        )}

        {/* Action Buttons - 3D Enhanced */}
        <div className="flex space-x-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 border border-slate-600 text-slate-300 font-bold rounded-xl hover:bg-slate-700/50 transition-all duration-300 hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={handlePurchase}
            disabled={!canAfford || !meetsMinimum || isPurchasing}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-green-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 relative overflow-hidden group"
          >
            {isPurchasing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Coins className="w-5 h-5" />
                <span>Confirm Purchase</span>
              </div>
            )}
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        </div>

        {/* Balance Display */}
        <div className="text-center pt-4 border-t border-slate-600/30">
          <p className="text-slate-400 text-sm">
            Your Balance: <span className="text-emerald-400 font-semibold">{asrdBalance.toFixed(2)} ASRD</span>
            <span className="text-slate-500 ml-2">(${getUsdValue(asrdBalance).toLocaleString()} USD)</span>
          </p>
        </div>
      </div>
    </Modal>
  )
}
