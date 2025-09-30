import { NextResponse } from 'next/server'
import { treasuryData } from '@/data/mockData'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: treasuryData
  })
}
