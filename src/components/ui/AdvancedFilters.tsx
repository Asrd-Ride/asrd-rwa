'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Filter, X, SlidersHorizontal, DollarSign, TrendingUp, MapPin, Calendar } from 'lucide-react'

interface FilterState {
  priceRange: [number, number]
  roiRange: [number, number]
  locations: string[]
  assetTypes: string[]
  sortBy: 'name' | 'price' | 'roi' | 'recent'
  sortOrder: 'asc' | 'desc'
}

interface AdvancedFiltersProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: FilterState) => void
  availableLocations: string[]
}

export default function AdvancedFilters({ isOpen, onClose, onApplyFilters, availableLocations }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 1000],
    roiRange: [5, 25],
    locations: [],
    assetTypes: [],
    sortBy: 'price',
    sortOrder: 'desc'
  })

  const assetTypeOptions = [
    { value: 'horse', label: '🐎 Racehorses', color: 'from-emerald-glow to-sapphire-glow' },
    { value: 'real-estate', label: '🏠 Real Estate', color: 'from-sapphire-glow to-amethyst-glow' }
  ]

  const handleLocationToggle = (location: string) => {
    setFilters(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
    }))
  }

  const handleAssetTypeToggle = (type: string) => {
    setFilters(prev => ({
      ...prev,
      assetTypes: prev.assetTypes.includes(type)
        ? prev.assetTypes.filter(t => t !== type)
        : [...prev.assetTypes, type]
    }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleReset = () => {
    const resetFilters: FilterState = {
      priceRange: [0, 1000],
      roiRange: [5, 25],
      locations: [],
      assetTypes: [],
      sortBy: 'price',
      sortOrder: 'desc'
    }
    setFilters(resetFilters)
    onApplyFilters(resetFilters)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Filters Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-luxury-deep/95 backdrop-blur-xl border-l border-emerald-glow/20 z-50 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <SlidersHorizontal className="w-6 h-6 text-emerald-glow" />
                  <h2 className="text-2xl font-bold text-white">Advanced Filters</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6 text-neutral-light" />
                </button>
              </div>

              {/* Price Range */}
              <div className="glass-3d p-6 mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <DollarSign className="w-5 h-5 text-emerald-glow" />
                  <h3 className="text-lg font-semibold text-white">Price Range (ASRD)</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-neutral-light">
                    <span>{filters.priceRange[0]} ASRD</span>
                    <span>{filters.priceRange[1]} ASRD</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                    }))}
                    className="w-full h-2 bg-luxury-dark rounded-lg appearance-none cursor-pointer slider-3d"
                  />
                </div>
              </div>

              {/* ROI Range */}
              <div className="glass-3d p-6 mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-sapphire-glow" />
                  <h3 className="text-lg font-semibold text-white">ROI Range (%)</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-neutral-light">
                    <span>{filters.roiRange[0]}%</span>
                    <span>{filters.roiRange[1]}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={filters.roiRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      roiRange: [prev.roiRange[0], parseInt(e.target.value)]
                    }))}
                    className="w-full h-2 bg-luxury-dark rounded-lg appearance-none cursor-pointer slider-3d"
                  />
                </div>
              </div>

              {/* Locations */}
              <div className="glass-3d p-6 mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-5 h-5 text-amethyst-glow" />
                  <h3 className="text-lg font-semibold text-white">Locations</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {availableLocations.map(location => (
                    <button
                      key={location}
                      onClick={() => handleLocationToggle(location)}
                      className={`p-3 rounded-xl border transition-all duration-200 text-sm font-medium ${
                        filters.locations.includes(location)
                          ? 'bg-emerald-glow/20 border-emerald-glow text-emerald-glow'
                          : 'bg-luxury-dark/50 border-white/10 text-neutral-light hover:border-emerald-glow/30'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              {/* Asset Types */}
              <div className="glass-3d p-6 mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Filter className="w-5 h-5 text-gold-glow" />
                  <h3 className="text-lg font-semibold text-white">Asset Types</h3>
                </div>
                <div className="space-y-3">
                  {assetTypeOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleAssetTypeToggle(option.value)}
                      className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                        filters.assetTypes.includes(option.value)
                          ? `bg-gradient-to-r ${option.color} border-transparent text-luxury-deep font-bold`
                          : 'bg-luxury-dark/50 border-white/10 text-neutral-light hover:border-emerald-glow/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="glass-3d p-6 mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-5 h-5 text-ruby-glow" />
                  <h3 className="text-lg font-semibold text-white">Sort By</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'price', label: 'Price' },
                    { value: 'roi', label: 'ROI' },
                    { value: 'name', label: 'Name' },
                    { value: 'recent', label: 'Recent' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setFilters(prev => ({ ...prev, sortBy: option.value as any }))}
                      className={`p-3 rounded-xl border transition-all duration-200 text-sm font-medium ${
                        filters.sortBy === option.value
                          ? 'bg-ruby-glow/20 border-ruby-glow text-ruby-glow'
                          : 'bg-luxury-dark/50 border-white/10 text-neutral-light hover:border-ruby-glow/30'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, sortOrder: 'asc' }))}
                    className={`flex-1 p-3 rounded-xl border transition-all duration-200 text-sm font-medium ${
                      filters.sortOrder === 'asc'
                        ? 'bg-sapphire-glow/20 border-sapphire-glow text-sapphire-glow'
                        : 'bg-luxury-dark/50 border-white/10 text-neutral-light hover:border-sapphire-glow/30'
                    }`}
                  >
                    Ascending
                  </button>
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, sortOrder: 'desc' }))}
                    className={`flex-1 p-3 rounded-xl border transition-all duration-200 text-sm font-medium ${
                      filters.sortOrder === 'desc'
                        ? 'bg-sapphire-glow/20 border-sapphire-glow text-sapphire-glow'
                        : 'bg-luxury-dark/50 border-white/10 text-neutral-light hover:border-sapphire-glow/30'
                    }`}
                  >
                    Descending
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 sticky bottom-0 bg-luxury-deep/95 backdrop-blur-xl pt-6 pb-4 -mx-6 px-6">
                <button
                  onClick={handleReset}
                  className="flex-1 py-4 px-6 border border-neutral-light text-neutral-light font-semibold rounded-xl hover:bg-white/5 transition-all duration-200"
                >
                  Reset All
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 py-4 px-6 bg-gradient-to-r from-emerald-glow to-sapphire-glow text-luxury-deep font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-glow/30 transition-all duration-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
