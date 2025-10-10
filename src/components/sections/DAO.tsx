"use client";

import React, { useState } from 'react';
import { mockProposals } from '@/data/mockData';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ScaleIcon, UsersIcon, ChartBarIcon, TrophyIcon } from '@/components/ui/ProfessionalIcons';

export default function DAO() {
  const [proposals, setProposals] = useState(mockProposals);
  const [isLoading, setIsLoading] = useState(false);
  const { getFadeStyle } = useScrollAnimation();

  const voteOnProposal = async (proposalId: number, vote: 'for' | 'against') => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setProposals(prev => prev.map(proposal =>
      proposal.id === proposalId
        ? {
            ...proposal,
            votesFor: vote === 'for' ? proposal.votesFor + 1 : proposal.votesFor,
            votesAgainst: vote === 'against' ? proposal.votesAgainst + 1 : proposal.votesAgainst
          }
        : proposal
    ));

    setIsLoading(false);
    alert(`Voted ${vote} on proposal ${proposalId}`);
  };

  const governanceStats = [
    { label: "Total Proposals", value: "24", icon: <ScaleIcon className="w-6 h-6" />, color: "from-blue-400 to-cyan-400" },
    { label: "Active Votes", value: "2", icon: <UsersIcon className="w-6 h-6" />, color: "from-purple-400 to-pink-400" },
    { label: "Voter Participation", value: "87%", icon: <ChartBarIcon className="w-6 h-6" />, color: "from-emerald-400 to-teal-400" },
    { label: "Community Members", value: "1,247", icon: <TrophyIcon className="w-6 h-6" />, color: "from-amber-400 to-orange-400" }
  ];

  return (
    <section id="dao" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16" style={getFadeStyle(0, 200)}>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            DAO GOVERNANCE
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed font-light">
            Participate in platform governance and shape the future of ASRD RWA
          </p>
        </div>

        {/* Governance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {governanceStats.map((stat, index) => (
            <div 
              key={index} 
              className="glass-ultimate p-6 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:scale-105"
              style={getFadeStyle(200 + index * 100, 600)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl text-white`}>
                  {stat.icon}
                </div>
              </div>
              <div className={`text-2xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-cyan-200 text-sm font-light">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Active Proposals */}
        <div className="glass-ultimate rounded-3xl border border-white/10 p-8 mb-8" style={getFadeStyle(400, 800)}>
          <h3 className="text-2xl font-bold text-white mb-6">Active Proposals</h3>
          <div className="space-y-6">
            {proposals.map((proposal, index) => (
              <div 
                key={proposal.id} 
                className="glass-ultimate rounded-2xl border border-white/10 p-6 hover:border-cyan-400/20 transition-all duration-500 hover:scale-105"
                style={getFadeStyle(600 + index * 100, 1000)}
              >
                <h4 className="text-xl font-bold text-white mb-3">{proposal.title}</h4>
                <p className="text-cyan-200 mb-4 leading-relaxed">{proposal.description}</p>

                {/* Voting Progress */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-400 font-semibold">
                      For: {proposal.votesFor} votes
                    </span>
                    <span className="text-red-400 font-semibold">
                      Against: {proposal.votesAgainst} votes
                    </span>
                  </div>

                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* Voting Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => voteOnProposal(proposal.id, 'for')}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-600 hover:to-cyan-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Vote For
                  </button>
                  <button 
                    onClick={() => voteOnProposal(proposal.id, 'against')}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Vote Against
                  </button>
                </div>

                <div className="mt-3 text-sm text-blue-300 text-center">
                  Voting ends: {proposal.endDate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Proposal CTA */}
        <div className="text-center" style={getFadeStyle(800, 1000)}>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-cyan-400/30">
            Create New Proposal
          </button>
        </div>
      </div>
    </section>
  );
}
