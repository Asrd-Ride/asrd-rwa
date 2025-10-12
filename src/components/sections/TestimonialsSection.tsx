// Enhanced TestimonialsSection.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, BadgeCheck, TrendingUp, Shield, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Real Estate Investor",
      content: "I never thought I could own a piece of a luxury Dubai property. With just $500, I'm now earning rental income from assets I could only dream of before.",
      investment: "$500",
      returns: "28% ROI",
      avatar: "SC",
      category: "Real Estate",
      verified: true,
      duration: "6 months"
    },
    {
      name: "Marcus Rodriguez",
      role: "Tech Professional",
      content: "The fractional ownership model changed everything for me. I've diversified across thoroughbreds and real estate with minimal capital.",
      investment: "$1,200",
      returns: "35% ROI",
      avatar: "MR",
      category: "Diversified Portfolio",
      verified: true,
      duration: "1 year"
    },
    {
      name: "Jennifer Kim",
      role: "Teacher & Investor",
      content: "As an educator, I never had access to these opportunities. Now I'm building real wealth alongside my teaching career.",
      investment: "$250",
      returns: "22% ROI",
      avatar: "JK",
      category: "Alternative Assets",
      verified: true,
      duration: "4 months"
    },
    {
      name: "David Thompson",
      role: "Retired Engineer",
      content: "The platform's transparency and blockchain security gave me confidence to invest my retirement savings. The returns have exceeded my expectations.",
      investment: "$5,000",
      returns: "31% ROI",
      avatar: "DT",
      category: "Commercial Real Estate",
      verified: true,
      duration: "2 years"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-sapphire-900">
      <div className="max-w-7xl mx-auto px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Rated 4.9/5 by Investors</span>
          </div>
          
          <h2 className="text-fluid-3xl font-bold text-white mb-4">
            Trusted by <span className="text-amber-400">Thousands</span> of Investors
          </h2>
          
          <p className="text-fluid-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover why investors worldwide are choosing ASRD to build their wealth through fractional ownership of elite real-world assets.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Left Side - Testimonial Content */}
              <div className="lg:col-span-2 p-8 lg:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="h-full flex flex-col"
                  >
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <Quote className="w-12 h-12 text-amber-400 opacity-50" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-xl lg:text-2xl text-white leading-relaxed mb-8 italic">
                        "{testimonials[currentTestimonial].content}"
                      </p>

                      {/* Investor Info */}
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {testimonials[currentTestimonial].avatar}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-white font-semibold text-xl">
                              {testimonials[currentTestimonial].name}
                            </h4>
                            {testimonials[currentTestimonial].verified && (
                              <BadgeCheck className="w-5 h-5 text-emerald-400" />
                            )}
                          </div>
                          <p className="text-slate-300">
                            {testimonials[currentTestimonial].role}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-amber-400 text-sm font-medium">
                              {testimonials[currentTestimonial].category}
                            </span>
                            <span className="text-slate-500">•</span>
                            <span className="text-slate-400 text-sm">
                              {testimonials[currentTestimonial].duration}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-emerald-400" />
                          <div>
                            <div className="text-sm text-slate-400">Investment</div>
                            <div className="text-white font-semibold">{testimonials[currentTestimonial].investment}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Zap className="w-5 h-5 text-amber-400" />
                          <div>
                            <div className="text-sm text-slate-400">Returns</div>
                            <div className="text-white font-semibold">{testimonials[currentTestimonial].returns}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-700">
                  <div className="flex items-center space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentTestimonial 
                            ? 'bg-amber-400' 
                            : 'bg-slate-600 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={prevTestimonial}
                      className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors group"
                    >
                      <ChevronLeft className="w-5 h-5 text-slate-300 group-hover:text-white" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors group"
                    >
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side - Trust Indicators */}
              <div className="bg-slate-800/50 p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-6">Why Investors Trust Us</h3>
                
                <div className="space-y-6">
                  {[
                    { icon: Shield, title: "Bank-Grade Security", desc: "Military-grade encryption and blockchain verification" },
                    { icon: TrendingUp, title: "Proven Track Record", desc: "Consistent returns across all asset classes" },
                    { icon: BadgeCheck, title: "Fully Verified Assets", desc: "Every asset undergoes rigorous due diligence" },
                    { icon: Zap, title: "Instant Settlements", desc: "Blockchain-powered fast and secure transactions" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                        <p className="text-slate-400 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overall Rating */}
                <div className="mt-8 p-4 bg-slate-900/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">Overall Rating</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="text-slate-400 text-sm">4.9/5 from 2,500+ reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}