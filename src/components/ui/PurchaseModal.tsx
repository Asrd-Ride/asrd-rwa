'use client'
import { useState } from 'react'
import { Coins, DollarSign, PieChart, TrendingUp, Calendar, MapPin, Sparkles, Target } from 'lucide-react'
import Modal from './Modal'
import { useWallet } from '@/contexts/WalletContext'

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (investmentAmount: number) => void
  asset: any
}

export default function PurchaseModal({ isOpen, onClose, onConfirm, asset }: PurchaseModalProps) {
  const { asrdBalance, getUsdValue, getAsrdValue } = useWallet()
  const [investmentAmount, setInvestmentAmount] = useState(0)
  const [isPurchasing, setIsPurchasing] = useState(false)

  const investmentOptions = [
    { amount: 50, label: '$50', description: 'Starter Investment', color: 'from-blue-500 to-cyan-500' },
    { amount: 100, label: '$100', description: 'Standard Share', color: 'from-purple-500 to-pink-500' },
    { amount: 500, label: '$500', description: 'Majority Stake', color: 'from-orange-500 to-red-500' },
    { amount: 1000, label: '$1,000', description: 'Premium Investment', color: 'from-emerald-500 to-green-500' }
  ]

  if (!asset) return null

  const totalAssetValueUSD = getUsdValue(asset.price)
  const selectedInvestmentASRD = getAsrdValue(investmentAmount)
  const ownershipPercentage = (investmentAmount / totalAssetValueUSD) * 100
  const canAfford = asrdBalance >= selectedInvestmentASRD
  const meetsMinimum = investmentAmount >= 50
  const exceedsMaximum = investmentAmount > totalAssetValueUSD

  const handleInvestmentSelect = (amount: number) => {
    setInvestmentAmount(amount)
  }

  const handleCustomAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '')
    const amount = parseFloat(numericValue) || 0
    setInvestmentAmount(amount)
  }

  const handlePurchase = async () => {
    if (canAfford && meetsMinimum && !exceedsMaximum && investmentAmount > 0) {
      setIsPurchasing(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      onConfirm(selectedInvestmentASRD)
      setIsPurchasing(false)
      onClose()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invest in Asset"
      type="info"
      size="lg"
    >
      <div className="p-6 space-y-6">
        {/* Asset Overview */}
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
                  Total Value: ${totalAssetValueUSD.toLocaleString()} USD
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Amount Selection */}
        <div>
          <h4 className="font-bold text-white mb-3 text-lg">Select Investment Amount</h4>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {investmentOptions.map((option) => (
              <button
                key={option.amount}
                onClick={() => handleInvestmentSelect(option.amount)}
                className={`p-4 rounded-xl text-left transition-all duration-300 relative overflow-hidden group ${
                  investmentAmount === option.amount
                    ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105`
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-600/30'
                }`}
              >
                <div className="relative z-10">
                  <div className="font-bold text-lg">{option.label}</div>
                  <div className="text-sm opacity-90 mt-1">{option.description}</div>
                  <div className="text-sm font-medium mt-2">
                    {getAsrdValue(option.amount).toFixed(2)} ASRD
                  </div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
              </button>
            ))}
          </div>

          {/* Custom Amount Input */}
          <div className="glass-3d p-4 rounded-2xl">
            <h5 className="font-semibold text-white mb-3 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-emerald-400" />
              Custom Amount (USD)
            </h5>
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={investmentAmount === 0 ? '' : investmentAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  placeholder="Enter amount in USD"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-emerald-500/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setInvestmentAmount(0)}
                className="px-4 py-3 bg-slate-700/50 text-slate-300 rounded-xl hover:bg-slate-600/50 transition-colors"
              >
                Clear
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-2">
              Minimum investment: $50 USD | Maximum: ${totalAssetValueUSD.toLocaleString()} USD
            </p>
          </div>
        </div>

        {/* Investment Details */}
        <div className="glass-3d border border-emerald-500/20 rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl"></div>
          <h4 className="font-bold text-white mb-3 text-lg">Investment Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Investment Amount:</span>
              <div className="text-right">
                <div className="font-bold text-white text-lg">${investmentAmount.toLocaleString()} USD</div>
                <div className="text-sm text-slate-400">{selectedInvestmentASRD.toFixed(2)} ASRD</div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Ownership Percentage:</span>
              <span className="font-bold text-emerald-400 text-lg">
                {ownershipPercentage.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Projected Annual Returns:</span>
              <div className="text-right">
                <div className="font-bold text-cyan-400">
                  +${((investmentAmount * asset.roi) / 100).toLocaleString()} USD
                </div>
                <div className="text-sm text-slate-400">
                  {((selectedInvestmentASRD * asset.roi) / 100).toFixed(2)} ASRD
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Validation Messages */}
        {!meetsMinimum && investmentAmount > 0 && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4">
            <div className="flex items-center text-red-400">
              <Coins className="w-5 h-5 mr-2" />
              <span className="font-semibold">Minimum Investment Required</span>
            </div>
            <p className="text-red-300 text-sm mt-1">
              Minimum investment is $50 USD. Current: ${investmentAmount.toFixed(2)} USD
            </p>
          </div>
        )}

        {exceedsMaximum && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4">
            <div className="flex items-center text-red-400">
              <Coins className="w-5 h-5 mr-2" />
              <span className="font-semibold">Investment Exceeds Asset Value</span>
            </div>
            <p className="text-red-300 text-sm mt-1">
              Maximum investment is ${totalAssetValueUSD.toLocaleString()} USD
            </p>
          </div>
        )}

        {!canAfford && investmentAmount > 0 && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4">
            <div className="flex items-center text-red-400">
              <Coins className="w-5 h-5 mr-2" />
              <span className="font-semibold">Insufficient ASRD Balance</span>
            </div>
            <p className="text-red-300 text-sm mt-1">
              You need {selectedInvestmentASRD.toFixed(2)} ASRD but only have {asrdBalance.toFixed(2)} ASRD
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 border border-slate-600 text-slate-300 font-bold rounded-xl hover:bg-slate-700/50 transition-all duration-300 hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={handlePurchase}
            disabled={!canAfford || !meetsMinimum || exceedsMaximum || investmentAmount === 0 || isPurchasing}
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
                <span>Confirm Investment</span>
              </div>
            )}
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
