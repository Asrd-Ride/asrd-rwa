import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { assetId, price } = await request.json()
  
  return NextResponse.json({
    success: true,
    message: 'Asset purchased successfully!',
    data: {
      assetId,
      price,
      transactionHash: '0x' + Math.random().toString(16).slice(2)
    }
  })
}
