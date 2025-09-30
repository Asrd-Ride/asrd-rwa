import { NextResponse } from 'next/server'
import { mockProposals } from '@/data/mockData'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockProposals
  })
}

export async function POST(request: Request) {
  const { proposalId, vote } = await request.json()
  
  return NextResponse.json({
    success: true,
    message: `Vote ${vote ? 'FOR' : 'AGAINST'} recorded for proposal ${proposalId}`,
    data: {
      proposalId,
      vote,
      transactionHash: '0x' + Math.random().toString(16).slice(2)
    }
  })
}
