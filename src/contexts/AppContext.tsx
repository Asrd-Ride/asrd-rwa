'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useWallet } from './WalletContext'
import { mockAssets, ownedAssets, mockProposals, treasuryData, platformStats } from '@/data/mockData'

interface AppContextType {
  assets: any[]
  ownedAssets: any[]
  proposals: any[]
  treasury: any
  platformStats: any
  selectedAssetType: 'all' | 'horse' | 'real-estate'
  auctionTimeLeft: number
  buyASRD: (amount: number) => void
  purchaseAsset: (assetId: number) => void
  claimEarnings: (assetId: number) => void
  voteOnProposal: (proposalId: number, support: boolean) => void
  setSelectedAssetType: (type: 'all' | 'horse' | 'real-estate') => void
  isLoading: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { balance, asrdBalance, updateBalance, updateAsrdBalance } = useWallet()
  const [assets, setAssets] = useState(mockAssets)
  const [userAssets, setUserAssets] = useState(ownedAssets)
  const [proposals, setProposals] = useState(mockProposals)
  const [selectedAssetType, setSelectedAssetType] = useState<'all' | 'horse' | 'real-estate'>('all')
  const [auctionTimeLeft, setAuctionTimeLeft] = useState(86400) // 24 hours in seconds
  const [isLoading, setIsLoading] = useState(false)

  // Mock auction timer
  useEffect(() => {
    const timer = setInterval(() => {
      setAuctionTimeLeft(prev => prev > 0 ? prev - 1 : 86400)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const buyASRD = async (amount: number) => {
    setIsLoading(true)
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    updateAsrdBalance(asrdBalance + amount)
    setIsLoading(false)
  }

  const purchaseAsset = async (assetId: number) => {
    setIsLoading(true)
    const asset = assets.find(a => a.id === assetId)
    if (asset && asrdBalance >= asset.price) {
      // Mock purchase
      await new Promise(resolve => setTimeout(resolve, 1500))
      updateAsrdBalance(asrdBalance - asset.price)
      setUserAssets(prev => [...prev, { ...asset, id: Date.now() }])
    }
    setIsLoading(false)
  }

  const claimEarnings = async (assetId: number) => {
    setIsLoading(true)
    const asset = userAssets.find(a => a.id === assetId)
    if (asset) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const earnings = asset.unclaimedWinnings || asset.unclaimedRent || 0
      updateBalance(balance + earnings)
      // Reset unclaimed earnings
      setUserAssets(prev => prev.map(a => 
        a.id === assetId 
          ? { ...a, unclaimedWinnings: 0, unclaimedRent: 0 }
          : a
      ))
    }
    setIsLoading(false)
  }

  const voteOnProposal = async (proposalId: number, support: boolean) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setProposals(prev => prev.map(p => 
      p.id === proposalId 
        ? { 
            ...p, 
            votesFor: support ? p.votesFor + 1000 : p.votesFor,
            votesAgainst: !support ? p.votesAgainst + 1000 : p.votesAgainst
          }
        : p
    ))
    setIsLoading(false)
  }

  const filteredAssets = selectedAssetType === 'all' 
    ? assets 
    : assets.filter(asset => asset.type === selectedAssetType)

  return (
    <AppContext.Provider value={{
      assets: filteredAssets,
      ownedAssets: userAssets,
      proposals,
      treasury: treasuryData,
      platformStats,
      selectedAssetType,
      auctionTimeLeft,
      buyASRD,
      purchaseAsset,
      claimEarnings,
      voteOnProposal,
      setSelectedAssetType,
      isLoading
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within a AppProvider')
  }
  return context
}
