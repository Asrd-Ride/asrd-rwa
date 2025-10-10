"use client";

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Shield, 
  Zap,
  Play,
  Pause,
  SkipForward,
  Eye
} from 'lucide-react';

const platformFeatures = [
  {
    step: 1,
    title: "Browse Marketplace",
    description: "Explore premium real-world assets starting from $100",
    icon: ShoppingCart,
    color: "from-cyan-500 to-blue-500"
  },
  {
    step: 2,
    title: "Invest Securely",
    description: "Tokenize your investment with ASRD tokens",
    icon: Shield,
    color: "from-emerald-500 to-teal-500"
  },
  {
    step: 3,
    title: "Earn Returns",
    description: "Receive 20-45% returns from rental income and asset appreciation",
    icon: DollarSign,
    color: "from-amber-500 to-orange-500"
  },
  {
    step: 4,
    title: "Govern & Vote",
    description: "Participate in DAO decisions with your voting power",
    icon: Users,
    color: "from-purple-500 to-pink-500"
  }
];

const demoSteps = [
  {
    title: "Asset Discovery",
    description: "Browse through curated premium assets with detailed analytics",
    visualization: "marketplace",
    stats: { assets: "50+", minInvestment: "$100", avgROI: "32.5%" }
  },
  {
    title: "Portfolio Management", 
    description: "Track your investments with real-time performance analytics",
    visualization: "dashboard",
    stats: { portfolioValue: "$490K", returns: "+12.8%", activeAssets: "8" }
  },
  {
    title: "Income Distribution",
    description: "Receive automated rental income and asset winnings",
    visualization: "income",
    stats: { monthlyIncome: "$12.5K", tokensEarned: "397 ASRD", growth: "+8.2%" }
  },
  {
    title: "Community Governance",
    description: "Vote on platform decisions and new asset acquisitions",
    visualization: "dao",
    stats: { proposals: "24", participation: "87%", members: "1,247" }
  }
];

export default function PlatformDemo() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCreateAccount = () => {
    // This will login and redirect to dashboard
    router.push('/dashboard');
  };

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % demoSteps.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const selectStep = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <section id="platform-demo" className="premium-section relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-cyan-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

      <div className="premium-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="premium-heading-2 mb-6">
            Platform <span className="text-cyan-400">Experience Demo</span>
          </h2>
          <p className="premium-text max-w-2xl mx-auto">
            See how AssetRide transforms real-world asset investing with our seamless platform experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Demo Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="premium-card p-0 overflow-hidden"
          >
            {/* Demo Screen */}
            <div className="relative h-80 bg-gradient-to-br from-gray-900 to-gray-800 rounded-t-2xl border-b border-gray-700">
              {/* Mock Platform Interface */}
              <div className="absolute inset-4 bg-gray-950 rounded-lg overflow-hidden">
                {/* Mock Header */}
                <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"></div>
                    <span className="text-white font-semibold">AssetRide</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                </div>

                {/* Mock Content based on current step */}
                <div className="p-6">
                  {demoSteps[currentStep].visualization === 'marketplace' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-white font-semibold">Premium Assets</h3>
                        <div className="w-20 h-6 bg-gray-700 rounded"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="bg-gray-800 rounded-lg p-3">
                            <div className="w-full h-16 bg-gray-700 rounded mb-2"></div>
                            <div className="w-3/4 h-3 bg-gray-600 rounded mb-1"></div>
                            <div className="w-1/2 h-2 bg-cyan-500 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {demoSteps[currentStep].visualization === 'dashboard' && (
                    <div className="space-y-4">
                      <div className="flex space-x-4">
                        <div className="flex-1 bg-gray-800 rounded-lg p-4">
                          <div className="w-1/2 h-4 bg-gray-600 rounded mb-2"></div>
                          <div className="w-3/4 h-6 bg-cyan-500 rounded"></div>
                        </div>
                        <div className="flex-1 bg-gray-800 rounded-lg p-4">
                          <div className="w-1/2 h-4 bg-gray-600 rounded mb-2"></div>
                          <div className="w-3/4 h-6 bg-emerald-500 rounded"></div>
                        </div>
                      </div>
                      <div className="h-32 bg-gray-800 rounded-lg"></div>
                    </div>
                  )}

                  {demoSteps[currentStep].visualization === 'income' && (
                    <div className="space-y-4">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div className="w-1/2 h-4 bg-gray-600 rounded"></div>
                          <div className="w-1/4 h-6 bg-amber-500 rounded"></div>
                        </div>
                        <div className="space-y-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center py-2">
                              <div className="w-2/3 h-3 bg-gray-700 rounded"></div>
                              <div className="w-1/4 h-4 bg-emerald-500 rounded"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {demoSteps[currentStep].visualization === 'dao' && (
                    <div className="space-y-4">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="w-3/4 h-4 bg-gray-600 rounded mb-3"></div>
                        <div className="flex space-x-2 mb-3">
                          <div className="flex-1 h-8 bg-cyan-500 rounded"></div>
                          <div className="flex-1 h-8 bg-gray-700 rounded"></div>
                        </div>
                        <div className="w-full h-4 bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Step Info */}
            <div className="p-6">
              <h3 className="premium-heading-3 mb-2">{demoSteps[currentStep].title}</h3>
              <p className="text-gray-300 mb-4">{demoSteps[currentStep].description}</p>
              
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(demoSteps[currentStep].stats).map(([key, value]) => (
                  <div key={key} className="text-center p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                    <p className="text-cyan-300 font-bold text-sm">{value}</p>
                    <p className="text-cyan-200 text-xs capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center hover:bg-cyan-500/30 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4 text-cyan-400" /> : <Play className="w-4 h-4 text-cyan-400" />}
                </button>
                <button
                  onClick={nextStep}
                  className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center hover:bg-cyan-500/30 transition-colors"
                >
                  <SkipForward className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
              
              <div className="flex space-x-1">
                {demoSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => selectStep(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentStep === index 
                        ? 'bg-cyan-400 w-6' 
                        : 'bg-gray-600 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Platform Features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="premium-heading-3">How It Works</h3>
            
            <div className="space-y-4">
              {platformFeatures.map((feature, index) => (
                <motion.div
                  key={feature.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="premium-card p-4 group hover:border-cyan-400/30 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-cyan-400 text-sm font-semibold">Step {feature.step}</span>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      </div>
                      <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="premium-card text-center bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-400/30"
            >
              <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h4 className="premium-heading-3 mb-2">Ready to Get Started?</h4>
              <p className="text-gray-300 mb-6">
                Join thousands of investors already earning premium returns
              </p>
              <button 
                onClick={handleCreateAccount}
                className="btn-premium w-full justify-center group"
              >
                <span className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>Create Your Account</span>
                </span>
              </button>
              <p className="text-gray-400 text-sm mt-3">
                Instant access • No commitment • Demo portfolio included
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
