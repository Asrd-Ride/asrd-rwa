"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, Users, Zap, Shield, Globe, TrendingUp,
  Crown, DollarSign, Building2, Lock, Award, Rocket
} from 'lucide-react';

export default function OurJourneySection() {
  const milestones = [
    {
      year: "Q3-2025",
      title: "Protocol Foundation",
      description: "Launched AssetRide with a vision to democratize institutional-grade real world assets through blockchain technology",
      icon: <Target className="w-6 h-6" />,
      stats: "Platform Architecture Deployed"
    },
    {
      year: "Q4-2025", 
      title: "Collective Capital Power",
      description: "Enabled fractional digital ownership starting from $100, breaking barriers to elite asset classes previously reserved for ultra-high-net-worth individuals",
      icon: <Users className="w-6 h-6" />,
      stats: "1,247+ Community Members"
    },
    {
      year: "Q1-2026",
      title: "Institutional-Grade Access",
      description: "Curated portfolio of $50M+ elite assets including luxury real estate, thoroughbreds, marine assets, and private aviation",
      icon: <Building2 className="w-6 h-6" />,
      stats: "$15.4M+ Asset Portfolio"
    },
    {
      year: "Q2-2026",
      title: "Digital Sovereignty",
      description: "Implemented collective governance protocol giving token holders voting rights on platform decisions and asset acquisitions",
      icon: <Shield className="w-6 h-6" />,
      stats: "8,420+ Governance Votes"
    }
  ];

  const values = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Democratizing Elite Access",
      description: "Transforming $50M asset classes into $100 investment opportunities through fractional digital ownership"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Institutional-Grade Returns", 
      description: "Delivering 20-45% average annual returns previously exclusive to private equity and family offices"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Blockchain Security",
      description: "Enterprise-grade security ensuring transparent ownership and automated distribution of returns"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Collective Intelligence",
      description: "Community-driven governance protocol enabling collective decision-making on platform evolution"
    }
  ];

  const stats = [
    { value: "$15.4M+", label: "Total Asset Value" },
    { value: "1,247+", label: "Community Members" },
    { value: "32.5%", label: "Average Annual ROI" },
    { value: "$4.5M+", label: "Returns Distributed" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="premium-container py-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            OUR <span className="text-cyan-400">JOURNEY</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Transforming institutional-grade real world asset investment through fractional digital ownership and collective capital power. 
            We're breaking down the barriers that kept elite $50M asset classes exclusive to the ultra-rich.
          </p>
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-cyan-300 text-lg font-semibold">
              "With mere $100, you can now own pieces of assets that were previously accessible only to billionaires and institutional funds."
            </p>
          </div>
        </motion.div>

        {/* Key Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-cyan-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Protocol Evolution Timeline</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="flex flex-col md:flex-row items-start gap-6 p-6 bg-slate-800/50 rounded-2xl border border-gray-700 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                    {milestone.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <span className="text-cyan-400 font-bold text-lg">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-white">{milestone.title}</h3>
                    </div>
                    <div className="text-cyan-300 text-sm font-semibold mt-2 md:mt-0">
                      {milestone.stats}
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-12">Protocol Governance Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                className="p-6 bg-slate-800/50 rounded-2xl border border-gray-700 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{value.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <Rocket className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Join the Digital Ownership Revolution</h3>
            <p className="text-gray-300 mb-6">
              Be part of the collective that's reshaping how real world assets are owned and managed. 
              Start with just $100 and access institutional-grade investment opportunities.
            </p>
            <button className="btn-premium">
              Start Your Journey Today
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
