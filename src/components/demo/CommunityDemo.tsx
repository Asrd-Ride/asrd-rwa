"use client";

import { motion } from 'framer-motion';
import React from 'react';
import { Users, Vote, DollarSign, TrendingUp, Users2, Target, BarChart3, HeartHandshake } from 'lucide-react';

const communityData = {
  platformStats: {
    totalAssets: 24,
    totalValue: 15420000,
    averageROI: 32.5,
    communityMembers: 1247,
    totalReturns: 4500000,
    platformVolume: 28500000,
    communityVotes: 8420,
    avgCommunityInvestment: 3200
  },
  
  communityHighlights: [
    { 
      title: "Democratized Access", 
      description: "1,247+ members investing from $100",
      icon: "👥",
      metric: "1247+",
      label: "Community Members"
    },
    { 
      title: "Collective Governance", 
      description: "8,420+ votes cast in community decisions",
      icon: "🗳️",
      metric: "8420+",
      label: "Community Votes"
    },
    { 
      title: "Shared Success", 
      description: "$4.5M returns distributed to community",
      icon: "💰",
      metric: "$4.5M",
      label: "Community Returns"
    },
    { 
      title: "Average Investment", 
      description: "Accessible to all with $3,200 average",
      icon: "🎯",
      metric: "$3.2K",
      label: "Avg Investment"
    }
  ],
  
  communityGrowth: [
    { period: "Launch", members: 150, assets: 8, volume: 2500000 },
    { period: "6 Months", members: 480, assets: 14, volume: 9800000 },
    { period: "1 Year", members: 847, assets: 19, volume: 18200000 },
    { period: "Current", members: 1247, assets: 24, volume: 28500000 }
  ],
  
  communityInitiatives: [
    {
      title: "Community Asset Selection",
      description: "Members vote on new asset acquisitions through DAO",
      participation: "89%",
      outcome: "12 community-selected assets"
    },
    {
      title: "Platform Fee Reduction",
      description: "Community voted to reduce fees from 2% to 1.5%",
      participation: "76%",
      outcome: "Higher returns for all members"
    },
    {
      title: "Educational Program",
      description: "Member-driven investment education initiative",
      participation: "63%",
      outcome: "250+ members trained"
    }
  ]
};

export default function CommunityDemo() {
  return (
    <div className="premium-section bg-gradient-to-br from-slate-900 via-purple-900/20 to-cyan-900/20">
      <div className="premium-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="premium-heading-2 mb-6">
            Community <span className="text-cyan-400">Powered</span> Platform
          </h2>
          <p className="premium-text max-w-2xl mx-auto">
            Built by and for our community of 1,247+ investors. Democratizing access to premium assets through collective ownership and governance.
          </p>
        </motion.div>

        {/* Community Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {communityData.communityHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="premium-card text-center group hover:border-cyan-400/30"
            >
              <div className="text-4xl mb-4">{highlight.icon}</div>
              <div className="text-2xl font-bold text-white mb-2">{highlight.metric}</div>
              <div className="text-gray-400 text-sm mb-3">{highlight.label}</div>
              <h3 className="premium-heading-3 mb-2">{highlight.title}</h3>
              <p className="text-gray-300 text-sm">{highlight.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Community Growth */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="premium-card mb-12"
        >
          <h3 className="premium-heading-3 mb-6 text-center">Community Growth Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityData.communityGrowth.map((stage, index) => (
              <motion.div
                key={stage.period}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/30 transition-all"
              >
                <Users2 className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-white font-bold text-lg mb-1">{stage.period}</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Members:</span>
                    <span className="text-cyan-400">{stage.members}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Assets:</span>
                    <span className="text-emerald-400">{stage.assets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volume:</span>
                    <span className="text-amber-400">${(stage.volume / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Initiatives */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="premium-card"
        >
          <h3 className="premium-heading-3 mb-6 text-center">Community-Led Initiatives</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communityData.communityInitiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="text-center p-6 bg-gray-800/30 rounded-2xl border border-gray-700 hover:border-purple-400/30 transition-all group"
              >
                <HeartHandshake className="w-8 h-8 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="premium-heading-3 mb-3">{initiative.title}</h4>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{initiative.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Participation:</span>
                  <span className="text-cyan-400 font-semibold">{initiative.participation}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-gray-400">Outcome:</span>
                  <span className="text-emerald-400 font-semibold">{initiative.outcome}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="premium-card bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-400/30 max-w-2xl mx-auto">
            <Users className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h3 className="premium-heading-2 mb-4">Join Our Community</h3>
            <p className="premium-text mb-6">
              Become part of our growing community of 1,247+ investors. Start with just $100 and help shape the future of democratized investing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <div className="text-cyan-300 font-bold">$100</div>
                <div className="text-cyan-200">Minimum Investment</div>
              </div>
              <div className="text-center p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <div className="text-emerald-300 font-bold">32.5%</div>
                <div className="text-emerald-200">Average Returns</div>
              </div>
              <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <div className="text-purple-300 font-bold">100%</div>
                <div className="text-purple-200">Community Driven</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
