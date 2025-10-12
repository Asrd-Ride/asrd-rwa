"use client";

import React, { useState } from 'react';
import { 
  Lock, Target, Zap, Users, Gem, Rocket, Shield, DollarSign,
  ArrowRight, Sparkles, TrendingUp, Globe, Building2
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ModernJourneySection() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const storyTimeline = [
    {
      phase: "01",
      title: "The Wall Street Barrier",
      description: "$50M luxury assets were exclusive to institutions and ultra-wealthy. 99.9% of investors were locked out of premium opportunities.",
      icon: Lock,
      stats: "0.1% Access",
      gradient: "from-blue-500 to-cyan-500",
      color: "blue"
    },
    {
      phase: "02",
      title: "Blockchain Breakthrough", 
      description: "We pioneered RWA tokenization - transforming physical assets into secure digital tokens with real ownership rights.",
      icon: Zap,
      stats: "Tokenization Tech",
      gradient: "from-emerald-500 to-green-500",
      color: "emerald"
    },
    {
      phase: "03", 
      title: "Fractional Revolution",
      description: "Democratizing access by splitting $50M assets into affordable fractions. Real ownership starting at $100.",
      icon: Gem,
      stats: "$100 Entry",
      gradient: "from-amber-500 to-orange-500", 
      color: "amber"
    },
    {
      phase: "04",
      title: "New Wealth Era",
      description: "2,470+ investors now building generational wealth through elite assets previously reserved for the 1%.",
      icon: Users,
      stats: "2.4K+ Investors",
      gradient: "from-purple-500 to-pink-500",
      color: "purple"
    }
  ];

  const valueProps = [
    {
      icon: Shield,
      title: "Asset-Backed Security",
      description: "Every token backed by real-world assets with institutional-grade due diligence",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp, 
      title: "Proven Performance",
      description: "20-45% historical returns from real income-generating assets",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Invest in international assets from anywhere with 24/7 liquidity",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: Building2,
      title: "Institutional Quality",
      description: "Same premium assets trusted by billion-dollar funds, now accessible",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const handleJoinRevolution = () => {
    router.push('/marketplace');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl mb-8">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold text-sm tracking-wide">THE RWA REVOLUTION</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Democratizing <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Elite Assets</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Transforming $50M institutional investments into accessible opportunities through 
            <span className="text-cyan-400 font-semibold"> blockchain-powered fractional ownership.</span>
          </p>
        </div>

        {/* Modern Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {storyTimeline.map((chapter, index) => (
            <div
              key={chapter.phase}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`
                relative p-8 rounded-3xl border transition-all duration-500 overflow-hidden
                ${hoveredCard === index 
                  ? 'bg-white/5 border-cyan-400/30 scale-105 shadow-2xl shadow-cyan-500/10' 
                  : 'bg-white/3 border-white/10 hover:border-white/20'
                }
              `}>
                
                {/* Animated Gradient Background */}
                <div className={`
                  absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500
                  bg-gradient-to-r ${chapter.gradient}
                `}></div>

                {/* Phase Badge */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg
                    bg-gradient-to-r ${chapter.gradient} shadow-lg
                  `}>
                    {chapter.phase}
                  </div>
                  <div className="flex-1 h-px bg-white/10"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`
                      p-3 rounded-xl bg-gradient-to-r ${chapter.gradient} shadow-lg
                    `}>
                      <chapter.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {chapter.title}
                      </h3>
                      <div className="inline-flex items-center px-3 py-1 bg-white/10 rounded-full border border-white/20">
                        <span className="text-cyan-400 text-sm font-semibold">{chapter.stats}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed">
                    {chapter.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className={`
                  absolute top-6 right-6 transform transition-all duration-300
                  ${hoveredCard === index ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}
                `}>
                  <ArrowRight className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {valueProps.map((prop, index) => (
            <div
              key={prop.title}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:scale-105"
            >
              <div className={`
                w-12 h-12 rounded-xl mb-4 flex items-center justify-center
                bg-gradient-to-r ${prop.gradient} shadow-lg
              `}>
                <prop.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-3">
                {prop.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>

        {/* Modern CTA Section */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 backdrop-blur-sm">
            <Rocket className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join the <span className="text-cyan-400">Financial Revolution</span>
            </h2>
            
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              What institutions spend millions to access is now available starting at $100. 
              This is more than investing - it's building generational wealth.
            </p>

            <button
              onClick={handleJoinRevolution}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
            >
              <span>Start Investing Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}