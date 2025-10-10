"use client";

import React, { useState, useEffect } from 'react';

export default function AuctionBar() {
  const [timeLeft, setTimeLeft] = useState(24 * 3600); // 24 hours in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (timeLeft <= 0) return null;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">Live Auction - Beachfront Luxury Villa</h3>
              <p className="text-orange-100 text-sm">Current bid: $4.2M • 12 bidders</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold font-mono">{formatTime(timeLeft)}</div>
              <div className="text-orange-100 text-sm">Time Left</div>
            </div>
            
            <button className="bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Place Bid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
