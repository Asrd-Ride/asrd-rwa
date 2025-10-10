'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Shield, Zap, DollarSign, Rocket } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Discover Premium Assets",
      description: "Explore our curated collection of high-ROI real world assets from $100",
      icon: <Search className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02",
      title: "Fractional Ownership",
      description: "Own pieces of luxury assets starting from just $100 investment",
      icon: <DollarSign className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-500"
    },
    {
      number: "03",
      title: "Blockchain Security",
      description: "All investments secured with enterprise-grade blockchain technology",
      icon: <Shield className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "04",
      title: "Earn High Returns",
      description: "Receive 20-45% average annual returns with regular distributions",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-amber-500 to-orange-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

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
  };

  return (
    <section id="how-it-works" className="section-premium relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float delay-2000" />
      </div>

      <div className="container-premium relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 glass-ultimate mb-6 border border-cyan-500/30">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">
              SIMPLE 4-STEP PROCESS
            </span>
          </div>
          
          <h2 className="heading-responsive text-gradient-premium mb-6">
            Start Investing in Minutes
          </h2>
          <p className="text-responsive text-premium-light max-w-3xl mx-auto leading-relaxed">
            From discovery to returns - experience the future of asset ownership with our streamlined platform. 
            <span className="text-cyan-400 font-semibold"> Start with just $100 and earn 20-45% returns.</span>
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="group"
            >
              <div className="card-premium h-full hover:transform hover:scale-105 transition-all duration-500">
                <div className="card-premium-content text-center">
                  {/* Step Number & Icon */}
                  <div className="flex flex-col items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">
                        {step.icon}
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 text-sm font-bold">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-premium-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-premium-light leading-relaxed">
                    {step.description}
                  </p>

                  {/* Animated Border Effect */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-3/4 transition-all duration-500 rounded-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-ultimate p-8 rounded-3xl border border-cyan-500/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Rocket className="w-6 h-6 text-cyan-400" />
              <span className="text-cyan-400 font-semibold text-lg">READY TO START?</span>
            </div>
            <h3 className="text-2xl font-bold text-premium-white mb-4">
              Join 300K+ Investors Worldwide
            </h3>
            <p className="text-premium-light mb-6">
              Start your investment journey today with just $100 and experience premium asset ownership
            </p>
            <button className="btn-premium text-lg px-8 py-4">
              Start Investing Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
