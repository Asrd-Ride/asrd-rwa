export const mockAssets = [
  {
    id: 1,
    name: 'Thunderbolt',
    type: 'horse',
    location: 'Dubai',
    price: 1200,
    image: '/images/horse1.jpg',
    stats: { wins: 5, places: 2, pedigree: 'Champion bloodline' },
    upcomingRace: 'Dubai Derby',
    description: 'Elite racing horse with champion bloodline and proven track record.'
  },
  {
    id: 2,
    name: 'Ocean View Villa',
    type: 'real-estate',
    location: 'Dubai',
    price: 8000,
    image: '/images/villa1.jpg',
    stats: { value: '$2,500,000', yield: '6.5%' },
    projectedRent: '$13,542/month',
    description: 'Luxury beachfront villa with panoramic ocean views and premium amenities.'
  }
]

export const mockProposals = [
  {
    id: 1,
    title: 'Increase Treasury Allocation to Real Estate',
    description: 'Proposal to allocate 60% of treasury to real estate NFTs for higher rental yields.',
    votesFor: 4500,
    votesAgainst: 1200,
    status: 'active'
  }
]

export const ownedAssets = [
  {
    id: 7,
    name: 'Desert King',
    type: 'horse',
    location: 'Dubai',
    price: 1500,
    image: '/images/horse1.jpg',
    stats: { wins: 6, places: 1, pedigree: 'Desert Storm lineage' },
    upcomingRace: 'Dubai World Cup',
    unclaimedWinnings: 320,
    description: 'Champion desert-bred horse with multiple international wins.'
  }
]

export const treasuryData = {
  balance: 15000000,
  monthlyInflow: 2500000,
  monthlyOutflow: 1200000,
  assets: {
    realEstate: 65,
    horses: 35
  }
}
