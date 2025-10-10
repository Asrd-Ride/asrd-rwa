"use client";

import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { CurrencyDollarIcon, TrendingUpIcon, ChartBarIcon } from '@/components/ui/ProfessionalIcons';
import { Calendar } from 'lucide-react';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  asset: string;
}

export default function Treasury() {
  const { treasury } = useApp();

  const treasuryValueUSD = treasury.totalValue;
  const monthlyNetFlow = treasury.monthlyIncome;

  const treasuryMetrics = [
    {
      label: "Total Treasury Value",
      value: `$${(treasuryValueUSD / 1000000).toFixed(1)}M`,
      change: "+5.2%",
      icon: <CurrencyDollarIcon className="w-6 h-6" />,
      color: "from-emerald-400 to-cyan-400"
    },
    {
      label: "Monthly Net Flow",
      value: `$${(monthlyNetFlow / 1000).toFixed(0)}K`,
      change: "+12.8%",
      icon: <TrendingUpIcon className="w-6 h-6" />,
      color: "from-blue-400 to-indigo-400"
    },
    {
      label: "Active Investments",
      value: treasury.activeInvestments.toString(),
      change: "+3",
      icon: <ChartBarIcon className="w-6 h-6" />,
      color: "from-purple-400 to-pink-400"
    },
    {
      label: "Next Distribution",
      value: treasury.distributionSchedule,
      change: "15 days",
      icon: <Calendar className="w-6 h-6" />,
      color: "from-amber-400 to-orange-400"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            TREASURY OVERVIEW
          </h2>
          <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed font-light">
            Track platform treasury performance and investment distributions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {treasuryMetrics.map((metric, index) => (
            <div key={index} className="stat-premium">
              <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl mb-4`}>
                {metric.icon}
              </div>
              <h3 className="text-2xl font-bold text-premium-white mb-2">{metric.value}</h3>
              <p className="text-premium-muted">{metric.label}</p>
              <div className="text-cyan-400 text-sm font-semibold mt-2">{metric.change}</div>
            </div>
          ))}
        </div>

        <div className="card-premium">
          <div className="card-premium-content">
            <h3 className="text-xl font-bold text-premium-white mb-6">Recent Transactions</h3>
            <div className="space-premium">
              {treasury.recentTransactions.map((transaction: Transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === 'rental' ? 'bg-emerald-500/20' : 'bg-cyan-500/20'
                    }`}>
                      <CurrencyDollarIcon className={`w-5 h-5 ${
                        transaction.type === 'rental' ? 'text-emerald-400' : 'text-cyan-400'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-premium-white capitalize">{transaction.type} Income</h4>
                      <p className="text-sm text-premium-muted">{transaction.asset}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-premium-white">${transaction.amount.toLocaleString()}</div>
                    <div className="text-sm text-premium-muted">{transaction.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="card-premium">
            <div className="card-premium-content">
              <h3 className="text-xl font-bold text-premium-white mb-4">Treasury Allocation</h3>
              <div className="space-y-4">
                {[
                  { label: "Real Estate", value: 65, color: "bg-cyan-400" },
                  { label: "Thoroughbreds", value: 25, color: "bg-emerald-400" },
                  { label: "Luxury Assets", value: 10, color: "bg-purple-400" }
                ].map((allocation, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-premium-light">{allocation.label}</span>
                      <span className="text-premium-white font-semibold">{allocation.value}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${allocation.color} transition-all duration-1000`}
                        style={{ width: `${allocation.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card-premium">
            <div className="card-premium-content">
              <h3 className="text-xl font-bold text-premium-white mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                {[
                  { label: "Platform ROI", value: "37.2%", change: "+2.1%" },
                  { label: "Investor Returns", value: "34.8%", change: "+3.5%" },
                  { label: "Asset Growth", value: "28.9%", change: "+1.8%" },
                  { label: "Distribution Rate", value: "92%", change: "+5%" }
                ].map((metric, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                    <span className="text-premium-light">{metric.label}</span>
                    <div className="text-right">
                      <div className="font-semibold text-premium-white">{metric.value}</div>
                      <div className="text-sm text-emerald-400">{metric.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
