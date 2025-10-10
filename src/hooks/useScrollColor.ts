"use client";

import { useState, useEffect } from 'react';

export function useScrollColor() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced color transitions
  const getScrollColor = () => {
    if (scrollProgress < 15) {
      return 'from-blue-900 via-indigo-900 to-purple-900'; // Deep blue/purple
    } else if (scrollProgress < 30) {
      return 'from-indigo-900 via-purple-900 to-blue-900'; // Purple/blue mix
    } else if (scrollProgress < 45) {
      return 'from-purple-900 via-blue-900 to-cyan-900'; // Purple/cyan transition
    } else if (scrollProgress < 60) {
      return 'from-cyan-900 via-blue-900 to-gray-900'; // Cyan to dark
    } else if (scrollProgress < 75) {
      return 'from-gray-900 via-slate-900 to-black'; // Dark gray to black
    } else {
      return 'from-black via-gray-900 to-slate-900'; // Pure black
    }
  };

  const getTextColor = () => {
    if (scrollProgress < 30) {
      return 'text-blue-100';
    } else if (scrollProgress < 60) {
      return 'text-cyan-100';
    } else {
      return 'text-gray-100';
    }
  };

  const getAccentColor = () => {
    if (scrollProgress < 25) {
      return 'text-cyan-300';
    } else if (scrollProgress < 50) {
      return 'text-blue-300';
    } else if (scrollProgress < 75) {
      return 'text-purple-300';
    } else {
      return 'text-cyan-400';
    }
  };

  return {
    scrollProgress,
    isScrolled,
    getScrollColor,
    getTextColor,
    getAccentColor
  };
}
