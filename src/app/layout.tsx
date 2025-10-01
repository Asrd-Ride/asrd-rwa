import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { WalletProvider } from '@/contexts/WalletContext'
import { AppProvider } from '@/contexts/AppContext'
import { NotificationProvider } from '@/contexts/NotificationContext'

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
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </AppProvider>
        </WalletProvider>
      </body>
    </html>
  )
}
