"use client";

import React from 'react';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  className?: string;
}

export function Slider({ min, max, value, onChange, step = 1, className = '' }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className={`relative ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
        style={{
          background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${percentage}%, #374151 ${percentage}%, #374151 100%)`
        }}
      />
    </div>
  );
}
