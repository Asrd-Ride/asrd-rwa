import { NextResponse } from 'next/server'
import { mockProposals } from '@/data/mockData'

export async function GET() {
  return NextResponse.json({
    proposals: mockProposals,
    totalProposals: mockProposals.length,
    activeProposals: mockProposals.filter(p => p.status === 'active').length
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  
  // Simulate voting
  return NextResponse.json({
    success: true,
    message: 'Vote recorded successfully',
    data: body
  })
}
