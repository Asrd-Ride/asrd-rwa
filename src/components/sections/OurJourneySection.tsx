"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, Users, TrendingUp, Shield, Globe } from 'lucide-react';

export default function OurJourneySection() {
  const milestones = [
    {
      year: "2023 Q4",
      title: "Protocol Foundation",
      description: "Launched AssetRide protocol with initial real estate tokenization",
      icon: Target,
      status: "completed",
      color: "text-fluid-gold"
    },
    {
      year: "2024 Q1",
      title: "Asset Diversification",
      description: "Expanded to thoroughbred, marine, and aviation assets",
      icon: TrendingUp,
      status: "completed",
      color: "text-fluid-emerald"
    },
    {
      year: "2024 Q2",
      title: "DAO Governance",
      description: "Implemented decentralized governance for community-driven decisions",
      icon: Users,
      status: "completed",
      color: "text-fluid-sapphire"
    },
    {
      year: "2024 Q3",
      title: "Global Expansion",
      description: "Scaled operations to international markets and regulatory compliance",
      icon: Globe,
      status: "current",
      color: "text-fluid-gold"
    },
    {
      year: "2024 Q4",
      title: "Institutional Partnerships",
      description: "Forming alliances with major financial institutions",
      icon: Shield,
      status: "upcoming",
      color: "text-fluid-emerald"
    },
    {
      year: "2025 Q1",
      title: "Mass Adoption",
      description: "Targeting 10,000+ active investors worldwide",
      icon: Target,
      status: "upcoming",
      color: "text-fluid-sapphire"
    }
  ];

  const stats = [
    { value: "2,470+", label: "Active Investors", icon: Users },
    { value: "$15.4M", label: "Platform Value", icon: TrendingUp },
    { value: "38.7%", label: "Average ROI", icon: Target },
    { value: "28", label: "Premium Assets", icon: Shield }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-fluid-emerald';
      case 'current': return 'bg-fluid-gold';
      case 'upcoming': return 'bg-fluid-slate';
      default: return 'bg-fluid-slate';
    }
  };

  return (
    <div className="fluid-section">
      <div className="fluid-container">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 fluid-scroll-item mobile:text-center">
          <h1 className="fluid-hero">
            Our <span className="text-fluid-gold">Journey</span>
          </h1>
          <p className="fluid-body max-w-2xl mx-auto mobile:px-4">
            From visionary concept to leading real-world asset platform. Discover how we're democratizing access to elite investments.
          </p>
        </div>

        {/* Stats Section */}
        <div className="fluid-grid fluid-grid-cols-2 lg:fluid-grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="fluid-card text-center fluid-scroll-item mobile:p-3"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-fluid-gold mx-auto mb-2 md:mb-3" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">{stat.value}</h3>
              <p className="fluid-caption text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="fluid-card-panel fluid-scroll-item mobile:px-4 mobile:py-4">
          <h2 className="fluid-subheading mb-6 md:mb-8 text-center">Platform Evolution Timeline</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-fluid-slate transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-6 md:space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-start md:items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Mobile Timeline Dot */}
                  <div className="flex items-center mb-3 md:hidden">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(milestone.status)} mr-3`}></div>
                    <span className="text-fluid-gold font-semibold text-sm">{milestone.year}</span>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} mobile:ml-0`}>
                    <div className="fluid-card mobile:p-3">
                      <div className="flex items-start space-x-3 md:space-x-4">
                        <div className={`p-2 md:p-3 rounded-xl bg-opacity-10 ${milestone.color.replace('text-', 'bg-')}`}>
                          <milestone.icon className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h3 className="text-lg md:text-xl font-bold text-white">{milestone.title}</h3>
                            <span className="text-fluid-gold font-semibold text-sm hidden md:block">{milestone.year}</span>
                          </div>
                          <p className="fluid-caption text-sm md:text-base">{milestone.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(milestone.status)}`}></div>
                            <span className="text-fluid-silver text-xs capitalize">{milestone.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Timeline Dot */}
                  <div className="hidden md:flex items-center justify-center w-4 h-4 relative">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(milestone.status)} absolute`}></div>
                  </div>

                  {/* Spacer for desktop */}
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="fluid-card-panel mt-6 md:mt-8 fluid-scroll-item mobile:px-4 mobile:py-4" style={{ transitionDelay: '400ms' }}>
          <div className="text-center">
            <Shield className="w-12 h-12 md:w-16 md:h-16 text-fluid-gold mx-auto mb-4 md:mb-6" />
            <h2 className="fluid-subheading mb-3 md:mb-4">Our Mission</h2>
            <p className="fluid-body max-w-3xl mx-auto mobile:px-4">
              To democratize access to premium real-world assets through fractional digital ownership, 
              enabling anyone to participate in investment opportunities previously reserved for the ultra-wealthy. 
              We believe in collective capital power and institutional-grade access for all.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
