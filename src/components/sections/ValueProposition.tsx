'use client'
import { motion } from 'framer-motion'
import { Shield, Zap, TrendingUp, Users } from 'lucide-react'

export default function ValueProposition() {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Regulated',
      description: 'Fully compliant RWA tokenization with institutional-grade security and regulatory oversight.',
      color: 'text-accent-success'
    },
    {
      icon: Zap,
      title: 'Instant Liquidity',
      description: 'Trade tokenized real-world assets 24/7 with instant settlement and global market access.',
      color: 'text-accent-primary'
    },
    {
      icon: TrendingUp,
      title: 'Proven Returns',
      description: 'Access premium assets with historical returns of 8-12% annually and transparent performance tracking.',
      color: 'text-accent-secondary'
    },
    {
      icon: Users,
      title: 'Community Governance',
      description: 'Shape the platform\'s future through decentralized governance and collective decision-making.',
      color: 'text-warning'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 relative">
      <div className="container-pro">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-accent-success via-accent-primary to-accent-secondary bg-clip-text text-transparent">
              Why Choose Asset Ride?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-neutral-mid max-w-3xl mx-auto leading-relaxed"
          >
            Revolutionizing real-world asset investment through blockchain technology, 
            providing unprecedented access, liquidity, and transparency.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-8 text-center h-full border border-white/10 group-hover:border-accent-success/30 transition-all duration-500 group-hover:glow-success">
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5 
                  }}
                  className={`w-16 h-16 ${feature.color} bg-gradient-to-br from-current/20 to-transparent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-current/20 transition-all duration-300`}
                >
                  <feature.icon className="w-8 h-8" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-accent-success transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-neutral-mid leading-relaxed group-hover:text-neutral-light transition-colors">
                  {feature.description}
                </p>
                
                {/* Animated underline */}
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-transparent via-accent-success to-transparent mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{
                    scaleX: [0, 1],
                    transition: { duration: 0.5 }
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-card rounded-2xl p-8 mt-16 border border-accent-success/20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '$128M', label: 'Market Cap' },
              { value: '2,458+', label: 'Active Investors' },
              { value: '45', label: 'Premium Assets' },
              { value: '98.7%', label: 'Uptime' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-accent-success mb-2">{stat.value}</div>
                <div className="text-neutral-mid text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
