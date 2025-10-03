import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import PerformanceOptimizer from '@/components/PerformanceOptimizer'
import Header from '@/components/layout/Header'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'Asset Ride - Premium RWA NFT Marketplace',
  description: 'Tokenizing Horses and Real Estate NFTs',
  keywords: ['NFT', 'real estate', 'horses', 'blockchain', 'investment', 'fractional ownership'],
  authors: [{ name: 'Asset Ride Team' }],
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={inter.className}>
        <PerformanceOptimizer>
          <Providers>
            <Header />
            <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 text-gray-800 overflow-x-hidden">
              {children}
            </main>
          </Providers>
        </PerformanceOptimizer>
      </body>
    </html>
  )
}
