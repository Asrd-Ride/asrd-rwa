'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, Vote, Clock, CheckCircle, XCircle, 
  TrendingUp, PieChart, BarChart3, Calendar,
  ArrowUpRight, ArrowDownRight, Eye, Award,
  Target, Shield, Zap, Building, Coins, FileCheck
} from 'lucide-react'

export default function DAOPage() {
  const [activeTab, setActiveTab] = useState('active')

  // DAO Data with project-specific proposals
  const daoData = {
    totalMembers: 15234,
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
      },
      {
        id: 6,
        title: 'Minimum Investment Reduction to $50',
        description: 'Lower the minimum investment threshold from $100 to $50 to make fractional ownership more accessible to smaller investors.',
        votesFor: 7123,
        votesAgainst: 5890,
        totalVotes: 13013,
        endDate: '2024-02-15',
        category: 'Accessibility',
        status: 'rejected',
        executionDate: null,
        impact: 'Minimum investment remains at $100'
      },
      {
        id: 7,
        title: 'Platform Feature: Auto-Reinvestment',
        description: 'Develop and implement auto-reinvestment feature allowing investors to automatically reinvest their earnings into new assets.',
        votesFor: 11245,
        votesAgainst: 2345,
        totalVotes: 13590,
        endDate: '2024-01-30',
        category: 'Platform Features',
        status: 'passed',
        executionDate: '2024-02-10',
        impact: 'Auto-reinvestment feature launched in Q1 2024'
      },
      {
        id: 8,
        title: 'Horse Racing Event Revenue Sharing',
        description: 'Implement revenue sharing from horse racing events where Asset Ride Pro owned horses compete, distributing 60% of winnings to fractional owners.',
        votesFor: 9876,
        votesAgainst: 3210,
        totalVotes: 13086,
        endDate: '2024-01-15',
        category: 'Revenue Model',
        status: 'passed',
        executionDate: '2024-01-25',
        impact: 'Race winnings now distributed to horse NFT owners'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/20">
      {/* Header with 3D Effect */}
      <div className="relative bg-gradient-to-r from-green-900 via-emerald-900 to-blue-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-transparent"></div>
        <div className="relative container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">DAO Governance</h1>
              <p className="text-green-200 text-lg">
                Community-driven governance for the Asset Ride Pro ecosystem
              </p>
            </div>
            <div className="flex items-center space-x-6 mt-4 lg:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{formatNumber(daoData.totalMembers)}</div>
                <div className="text-green-200 text-sm">DAO Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{daoData.totalProposals}</div>
                <div className="text-green-200 text-sm">Total Proposals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{daoData.participationRate}%</div>
                <div className="text-green-200 text-sm">Participation</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex items-center text-green-300">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-semibold ml-1">+12.5%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{formatNumber(daoData.totalMembers)}</h3>
            <p className="text-green-100 text-sm">DAO Members</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Vote className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{daoData.activeProposalsCount}</h3>
            <p className="text-blue-100 text-sm">Active Proposals</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Coins className="w-6 h-6" />
              </div>
              <div className="flex items-center text-green-300">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-semibold ml-1">+8.2%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{daoData.participationRate}%</h3>
            <p className="text-purple-100 text-sm">Participation Rate</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <FileCheck className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{daoData.totalProposals}</h3>
            <p className="text-orange-100 text-sm">Total Proposals</p>
          </motion.div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 mb-8"
        >
          <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
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
                      className="bg-gradient-to-r from-white to-blue-50 rounded-2xl p-6 border border-blue-200 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {proposal.category}
                            </span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              Active
                            </span>
                            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                              Voting Ends {proposal.endDate}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{proposal.title}</h3>
                          <p className="text-gray-600 mb-4">{proposal.description}</p>
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                            <div className="flex items-center space-x-2 text-blue-800">
                              <Zap className="w-4 h-4" />
                              <span className="font-semibold">Platform Impact:</span>
                              <span>{proposal.impact}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Voting Progress */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Voting Progress</span>
                          <span className="font-semibold">{formatNumber(proposal.totalVotes)} votes</span>
                        </div>
                        
                        {/* For Votes */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="font-medium text-gray-900">For</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {formatNumber(proposal.votesFor)} votes ({forPercentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-green-500 h-3 rounded-full transition-all duration-500" 
                              style={{ width: `${forPercentage}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Against Votes */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <XCircle className="w-4 h-4 text-red-500" />
                              <span className="font-medium text-gray-900">Against</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {formatNumber(proposal.votesAgainst)} votes ({againstPercentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-red-500 h-3 rounded-full transition-all duration-500" 
                              style={{ width: `${againstPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 mt-6">
                        <button className="flex-1 bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center shadow-lg">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Vote For
                        </button>
                        <button className="flex-1 bg-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center shadow-lg">
                          <XCircle className="w-5 h-5 mr-2" />
                          Vote Against
                        </button>
                        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {/* Closed Proposals */}
            {activeTab === 'closed' && (
              <div className="space-y-6">
                {daoData.closedProposals.map((proposal, index) => {
                  const forPercentage = getVotePercentage(proposal.votesFor, proposal.totalVotes)
                  const againstPercentage = getVotePercentage(proposal.votesAgainst, proposal.totalVotes)
                  const isPassed = proposal.status === 'passed'
                  
                  return (
                    <motion.div
                      key={proposal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                              {proposal.category}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              isPassed 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {isPassed ? 'Passed' : 'Rejected'}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{proposal.title}</h3>
                          <p className="text-gray-600 mb-4">{proposal.description}</p>
                          
                          {/* Execution Details */}
                          {isPassed && proposal.executionDate && (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                              <div className="flex items-center space-x-2 text-green-800 mb-2">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-semibold">Executed on {proposal.executionDate}</span>
                              </div>
                              <p className="text-green-700 text-sm">{proposal.impact}</p>
                            </div>
                          )}

                          {!isPassed && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                              <div className="flex items-center space-x-2 text-red-800">
                                <XCircle className="w-5 h-5" />
                                <span className="font-semibold">Proposal Rejected by Community</span>
                              </div>
                              <p className="text-red-700 text-sm">{proposal.impact}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Final Results */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Final Results</span>
                          <span className="font-semibold">{formatNumber(proposal.totalVotes)} total votes</span>
                        </div>
                        
                        {/* For Votes */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="font-medium text-gray-900">For</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {formatNumber(proposal.votesFor)} votes ({forPercentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full ${
                                isPassed ? 'bg-green-500' : 'bg-gray-400'
                              }`} 
                              style={{ width: `${forPercentage}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Against Votes */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-2">
                              <XCircle className="w-4 h-4 text-red-500" />
                              <span className="font-medium text-gray-900">Against</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {formatNumber(proposal.votesAgainst)} votes ({againstPercentage.toFixed(1)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full ${
                                !isPassed ? 'bg-red-500' : 'bg-gray-400'
                              }`} 
                              style={{ width: `${againstPercentage}%` }}
                            ></div>
                          </div>
                        </div>
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
                  <div className="bg-gradient-to-br from-blue-50 to-purple-100 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Voting Participation</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Average Participation</span>
                          <span className="font-semibold">{daoData.participationRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-blue-500 h-3 rounded-full" style={{ width: `${daoData.participationRate}%` }}></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Active Voters</div>
                          <div className="font-semibold">10,234</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Total Votes Cast</div>
                          <div className="font-semibold">286,541</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Proposal Success Rate</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Proposals Passed</span>
                          <span className="font-semibold">68%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="bg-green-500 h-3 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Total Proposals</div>
                          <div className="font-semibold">{daoData.totalProposals}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Passed</div>
                          <div className="font-semibold">19</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Platform Governance Impact</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">2.0%</div>
                      <div className="text-sm text-gray-600">Platform Fee</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">15% APY</div>
                      <div className="text-sm text-gray-600">Staking Rewards</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">60%</div>
                      <div className="text-sm text-gray-600">Race Winnings Share</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">$100</div>
                      <div className="text-sm text-gray-600">Min Investment</div>
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
          className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 rounded-2xl p-8 text-white shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-2xl font-bold mb-2">Shape the Future of Asset Ride Pro</h3>
              <p className="text-green-100 text-lg">
                Your vote directly impacts platform fees, asset offerings, and investor benefits. Participate in governance to shape the RWA NFT marketplace.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Coins className="w-5 h-5" />
                <span>Platform Economics</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Security & Audits</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Investor Returns</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
