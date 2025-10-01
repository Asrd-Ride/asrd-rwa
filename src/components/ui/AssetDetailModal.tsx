'use client'
import { useState } from 'react'
import { 
  MapPin, TrendingUp, Calendar, Users, PieChart, 
  DollarSign, BarChart3, Shield, Clock, Target
} from 'lucide-react'
import Modal from './Modal'
import { useWallet } from '@/contexts/WalletContext'

interface AssetDetailModalProps {
  isOpen: boolean
  onClose: () => void
  asset: any
}

export default function AssetDetailModal({ isOpen, onClose, asset }: AssetDetailModalProps) {
  const { asrdBalance } = useWallet()
  const [activeTab, setActiveTab] = useState('overview')

  if (!asset) return null

  const tabs = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'financials', label: 'Financials', icon: DollarSign },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
  ]

  const investmentDetails = [
    { label: 'Minimum Investment', value: `${(asset.price * 0.1).toFixed(0)} ASRD`, icon: DollarSign },
    { label: 'Projected ROI', value: `${asset.roi}% Annually`, icon: TrendingUp },
    { label: 'Asset Valuation', value: `$${asset.valuation?.toLocaleString()}`, icon: BarChart3 },
    { label: 'Investment Term', value: '3-5 Years', icon: Calendar },
  ]

  const performanceMetrics = [
    { label: 'Historical Performance', value: '+15.2%', change: 'positive' },
    { label: 'Risk Level', value: 'Medium', change: 'neutral' },
    { label: 'Liquidity', value: 'Quarterly', change: 'neutral' },
    { label: 'Management Fee', value: '2% Annual', change: 'neutral' },
  ]

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Asset Details"
      type="info"
      size="xl"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start space-x-6 mb-6">
          <img 
            src={asset.image || '/images/placeholder-asset.jpg'} 
            alt={asset.name}
            className="w-32 h-32 object-cover rounded-2xl"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{asset.name}</h2>
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="w-4 h-4 mr-2" />
              {asset.location}
            </div>
            <p className="text-gray-700 mb-4">{asset.description}</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {asset.category}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {asset.roi}% Projected ROI
              </span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Blockchain Verified
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Investment Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Details</h3>
                <div className="space-y-3">
                  {investmentDetails.map((detail, index) => {
                    const Icon = detail.icon
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <span className="text-gray-700">{detail.label}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{detail.value}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Blockchain Security</div>
                      <div className="text-sm text-gray-600">All transactions recorded on-chain</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Users className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Fractional Ownership</div>
                      <div className="text-sm text-gray-600">Own a percentage of the asset</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <Target className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-semibold text-gray-900">Professional Management</div>
                      <div className="text-sm text-gray-600">Managed by industry experts</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                    <div className={`text-lg font-semibold ${
                      metric.change === 'positive' ? 'text-green-600' : 
                      metric.change === 'negative' ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Projections */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">5-Year Projection</h4>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((year) => (
                    <div key={year} className="flex justify-between items-center">
                      <span className="text-gray-700">Year {year}</span>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          +{((asset.price * asset.roi * year) / 100).toLocaleString()} ASRD
                        </div>
                        <div className="text-sm text-gray-600">
                          ${(((asset.price * 32 * asset.roi * year) / 100)).toLocaleString()} USD
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Historical Performance</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Q1 2024</span>
                    <span className="text-green-600 font-semibold">+4.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Q4 2023</span>
                    <span className="text-green-600 font-semibold">+3.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Q3 2023</span>
                    <span className="text-green-600 font-semibold">+4.1%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Important Notice</h4>
                <p className="text-yellow-800 text-sm">
                  Past performance is not indicative of future results. All investments carry risk, 
                  including the possible loss of principal. Projected returns are estimates based on 
                  historical data and market analysis.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-6 border-t border-gray-200 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose()
              // This would trigger the purchase modal in the parent component
            }}
            disabled={asrdBalance < (asset.price * 0.1)}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Invest in this Asset
          </button>
        </div>
      </div>
    </Modal>
  )
}
