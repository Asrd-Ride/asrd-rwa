import { NextResponse } from 'next/server'

export async function GET() {
  // Mock treasury data
  const treasuryData = {
    totalValue: 15420000,
    availableFunds: 3250000,
    allocatedFunds: 12170000,
    monthlyIncome: 425000,
    monthlyExpenses: 125000,
    netCashFlow: 300000,
    assets: [
      { name: 'Real Estate', value: 8500000, percentage: 55.2 },
      { name: 'Thoroughbred', value: 3200000, percentage: 20.8 },
      { name: 'Marine Assets', value: 2200000, percentage: 14.3 },
      { name: 'Other Investments', value: 1520000, percentage: 9.7 }
    ]
  }

  return NextResponse.json(treasuryData)
}
