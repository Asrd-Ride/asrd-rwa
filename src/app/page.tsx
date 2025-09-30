'use client'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Hero from '@/components/sections/Hero'
import Marketplace from '@/components/sections/Marketplace'
import DAO from '@/components/sections/DAO'
import Dashboard from '@/components/sections/Dashboard'
import Treasury from '@/components/sections/Treasury'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-dark to-black text-white overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-cyan/10 via-primary-dark to-black"></div>
      
      <Header />
      <Hero />
      <Marketplace />
      <DAO />
      <Dashboard />
      <Treasury />
      
      <footer className="glass-dark border-t border-primary-cyan/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60">© 2024 Asset Ride. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
