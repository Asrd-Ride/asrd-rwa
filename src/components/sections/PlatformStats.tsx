"use client";

import React from 'react';
import { Shield, Users, TrendingUp, DollarSign } from 'lucide-react';

const PlatformStats = () => {
  const stats = [
    {
      icon: DollarSign,
      value: "$15.4M+",
      label: "Assets Under Management",
      description: "Total platform value",
      color: "blue"
    },
    {
      icon: Users,
      value: "1,247+",
      label: "Active Investors",
      description: "Growing community",
      color: "emerald"
    },
    {
      icon: TrendingUp,
      value: "12.8%",
      label: "Average ROI",
      description: "Historical returns",
      color: "amber"
    },
    {
      icon: Shield,
      value: "100%",
      label: "Secure & Verified",
      description: "Asset verification",
      color: "blue"
    }
  ];

  const colorClasses = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', icon: 'text-blue-600' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: 'text-emerald-600' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', icon: 'text-amber-600' }
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Trusted by <span className="text-blue-600">Thousands</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real results from real investors. Join the movement democratizing elite asset ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const colors = colorClasses[stat.color as keyof typeof colorClasses];
            return (
              <div
                key={stat.label}
                className={`p-6 rounded-xl border-2 ${colors.bg} ${colors.border} transition-all duration-300 hover:shadow-lg`}
              >
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
                    <stat.icon className={`w-6 h-6 ${colors.icon}`} />
                  </div>
                </div>
                <div className={`text-2xl md:text-3xl font-bold ${colors.text} mb-2 text-center`}>
                  {stat.value}
                </div>
                <h3 className="text-slate-900 font-semibold text-center mb-1">
                  {stat.label}
                </h3>
                <p className="text-slate-500 text-sm text-center">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;