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
  purchaseAsset: (assetId: number, fraction?: number) => Promise<boolean>
  claimEarnings: (assetId: number) => Promise<void>
  voteOnProposal: (proposalId: number, support: boolean) => Promise<void>
  setSelectedAssetType: (type: 'all' | 'horse' | 'real-estate') => void
  isLoading: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { asrdBalance, buyASRDTokens, cashBalance } = useWallet()
  
  const [assets, setAssets] = useState(mockAssets)
  const [userAssets, setUserAssets] = useState(ownedAssets)
  const [proposals, setProposals] = useState(mockProposals)
  const [treasury, setTreasury] = useState(treasuryData)
  const [stats, setStats] = useState(platformStats)
  const [selectedAssetType, setSelectedAssetType] = useState<'all' | 'horse' | 'real-estate'>('all')
  const [auctionTimeLeft, setAuctionTimeLeft] = useState(86400)
  const [isLoading, setIsLoading] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const savedAssets = localStorage.getItem('assetRidePurchases')
    if (savedAssets) {
      setUserAssets(JSON.parse(savedAssets))
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('assetRidePurchases', JSON.stringify(userAssets))
  }, [userAssets])

  const filteredAssets = selectedAssetType === 'all' 
    ? assets 
    : assets.filter(asset => asset.category.toLowerCase() === selectedAssetType)

  const buyASRD = async (usdAmount: number): Promise<boolean> => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const success = buyASRDTokens(usdAmount)
      return success
    } catch (error) {
      console.error('Purchase failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const purchaseAsset = async (assetId: number, fraction: number = 1): Promise<boolean> => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const asset = assets.find(a => a.id === assetId)
      if (!asset) {
        return false
      }

      const purchasePrice = asset.price * fraction

      if (asrdBalance >= purchasePrice) {
        const purchase = {
          ...asset,
          purchaseDate: new Date().toISOString(),
          fractionOwned: fraction,
          purchasePrice: purchasePrice,
          originalPrice: asset.price
        }
        
        setUserAssets(prev => [...prev, purchase])
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
