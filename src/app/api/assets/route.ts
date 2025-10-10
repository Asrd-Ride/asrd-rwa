import { NextResponse } from 'next/server'
import { mockAssets, ownedAssets } from '@/data/mockData'

export async function GET() {
  return NextResponse.json({
    assets: mockAssets,
    owned: ownedAssets
  })
}
