"use client";

import { motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, ArrowRight, Star, Target, Award } from 'lucide-react';

const demoAssets = [
  {
    id: 1,
    title: "Dubai Luxury Villa",
    type: "Real Estate",
    roi: "32.5%",
    value: "$2.5M",
    location: "Palm Jumeirah, Dubai",
    image: "/api/placeholder/400/300",
    description: "Luxury waterfront villa with premium amenities and high rental yield"
  },
  {
    id: 2,
    title: "Champion Thoroughbred",
    type: "Thoroughbred",
    roi: "45.2%",
    value: "$1.8M",
    location: "Kentucky, USA",
    image: "/api/placeholder/400/300",
    description: "Award-winning racehorse with proven track record"
  },
  {
    id: 3,
    title: "Superyacht Investment",
    type: "Marine Asset",
    roi: "41.3%",
    value: "$4.2M",
    location: "Mediterranean",
    image: "/api/placeholder/400/300",
    description: "Luxury charter yacht with high occupancy rates"
  }
];

export default function PremiumImmersiveDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setCurrentAsset((prev) => (prev + 1) % demoAssets.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const nextAsset = () => {
    setCurrentAsset((prev) => (prev + 1) % demoAssets.length);
  };

  const selectAsset = (index: number) => {
    setCurrentAsset(index);
  };

  return (
    <section id="immersive-demo" className="premium-section relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-blue-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>

      <div className="premium-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="premium-heading-2 mb-6">
            Immersive <span className="text-cyan-400">3D Experience</span>
          </h2>
          <p className="premium-text max-w-2xl mx-auto">
            Explore our premium assets in stunning 3D. Interact with virtual tours and experience 
            the future of investment visualization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Visualization Area */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="premium-card p-0 overflow-hidden"
          >
            {/* 3D Container */}
            <div className="relative h-96 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-t-2xl flex items-center justify-center">
              {/* 3D Model Placeholder */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl mx-auto mb-6 flex items-center justify-center animate-float">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <p className="text-cyan-300 font-semibold mb-2">Interactive 3D Model</p>
                <p className="text-gray-400 text-sm">Rotate, zoom, and explore the asset</p>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                  </button>
                </div>
                <button className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                  <Maximize className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Asset Info */}
            <div className="p-6">
              <h3 className="premium-heading-3 mb-2">{demoAssets[currentAsset].title}</h3>
              <p className="text-gray-400 mb-4">{demoAssets[currentAsset].location}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <p className="text-cyan-300 font-bold text-lg">{demoAssets[currentAsset].roi}</p>
                  <p className="text-cyan-200 text-sm">Annual ROI</p>
                </div>
                <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <p className="text-purple-300 font-bold text-lg">{demoAssets[currentAsset].value}</p>
                  <p className="text-purple-200 text-sm">Asset Value</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                {demoAssets[currentAsset].description}
              </p>
            </div>
          </motion.div>

          {/* Asset Selection & Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="premium-heading-3">Featured Premium Assets</h3>
            
            {/* Asset List */}
            <div className="space-y-4">
              {demoAssets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  onClick={() => selectAsset(index)}
                  className={`premium-card p-4 cursor-pointer transition-all ${
                    currentAsset === index 
                      ? 'border-cyan-400/50 bg-cyan-500/10' 
                      : 'hover:border-cyan-400/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        currentAsset === index 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                          : 'bg-gray-700'
                      }`}>
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{asset.title}</h4>
                        <p className="text-gray-400 text-sm">{asset.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-300 font-bold">{asset.roi}</p>
                      <p className="text-gray-400 text-sm">ROI</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Demo CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="premium-card text-center"
            >
              <Star className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h4 className="premium-heading-3 mb-2">Ready to Invest?</h4>
              <p className="text-gray-300 mb-4">
                Start your investment journey with as little as $100
              </p>
              <button className="btn-premium w-full justify-center">
                <span className="flex items-center space-x-2">
                  <span>Start Investing Now</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
