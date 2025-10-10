"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Calendar, TrendingUp, Eye, DollarSign, Star, Users } from 'lucide-react'
import RealAssetImage from './RealAssetImage'

interface AssetCardProps {
  id: number
  title: string
  category: string
  type: string
  location: string
  value: number
  currency: string
  status: string
  image: string
  description: string
  roi: string
  timeline: string
  minInvestment: number
  sharesAvailable?: number
  sharesSold?: number
  onInvest: (assetId: number) => void
  onViewDetails: (assetId: number) => void
  layout?: 'grid' | 'list'
}

export default function EnhancedAssetCard({
  id,
  title,
  category,
  type,
  location,
  value,
  currency,
  status,
  image,
  description,
  roi,
  timeline,
  minInvestment,
  sharesAvailable = 100,
  sharesSold = 0,
  onInvest,
  onViewDetails,
  layout = 'grid'
}: AssetCardProps) {
  const progress = (sharesSold / sharesAvailable) * 100

  if (layout === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, rotateY: 3 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
        className="asset-card-3d group h-full flex flex-col"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors truncate">
              {title}
            </h3>
            <div className="flex items-center space-x-2 text-sm">
              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-medium">
                {type}
              </span>
              <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">
                {category}
              </span>
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <div className="flex items-center space-x-1 text-amber-400 justify-end">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold text-lg">{roi}</span>
            </div>
            <p className="text-amber-300 text-sm font-medium">ROI</p>
          </div>
        </div>

        <div className="relative h-48 rounded-xl mb-4 overflow-hidden border border-gray-700 group-hover:border-cyan-400/30 transition-all">
          <RealAssetImage
            type={type}
            title={title}
            size="xl"
            className="w-full h-full"
          />

          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${
              status === 'Available'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : status === 'Coming Soon'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
            }`}>
              {status}
            </span>
          </div>

          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm font-semibold border border-amber-500/30 backdrop-blur-sm">
              {roi} ROI
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex justify-between items-center text-xs backdrop-blur-sm bg-black/40 rounded-lg px-3 py-2 border border-white/10">
              <span className="text-cyan-300 font-semibold">${minInvestment.toLocaleString()} min</span>
              <span className="text-gray-300">${(value / 1000000).toFixed(1)}M value</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4 flex-1">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-gray-300">
              <MapPin className="w-4 h-4" />
              <span className="truncate max-w-[120px]">{location}</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-300">
              <Calendar className="w-4 h-4" />
              <span>{timeline}</span>
            </div>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-300">Funding Progress</span>
            <span className="text-cyan-400 font-semibold">{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{sharesSold} investors</span>
            <span>{sharesAvailable} shares</span>
          </div>
        </div>

        <div className="flex space-x-3 mt-auto">
          <button
            onClick={() => onViewDetails(id)}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl transition-colors flex items-center justify-center space-x-2 text-sm"
          >
            <Eye className="w-4 h-4" />
            <span>Details</span>
          </button>
          <button
            onClick={() => onInvest(id)}
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl transition-colors flex items-center justify-center space-x-2 text-sm"
          >
            <DollarSign className="w-4 h-4" />
            <span>Invest</span>
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ x: 4, scale: 1.02 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
      className="asset-card-3d group flex flex-row items-center p-4"
    >
      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 mr-4">
        <RealAssetImage
          type={type}
          title={title}
          size="md"
          className="w-full h-full"
        />
        <div className="absolute top-1 right-1">
          <div className={`w-2 h-2 rounded-full ${
            status === 'Available' ? 'bg-emerald-400' :
            status === 'Coming Soon' ? 'bg-amber-400' : 'bg-blue-400'
          }`} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white truncate group-hover:text-cyan-400 transition-colors">
              {title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-medium">
                {type}
              </span>
              <div className="flex items-center space-x-1 text-gray-300 text-xs">
                <MapPin className="w-3 h-3" />
                <span className="truncate max-w-[100px]">{location}</span>
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <div className="flex items-center space-x-1 text-amber-400 justify-end">
              <Star className="w-4 h-4 fill-current" />
              <span className="font-bold">{roi}</span>
            </div>
            <p className="text-amber-300 text-xs font-medium">ROI</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <span>${minInvestment.toLocaleString()} min</span>
            <span>{timeline}</span>
            <span className="text-cyan-400">{progress.toFixed(0)}% funded</span>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => onViewDetails(id)}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center space-x-1 text-sm"
            >
              <Eye className="w-3 h-3" />
              <span>View</span>
            </button>
            <button
              onClick={() => onInvest(id)}
              className="px-3 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors flex items-center space-x-1 text-sm"
            >
              <DollarSign className="w-3 h-3" />
              <span>Invest</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
