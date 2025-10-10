"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Vote, Clock, CheckCircle, XCircle, BarChart3, Zap, Shield, Users2 } from 'lucide-react';
import { mockProposals } from '@/data/mockData';
import { useNotification } from '@/contexts/NotificationContext';

export default function DAOSection() {
  const [votedProposals, setVotedProposals] = useState<number[]>([]);
  const { showNotification } = useNotification();

  const handleVote = (proposalId: number, voteType: 'for' | 'against') => {
    setVotedProposals(prev => [...prev, proposalId]);
    // Simulate API call with premium notification
    setTimeout(() => {
      showNotification({
        type: 'premium',
        title: 'Vote Recorded Successfully!',
        message: `Your ${voteType === 'for' ? 'FOR' : 'AGAINST'} vote on proposal #${proposalId} has been recorded in the blockchain.`,
        duration: 5000
      });
    }, 500);
  };

  const getVotePercentage = (proposal: any) => {
    const totalVotes = proposal.votesFor + proposal.votesAgainst;
    return {
      for: (proposal.votesFor / totalVotes) * 100,
      against: (proposal.votesAgainst / totalVotes) * 100
    };
  };

  const governanceStats = [
    {
      label: "Active Voters",
      value: "2,470",
      change: "+12.8%",
      icon: Users,
      gradient: "gradient-3d-cyber",
      trend: "up" as const
    },
    {
      label: "Total Proposals",
      value: "42",
      change: "+5",
      icon: Target,
      gradient: "gradient-3d-cosmic", 
      trend: "up" as const
    },
    {
      label: "Participation Rate",
      value: "87%",
      change: "+3.2%",
      icon: Vote,
      gradient: "gradient-3d-matrix",
      trend: "up" as const
    },
    {
      label: "Community Power",
      value: "98%",
      change: "+2.1%",
      icon: Shield,
      gradient: "gradient-3d-holographic",
      trend: "up" as const
    }
  ];

  return (
    <div className="min-h-screen bg-3d-cosmic">
      <div className="container-3d py-8">
        {/* 3D Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3d-hero mb-6">
            DAO <span className="text-3d-glow">GOVERNANCE</span>
          </h1>
          <p className="text-3d-body max-w-2xl mx-auto leading-relaxed">
            Shape the future of AssetRide through collective intelligence and community governance
          </p>
        </motion.div>

        {/* 3D Governance Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {governanceStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="stats-card-3d group text-center"
            >
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-xl ${stat.gradient} transition-transform duration-300 group-hover:scale-110`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-400 mb-2">{stat.label}</p>
              <div className={`text-sm font-semibold ${
                stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {stat.change}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Active Proposals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3d-heading">Active Proposals</h2>
            <div className="flex items-center space-x-2 text-cyan-400">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">Live Governance</span>
            </div>
          </div>

          {mockProposals.map((proposal, index) => {
            const percentages = getVotePercentage(proposal);
            const hasVoted = votedProposals.includes(proposal.id);

            return (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, y: 20, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="card-3d p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Proposal Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{proposal.title}</h3>
                        <p className="text-gray-300 leading-relaxed">{proposal.description}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/30">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-semibold">Ends: {proposal.endDate}</span>
                      </div>
                    </div>

                    {/* Voting Progress */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-emerald-400 font-semibold">
                          For: {proposal.votesFor.toLocaleString()} votes ({percentages.for.toFixed(1)}%)
                        </span>
                        <span className="text-red-400 font-semibold">
                          Against: {proposal.votesAgainst.toLocaleString()} votes ({percentages.against.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${percentages.for}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Voting Actions */}
                  <div className="flex lg:flex-col gap-3 lg:gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleVote(proposal.id, 'for')}
                      disabled={hasVoted}
                      className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                        hasVoted
                          ? 'bg-emerald-500 text-white cursor-not-allowed'
                          : 'btn-3d bg-gradient-3d-matrix'
                      }`}
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Vote For</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleVote(proposal.id, 'against')}
                      disabled={hasVoted}
                      className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                        hasVoted
                          ? 'bg-red-500 text-white cursor-not-allowed'
                          : 'btn-3d bg-gradient-3d-cosmic'
                      }`}
                    >
                      <XCircle className="w-5 h-5" />
                      <span>Vote Against</span>
                    </motion.button>
                  </div>
                </div>

                {/* Voting Status */}
                {hasVoted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 gradient-3d-cyber rounded-xl border-3d-glow text-center"
                  >
                    <div className="flex items-center justify-center space-x-2 text-cyan-300">
                      <Shield className="w-5 h-5" />
                      <span className="font-semibold">Your vote has been recorded on the blockchain</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* 3D Governance Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 card-3d-premium p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3d-heading mb-4">Collective Intelligence in Action</h3>
              <p className="text-3d-body mb-6">
                Our DAO governance empowers the community to make critical decisions about platform evolution, 
                asset acquisitions, and protocol upgrades. Every ASRD token holder has voting power proportional 
                to their stake.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 gradient-3d-cyber rounded-lg flex items-center justify-center">
                    <Users2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-semibold">1 Token = 1 Vote</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 gradient-3d-matrix rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-semibold">Transparent On-Chain Voting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 gradient-3d-cosmic rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-semibold">Real-Time Proposal Tracking</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="w-48 h-48 gradient-3d-holographic rounded-full flex items-center justify-center mx-auto mb-4 border-3d-glow animate-float-3d">
                <Vote className="w-16 h-16 text-white" />
              </div>
              <p className="text-cyan-300 font-semibold text-lg">Democratic Asset Management</p>
              <p className="text-cyan-200 text-sm mt-2">Community-driven decisions for institutional-grade assets</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
