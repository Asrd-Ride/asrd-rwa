'use client'
import { useState } from 'react'
import { Coins, DollarSign, TrendingUp, Calculator } from 'lucide-react'
import Modal from './Modal'
import { useWallet } from '@/contexts/WalletContext'

interface TokenPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (usdAmount: number) => void
}

export default function TokenPurchaseModal({ isOpen, onClose, onConfirm }: TokenPurchaseModalProps) {
  const { cashBalance, getAsrdValue } = useWallet()
  const [customAmount, setCustomAmount] = useState('')
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100)

  const presetAmounts = [
    { value: 100, label: '$100', description: 'Starter Pack' },
    { value: 500, label: '$500', description: 'Standard' },
    { value: 1000, label: '$1,000', description: 'Premium' },
    { value: 5000, label: '$5,000', description: 'Investor' }
  ]

  const currentAmount = selectedAmount || (customAmount ? parseFloat(customAmount) : 0)
  const asrdToReceive = getAsrdValue(currentAmount)
  const canAfford = cashBalance >= currentAmount && currentAmount > 0

  const handlePurchase = () => {
    if (canAfford && currentAmount > 0) {
      onConfirm(currentAmount)
      onClose()
      setCustomAmount('')
      setSelectedAmount(100)
    }
  }

  const handlePresetSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Purchase ASRD Tokens"
      type="info"
      size="lg"
    >
      <div className="p-6 space-y-6">
        {/* Current Balance */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Available Cash Balance:</span>
            <span className="text-green-600 font-bold">${cashBalance.toLocaleString()}</span>
          </div>
        </div>

        {/* Amount Selection */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Select Purchase Amount</h4>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {presetAmounts.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handlePresetSelect(preset.value)}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  selectedAmount === preset.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900">{preset.label}</div>
                <div className="text-sm text-gray-600 mt-1">{preset.description}</div>
                <div className="text-sm text-blue-600 font-medium mt-2">
                  {getAsrdValue(preset.value).toFixed(2)} ASRD
                </div>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="relative">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 font-medium">Or enter custom amount:</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder="Enter amount in USD"
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max={cashBalance}
              />
            </div>
          </div>
        </div>

        {/* Purchase Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Purchase Summary
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Amount to spend:</span>
              <span className="font-semibold">${currentAmount.toLocaleString()} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ASRD to receive:</span>
              <div className="text-right">
                <div className="font-semibold text-blue-600">{asrdToReceive.toFixed(2)} ASRD</div>
                <div className="text-sm text-gray-600">@ $32 per ASRD</div>
              </div>
            </div>
            <div className="flex justify-between pt-2 border-t border-blue-200">
              <span className="text-gray-600">New cash balance:</span>
              <span className="font-semibold text-green-600">
                ${(cashBalance - currentAmount).toLocaleString()} USD
              </span>
            </div>
          </div>
        </div>

        {/* Balance Check */}
        {!canAfford && currentAmount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center text-red-700">
              <Coins className="w-5 h-5 mr-2" />
              <span className="font-semibold">Insufficient Cash Balance</span>
            </div>
            <p className="text-red-600 text-sm mt-1">
              You need ${currentAmount.toLocaleString()} but only have ${cashBalance.toLocaleString()}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handlePurchase}
            disabled={!canAfford}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Coins className="w-5 h-5 mr-2" />
            Confirm Purchase
          </button>
        </div>
      </div>
    </Modal>
  )
}
