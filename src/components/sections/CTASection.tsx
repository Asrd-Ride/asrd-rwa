'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-20 relative">
      <div className="container-pro">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 md:p-12 text-center border border-accent-success/20 relative overflow-hidden"
        >
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-success/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-primary/10 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-accent-success to-accent-primary bg-clip-text text-transparent">
              Ready to Start Investing?
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-neutral-mid mb-8 max-w-2xl mx-auto"
          >
            Join thousands of investors already building wealth through tokenized real-world assets
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Link href="/marketplace">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-accent-success to-accent-primary text-financial-dark px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 glow-success hover:glow-primary transition-all duration-300"
              >
                <span>Start Investing Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-accent-success text-accent-success px-8 py-4 rounded-xl font-semibold text-lg hover:bg-accent-success hover:text-financial-dark transition-all duration-300"
              >
                View Demo Dashboard
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-neutral-mid text-sm"
          >
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-current" />
                ))}
              </div>
              <span>4.9/5 Rating</span>
            </div>
            <div>•</div>
            <div>2,458+ Happy Investors</div>
            <div>•</div>
            <div>98.7% Uptime</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
