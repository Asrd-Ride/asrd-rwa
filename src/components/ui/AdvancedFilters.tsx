"use client";

import React, { useState } from 'react';
import { DollarSign, TrendingUp, MapPin, Building, Filter } from 'lucide-react';

interface AdvancedFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function AdvancedFilters({ onFilterChange }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 10000000,
    minROI: 0,
    maxROI: 50,
    status: 'all',
    location: 'all'
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'thoroughbred', label: 'Thoroughbred' },
    { value: 'marine', label: 'Marine Assets' },
    { value: 'aviation', label: 'Aviation' },
    { value: 'venture', label: 'Venture Capital' },
    { value: 'luxury', label: 'Luxury Goods' }
  ];

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'dubai', label: 'Dubai, UAE' },
    { value: 'kentucky', label: 'Kentucky, USA' },
    { value: 'french-riviera', label: 'French Riviera' },
    { value: 'silicon-valley', label: 'Silicon Valley' },
    { value: 'antwerp', label: 'Antwerp, Belgium' }
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'available', label: 'Available' },
    { value: 'coming-soon', label: 'Coming Soon' }
  ];

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = {
      category: 'all',
      minPrice: 0,
      maxPrice: 10000000,
      minROI: 0,
      maxROI: 50,
      status: 'all',
      location: 'all'
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Filter className="w-5 h-5 text-cyan-400" />
          <span>Advanced Filters</span>
        </h3>
        <button
          onClick={resetFilters}
          className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Category Filter */}
        <div>
          <label className="flex items-center space-x-2 text-gray-300 mb-3 text-sm font-semibold">
            <Building className="w-4 h-4" />
            <span>Category</span>
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value} className="bg-gray-800">
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="flex items-center space-x-2 text-gray-300 mb-3 text-sm font-semibold">
            <MapPin className="w-4 h-4" />
            <span>Location</span>
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 text-sm"
          >
            {locations.map(location => (
              <option key={location.value} value={location.value} className="bg-gray-800">
                {location.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="flex items-center space-x-2 text-gray-300 mb-3 text-sm font-semibold">
            <DollarSign className="w-4 h-4" />
            <span>Price Range</span>
          </label>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs">Min: ${filters.minPrice.toLocaleString()}</label>
              <input
                type="range"
                min="0"
                max="10000000"
                step="100000"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs">Max: ${filters.maxPrice.toLocaleString()}</label>
              <input
                type="range"
                min="0"
                max="10000000"
                step="100000"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* ROI Range */}
        <div>
          <label className="flex items-center space-x-2 text-gray-300 mb-3 text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>ROI Range</span>
          </label>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs">Min: {filters.minROI}%</label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={filters.minROI}
                onChange={(e) => handleFilterChange('minROI', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs">Max: {filters.maxROI}%</label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={filters.maxROI}
                onChange={(e) => handleFilterChange('maxROI', Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
