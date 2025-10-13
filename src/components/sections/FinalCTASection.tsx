"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Shield, CheckCircle, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function FinalCTASection() {
  const { login } = useAuth();

  const handleLogin = () => {
    login('/dashboard');
  };

  return (
    <section className="fluid-section-lg bg-gradient-to-br from-slate-50 to-white">
      <div className="fluid-container">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            <div className="p-8 sm:p-12">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-sapphire-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Begin in Minutes
                </h3>
                <p className="text-slate-600">
                  Log in to your account and start investing today
                </p>
              </div>

              {/* Single CTA Button */}
              <div className="max-w-sm mx-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-emerald-600 to-sapphire-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <User className="w-5 h-5" />
                  <span>Log in to Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-slate-200 flex items-center justify-center space-x-2">
                <div className="flex items-center space-x-2 text-slate-500 text-sm">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>Secure & Regulated Platform</span>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="bg-slate-50 border-t border-slate-200 p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                {[
                  { label: 'No Account Fees', icon: CheckCircle },
                  { label: 'Instant Access', icon: Zap },
                  { label: '24/7 Support', icon: Shield }
                ].map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-center space-x-2 text-slate-600"
                    >
                      <FeatureIcon className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium">{feature.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-slate-500 text-sm">
              Trusted by thousands of investors worldwide • Bank-level security • Fully regulated
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}