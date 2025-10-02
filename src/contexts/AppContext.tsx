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
  purchaseAsset: (assetId: number, investmentASRD: number) => Promise<boolean>
  claimEarnings: (assetId: number) => Promise<{ success: boolean; amount: number }>
  claimAllEarnings: () => Promise<{ success: boolean; totalAmount: number }>
  voteOnProposal: (proposalId: number, support: boolean) => Promise<void>
  setSelectedAssetType: (type: 'all' | 'horse' | 'real-estate') => void
  isLoading: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { asrdBalance, buyASRDTokens, cashBalance, updateAsrdBalance } = useWallet()

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

  // Generate earnings for owned assets every 30 seconds
  useEffect(() => {
    const generateEarnings = () => {
      setUserAssets(prev => prev.map(asset => {
        if (Math.random() > 0.7) { // 30% chance to generate earnings
          const earningsType = asset.type === 'horse' ? 'unclaimedWinnings' : 'unclaimedRent'
          const earningsAmount = Math.floor(Math.random() * 20) + 5 // 5-25 ASRD
          return {
            ...asset,
            [earningsType]: (asset[earningsType] || 0) + earningsAmount
          }
        }
        return asset
      }))
    }

    const interval = setInterval(generateEarnings, 30000) // Every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const filteredAssets = selectedAssetType === 'all'
    ? assets
    : assets.filter(asset => asset.type.toLowerCase() === selectedAssetType)

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

  const purchaseAsset = async (assetId: number, investmentASRD: number): Promise<boolean> => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      const asset = assets.find(a => a.id === assetId)
      if (!asset) {
        return false
      }

      if (asrdBalance >= investmentASRD) {
        const ownershipPercentage = (investmentASRD / asset.price) * 100
        
        const purchase = {
          ...asset,
          purchaseDate: new Date().toISOString(),
          fractionOwned: ownershipPercentage / 100,
          purchasePrice: investmentASRD,
          originalPrice: asset.price,
          unclaimedWinnings: 0,
          unclaimedRent: 0
        }

        setUserAssets(prev => [...prev, purchase])
        updateAsrdBalance(asrdBalance - investmentASRD)
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

  const claimEarnings = async (assetId: number): Promise<{ success: boolean; amount: number }> => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const asset = userAssets.find(a => a.id === assetId)
      if (!asset) {
        return { success: false, amount: 0 }
      }

      const earningsType = asset.type === 'horse' ? 'unclaimedWinnings' : 'unclaimedRent'
      const earningsAmount = asset[earningsType] || 0

      if (earningsAmount > 0) {
        // Transfer earnings to wallet
        updateAsrdBalance(asrdBalance + earningsAmount)

        // Reset unclaimed earnings
        setUserAssets(prev => prev.map(a =>
          a.id === assetId ? { ...a, [earningsType]: 0 } : a
        ))

        return { success: true, amount: earningsAmount }
      } else {
        return { success: false, amount: 0 }
      }
    } catch (error) {
      console.error('Claim failed:', error)
      return { success: false, amount: 0 }
    } finally {
      setIsLoading(false)
    }
  }

  const claimAllEarnings = async (): Promise<{ success: boolean; totalAmount: number }> => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      let totalEarnings = 0
      const updatedAssets = userAssets.map(asset => {
        const earningsType = asset.type === 'horse' ? 'unclaimedWinnings' : 'unclaimedRent'
        const earningsAmount = asset[earningsType] || 0
        totalEarnings += earningsAmount

        return {
          ...asset,
          [earningsType]: 0
        }
      })

      if (totalEarnings > 0) {
        // Transfer all earnings to wallet
        updateAsrdBalance(asrdBalance + totalEarnings)
        setUserAssets(updatedAssets)
        return { success: true, totalAmount: totalEarnings }
      } else {
        return { success: false, totalAmount: 0 }
      }
    } catch (error) {
      console.error('Claim all failed:', error)
      return { success: false, totalAmount: 0 }
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
              votesFor: support ? p.votesFor + 1 : p.votesFor,
              votesAgainst: !support ? p.votesAgainst + 1 : p.votesAgainst,
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
      claimAllEarnings,
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
