'use client'
import { useState } from 'react'
import { Coins, DollarSign, PieChart, TrendingUp, Calendar, MapPin } from 'lucide-react'
import Modal from './Modal'
import { useWallet } from '@/contexts/WalletContext'

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (fraction: number) => void
  asset: any
}

export default function PurchaseModal({ isOpen, onClose, onConfirm, asset }: PurchaseModalProps) {
  const { asrdBalance, getUsdValue } = useWallet()
  const [selectedFraction, setSelectedFraction] = useState(1) // 1 = 100%
  
  const fractions = [
    { value: 0.1, label: '10%', description: 'Starter Investment' },
    { value: 0.25, label: '25%', description: 'Standard Share' },
    { value: 0.5, label: '50%', description: 'Majority Stake' },
    { value: 1, label: '100%', description: 'Full Ownership' }
  ]

  if (!asset) return null

  const totalPriceASRD = asset.price
  const selectedPriceASRD = totalPriceASRD * selectedFraction
  const selectedPriceUSD = getUsdValue(selectedPriceASRD)
  const canAfford = asrdBalance >= selectedPriceASRD

  const handlePurchase = () => {
    if (canAfford) {
      onConfirm(selectedFraction)
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
        {/* Asset Overview */}
        <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
          <img 
            src={asset.image || '/images/placeholder-asset.jpg'} 
            alt={asset.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {asset.location}
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                {asset.roi}% Projected ROI
              </div>
              <div className="text-sm text-gray-600">
                Valuation: ${asset.valuation?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Fraction Selection */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Select Ownership Percentage</h4>
          <div className="grid grid-cols-2 gap-3">
            {fractions.map((fraction) => (
              <button
                key={fraction.value}
                onClick={() => setSelectedFraction(fraction.value)}
                className={`p-4 border-2 rounded-xl text-left transition-all ${
                  selectedFraction === fraction.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-semibold text-gray-900">{fraction.label}</div>
                <div className="text-sm text-gray-600 mt-1">{fraction.description}</div>
                <div className="text-sm text-blue-600 font-medium mt-2">
                  {fraction.value * 100}% of asset
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Investment Details */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Investment Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Ownership Percentage:</span>
              <span className="font-semibold">{(selectedFraction * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Investment Amount:</span>
              <div className="text-right">
                <div className="font-semibold">{selectedPriceASRD.toLocaleString()} ASRD</div>
                <div className="text-sm text-gray-600">${selectedPriceUSD.toLocaleString()} USD</div>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Projected Annual Returns:</span>
              <div className="text-right">
                <div className="font-semibold text-green-600">
                  +{((selectedPriceASRD * asset.roi) / 100).toLocaleString()} ASRD
                </div>
                <div className="text-sm text-gray-600">
                  ${((selectedPriceUSD * asset.roi) / 100).toLocaleString()} USD
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Check */}
        {!canAfford && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center text-red-700">
              <Coins className="w-5 h-5 mr-2" />
              <span className="font-semibold">Insufficient ASRD Balance</span>
            </div>
            <p className="text-red-600 text-sm mt-1">
              You need {selectedPriceASRD.toLocaleString()} ASRD but only have {asrdBalance.toLocaleString()} ASRD
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
