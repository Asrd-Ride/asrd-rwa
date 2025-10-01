'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface WalletContextType {
  cashBalance: number // USD balance
  asrdBalance: number // ASRD token balance
  updateCashBalance: (amount: number) => void
  updateAsrdBalance: (amount: number) => void
  getUsdValue: (asrdAmount: number) => number
  buyASRDTokens: (usdAmount: number) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const ASRD_TOKEN_PRICE = 32 // $32 per ASRD token

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [cashBalance, setCashBalance] = useState(10000) // $10,000 USD starting cash
  const [asrdBalance, setAsrdBalance] = useState(312) // Starting ASRD = 10,000 / 32 = 312.5 ASRD

  const updateCashBalance = (amount: number) => {
    setCashBalance(amount)
  }

  const updateAsrdBalance = (amount: number) => {
    setAsrdBalance(amount)
  }

  const getUsdValue = (asrdAmount: number) => {
    return asrdAmount * ASRD_TOKEN_PRICE
  }

  const buyASRDTokens = (usdAmount: number) => {
    if (cashBalance >= usdAmount) {
      const asrdToBuy = usdAmount / ASRD_TOKEN_PRICE
      setCashBalance(prev => prev - usdAmount)
      setAsrdBalance(prev => prev + asrdToBuy)
      return true
    }
    return false
  }

  return (
    <WalletContext.Provider value={{ 
      cashBalance, 
      asrdBalance, 
      updateCashBalance, 
      updateAsrdBalance,
      getUsdValue,
      buyASRDTokens
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
