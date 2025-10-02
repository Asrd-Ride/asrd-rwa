'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface WalletContextType {
  cashBalance: number // USD balance
  asrdBalance: number // ASRD token balance
  updateCashBalance: (amount: number) => void
  updateAsrdBalance: (amount: number) => void
  getUsdValue: (asrdAmount: number) => number
  getAsrdValue: (usdAmount: number) => number
  buyASRDTokens: (usdAmount: number) => boolean
  sellASRDTokens: (asrdAmount: number) => boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const ASRD_TOKEN_PRICE = 32 // $32 per ASRD token

export function WalletProvider({ children }: { children: React.ReactNode }) {
  // Start with $10,000 USD cash
  const [cashBalance, setCashBalance] = useState(10000)
  // Start with 5000 ASRD tokens (equivalent to $160,000 USD)
  const [asrdBalance, setAsrdBalance] = useState(5000)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('assetRideWallet')
    if (saved) {
      const { cash, asrd } = JSON.parse(saved)
      setCashBalance(cash || 10000)
      setAsrdBalance(asrd || 5000)
    }
  }, [])

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('assetRideWallet', JSON.stringify({
      cash: cashBalance,
      asrd: asrdBalance
    }))
  }, [cashBalance, asrdBalance])

  const updateCashBalance = (amount: number) => {
    setCashBalance(amount)
  }

  const updateAsrdBalance = (amount: number) => {
    setAsrdBalance(amount)
  }

  // Convert ASRD to USD
  const getUsdValue = (asrdAmount: number) => {
    return asrdAmount * ASRD_TOKEN_PRICE
  }

  // Convert USD to ASRD
  const getAsrdValue = (usdAmount: number) => {
    return usdAmount / ASRD_TOKEN_PRICE
  }

  // Buy ASRD tokens with USD
  const buyASRDTokens = (usdAmount: number) => {
    if (cashBalance >= usdAmount) {
      const asrdToBuy = getAsrdValue(usdAmount)
      setCashBalance(prev => prev - usdAmount)
      setAsrdBalance(prev => prev + asrdToBuy)

      // Show browser alert for now (we'll add proper modals later)
      alert(`Success! You bought ${asrdToBuy.toFixed(2)} ASRD tokens for $${usdAmount}`)
      return true
    } else {
      alert('Insufficient USD balance!')
      return false
    }
  }

  // Sell ASRD tokens for USD
  const sellASRDTokens = (asrdAmount: number) => {
    if (asrdBalance >= asrdAmount) {
      const usdToGet = getUsdValue(asrdAmount)
      setAsrdBalance(prev => prev - asrdAmount)
      setCashBalance(prev => prev + usdToGet)
      alert(`Success! You sold ${asrdAmount.toFixed(2)} ASRD for $${usdToGet.toFixed(2)}`)
      return true
    } else {
      alert('Insufficient ASRD balance!')
      return false
    }
  }

  return (
    <WalletContext.Provider value={{
      cashBalance,
      asrdBalance,
      updateCashBalance,
      updateAsrdBalance,
      getUsdValue,
      getAsrdValue,
      buyASRDTokens,
      sellASRDTokens
    }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
