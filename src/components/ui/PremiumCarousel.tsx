"use client";

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, TrendingUp } from 'lucide-react';

interface Asset {
  id: number;
  title: string;
  type: string;
  location: string;
  value: number;
  roi: string;
  image: string;
  description: string;
}

interface PremiumCarouselProps {
  assets: Asset[];
  autoPlay?: boolean;
  interval?: number;
}

export default function PremiumCarousel({ 
  assets, 
  autoPlay = true, 
  interval = 5000 
}: PremiumCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === assets.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? assets.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  return (
    <div className="premium-carousel relative">
      {/* Main Carousel */}
      <div className="relative h-96 rounded-2xl overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="carousel-slide absolute inset-0"
          >
            {/* Asset Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 to-purple-900/40 rounded-2xl">
              <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <TrendingUp className="w-16 h-16 mx-auto mb-4 text-cyan-300" />
                  <p className="text-lg font-semibold">{assets[currentIndex].title}</p>
                  <p className="text-cyan-200">{assets[currentIndex].type}</p>
                </div>
              </div>
            </div>

            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-2xl font-bold text-white mb-2">
                {assets[currentIndex].title}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-300 mb-3">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{assets[currentIndex].location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-cyan-300 font-semibold">{assets[currentIndex].roi} ROI</span>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {assets[currentIndex].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {assets.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-cyan-400 w-8'
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
