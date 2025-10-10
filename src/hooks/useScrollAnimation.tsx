'use client';

import { useState, useEffect } from 'react';

export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      const trackLength = docHeight - winHeight;
      setScrollProgress(scrollTop / trackLength * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getFadeStyle = (delay: number, duration: number) => ({
    opacity: scrollY > delay ? 1 : 0,
    transform: scrollY > delay ? 'translateY(0)' : 'translateY(30px)',
    transition: `all 0.6s ease-out ${scrollY > delay ? 0 : duration}ms`
  });

  const getParallaxStyle = (speed: number) => ({
    transform: `translateY(${scrollY * speed}px)`
  });

  const getScaleStyle = (delay: number, duration: number) => ({
    transform: scrollY > delay ? 'scale(1)' : 'scale(0.9)',
    transition: `transform 0.6s ease-out ${scrollY > delay ? 0 : duration}ms`
  });

  const getRotateStyle = (delay: number, duration: number, degrees: number) => ({
    transform: scrollY > delay ? 'rotate(0deg)' : `rotate(${degrees}deg)`,
    transition: `transform 0.8s ease-out ${scrollY > delay ? 0 : duration}ms`
  });

  return {
    scrollY,
    scrollProgress,
    getFadeStyle,
    getParallaxStyle,
    getScaleStyle,
    getRotateStyle
  };
}
