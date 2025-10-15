'use client';

import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface DeviceInfo {
  type: DeviceType;
  os: string;
  browser: string;
  isRetina: boolean;
  screenWidth: number;
  screenHeight: number;
  isMobile: boolean;
  input: 'mouse' | 'touch';
  performance: 'high'; // ALWAYS HIGH FOR DEMO QUALITY
}

export interface UniversalAttributes {
  [key: string]: any;
}

export interface UniversalConfig {
  deviceInfo: DeviceInfo;
  universalAttributes: UniversalAttributes;
}

export function useUniversal(): UniversalConfig {
  const isClient = typeof window !== 'undefined';

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: 'desktop',
    os: isClient ? navigator.platform : '',
    browser: isClient ? navigator.userAgent : '',
    isRetina: isClient ? window.devicePixelRatio > 1 : false,
    screenWidth: isClient ? window.innerWidth : 0,
    screenHeight: isClient ? window.innerHeight : 0,
    isMobile: isClient ? window.innerWidth < 768 : false,
    input: isClient ? (window.matchMedia('(pointer: coarse)').matches ? 'touch' : 'mouse') : 'mouse',
    performance: 'high', // ALWAYS HIGH QUALITY
  });

  const universalAttributes: UniversalAttributes = {
    'data-device-type': deviceInfo.type,
    'data-os': deviceInfo.os,
    'data-browser': deviceInfo.browser,
    'data-mobile': deviceInfo.isMobile,
    'data-input': deviceInfo.input,
    'data-performance': deviceInfo.performance,
  };

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      const width = window.innerWidth;
      setDeviceInfo(prev => ({
        ...prev,
        screenWidth: width,
        screenHeight: window.innerHeight,
        type: width < 768 ? 'mobile' : 'desktop',
        isMobile: width < 768,
        input: window.matchMedia('(pointer: coarse)').matches ? 'touch' : 'mouse',
        performance: 'high', // ALWAYS HIGH QUALITY
      }));
    };

    let timeout: NodeJS.Timeout | null = null;
    const throttledResize = () => {
      if (!timeout) {
        timeout = setTimeout(() => {
          handleResize();
          timeout = null;
        }, 100);
      }
    };

    window.addEventListener('resize', throttledResize);
    return () => window.removeEventListener('resize', throttledResize);
  }, [isClient]);

  return { deviceInfo, universalAttributes };
}