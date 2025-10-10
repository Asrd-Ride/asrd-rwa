"use client";

import { useState, useEffect } from 'react';

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / docHeight) * 100;

      setScrollY(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setScrollProgress(progress);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3D Parallax effects
  const getParallaxStyle = (speed: number = 0.5) => ({
    transform: `translateY(${scrollY * speed}px)`,
  });

  // Fade in/out based on scroll
  const getFadeStyle = (start: number, end: number) => {
    const opacity = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));
    return { opacity };
  };

  // Scale based on scroll
  const getScaleStyle = (start: number, end: number) => {
    const scale = 1 - Math.max(0, Math.min(1, (scrollY - start) / (end - start))) * 0.3;
    return { transform: `scale(${scale})` };
  };

  // Rotate based on scroll
  const getRotateStyle = (start: number, end: number, maxRotate: number = 10) => {
    const rotate = Math.max(0, Math.min(1, (scrollY - start) / (end - start))) * maxRotate;
    return { transform: `rotateX(${rotate}deg)` };
  };

  return {
    scrollY,
    scrollDirection,
    scrollProgress,
    getParallaxStyle,
    getFadeStyle,
    getScaleStyle,
    getRotateStyle
  };
}
