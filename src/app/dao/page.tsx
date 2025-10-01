'use client'
import { motion } from 'framer-motion'
import DAO from '@/components/sections/DAO'
import Header from '@/components/layout/Header'

export default function DAOPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-financial-deep to-black text-white overflow-x-hidden">
      {/* Enhanced Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-financial-deep via-financial-dark to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-success/5 via-transparent to-accent-primary/5"></div>
      </div>
      
      <Header />
      <DAO />
      
      <footer className="glass-nav border-t border-accent-success/20 py-8 relative z-10">
        <div className="container-pro text-center">
          <p className="text-neutral-mid">© 2024 Asset Ride. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
