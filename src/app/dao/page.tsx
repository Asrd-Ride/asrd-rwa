'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, Vote, Clock, CheckCircle, XCircle, 
  TrendingUp, PieChart, BarChart3, Calendar,
  ArrowUpRight, ArrowDownRight, Eye
} from 'lucide-react'

export default function DAOPage() {
  const [activeTab, setActiveTab] = useState('active')

  // DAO Data with historical votes
  const daoData = {
    totalMembers: 15234,
    activeProposals: 3,
    totalProposals: 28,
    participationRate: 68.5,
    
    // Active Proposals
    activeProposals: [
      {
        id: 1,
        title: 'Platform Fee Reduction to 1.5%',
        description: 'Proposal to reduce platform fees from 2% to 1.5% to increase investor returns and attract more users.',
        votesFor: 8921,
        votesAgainst: 2156,
        totalVotes: 11077,
        endDate: '2024-04-15',
        category: 'Economics',
        status: 'active'
      },
      {
        id: 2,
        title: 'Integration with Polygon Network',
        description: 'Add Polygon network support to reduce gas fees and improve transaction speed for users.',
        votesFor: 6543,
        votesAgainst: 1890,
        totalVotes: 8433,
        endDate: '2024-04-20',
        category: 'Technical',
        status: 'active'
      },
      {
        id: 3,
        title: 'Community Grant Program Launch',
        description: 'Establish a $500,000 grant program for community-led initiatives and ecosystem development.',
        votesFor: 7234,
        votesAgainst: 1567,
        totalVotes: 8801,
        endDate: '2024-04-18',
        category: 'Community',
        status: 'active'
      }
    ],

    // Historical/Closed Proposals
    closedProposals: [
      {
        id: 4,
        title: 'Treasury Diversification Strategy',
        description: 'Diversify treasury holdings into stablecoins and blue-chip DeFi tokens for better risk management.',
        votesFor: 10234,
        votesAgainst: 2876,
        totalVotes: 13110,
        endDate: '2024-03-15',
        category: 'Treasury',
        status: 'passed',
        executionDate: '2024-03-20',
        impact: 'Treasury diversified with 40% stablecoins'
      },
      {
        id: 5,
        title: 'ASRD Token Buyback Program',
        description: 'Implement quarterly token buybacks using 25% of platform revenue to support token price.',
        votesFor: 9567,
        votesAgainst: 4123,
        totalVotes: 13690,
        endDate: '2024-02-28',
        category: 'Economics',
        status: 'passed',
        executionDate: '2024-03-05',
        impact: 'First buyback completed: $1.2M ASRD purchased'
      },
      {
        id: 6,
        title: 'Partnership with Traditional Finance Institution',
        description: 'Form strategic partnership with legacy finance institution to bridge traditional and crypto markets.',
        votesFor: 7123,
        votesAgainst: 5890,
        totalVotes: 13013,
        endDate: '2024-02-15',
        category: 'Business',
        status: 'rejected',
        executionDate: null,
        impact: 'Partnership discussions paused'
      },
      {
        id: 7,
        title: 'Mobile App Development Funding',
        description: 'Allocate $750,000 for development of native mobile applications for iOS and Android.',
        votesFor: 11245,
        votesAgainst: 2345,
        totalVotes: 13590,
        endDate: '2024-01-30',
        category: 'Development',
        status: 'passed',
        executionDate: '2024-02-10',
        impact: 'Mobile app development team expanded to 15 members'
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
    { id: 'active', label: 'Active Proposals', count: daoData.activeProposals.length },
    { id: 'closed', label: 'Closed Proposals', count: daoData.closedProposals.length }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">DAO Governance</h1>
              <p className="text-gray-600 text-lg">
                Community-driven governance for the Asset Ride Pro ecosystem
              </p>
            </div>
            <div className="flex items-center space-x-6 mt-4 lg:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{formatNumber(daoData.totalMembers)}</div>
                <div className="text-gray-600 text-sm">DAO Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{daoData.totalProposals}</div>
                <div className="text-gray-600 text-sm">Total Proposals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{daoData.participationRate}%</div>
                <div className="text-gray-600 text-sm">Participation</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Active Proposals */}
            {activeTab === 'active' && (
              <div className="space-y-6">
                {daoData.activeProposals.map((proposal, index) => {
                  const forPercentage = getVotePercentage(proposal.votesFor, proposal.totalVotes)
                  const againstPercentage = getVotePercentage(proposal.votesAgainst, proposal.totalVotes)
                  
                  return (
                    <motion.div
                      key={proposal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              {proposal.category}
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              Active
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{proposal.title}</h3>
                          <p className="text-gray-600 mb-4">{proposal.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">Ends {proposal.endDate}</span>
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
                              className="bg-green-500 h-3 rounded-full" 
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
                              className="bg-red-500 h-3 rounded-full" 
                              style={{ width: `${againstPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 mt-6">
                        <button className="flex-1 bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Vote For
                        </button>
                        <button className="flex-1 bg-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center">
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
                      className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
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
                                <span className="font-semibold">Proposal Rejected</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">Ended {proposal.endDate}</span>
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
          </div>
        </motion.div>

        {/* DAO Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-2xl font-bold mb-2">Shape the Future of Asset Ride Pro</h3>
              <p className="text-green-100 text-lg">
                Your vote matters. Participate in governance and help steer the platform's direction.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Vote className="w-5 h-5" />
                <span>1 Token = 1 Vote</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Community Driven</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Transparent Process</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
