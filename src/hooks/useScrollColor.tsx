'use client';

import { useState, useEffect } from 'react';

export function useScrollColor() {
  const [scrollColor, setScrollColor] = useState('from-gray-900 via-blue-900 to-purple-900');
  const [textColor, setTextColor] = useState('text-white');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      
      if (scrollY < winHeight * 0.25) {
        setScrollColor('from-gray-900 via-blue-900 to-purple-900');
        setTextColor('text-white');
      } else if (scrollY < winHeight * 0.5) {
        setScrollColor('from-blue-900 via-purple-900 to-cyan-900');
        setTextColor('text-white');
      } else if (scrollY < winHeight * 0.75) {
        setScrollColor('from-purple-900 via-cyan-900 to-blue-900');
        setTextColor('text-white');
      } else {
        setScrollColor('from-cyan-900 via-blue-900 to-gray-900');
        setTextColor('text-white');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getScrollColor = () => scrollColor;
  const getTextColor = () => textColor;

  return {
    getScrollColor,
    getTextColor
  };
}
