'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

interface WalletContextType {
  balance: number
  asrdBalance: number
  updateBalance: (amount: number) => void
  updateAsrdBalance: (amount: number) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(10000)
  const [asrdBalance, setAsrdBalance] = useState(10000)

  const updateBalance = (amount: number) => {
    setBalance(amount)
  }

  const updateAsrdBalance = (amount: number) => {
    setAsrdBalance(amount)
  }

  return (
    <WalletContext.Provider value={{ balance, asrdBalance, updateBalance, updateAsrdBalance }}>
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
