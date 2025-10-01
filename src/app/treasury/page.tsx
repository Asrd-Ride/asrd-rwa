'use client'
import { motion } from 'framer-motion'
import Treasury from '@/components/sections/Treasury'
import Header from '@/components/layout/Header'

export default function TreasuryPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-financial-deep to-black text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-success/10 via-financial-dark to-black"></div>
      
      <Header />
      <Treasury />
      
      <footer className="glass-nav border-t border-accent-success/20 py-8">
        <div className="container-pro text-center">
          <p className="text-neutral-mid">© 2024 Asset Ride. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
