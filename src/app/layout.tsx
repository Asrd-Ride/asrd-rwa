import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WalletProvider } from '@/contexts/WalletContext'
import { AppProvider } from '@/contexts/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Asset Ride - Premium RWA NFT Marketplace',
  description: 'Tokenizing Horses and Real Estate NFTs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <AppProvider>
            {children}
          </AppProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
