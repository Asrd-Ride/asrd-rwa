"use client"
import { useApp } from '@/contexts/AppContext'
import { useEffect } from 'react'

export default function DebugAssets() {
  const { assets } = useApp()
  
  useEffect(() => {
    console.log('=== ASSETS DEBUG ===')
    console.log('Total assets:', assets.length)
    assets.forEach((asset, index) => {
      console.log(`Asset ${index}:`, {
        id: asset.id,
        name: asset.name,
        hasRoi: 'roi' in asset,
        roi: asset.roi,
        hasStats: 'stats' in asset,
        stats: asset.stats
      })
    })
  }, [assets])
  
  return null
}
