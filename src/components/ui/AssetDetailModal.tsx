'use client'
import { useState, useEffect } from 'react'
import {
  MapPin, TrendingUp, Calendar, Users, PieChart,
  DollarSign, BarChart3, Shield, Clock, Target, Sparkles,
  ArrowLeft, ArrowRight, Award, Heart, Share2, Zap,
  Gavel, Timer, Users as UsersIcon
} from 'lucide-react'
import Modal from './Modal'
import { useWallet } from '@/contexts/WalletContext'
import { useApp } from '@/contexts/AppContext'

interface AssetDetailModalProps {
  isOpen: boolean
  onClose: () => void
  asset: any
  onPurchaseClick: () => void
}

export default function AssetDetailModal({ isOpen, onClose, asset, onPurchaseClick }: AssetDetailModalProps) {
  const { asrdBalance, getUsdValue, getAsrdValue } = useWallet()
  const { purchaseAsset } = useApp()
  const [activeTab, setActiveTab] = useState('overview')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [bidAmount, setBidAmount] = useState('')

  if (!asset) return null

  // Calculate time left for auction
  useEffect(() => {
    if (asset.auctionEndTime) {
      const calculateTimeLeft = () => {
        const difference = asset.auctionEndTime - Date.now()
        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          })
        }
      }

      calculateTimeLeft()
      const timer = setInterval(calculateTimeLeft, 1000)
      return () => clearInterval(timer)
    }
  }, [asset.auctionEndTime])

  const slides = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'financials', label: 'Financials', icon: DollarSign },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'details', label: 'Asset Details', icon: BarChart3 },
  ]

  // Minimum investment check ($50 USD)
  const minimumASRD = getAsrdValue(50)
  const canInvest = asrdBalance >= minimumASRD
  const isAuction = asset.auctionEndTime && asset.auctionEndTime > Date.now()

  const investmentDetails = [
    { label: 'Minimum Investment', value: `$50 USD (${minimumASRD.toFixed(2)} ASRD)`, icon: DollarSign },
    { label: 'Projected ROI', value: `${asset.roi}% Annually`, icon: TrendingUp },
    { label: 'Asset Valuation', value: `$${getUsdValue(asset.price).toLocaleString()} USD`, icon: BarChart3 },
    { label: 'Investment Term', value: '3-5 Years', icon: Calendar },
  ]

  const performanceMetrics = [
    { label: 'Historical Performance', value: '+15.2%', change: 'positive' },
    { label: 'Risk Level', value: 'Medium', change: 'neutral' },
    { label: 'Liquidity', value: 'Quarterly', change: 'neutral' },
    { label: 'Management Fee', value: '2% Annual', change: 'neutral' },
  ]

  const assetStats = asset.stats || {}

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setActiveTab(slides[(currentSlide + 1) % slides.length].id)
  }

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setActiveTab(slides[(currentSlide - 1 + slides.length) % slides.length].id)
  }

  const handlePlaceBid = async () => {
    const bidASRD = parseFloat(bidAmount)
    if (bidASRD && bidASRD >= (asset.minimumBid || asset.currentBid * 1.05)) {
      const success = await purchaseAsset(asset.id, bidASRD)
      if (success) {
        alert(`Bid placed successfully! ${bidASRD} ASRD`)
        setBidAmount('')
      } else {
        alert('Bid failed. Please check your balance.')
      }
    } else {
      alert(`Bid must be at least ${asset.minimumBid || (asset.currentBid * 1.05).toFixed(2)} ASRD`)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Asset Details"
      type="info"
      size="xl"
    >
      <div className="p-6">
        {/* Slide Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevSlide}
            className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>
          
          <div className="flex space-x-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => {
                  setCurrentSlide(index)
                  setActiveTab(slide.id)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-emerald-500 scale-125' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNextSlide}
            className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-slate-300" />
          </button>
        </div>

        {/* Header - Enhanced with Auction Info */}
        <div className="glass-3d p-6 rounded-2xl mb-6 group hover:scale-105 transition-transform duration-300">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src={asset.image || '/images/placeholder-asset.jpg'}
                alt={asset.name}
                className="w-32 h-32 object-cover rounded-2xl border-2 border-emerald-500/30"
              />
              {isAuction && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-gold-glow to-orange-500 rounded-full flex items-center justify-center">
                  <Gavel className="w-4 h-4 text-white" />
                </div>
              )}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{asset.name}</h2>
                  <div className="flex items-center text-emerald-300 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    {asset.location}
                  </div>
                </div>
                {isAuction && (
                  <div className="text-right">
                    <div className="flex items-center text-gold-glow mb-1">
                      <Timer className="w-4 h-4 mr-1" />
                      <span className="font-bold">Auction Live</span>
                    </div>
                    <div className="text-sm text-slate-400">
                      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
                    </div>
                  </div>
                )}
              </div>
              
              <p className="text-slate-300 mb-4">{asset.description}</p>
              
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30">
                  {asset.category || (asset.type === 'horse' ? 'Racehorse' : 'Real Estate')}
                </span>
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium border border-green-500/30">
                  {asset.roi}% Projected ROI
                </span>
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/30">
                  Blockchain Verified
                </span>
                {isAuction && (
                  <span className="bg-gold-glow/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium border border-yellow-500/30">
                    🔥 Live Auction
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Auction Section */}
        {isAuction && (
          <div className="glass-3d border border-gold-glow/20 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gold-glow flex items-center">
                <Gavel className="w-5 h-5 mr-2" />
                Live Auction
              </h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
                  <div className="text-slate-400">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
                  <div className="text-slate-400">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
                  <div className="text-slate-400">Minutes</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-slate-700/30 rounded-xl">
                <div className="text-slate-400 text-sm mb-1">Current Bid</div>
                <div className="text-2xl font-bold text-gold-glow">{asset.currentBid?.toLocaleString()} ASRD</div>
                <div className="text-slate-400 text-sm">${getUsdValue(asset.currentBid || 0).toLocaleString()} USD</div>
              </div>
              <div className="text-center p-4 bg-slate-700/30 rounded-xl">
                <div className="text-slate-400 text-sm mb-1">Minimum Bid</div>
                <div className="text-2xl font-bold text-emerald-400">{asset.minimumBid?.toLocaleString()} ASRD</div>
                <div className="text-slate-400 text-sm">${getUsdValue(asset.minimumBid || 0).toLocaleString()} USD</div>
              </div>
              <div className="text-center p-4 bg-slate-700/30 rounded-xl">
                <div className="text-slate-400 text-sm mb-1">Bidders</div>
                <div className="text-2xl font-bold text-cyan-400 flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 mr-1" />
                  12
                </div>
                <div className="text-slate-400 text-sm">Active Participants</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <div className="flex-1">
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder={`Enter bid (min ${asset.minimumBid} ASRD)`}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-gold-glow/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-glow"
                />
              </div>
              <button
                onClick={handlePlaceBid}
                disabled={!bidAmount || parseFloat(bidAmount) < asset.minimumBid || asrdBalance < parseFloat(bidAmount)}
                className="px-6 py-3 bg-gradient-to-r from-gold-glow to-orange-500 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Place Bid
              </button>
            </div>
          </div>
        )}

        {/* Slide Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Investment Details */}
              <div className="glass-3d p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-emerald-400" />
                  Investment Details
                </h3>
                <div className="space-y-3">
                  {investmentDetails.map((detail, index) => {
                    const Icon = detail.icon
                    return (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg group hover:bg-slate-600/30 transition-colors">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5 text-emerald-400" />
                          <span className="text-slate-300">{detail.label}</span>
                        </div>
                        <span className="font-semibold text-white">{detail.value}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Key Features */}
              <div className="glass-3d p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-cyan-400" />
                  Key Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="font-semibold text-white">Blockchain Security</div>
                      <div className="text-sm text-slate-400">All transactions recorded on-chain</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <Users className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="font-semibold text-white">Fractional Ownership</div>
                      <div className="text-sm text-slate-400">Own any percentage from 10% to 100%</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <Target className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="font-semibold text-white">Professional Management</div>
                      <div className="text-sm text-slate-400">Managed by industry experts</div>
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
                  <div key={index} className="glass-3d p-4 rounded-2xl text-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-sm text-slate-400 mb-1">{metric.label}</div>
                    <div className={`text-lg font-bold ${
                      metric.change === 'positive' ? 'text-green-400' :
                      metric.change === 'negative' ? 'text-red-400' : 'text-white'
                    }`}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Financial Projections */}
              <div className="glass-3d border border-cyan-500/20 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"></div>
                <h4 className="font-bold text-white mb-4">5-Year Projection</h4>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((year) => (
                    <div key={year} className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg group hover:bg-slate-600/30 transition-colors">
                      <span className="text-slate-300">Year {year}</span>
                      <div className="text-right">
                        <div className="font-bold text-cyan-400">
                          +{((asset.price * asset.roi * year) / 100).toLocaleString()} ASRD
                        </div>
                        <div className="text-sm text-slate-400">
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
              <div className="glass-3d p-6 rounded-2xl">
                <h4 className="font-bold text-white mb-4">Historical Performance</h4>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Q1 2024</span>
                    <span className="text-green-400 font-semibold">+4.2%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Q4 2023</span>
                    <span className="text-green-400 font-semibold">+3.8%</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Q3 2023</span>
                    <span className="text-green-400 font-semibold">+4.1%</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-6">
                <h4 className="font-semibold text-yellow-300 mb-2">Important Notice</h4>
                <p className="text-yellow-200 text-sm">
                  Past performance is not indicative of future results. All investments carry risk,
                  including the possible loss of principal. Projected returns are estimates based on
                  historical data and market analysis.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="glass-3d p-6 rounded-2xl">
              <h4 className="font-bold text-white mb-4">Asset Specifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(assetStats).map(([key, value], index) => (
                  <div key={index} className="flex justify-between p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-semibold text-white">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-6 border-t border-slate-600/30 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 border border-slate-600 text-slate-300 font-bold rounded-xl hover:bg-slate-700/50 transition-all duration-300 hover:scale-105"
          >
            Close
          </button>
          {!isAuction && (
            <button
              onClick={() => {
                onClose()
                onPurchaseClick()
              }}
              disabled={!canInvest}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl hover:from-emerald-600 hover:to-green-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 relative overflow-hidden group"
            >
              <div className="flex items-center justify-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Invest in this Asset</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
          )}
        </div>

        {/* Balance Display */}
        <div className="text-center pt-4">
          <p className="text-slate-400 text-sm">
            Your Balance: <span className="text-emerald-400 font-semibold">{asrdBalance.toFixed(2)} ASRD</span>
            <span className="text-slate-500 ml-2">(${getUsdValue(asrdBalance).toLocaleString()} USD)</span>
          </p>
          {!canInvest && !isAuction && (
            <p className="text-red-400 text-sm mt-1">
              Minimum $50 USD ({minimumASRD.toFixed(2)} ASRD) required to invest
            </p>
          )}
        </div>
      </div>
    </Modal>
  )
}
