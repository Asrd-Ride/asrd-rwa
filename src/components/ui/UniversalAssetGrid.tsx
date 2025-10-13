'use client';

import React from 'react';
import { useUniversal } from '@/lib/universal';
import EnhancedAssetCard from './EnhancedAssetCard';

export function UniversalAssetGrid({ assets }: { assets: any[] }) {
  const { deviceInfo } = useUniversal();

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {assets.map(asset => (
        <EnhancedAssetCard
          key={asset.id}
          asset={asset}
          onInvest={() => console.log('Invest in', asset.id)}
          onViewDetails={() => console.log('View details', asset.id)}
          enhanced={true}
        />
      ))}
    </div>
  );
}