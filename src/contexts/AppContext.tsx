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
  
  // Safe notification function that won't break if context isn't available
  const showNotification = (notification: { type: 'success' | 'error' | 'warning' | 'info'; title: string; message: string }) => {
    // This will only work if NotificationContext is available in the DOM
    if (typeof window !== 'undefined') {
      // We'll use a custom event to trigger notifications if needed
      console.log('Notification:', notification)
    }
  }

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
      if (success) {
        showNotification({
          type: 'success',
          title: 'Purchase Successful!',
          message: `You bought ${(usdAmount / 32).toFixed(2)} ASRD tokens`
        })
      } else {
        showNotification({
          type: 'error',
          title: 'Insufficient Funds',
          message: 'You do not have enough USD to complete this purchase'
        })
      }
      return success
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Purchase Failed',
        message: 'There was an error processing your purchase'
      })
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
        showNotification({
          type: 'error',
          title: 'Asset Not Found',
          message: 'The selected asset could not be found'
        })
        return false
      }

      if (asrdBalance >= asset.price) {
        // In a real app, this would be a blockchain transaction
        setUserAssets(prev => [...prev, { ...asset, purchaseDate: new Date().toISOString() }])
        showNotification({
          type: 'success',
          title: 'Asset Purchased!',
          message: `You are now a fractional owner of ${asset.name}`
        })
        return true
      } else {
        showNotification({
          type: 'error',
          title: 'Insufficient ASRD',
          message: `You need ${asset.price} ASRD to purchase this asset`
        })
        return false
      }
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Purchase Failed',
        message: 'There was an error purchasing the asset'
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const claimEarnings = async (assetId: number): Promise<void> => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      showNotification({
        type: 'success',
        title: 'Earnings Claimed!',
        message: 'Your earnings have been distributed to your wallet'
      })
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Claim Failed',
        message: 'There was an error claiming your earnings'
      })
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
      showNotification({
        type: 'success',
        title: 'Vote Submitted!',
        message: `You voted ${support ? 'FOR' : 'AGAINST'} proposal #${proposalId}`
      })
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Vote Failed',
        message: 'There was an error submitting your vote'
      })
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
