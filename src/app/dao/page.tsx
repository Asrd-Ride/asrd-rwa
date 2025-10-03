'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users, Vote, Clock, CheckCircle, XCircle,
  TrendingUp, PieChart, BarChart3, Calendar,
  ArrowUpRight, ArrowDownRight, Eye, Award,
  Target, Shield, Zap, Building, Coins, FileCheck,
  Crown, Gem, Rocket
} from 'lucide-react'

export default function DAOPage() {
  const [activeTab, setActiveTab] = useState('active')

  // DAO Data with project-specific proposals
  const daoData = {
    totalMembers: 45231,
    activeProposalsCount: 3,
    totalProposals: 28,
    participationRate: 68.5,

    // Active Proposals - Project Specific
    activeProposalsList: [
      {
        id: 1,
        title: 'Reduce Platform Fees from 2.5% to 2.0%',
        description: 'Proposal to reduce platform management fees from 2.5% to 2.0% to increase investor returns and make Asset Ride Pro more competitive in the RWA marketplace.',
        votesFor: 8921,
        votesAgainst: 2156,
        totalVotes: 11077,
        endDate: '2024-04-15',
        category: 'Platform Economics',
        status: 'active',
        impact: 'Increase investor net returns by 0.5% across all assets'
      },
      {
        id: 2,
        title: 'Implement Bi-Monthly Dividend Distributions',
        description: 'Change dividend distribution schedule from monthly to every 15 days to provide more frequent income to investors and improve cash flow for token holders.',
        votesFor: 6543,
        votesAgainst: 1890,
        totalVotes: 8433,
        endDate: '2024-04-20',
        category: 'Distribution',
        status: 'active',
        impact: 'Investors receive income twice monthly instead of once monthly'
      },
      {
        id: 3,
        title: 'Smart Contract Security Audit by CertiK',
        description: 'Commission a comprehensive security audit of all Asset Ride Pro smart contracts by CertiK to ensure maximum security for investor funds and platform operations.',
        votesFor: 7234,
        votesAgainst: 1567,
        totalVotes: 8801,
        endDate: '2024-04-18',
        category: 'Security',
        status: 'active',
        impact: 'Comprehensive security audit of all platform contracts'
      }
    ],

    // Historical/Closed Proposals - Project Specific
    closedProposals: [
      {
        id: 4,
        title: 'Add New Real Estate Asset Category - Commercial',
        description: 'Expand asset offerings to include commercial real estate properties (office buildings, retail spaces, industrial warehouses) alongside current residential and equine assets.',
        votesFor: 10234,
        votesAgainst: 2876,
        totalVotes: 13110,
        endDate: '2024-03-15',
        category: 'Asset Expansion',
        status: 'passed',
        executionDate: '2024-03-20',
        impact: 'Commercial real estate assets now available for investment'
      },
      {
        id: 5,
        title: 'ASRD Token Staking Rewards Program',
        description: 'Implement staking rewards for ASRD token holders with 15% APY to incentivize long-term holding and platform participation.',
        votesFor: 9567,
        votesAgainst: 4123,
        totalVotes: 13690,
        endDate: '2024-02-28',
        category: 'Token Economics',
        status: 'passed',
        executionDate: '2024-03-05',
        impact: 'ASRD staking launched with 15% APY rewards'
      }
    ]
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getVotePercentage = (votes: number, total: number) => {
    return total > 0 ? (votes / total) * 100 : 0
  }

  const tabs = [
    { id: 'active', label: 'Active Proposals', count: daoData.activeProposalsList.length },
    { id: 'closed', label: 'Closed Proposals', count: daoData.closedProposals.length },
    { id: 'metrics', label: 'DAO Metrics', count: 0 }
  ]

  return (
    <div className="min-h-screen immersive-bg">

      {/* Header */}
      <div className="relative overflow-hidden pt-16">
        <div className="container-pro py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black text-3d mb-6">
              DAO <span className="text-glow text-emerald-glow">GOVERNANCE</span>
            </h1>
            <p className="text-xl text-neutral-light max-w-3xl mx-auto">
              Community-driven governance for the <span className="text-emerald-glow font-semibold">Asset Ride Pro ecosystem</span>. 
              Your vote shapes platform evolution.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container-pro mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Total Members */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-3d p-6 text-center group hover:neon-glow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-emerald-glow to-sapphire-glow rounded-2xl">
                <Users className="w-6 h-6 text-luxury-deep" />
              </div>
              <div className="flex items-center text-emerald-glow">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-black ml-1">+12.5%</span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-emerald-glow mb-1">{formatNumber(daoData.totalMembers)}</h3>
            <p className="text-neutral-mid text-sm font-semibold">DAO MEMBERS</p>
          </motion.div>

          {/* Active Proposals */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-3d p-6 text-center group hover:neon-glow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-sapphire-glow to-amethyst-glow rounded-2xl">
                <Vote className="w-6 h-6 text-luxury-deep" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-sapphire-glow mb-1">{daoData.activeProposalsCount}</h3>
            <p className="text-neutral-mid text-sm font-semibold">ACTIVE PROPOSALS</p>
          </motion.div>

          {/* Participation Rate */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-3d p-6 text-center group hover:neon-glow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-amethyst-glow to-ruby-glow rounded-2xl">
                <Coins className="w-6 h-6 text-luxury-deep" />
              </div>
              <div className="flex items-center text-emerald-glow">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-black ml-1">+8.2%</span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-amethyst-glow mb-1">{daoData.participationRate}%</h3>
            <p className="text-neutral-mid text-sm font-semibold">PARTICIPATION RATE</p>
          </motion.div>

          {/* Total Proposals */}
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-3d p-6 text-center group hover:neon-glow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-gold-glow to-emerald-glow rounded-2xl">
                <FileCheck className="w-6 h-6 text-luxury-deep" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-gold-glow mb-1">{daoData.totalProposals}</h3>
            <p className="text-neutral-mid text-sm font-semibold">TOTAL PROPOSALS</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="container-pro pb-20">
        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-3d mb-8"
        >
          <div className="border-b border-white/10">
            <div className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-black text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-glow text-emerald-glow'
                      : 'border-transparent text-neutral-mid hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="bg-luxury-dark text-emerald-glow px-2 py-1 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Active Proposals */}
            {activeTab === 'active' && (
              <div className="space-y-6">
                {daoData.activeProposalsList.map((proposal, index) => {
                  const forPercentage = getVotePercentage(proposal.votesFor, proposal.totalVotes)
                  const againstPercentage = getVotePercentage(proposal.votesAgainst, proposal.totalVotes)

                  return (
                    <motion.div
                      key={proposal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-3d p-8 group hover:neon-glow"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          {/* Proposal Header */}
                          <div className="flex items-center space-x-3 mb-4">
                            <span className="bg-gradient-to-r from-sapphire-glow to-amethyst-glow text-luxury-deep px-4 py-2 rounded-2xl text-sm font-black">
                              {proposal.category}
                            </span>
                            <span className="bg-gradient-to-r from-emerald-glow to-sapphire-glow text-luxury-deep px-4 py-2 rounded-2xl text-sm font-black">
                              ACTIVE
                            </span>
                            <span className="bg-gradient-to-r from-gold-glow to-ruby-glow text-luxury-deep px-4 py-2 rounded-2xl text-sm font-black">
                              Voting Ends {proposal.endDate}
                            </span>
                          </div>

                          {/* Proposal Title & Description */}
                          <h3 className="text-2xl font-black text-white mb-3 text-glow">{proposal.title}</h3>
                          <p className="text-neutral-light mb-4 leading-relaxed">{proposal.description}</p>

                          {/* Impact */}
                          <div className="bg-luxury-dark/50 border border-emerald-glow/30 rounded-2xl p-4 mb-6">
                            <div className="flex items-center space-x-2 text-emerald-glow">
                              <Zap className="w-4 h-4" />
                              <span className="font-black">PLATFORM IMPACT:</span>
                              <span>{proposal.impact}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Voting Progress */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-mid">VOTING PROGRESS</span>
                          <span className="font-black text-white">{formatNumber(proposal.totalVotes)} VOTES</span>
                        </div>

                        {/* For Votes */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-emerald-glow" />
                              <span className="font-black text-white">FOR</span>
                            </div>
                            <span className="text-sm text-neutral-mid">
                              {formatNumber(proposal.votesFor)} votes ({forPercentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-luxury-dark rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-emerald-glow to-sapphire-glow h-3 rounded-full transition-all duration-500"
                              style={{ width: `${forPercentage}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Against Votes */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <XCircle className="w-4 h-4 text-ruby-glow" />
                              <span className="font-black text-white">AGAINST</span>
                            </div>
                            <span className="text-sm text-neutral-mid">
                              {formatNumber(proposal.votesAgainst)} votes ({againstPercentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-luxury-dark rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-ruby-glow to-amethyst-glow h-3 rounded-full transition-all duration-500"
                              style={{ width: `${againstPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 mt-6">
                        <button className="flex-1 bg-gradient-to-r from-emerald-glow to-sapphire-glow text-luxury-deep py-4 px-6 rounded-2xl font-black hover:shadow-2xl hover:shadow-emerald-glow/30 transition-all duration-300 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          VOTE FOR
                        </button>
                        <button className="flex-1 bg-gradient-to-r from-ruby-glow to-amethyst-glow text-luxury-deep py-4 px-6 rounded-2xl font-black hover:shadow-2xl hover:shadow-ruby-glow/30 transition-all duration-300 flex items-center justify-center">
                          <XCircle className="w-5 h-5 mr-2" />
                          VOTE AGAINST
                        </button>
                        <button className="px-6 py-4 border border-emerald-glow text-emerald-glow rounded-2xl hover:bg-emerald-glow hover:text-luxury-deep transition-all duration-300">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {/* DAO Metrics */}
            {activeTab === 'metrics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-3d p-6">
                    <h4 className="font-black text-white mb-4 text-glow">VOTING PARTICIPATION</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-neutral-mid">Average Participation</span>
                          <span className="font-black text-emerald-glow">{daoData.participationRate}%</span>
                        </div>
                        <div className="w-full bg-luxury-dark rounded-full h-3">
                          <div className="bg-gradient-to-r from-emerald-glow to-sapphire-glow h-3 rounded-full" style={{ width: `${daoData.participationRate}%` }}></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-neutral-mid">Active Voters</div>
                          <div className="font-black text-white">10,234</div>
                        </div>
                        <div>
                          <div className="text-neutral-mid">Total Votes Cast</div>
                          <div className="font-black text-white">286,541</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass-3d p-6">
                    <h4 className="font-black text-white mb-4 text-glow">PROPOSAL SUCCESS RATE</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-neutral-mid">Proposals Passed</span>
                          <span className="font-black text-emerald-glow">68%</span>
                        </div>
                        <div className="w-full bg-luxury-dark rounded-full h-3">
                          <div className="bg-gradient-to-r from-emerald-glow to-sapphire-glow h-3 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-neutral-mid">Total Proposals</div>
                          <div className="font-black text-white">{daoData.totalProposals}</div>
                        </div>
                        <div>
                          <div className="text-neutral-mid">Passed</div>
                          <div className="font-black text-white">19</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* DAO Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-3d p-8 text-center"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-2xl font-black text-white mb-2 text-glow">SHAPE THE FUTURE OF ASSET RIDE PRO</h3>
              <p className="text-neutral-light text-lg">
                Your vote directly impacts platform fees, asset offerings, and investor benefits. 
                <span className="text-emerald-glow font-semibold"> Participate in governance</span> to shape the RWA NFT marketplace.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-emerald-glow">
                <Coins className="w-5 h-5" />
                <span className="font-semibold">Platform Economics</span>
              </div>
              <div className="flex items-center space-x-2 text-sapphire-glow">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Security & Audits</span>
              </div>
              <div className="flex items-center space-x-2 text-amethyst-glow">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Investor Returns</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
