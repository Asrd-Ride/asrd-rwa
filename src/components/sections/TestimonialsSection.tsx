"use client";

import React, { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ==================== TESTIMONIAL DATA ====================
const testimonialData = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Real Estate Investor",
    company: "Global Properties Ltd",
    content:
      "The detailed analytics and transparent reporting gave me confidence to invest $2.5M across three Dubai properties. My portfolio has delivered consistent 34% returns.",
    rating: 5,
    avatar: "/avatars/sarah-chen.jpg",
    investment: "$2.5M",
    returns: "34% avg ROI",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Portfolio Manager",
    company: "WealthBuild Capital",
    content:
      "The 3D property tours and comprehensive due diligence materials helped our firm allocate $15M to ASRD platforms. Exceptional investor experience.",
    rating: 5,
    avatar: "/avatars/marcus-rodriguez.jpg",
    investment: "$15M",
    returns: "31% avg ROI",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Family Office Director",
    company: "Watson Family Office",
    content:
      "Finally, a platform that combines traditional asset security with modern technology. Our thoroughbred investments have outperformed all expectations.",
    rating: 5,
    avatar: "/avatars/emily-watson.jpg",
    investment: "$8.2M",
    returns: "42% avg ROI",
  },
];

// ==================== COMPONENT ====================
export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonialData.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonialData.length) % testimonialData.length);
  };

  const current = testimonialData[currentTestimonial];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by <span className="text-cyan-400">Elite Investors</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Hear from our community of sophisticated investors who have achieved exceptional returns
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700 p-8 md:p-12"
            >
              {/* Quote Icon */}
              <div className="text-cyan-400 mb-6">
                <Quote className="w-12 h-12" />
              </div>

              {/* Testimonial Content */}
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">"{current.content}"</p>

              {/* Investor Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400">
                    <img src={current.avatar} alt={current.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-white font-semibold text-lg">{current.name}</h4>
                      <BadgeCheck className="w-5 h-5 text-cyan-400" />
                    </div>
                    <p className="text-slate-400">{current.role}</p>
                    <p className="text-slate-500 text-sm">{current.company}</p>
                  </div>
                </div>

                {/* Investment Stats */}
                <div className="text-right">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-cyan-400 font-semibold">{current.investment}</div>
                    <div className="text-emerald-400 font-semibold">{current.returns}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < current.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-500 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonialData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-cyan-400" : "bg-slate-600 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-500 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
