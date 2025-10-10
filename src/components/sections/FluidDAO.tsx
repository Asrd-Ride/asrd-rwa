"use client";

import React, { useState } from 'react';
import { Users, Vote, Clock, CheckCircle, XCircle, TrendingUp, Award, Shield } from 'lucide-react';

export default function FluidDAO() {
  const [activeTab, setActiveTab] = useState<'proposals' | 'governance' | 'rewards'>('proposals');

  const proposals = [
    {
      id: 1,
      title: "Expand Dubai Real Estate Portfolio",
      description: "Acquire additional luxury properties in Palm Jumeirah to meet growing investor demand",
      votesFor: 1250,
      votesAgainst: 320,
      status: "active",
      endDate: "2024-02-15",
      type: "Investment"
    },
    {
      id: 2,
      title: "Launch New Thoroughbred Fund",
      description: "Create specialized fund for champion racehorses with proven track records",
      votesFor: 890,
      votesAgainst: 210,
      status: "active",
      endDate: "2024-02-20",
      type: "Fund Creation"
    },
    {
      id: 3,
      title: "Upgrade Yacht Fleet Amenities",
      description: "Invest in premium upgrades for Mediterranean superyacht to increase charter rates",
      votesFor: 670,
      votesAgainst: 150,
      status: "active",
      endDate: "2024-02-25",
      type: "Asset Enhancement"
    }
  ];

  const governanceStats = [
    { label: "Total Members", value: "2,470", icon: Users, color: "text-fluid-gold" },
    { label: "Active Proposals", value: "3", icon: Vote, color: "text-fluid-emerald" },
    { label: "Approval Rate", value: "78%", icon: CheckCircle, color: "text-fluid-sapphire" },
    { label: "Avg Participation", value: "64%", icon: TrendingUp, color: "text-fluid-gold" }
  ];

  const rewards = [
    { type: "Voting Participation", amount: "50 ASRD", description: "For active voting on proposals" },
    { type: "Proposal Submission", amount: "200 ASRD", description: "For successful proposal creation" },
    { type: "Community Governance", amount: "100 ASRD", description: "Monthly governance participation" },
    { type: "Platform Growth", amount: "150 ASRD", description: "Contributing to platform expansion" }
  ];

  const getProgressPercentage = (forVotes: number, againstVotes: number) => {
    const total = forVotes + againstVotes;
    return total > 0 ? (forVotes / total) * 100 : 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-fluid-emerald';
      case 'pending': return 'text-fluid-gold';
      case 'closed': return 'text-fluid-silver';
      default: return 'text-fluid-silver';
    }
  };

  return (
    <div className="fluid-section">
      <div className="fluid-container">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 fluid-scroll-item mobile:text-center">
          <h1 className="fluid-hero">
            DAO <span className="text-fluid-gold">Governance</span>
          </h1>
          <p className="fluid-body max-w-2xl mx-auto mobile:px-4">
            Collective intelligence in action. Shape the future of AssetRide through decentralized governance and community-driven decisions.
          </p>
        </div>

        {/* Governance Stats */}
        <div className="fluid-grid fluid-grid-cols-2 lg:fluid-grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {governanceStats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="fluid-card fluid-scroll-item mobile:w-full"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
                  <stat.icon className="w-4 h-4 md:w-6 md:h-6" />
                </div>
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">{stat.value}</h3>
              <p className="fluid-caption text-xs md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="fluid-card-panel mb-6 md:mb-8 fluid-scroll-item mobile:px-4 mobile:py-4">
          <div className="flex flex-col md:flex-row md:space-x-1 space-y-2 md:space-y-0 mb-4 md:mb-6">
            {[
              { id: 'proposals', label: 'Active Proposals', icon: Vote },
              { id: 'governance', label: 'Governance', icon: Shield },
              { id: 'rewards', label: 'Rewards', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 md:px-4 py-2 md:py-3 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                  activeTab === tab.id
                    ? 'bg-fluid-gold text-fluid-black'
                    : 'text-fluid-silver hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Proposals Tab */}
          {activeTab === 'proposals' && (
            <div className="space-y-4 md:space-y-6">
              {proposals.map((proposal, index) => {
                const progress = getProgressPercentage(proposal.votesFor, proposal.votesAgainst);
                return (
                  <div key={proposal.id} className="fluid-card fluid-scroll-item mobile:p-3" style={{ transitionDelay: `${index * 150}ms` }}>
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(proposal.status)} bg-opacity-10 border ${getStatusColor(proposal.status).replace('text-', 'border-')}`}>
                            {proposal.status.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 bg-fluid-sapphire bg-opacity-10 text-fluid-sapphire rounded text-xs">
                            {proposal.type}
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{proposal.title}</h3>
                        <p className="fluid-caption text-sm mb-3 md:mb-4">{proposal.description}</p>
                      </div>
                    </div>

                    {/* Voting Progress */}
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-fluid-emerald">{proposal.votesFor.toLocaleString()} For</span>
                        <span className="text-red-400">{proposal.votesAgainst.toLocaleString()} Against</span>
                      </div>
                      <div className="w-full bg-fluid-slate rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-fluid-emerald to-fluid-gold h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center text-xs md:text-sm">
                        <div className="flex items-center space-x-1 text-fluid-silver">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          <span>Ends {proposal.endDate}</span>
                        </div>
                        <span className="text-white font-semibold">{progress.toFixed(1)}%</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 mt-3 md:mt-4">
                      <button className="flex-1 btn-fluid-secondary flex items-center justify-center space-x-2 py-2 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Vote For</span>
                      </button>
                      <button className="flex-1 btn-fluid-secondary flex items-center justify-center space-x-2 py-2 text-sm">
                        <XCircle className="w-4 h-4" />
                        <span>Vote Against</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Governance Tab */}
          {activeTab === 'governance' && (
            <div className="fluid-grid fluid-grid-cols-1 lg:fluid-grid-cols-2 gap-4 md:gap-6">
              <div className="fluid-card fluid-scroll-item mobile:p-3">
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-fluid-gold mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Governance Framework</h3>
                <p className="fluid-caption text-sm mb-3 md:mb-4">
                  Our decentralized governance model ensures every token holder has a voice in platform decisions.
                </p>
                <ul className="space-y-1 md:space-y-2">
                  <li className="flex items-center space-x-2 text-fluid-silver text-sm">
                    <div className="w-2 h-2 bg-fluid-gold rounded-full"></div>
                    <span>1 ASRD = 1 Vote</span>
                  </li>
                  <li className="flex items-center space-x-2 text-fluid-silver text-sm">
                    <div className="w-2 h-2 bg-fluid-gold rounded-full"></div>
                    <span>7-day voting periods</span>
                  </li>
                  <li className="flex items-center space-x-2 text-fluid-silver text-sm">
                    <div className="w-2 h-2 bg-fluid-gold rounded-full"></div>
                    <span>51% approval threshold</span>
                  </li>
                </ul>
              </div>

              <div className="fluid-card fluid-scroll-item mobile:p-3" style={{ transitionDelay: '200ms' }}>
                <Users className="w-6 h-6 md:w-8 md:h-8 text-fluid-emerald mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Community Power</h3>
                <p className="fluid-caption text-sm mb-3 md:mb-4">
                  Join 2,470+ investors shaping the future of real-world asset investment.
                </p>
                <div className="space-y-2 md:space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-fluid-silver">Active Members</span>
                    <span className="text-white font-semibold">2,470</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-fluid-silver">Proposals Passed</span>
                    <span className="text-white font-semibold">89</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-fluid-silver">Total Votes Cast</span>
                    <span className="text-white font-semibold">15,247</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === 'rewards' && (
            <div className="fluid-grid fluid-grid-cols-1 lg:fluid-grid-cols-2 gap-4 md:gap-6">
              {rewards.map((reward, index) => (
                <div key={reward.type} className="fluid-card fluid-scroll-item mobile:p-3" style={{ transitionDelay: `${index * 100}ms` }}>
                  <Award className="w-6 h-6 md:w-8 md:h-8 text-fluid-gold mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{reward.type}</h3>
                  <p className="text-fluid-gold text-base md:text-lg font-semibold mb-1 md:mb-2">{reward.amount}</p>
                  <p className="fluid-caption text-sm">{reward.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
