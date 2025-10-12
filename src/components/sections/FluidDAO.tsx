"use client";

import React, { useState } from 'react';
import { Users, Vote, Clock, CheckCircle, XCircle, TrendingUp, Award, Shield, Crown, Zap, Target, Gem, ArrowRight, BarChart3, Coins, Building, Ship, Plane } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FluidDAO() {
  const [activeTab, setActiveTab] = useState<'proposals' | 'governance' | 'rewards'>('proposals');
  const [votedProposals, setVotedProposals] = useState<number[]>([]);

  const proposals = [
    {
      id: 1,
      title: "Expand Dubai Luxury Real Estate Portfolio",
      description: "Acquire 3 additional waterfront villas in Palm Jumeirah to capitalize on 32% annual tourism growth and premium rental demand. Projected ROI: 28-35%",
      votesFor: 1842,
      votesAgainst: 428,
      status: "active",
      endDate: "2025-02-15",
      type: "Real Estate",
      impact: "High",
      budget: "$8.5M",
      timeline: "6 months",
      icon: Building
    },
    {
      id: 2,
      title: "Launch Elite Thoroughbred Racing Fund",
      description: "Create specialized investment fund for champion racehorses with proven track records. Includes breeding rights and international racing schedule.",
      votesFor: 1567,
      votesAgainst: 289,
      status: "active",
      endDate: "2025-02-20",
      type: "Sports Assets",
      impact: "Medium",
      budget: "$4.2M",
      timeline: "3 months",
      icon: Zap
    },
    {
      id: 3,
      title: "Mediterranean Superyacht Fleet Upgrade",
      description: "Strategic upgrades to luxury yacht amenities including helipad expansion and premium spa facilities to increase charter rates by 25-40%",
      votesFor: 1321,
      votesAgainst: 198,
      status: "active",
      endDate: "2025-02-25",
      type: "Marine Assets",
      impact: "High",
      budget: "$2.8M",
      timeline: "4 months",
      icon: Ship
    },
    {
      id: 4,
      title: "Private Jet Portfolio Expansion",
      description: "Add 2 new business jets to fleet serving corporate clients in Europe and Middle East. Projected 45% utilization rate with premium charter pricing.",
      votesFor: 987,
      votesAgainst: 156,
      status: "upcoming",
      endDate: "2025-03-10",
      type: "Aviation",
      impact: "Medium",
      budget: "$12M",
      timeline: "8 months",
      icon: Plane
    }
  ];

  const governanceStats = [
    { 
      label: "Community Members", 
      value: "3,247", 
      change: "+427", 
      icon: Users, 
      color: "text-amber-400",
      description: "Active governance participants"
    },
    { 
      label: "Active Proposals", 
      value: "8", 
      change: "+3", 
      icon: Vote, 
      color: "text-emerald-400",
      description: "Currently under review"
    },
    { 
      label: "Approval Rate", 
      value: "82%", 
      change: "+4%", 
      icon: CheckCircle, 
      color: "text-cyan-400",
      description: "Successful proposals"
    },
    { 
      label: "Voting Power", 
      value: "64%", 
      change: "+8%", 
      icon: TrendingUp, 
      color: "text-amber-400",
      description: "Average participation"
    }
  ];

  const rewards = [
    { 
      type: "Proposal Creation", 
      amount: "250 ASRD", 
      description: "Reward for submitting successful governance proposals that benefit the platform",
      icon: Target,
      color: "emerald"
    },
    { 
      type: "Active Voting", 
      amount: "75 ASRD", 
      description: "Monthly reward for participating in 80%+ of active proposals",
      icon: Vote,
      color: "cyan"
    },
    { 
      type: "Community Governance", 
      amount: "150 ASRD", 
      description: "Quarterly reward for consistent platform governance participation",
      icon: Shield,
      color: "amber"
    },
    { 
      type: "Platform Growth", 
      amount: "200 ASRD", 
      description: "Bonus for contributions that drive platform expansion and adoption",
      icon: TrendingUp,
      color: "violet"
    }
  ];

  const getProgressPercentage = (forVotes: number, againstVotes: number) => {
    const total = forVotes + againstVotes;
    return total > 0 ? (forVotes / total) * 100 : 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'upcoming': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'closed': return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-rose-400 bg-rose-500/20 border-rose-500/30';
      case 'Medium': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'Low': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const handleVote = (proposalId: number, voteType: 'for' | 'against') => {
    if (!votedProposals.includes(proposalId)) {
      setVotedProposals(prev => [...prev, proposalId]);
      // In real implementation, this would call your voting contract
      console.log(`Voted ${voteType} on proposal ${proposalId}`);
    }
  };

  return (
    <div className="fluid-section">
      <div className="fluid-container">
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Elite Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-full px-6 py-3 mb-6 backdrop-blur-sm"
          >
            <Crown className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 font-semibold text-sm">Collective Intelligence in Action</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Shape the Future of <span className="bg-gradient-to-r from-amber-400 to-cyan-400 bg-clip-text text-transparent">Real-World Asset</span> Investment
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Your voice matters. Join 3,247+ investors driving platform evolution through transparent, 
            decentralized governance and community-powered decisions.
          </p>
        </motion.div>

        {/* Enhanced Governance Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
          {governanceStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 text-center hover:border-cyan-400/30 transition-all duration-300"
            >
              <div className={`w-12 h-12 ${stat.color.replace('text-', 'bg-')} ${stat.color.replace('text-', 'bg-')}/20 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="flex items-center justify-center space-x-1 text-emerald-400 text-sm mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>{stat.change}</span>
              </div>
              <div className="text-slate-300 font-medium text-sm mb-1">{stat.label}</div>
              <div className="text-slate-400 text-xs">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Tabs */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 md:p-8 mb-8">
          {/* Tab Navigation */}
          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 mb-6 md:mb-8">
            {[
              { id: 'proposals', label: 'Active Proposals', icon: Vote, count: proposals.filter(p => p.status === 'active').length },
              { id: 'governance', label: 'Governance Framework', icon: Shield },
              { id: 'rewards', label: 'Community Rewards', icon: Award }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-3 px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
                {tab.count && (
                  <span className="bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {tab.count}
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Proposals Tab */}
          {activeTab === 'proposals' && (
            <div className="space-y-6">
              {proposals.map((proposal, index) => {
                const progress = getProgressPercentage(proposal.votesFor, proposal.votesAgainst);
                const hasVoted = votedProposals.includes(proposal.id);
                const ProposalIcon = proposal.icon;

                return (
                  <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700 p-6 hover:border-cyan-400/30 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-4">
                      <div className="flex-1">
                        {/* Proposal Header */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(proposal.status)}`}>
                            {proposal.status.toUpperCase()}
                          </span>
                          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold border border-cyan-500/30">
                            {proposal.type}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getImpactColor(proposal.impact)}`}>
                            {proposal.impact} Impact
                          </span>
                        </div>

                        {/* Proposal Content */}
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <ProposalIcon className="w-6 h-6 text-cyan-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-2">{proposal.title}</h3>
                            <p className="text-slate-300 leading-relaxed">{proposal.description}</p>
                          </div>
                        </div>

                        {/* Proposal Details */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-slate-700/30 rounded-xl border border-slate-600">
                            <div className="text-slate-400 text-sm mb-1">Budget</div>
                            <div className="text-white font-semibold">{proposal.budget}</div>
                          </div>
                          <div className="text-center p-3 bg-slate-700/30 rounded-xl border border-slate-600">
                            <div className="text-slate-400 text-sm mb-1">Timeline</div>
                            <div className="text-white font-semibold">{proposal.timeline}</div>
                          </div>
                          <div className="text-center p-3 bg-slate-700/30 rounded-xl border border-slate-600">
                            <div className="text-slate-400 text-sm mb-1">Votes For</div>
                            <div className="text-emerald-400 font-semibold">{proposal.votesFor.toLocaleString()}</div>
                          </div>
                          <div className="text-center p-3 bg-slate-700/30 rounded-xl border border-slate-600">
                            <div className="text-slate-400 text-sm mb-1">Votes Against</div>
                            <div className="text-rose-400 font-semibold">{proposal.votesAgainst.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Voting Progress */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-400 font-semibold">{proposal.votesFor.toLocaleString()} For</span>
                        <span className="text-rose-400 font-semibold">{proposal.votesAgainst.toLocaleString()} Against</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-3 rounded-full"
                        />
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-2 text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span>Ends {proposal.endDate}</span>
                        </div>
                        <span className="text-white font-semibold">{progress.toFixed(1)}%</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {!hasVoted && proposal.status === 'active' && (
                      <div className="flex flex-col sm:flex-row gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleVote(proposal.id, 'for')}
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          <span>Vote For</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleVote(proposal.id, 'against')}
                          className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <XCircle className="w-5 h-5" />
                          <span>Vote Against</span>
                        </motion.button>
                      </div>
                    )}

                    {hasVoted && (
                      <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4 text-center">
                        <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                        <div className="text-emerald-400 font-semibold">Vote Submitted Successfully!</div>
                        <div className="text-emerald-300 text-sm">Thank you for participating in governance</div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Governance Tab */}
          {activeTab === 'governance' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700 p-6"
              >
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Transparent Governance Framework</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Our decentralized governance model ensures every ASRD token holder has equal voting power 
                  in platform evolution. Collective intelligence drives better investment decisions for all.
                </p>
                <div className="space-y-3">
                  {[
                    { label: "1 ASRD = 1 Vote", description: "Equal voting power for all token holders" },
                    { label: "7-Day Voting Periods", description: "Ample time for community deliberation" },
                    { label: "51% Approval Threshold", description: "Clear majority required for execution" },
                    { label: "Real-Time Results", description: "Transparent, on-chain voting process" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <div className="text-white font-semibold text-sm">{item.label}</div>
                        <div className="text-slate-400 text-xs">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700 p-6"
              >
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Community Power in Action</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Join 3,247+ sophisticated investors collectively managing $154M+ in real-world assets. 
                  Your voice shapes platform strategy and investment direction.
                </p>
                <div className="space-y-4">
                  {[
                    { label: "Active Community Members", value: "3,247", change: "+427" },
                    { label: "Successful Proposals", value: "89", change: "+12" },
                    { label: "Total Votes Cast", value: "24,891", change: "+2,154" },
                    { label: "Platform Value Managed", value: "$154M", change: "+$28M" }
                  ].map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">{stat.label}</span>
                      <div className="text-right">
                        <div className="text-white font-semibold">{stat.value}</div>
                        <div className="text-emerald-400 text-xs">{stat.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {rewards.map((reward, index) => {
                const RewardIcon = reward.icon;
                return (
                  <motion.div
                    key={reward.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700 p-6 hover:border-cyan-400/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                        <RewardIcon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className={`px-3 py-1 bg-${reward.color}-500/20 text-${reward.color}-400 rounded-full text-sm font-semibold border border-${reward.color}-500/30`}>
                        {reward.amount}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{reward.type}</h3>
                    <p className="text-slate-300 leading-relaxed">{reward.description}</p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl border border-cyan-500/30 p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-3">Ready to Shape the Future?</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Join thousands of investors driving platform evolution. Your vote matters in building 
            the world's premier real-world asset investment platform.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-3 mx-auto shadow-lg"
          >
            <Coins className="w-6 h-6" />
            <span>Start Participating in Governance</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}