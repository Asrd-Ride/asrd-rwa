"use client";

import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function CTASection() {
  const { getFadeStyle } = useScrollAnimation();

  const features = [
    {
      icon: "🚀",
      title: "Instant Access",
      description: "Start investing in minutes"
    },
    {
      icon: "💎",
      title: "Premium Assets",
      description: "Curated elite investments"
    },
    {
      icon: "📈",
      title: "Proven Returns",
      description: "Track record of success"
    },
    {
      icon: "🛡️",
      title: "Secure Platform",
      description: "Bank-grade security"
    }
  ];

  return (
    <section className="py-20 relative bg-gradient-to-br from-cyan-900/30 to-purple-900/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12" style={getFadeStyle(0, 200)}>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Investment Journey?
              </span>
            </h2>
            <p className="text-xl text-white mb-8 leading-relaxed">
              Join thousands of investors who are already building wealth through real world assets. 
              Start with just $50 and access investments previously reserved for the elite.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12" style={getFadeStyle(200, 600)}>
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <div className="text-white font-semibold text-sm mb-1">{feature.title}</div>
                <div className="text-cyan-200 text-xs">{feature.description}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" style={getFadeStyle(400, 800)}>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 w-full sm:w-auto">
              Create Account
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-500 w-full sm:w-auto">
              Learn More
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12" style={getFadeStyle(600, 1000)}>
            <p className="text-cyan-200 text-sm mb-4">TRUSTED BY THOUSANDS OF INVESTORS</p>
            <div className="text-white/60 text-sm">
              "Finally, elite investments are accessible to everyone. Started with $100, now growing my wealth like never before."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
