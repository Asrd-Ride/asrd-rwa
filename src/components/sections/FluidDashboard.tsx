"use client";

import React, { useState } from 'react';
import {
  DollarSign, TrendingUp, Building, Zap,
  ArrowUpRight, Download, Eye, Coins, CalendarDays
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ownedAssets } from '@/data/mockData';
import RealAssetImage from '@/components/ui/RealAssetImage';
import AssetDetailsModal from '@/components/ui/AssetDetailsModal';
import { useNotification } from '@/contexts/NotificationContext';

export default function FluidDashboard() {
  const { user, claimRental, claimWinnings } = useAuth();
  const { showNotification } = useNotification();
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [claimedRent, setClaimedRent] = useState(false);
  const [claimedWinnings, setClaimedWinnings] = useState(false);

  const totalMonthlyIncome = ownedAssets.reduce((sum, asset) => sum + asset.payoutAmount, 0);

  const handleClaimRent = () => {
    claimRental(1);
    setClaimedRent(true);
    showNotification({
      type: 'premium',
      title: 'Rent Income Claimed!',
      message: '$4,250 rent successfully claimed! +132 ASRD tokens added to your balance.',
      duration: 5000
    });
  };

  const handleClaimWinnings = () => {
    claimWinnings(2);
    setClaimedWinnings(true);
    showNotification({
      type: 'premium',
      title: 'Investment Winnings Claimed!',
      message: '$8,500 winnings successfully claimed! +265 ASRD tokens added to your balance.',
      duration: 5000
    });
  };

  const handleViewDetails = (asset: any) => {
    setSelectedAsset(asset);
    setIsDetailsModalOpen(true);
  };

  const stats = [
    {
      label: "Portfolio Value",
      value: `$${user?.portfolioValue?.toLocaleString() || '490,000'}`,
      change: "+12.8%",
      icon: DollarSign,
      color: "text-fluid-gold"
    },
    {
      label: "Monthly Income",
      value: `$${totalMonthlyIncome.toLocaleString()}`,
      change: "+15.2%",
      icon: TrendingUp,
      color: "text-fluid-emerald"
    },
    {
      label: "Active Assets",
      value: ownedAssets.length.toString(),
      change: "+2",
      icon: Building,
      color: "text-fluid-sapphire"
    },
    {
      label: "ASRD Tokens",
      value: user?.asrdBalance?.toLocaleString() || "5,000",
      change: "+265",
      icon: Zap,
      color: "text-fluid-gold"
    }
  ];

  return (
    <div className="fluid-section">
      <div className="fluid-container">
        {/* Header Section with Mobile Optimization */}
        <div className="text-center mb-8 md:mb-12 fluid-scroll-item mobile:text-center">
          <h1 className="fluid-hero">
            Portfolio <span className="text-fluid-gold">Dashboard</span>
          </h1>
          <p className="fluid-body max-w-2xl mx-auto mobile:px-4">
            Track your premium real-world asset investments and income with comprehensive analytics
          </p>
        </div>

        {/* Stats Grid - Mobile Responsive */}
        <div className="fluid-grid fluid-grid-cols-2 lg:fluid-grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="fluid-card fluid-scroll-item mobile:w-full"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
                  <stat.icon className="w-4 h-4 md:w-6 md:h-6" />
                </div>
                <div className="flex items-center space-x-1 text-xs md:text-sm font-semibold text-fluid-emerald">
                  <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">{stat.value}</h3>
              <p className="fluid-caption text-xs md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="fluid-grid lg:fluid-grid-cols-3 gap-6 md:gap-8">
          {/* Income Section */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Claimable Income */}
            <div className="fluid-card-panel fluid-scroll-item mobile:px-4 mobile:py-4">
              <h2 className="fluid-subheading mb-4 md:mb-6">Claimable Income</h2>

              {/* Rent Income */}
              <div className="fluid-card mb-3 md:mb-4 border-fluid-gold mobile:p-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4 space-y-2 md:space-y-0">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm md:text-base">Rental Income</h3>
                    <p className="fluid-caption text-xs md:text-sm">From real estate assets</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg md:text-xl font-bold text-fluid-gold">$4,250</p>
                    <p className="text-fluid-gold text-xs md:text-sm">+132 ASRD</p>
                  </div>
                </div>
                <button
                  onClick={handleClaimRent}
                  disabled={claimedRent}
                  className={`w-full btn-fluid mobile:py-3 ${claimedRent ? 'opacity-50' : ''}`}
                >
                  <Coins className="w-4 h-4 mr-2" />
                  {claimedRent ? 'Claimed Successfully!' : 'Claim Rent Income'}
                </button>
              </div>

              {/* Winnings Income */}
              <div className="fluid-card border-fluid-emerald mobile:p-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4 space-y-2 md:space-y-0">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm md:text-base">Investment Winnings</h3>
                    <p className="fluid-caption text-xs md:text-sm">From thoroughbred and venture assets</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg md:text-xl font-bold text-fluid-emerald">$8,500</p>
                    <p className="text-fluid-emerald text-xs md:text-sm">+265 ASRD</p>
                  </div>
                </div>
                <button
                  onClick={handleClaimWinnings}
                  disabled={claimedWinnings}
                  className={`w-full btn-fluid mobile:py-3 ${claimedWinnings ? 'opacity-50' : ''}`}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {claimedWinnings ? 'Claimed Successfully!' : 'Claim Winnings'}
                </button>
              </div>
            </div>

            {/* Income History */}
            <div className="fluid-card-panel fluid-scroll-item mobile:px-4 mobile:py-4" style={{ transitionDelay: '200ms' }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 space-y-3 md:space-y-0">
                <h2 className="fluid-subheading">Income History</h2>
                <button className="btn-fluid-secondary mobile:w-full md:w-auto">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>

              <div className="space-y-2 md:space-y-3 mobile:space-y-3">
                {ownedAssets.map((asset) => (
                  <div key={asset.id} className="flex items-center justify-between p-2 md:p-3 fluid-card mobile:flex-col mobile:items-start mobile:space-y-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white text-xs md:text-sm">{asset.title}</h3>
                      <p className="fluid-caption text-xs">Next payout: {asset.nextPayout}</p>
                    </div>
                    <div className="text-right md:text-left mobile:w-full mobile:flex mobile:justify-between">
                      <p className="text-fluid-sapphire font-semibold text-sm md:text-base">${asset.payoutAmount.toLocaleString()}</p>
                      <p className="text-fluid-sapphire text-xs">+{(asset.payoutAmount / 32).toFixed(0)} ASRD</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Your Assets Section */}
          <div className="fluid-card-panel fluid-scroll-item mobile:px-4 mobile:py-4" style={{ transitionDelay: '400ms' }}>
            <h2 className="fluid-subheading mb-4 md:mb-6">Your Assets</h2>
            <div className="space-y-3 md:space-y-4 mobile:space-y-3">
              {ownedAssets.map((asset, index) => (
                <div 
                  key={asset.id} 
                  className="fluid-card cursor-pointer mobile:p-3"
                  onClick={() => handleViewDetails(asset)}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <RealAssetImage type={asset.type} title={asset.title} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-2 space-y-1 md:space-y-0">
                        <div className="flex-1">
                          <h3 className="font-bold text-white text-sm md:text-base mb-1 line-clamp-1">{asset.title}</h3>
                          <p className="fluid-caption text-xs">{asset.location}</p>
                        </div>
                        <span className="text-fluid-emerald font-semibold bg-fluid-emerald bg-opacity-10 px-2 py-1 rounded text-xs md:text-sm">
                          {asset.roi}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1 md:gap-2 text-xs mb-2">
                        <div>
                          <p className="fluid-caption">Investment</p>
                          <p className="text-white font-semibold">${asset.investment.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="fluid-caption">Shares</p>
                          <p className="text-fluid-sapphire font-semibold">{asset.shares}</p>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                        <span className="fluid-caption text-xs">Value: ${asset.value.toLocaleString()}</span>
                        <button
                          className="btn-fluid-secondary text-xs px-2 py-1 mobile:w-full md:w-auto"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(asset);
                          }}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AssetDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        asset={selectedAsset}
        onInvest={() => {}}
      />
    </div>
  );
}
