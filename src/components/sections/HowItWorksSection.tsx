'use client'
import { motion } from 'framer-motion'
import { Search, Coins, TrendingUp, Shield } from 'lucide-react'

export default function HowItWorksSection() {
  const steps = [
    {
      icon: Search,
      title: 'Browse Assets',
      description: 'Explore our curated collection of premium horses and luxury real estate properties.',
      color: 'text-accent-success'
    },
    {
      icon: Coins,
      title: 'Purchase Tokens',
      description: 'Buy fractional ownership tokens using ASRD. Minimum investment starts at $10.',
      color: 'text-accent-primary'
    },
    {
      icon: TrendingUp,
      title: 'Earn Returns',
      description: 'Receive rental income from real estate or race winnings from horses automatically.',
      color: 'text-accent-secondary'
    },
    {
      icon: Shield,
      title: 'Secure & Liquid',
      description: 'Your assets are securely tokenized and can be traded on our marketplace 24/7.',
      color: 'text-warning'
    }
  ]

  return (
    <section className="py-20 relative">
      <div className="container-pro">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent-success to-accent-primary bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-neutral-mid max-w-2xl mx-auto">
            Simple, transparent, and secure process to invest in premium real-world assets
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent-success text-financial-dark rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              
              <div className="glass-card rounded-2xl p-6 h-full border border-white/10 hover:border-accent-success/30 transition-all duration-500 group">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-current/10 to-transparent ${step.color} w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent-success transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-neutral-mid leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="hidden lg:block h-1 bg-gradient-to-r from-accent-success via-accent-primary to-accent-secondary rounded-full mt-12 mx-12 transform origin-left"
        />
      </div>
    </section>
  )
}
