'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useWallet } from './WalletContext'
import { useNotification } from './NotificationContext'
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
  const { showNotification } = useNotification()
  const [assets, setAssets] = useState(mockAssets)
  const [userAssets, setUserAssets] = useState(ownedAssets)
  const [proposals, setProposals] = useState(mockProposals)
  const [selectedAssetType, setSelectedAssetType] = useState<'all' | 'horse' | 'real-estate'>('all')
  const [auctionTimeLeft, setAuctionTimeLeft] = useState(86400)
  const [isLoading, setIsLoading] = useState(false)

  // Mock auction timer
  useEffect(() => {
    const timer = setInterval(() => {
      setAuctionTimeLeft(prev => prev > 0 ? prev - 1 : 86400)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const buyASRD = async (usdAmount: number) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    const success = buyASRDTokens(usdAmount)
    setIsLoading(false)
    return success
  }

  const purchaseAsset = async (assetId: number) => {
    setIsLoading(true)
    const asset = assets.find(a => a.id === assetId)
    if (asset && asrdBalance >= asset.price) {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setUserAssets(prev => [...prev, { ...asset, id: Date.now() }])
      setIsLoading(false)
      
      showNotification({
        type: 'success',
        title: 'Purchase Successful!',
        message: `You are now a fractional owner of ${asset.name}.`
      })
      return true
    } else {
      setIsLoading(false)
      showNotification({
        type: 'error',
        title: 'Insufficient Balance',
        message: `You need ${asset?.price} ASRD to purchase this asset. You have ${Math.floor(asrdBalance)} ASRD.`
      })
      return false
    }
  }

  const claimEarnings = async (assetId: number) => {
    setIsLoading(true)
    const asset = userAssets.find(a => a.id === assetId)
    if (asset) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const earnings = asset.unclaimedWinnings || asset.unclaimedRent || 0
      setUserAssets(prev => prev.map(a => 
        a.id === assetId 
          ? { ...a, unclaimedWinnings: 0, unclaimedRent: 0 }
          : a
      ))
      
      showNotification({
        type: 'success',
        title: 'Earnings Claimed!',
        message: `Successfully claimed $${earnings} from ${asset.name}.`
      })
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
    
    showNotification({
      type: 'success',
      title: 'Vote Submitted!',
      message: `Your vote has been ${support ? 'for' : 'against'} the proposal has been recorded.`
    })
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
