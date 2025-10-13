'use client';

import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Asset } from '@/types';
import { useUniversal } from '@/lib/universal';

interface Props {
  asset: Asset;
  onViewDetails: (asset: Asset) => void;
  onInvest: (asset: Asset) => void;
  viewMode?: 'grid' | 'list';
  enhanced?: boolean;
}

export default function EnhancedAssetCard({
  asset,
  onViewDetails,
  onInvest,
  viewMode = 'grid',
  enhanced = false,
}: Props) {
  const { deviceInfo } = useUniversal();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (deviceInfo.isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const fundingProgress =
    asset.fundedAmount && asset.totalFunding
      ? (asset.fundedAmount / asset.totalFunding) * 100
      : 0;

  const displayImage = asset.images?.[0] || asset.image || '/placeholder-asset.jpg';

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden shadow-xl border border-white/20 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md cursor-pointer ${
        viewMode === 'list' ? 'flex flex-row gap-4' : ''
      } ${enhanced ? 'ring-2 ring-amber-500 shadow-2xl' : ''}`}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: enhanced && !deviceInfo.isMobile ? 1.08 : 1.05 }}
    >
      <div className={`${viewMode === 'list' ? 'w-1/3' : 'w-full'} relative`}>
        <img
          src={displayImage}
          alt={asset.name}
          className="w-full h-48 object-cover rounded-t-2xl md:rounded-2xl"
          loading="lazy"
        />
        <motion.div
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/20 via-white/0 to-white/20 opacity-0 rounded-2xl"
          whileHover={{ opacity: deviceInfo.isMobile ? 0 : 0.25 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className={`p-4 ${viewMode === 'list' ? 'w-2/3 flex flex-col justify-between' : ''}`}>
        <h3 className="text-lg font-bold text-white">{asset.name}</h3>
        <p className="text-sm text-gray-300">
          {asset.location?.city}, {asset.location?.country}
        </p>
        <p className="text-sm text-gray-400 mt-1">{asset.type}</p>

        <div className="mt-3">
          <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${fundingProgress}%` }}
              transition={{ duration: 1.2 }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">
            ${asset.fundedAmount?.toLocaleString() || 0} raised of $
            {asset.totalFunding?.toLocaleString() || 0}
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 gap-2">
          <div>
            <span className="text-green-400 font-bold text-lg">
              {asset.projectedROI || 'N/A'}%
            </span>
            <span className="text-gray-400 text-sm ml-1">EST. ROI</span>
          </div>

          <div className="flex gap-2 w-full max-w-[180px]">
            <button
              onClick={() => onViewDetails(asset)}
              className="flex-1 bg-gray-700 text-white py-1.5 rounded-lg text-xs font-medium hover:bg-gray-600 transition"
            >
              Details
            </button>
            <button
              onClick={() => onInvest(asset)}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-1.5 rounded-lg text-xs font-medium hover:from-blue-600 hover:to-purple-700 hover:shadow-lg transition"
            >
              Invest
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {asset.tags?.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="bg-gray-700 text-gray-200 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
