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
  buyASRD: (usdAmount: number) => Promise<boolean>
  purchaseAsset: (assetId: number) => Promise<boolean>
  claimEarnings: (assetId: number) => Promise<void>
  voteOnProposal: (proposalId: number, support: boolean) => Promise<void>
  setSelectedAssetType: (type: 'all' | 'horse' | 'real-estate') => void
  isLoading: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { asrdBalance, buyASRDTokens } = useWallet()
  
  const [assets, setAssets] = useState(mockAssets)
  const [userAssets, setUserAssets] = useState(ownedAssets)
  const [proposals, setProposals] = useState(mockProposals)
  const [treasury, setTreasury] = useState(treasuryData)
  const [stats, setStats] = useState(platformStats)
  const [selectedAssetType, setSelectedAssetType] = useState<'all' | 'horse' | 'real-estate'>('all')
  const [auctionTimeLeft, setAuctionTimeLeft] = useState(86400) // 24 hours in seconds
  const [isLoading, setIsLoading] = useState(false)

  // Filter assets based on selected type
  const filteredAssets = selectedAssetType === 'all' 
    ? assets 
    : assets.filter(asset => asset.category.toLowerCase() === selectedAssetType)

  const buyASRD = async (usdAmount: number): Promise<boolean> => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      const success = buyASRDTokens(usdAmount)
      return success
    } catch (error) {
      console.error('Purchase failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const purchaseAsset = async (assetId: number): Promise<boolean> => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
      
      const asset = assets.find(a => a.id === assetId)
      if (!asset) {
        return false
      }

      if (asrdBalance >= asset.price) {
        // In a real app, this would be a blockchain transaction
        setUserAssets(prev => [...prev, { ...asset, purchaseDate: new Date().toISOString() }])
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Purchase failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const claimEarnings = async (assetId: number): Promise<void> => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Earnings claimed for asset:', assetId)
    } catch (error) {
      console.error('Claim failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const voteOnProposal = async (proposalId: number, support: boolean): Promise<void> => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 800))
      setProposals(prev => prev.map(p => 
        p.id === proposalId 
          ? { 
              ...p, 
              votes: support ? p.votes + 1 : p.votes,
              userVoted: true,
              userSupport: support
            } 
          : p
      ))
    } catch (error) {
      console.error('Vote failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Countdown timer for auction
  useEffect(() => {
    const timer = setInterval(() => {
      setAuctionTimeLeft(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <AppContext.Provider value={{
      assets: filteredAssets,
      ownedAssets: userAssets,
      proposals,
      treasury,
      platformStats: stats,
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
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
