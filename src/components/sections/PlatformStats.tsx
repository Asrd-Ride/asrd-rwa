"use client";

import React from 'react';
import { Shield, Users, TrendingUp, DollarSign, Target, Zap } from 'lucide-react';
import { platformStats } from '@/data/mockData';
import { useUniversal } from '@/lib/universal';
import { motion } from 'framer-motion';

const PlatformStats = () => {
  const { universalAttributes } = useUniversal();

  const stats = [
    {
      icon: DollarSign,
      value: `$${(platformStats.totalInvestments / 1000000).toFixed(0)}M+`,
      label: "Assets Under Management",
      description: "Total platform investments",
      color: "blue"
    },
    {
      icon: Users,
      value: `${platformStats.totalUsers.toLocaleString()}+`,
      label: "Total Investors",
      description: "Growing community",
      color: "emerald"
    },
    {
      icon: TrendingUp,
      value: `${platformStats.averageROI}%`,
      label: "Average ROI",
      description: "Historical platform returns",
      color: "amber"
    },
    {
      icon: Shield,
      value: `$${(platformStats.totalReturns / 1000000).toFixed(1)}M+`,
      label: "Total Returns",
      description: "Generated for investors",
      color: "cyan"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: 'from-emerald-500 to-green-500',
      amber: 'from-amber-500 to-orange-500',
      blue: 'from-blue-500 to-cyan-500',
      cyan: 'from-cyan-500 to-blue-500'
    };
    return colorMap[color as keyof typeof colorMap] || 'from-cyan-500 to-blue-500';
  };

  return (
    <section 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      {...universalAttributes}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Platform <span className="text-cyan-400">Performance</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Trusted by thousands of investors with proven track record and transparent reporting
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${getColorClasses(stat.color)} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <h4 className="text-lg font-semibold text-cyan-400 mb-2">{stat.label}</h4>
              <p className="text-slate-400">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Growth Metric */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-6 py-3">
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 font-semibold">Platform Growth: +{platformStats.platformGrowth}%</span>
            <Target className="w-5 h-5 text-emerald-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformStats;