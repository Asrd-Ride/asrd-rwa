'use client'
import { AppProvider } from '@/contexts/AppContext'
import { WalletProvider } from '@/contexts/WalletContext'
import { AuthProvider } from '@/contexts/AuthContext'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <WalletProvider>
        <AppProvider>
          {children}
        </AppProvider>
      </WalletProvider>
    </AuthProvider>
  )
}
