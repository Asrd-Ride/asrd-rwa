'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface WalletContextType {
  balance: number // USD balance
  asrdBalance: number // ASRD token balance
  updateBalance: (amount: number) => void
  updateAsrdBalance: (amount: number) => void
  getUsdValue: (asrdAmount: number) => number
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const ASRD_PRICE = 32 // $32 per ASRD token

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(10000) // $10,000 USD
  const [asrdBalance, setAsrdBalance] = useState(10000) // 10,000 ASRD tokens

  const updateBalance = (amount: number) => {
    setBalance(amount)
  }

  const updateAsrdBalance = (amount: number) => {
    setAsrdBalance(amount)
  }

  const getUsdValue = (asrdAmount: number) => {
    return asrdAmount * ASRD_PRICE
  }

  return (
    <WalletContext.Provider value={{ 
      balance, 
      asrdBalance, 
      updateBalance, 
      updateAsrdBalance,
      getUsdValue 
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
