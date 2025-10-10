"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Vote, Clock, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { mockProposals } from '@/data/mockData';

export default function DAOSection() {
  const [votedProposals, setVotedProposals] = useState<number[]>([]);

  const handleVote = (proposalId: number, voteType: 'for' | 'against') => {
    setVotedProposals(prev => [...prev, proposalId]);
    // Simulate API call
    setTimeout(() => {
      alert(`🎉 Vote ${voteType === 'for' ? 'FOR' : 'AGAINST'} proposal #${proposalId} recorded!`);
    }, 500);
  };

  const getVotePercentage = (proposal: any) => {
    const totalVotes = proposal.votesFor + proposal.votesAgainst;
    return {
      for: (proposal.votesFor / totalVotes) * 100,
      against: (proposal.votesAgainst / totalVotes) * 100
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            DAO <span className="text-cyan-400">GOVERNANCE</span>
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
            Shape the future of AssetRide through community governance and voting
          </p>
        </motion.div>

        {/* DAO Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-gray-700 text-center">
            <Users className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-white">2,470</p>
            <p className="text-gray-300">Active Voters</p>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-gray-700 text-center">
            <Target className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-white">42</p>
            <p className="text-gray-300">Total Proposals</p>
          </div>
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-gray-700 text-center">
            <Vote className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <p className="text-3xl font-bold text-white">87%</p>
            <p className="text-gray-300">Participation Rate</p>
          </div>
        </motion.div>

        {/* Active Proposals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Active Proposals</h2>
          
          {mockProposals.map((proposal, index) => {
            const percentages = getVotePercentage(proposal);
            const hasVoted = votedProposals.includes(proposal.id);

            return (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/50 rounded-2xl border border-gray-700 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{proposal.title}</h3>
                    <p className="text-gray-300 mb-4">{proposal.description}</p>
                    
                    {/* Voting Progress */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-emerald-400">For ({proposal.votesFor.toLocaleString()} votes)</span>
                          <span className="text-emerald-400">{percentages.for.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentages.for}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-rose-400">Against ({proposal.votesAgainst.toLocaleString()} votes)</span>
                          <span className="text-rose-400">{percentages.against.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-rose-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentages.against}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Ends {proposal.endDate}</span>
                  </div>

                  {hasVoted ? (
                    <div className="flex items-center space-x-2 text-emerald-400">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Vote Recorded</span>
                    </div>
                  ) : (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleVote(proposal.id, 'for')}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl transition-colors flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Vote For</span>
                      </button>
                      <button
                        onClick={() => handleVote(proposal.id, 'against')}
                        className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-xl transition-colors flex items-center space-x-2"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Against</span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* DAO Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20"
        >
          <h2 className="text-2xl font-bold text-white mb-4">About AssetRide DAO</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">How It Works</h3>
              <p className="text-gray-300">
                As an ASRD token holder, you have voting rights on key platform decisions. 
                Each token represents one vote, and proposals are executed automatically 
                when approved by the community.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">Your Impact</h3>
              <p className="text-gray-300">
                Participate in shaping investment strategies, asset acquisitions, 
                platform upgrades, and treasury management. Your voice matters in 
                building the future of real-world asset investing.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
