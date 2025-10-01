'use client'
import { motion } from 'framer-motion'
import { useApp } from '@/contexts/AppContext'
import { Vote, Users, Clock, CheckCircle, XCircle } from 'lucide-react'

export default function DAO() {
  const { proposals, voteOnProposal, isLoading } = useApp()

  return (
    <section id="dao" className="py-20 relative">
      <div className="container-pro">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-accent-success to-accent-secondary bg-clip-text text-transparent">
            Community Governance
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-xl text-neutral-mid text-center mb-12"
        >
          Shape the future of Asset Ride through decentralized governance
        </motion.p>

        {/* DAO Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Users, label: 'Governance Members', value: '2,458' },
            { icon: Vote, label: 'Active Proposals', value: proposals.length.toString() },
            { icon: Clock, label: 'Voting Period', value: '7 Days' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center card-hover"
            >
              <stat.icon className="w-8 h-8 text-accent-success mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-neutral-mid text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Active Proposals */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Active Proposals</h3>
          <div className="space-y-6">
            {proposals.map((proposal, index) => {
              const totalVotes = proposal.votesFor + proposal.votesAgainst
              const forPercentage = totalVotes > 0 ? (proposal.votesFor / totalVotes) * 100 : 0
              const againstPercentage = totalVotes > 0 ? (proposal.votesAgainst / totalVotes) * 100 : 0

              return (
                <motion.div
                  key={proposal.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="glass rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-2">{proposal.title}</h4>
                      <p className="text-neutral-mid">{proposal.description}</p>
                    </div>
                    <span className={`ml-4 px-3 py-1 rounded-full text-sm font-semibold ${
                      proposal.status === 'active' 
                        ? 'bg-accent-success/20 text-accent-success' 
                        : 'bg-neutral-mid/20 text-neutral-mid'
                    }`}>
                      {proposal.status}
                    </span>
                  </div>

                  {/* Voting Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-neutral-mid mb-2">
                      <span>For: {proposal.votesFor.toLocaleString()} ASRD</span>
                      <span>Against: {proposal.votesAgainst.toLocaleString()} ASRD</span>
                    </div>
                    <div className="w-full bg-neutral-dark rounded-full h-3">
                      <div
                        className="bg-accent-success h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${forPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-neutral-mid mt-1">
                      <span>{forPercentage.toFixed(1)}%</span>
                      <span>{againstPercentage.toFixed(1)}%</span>
                    </div>
                  </div>

                  {/* Voting Buttons */}
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => voteOnProposal(proposal.id, true)}
                      disabled={isLoading}
                      className="flex-1 bg-accent-success text-financial-dark py-3 rounded-lg font-semibold flex items-center justify-center disabled:opacity-50"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {isLoading ? 'Voting...' : 'Vote For'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => voteOnProposal(proposal.id, false)}
                      disabled={isLoading}
                      className="flex-1 bg-error text-white py-3 rounded-lg font-semibold flex items-center justify-center disabled:opacity-50"
                    >
                      <XCircle className="w-5 h-5 mr-2" />
                      {isLoading ? 'Voting...' : 'Vote Against'}
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Governance Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mt-8"
        >
          <h4 className="text-lg font-semibold text-white mb-4">How Governance Works</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-neutral-mid">
            <div>
              <div className="text-accent-success font-semibold mb-2">1. Proposal Creation</div>
              <p>Any member with 10,000+ ASRD can create proposals for community voting.</p>
            </div>
            <div>
              <div className="text-accent-success font-semibold mb-2">2. Community Discussion</div>
              <p>Proposals are discussed for 48 hours before voting begins.</p>
            </div>
            <div>
              <div className="text-accent-success font-semibold mb-2">3. Voting Period</div>
              <p>7-day voting period where 1 ASRD = 1 vote. Majority wins.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
