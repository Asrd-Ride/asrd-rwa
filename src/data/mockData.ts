export interface Asset {
  id: number;
  name: string;
  type: 'horse' | 'real-estate';
  location: string;
  price: number;
  image: string;
  stats: any;
  upcomingRace?: string;
  projectedRent?: string;
  unclaimedWinnings?: number;
  unclaimedRent?: number;
  description: string;
}

export const mockAssets: Asset[] = [
  {
    id: 1,
    name: 'Thunderbolt',
    type: 'horse',
    location: 'Dubai',
    price: 38000, // ~1.19M USD
    image: '/images/horse1.jpg',
    stats: { wins: 5, places: 2, pedigree: 'Champion bloodline' },
    upcomingRace: 'Dubai Derby',
    unclaimedWinnings: 0,
    description: 'Elite racing horse with champion bloodline and proven track record.'
  },
  {
    id: 2,
    name: 'Ocean View Villa',
    type: 'real-estate',
    location: 'Dubai',
    price: 250000, // ~8M USD
    image: '/images/villa1.jpg',
    stats: { value: '$8,000,000', yield: '6.5%' },
    projectedRent: '$43,333/month',
    unclaimedRent: 0,
    description: 'Luxury beachfront villa with panoramic ocean views and premium amenities.'
  },
  {
    id: 3,
    name: 'Midnight Star',
    type: 'horse',
    location: 'UK',
    price: 31250, // ~1M USD
    image: '/images/horse2.jpg',
    stats: { wins: 4, places: 1, pedigree: 'Royal Ascot pedigree' },
    upcomingRace: 'Ascot Gold Cup',
    unclaimedWinnings: 0,
    description: 'Royal Ascot pedigree with exceptional speed and endurance.'
  },
  {
    id: 4,
    name: 'London Penthouse',
    type: 'real-estate',
    location: 'UK',
    price: 281250, // ~9M USD
    image: '/images/villa2.jpg',
    stats: { value: '$9,000,000', yield: '5.8%' },
    projectedRent: '$43,500/month',
    unclaimedRent: 0,
    description: 'Modern penthouse in the heart of London with luxury finishes.'
  },
  {
    id: 5,
    name: 'Outback Spirit',
    type: 'horse',
    location: 'Australia',
    price: 34375, // ~1.1M USD
    image: '/images/horse3.jpg',
    stats: { wins: 3, places: 3, pedigree: 'Outback lineage' },
    upcomingRace: 'Melbourne Cup',
    unclaimedWinnings: 0,
    description: 'Robust outback lineage known for exceptional performance in long distances.'
  },
  {
    id: 6,
    name: 'Sydney Harbour House',
    type: 'real-estate',
    location: 'Australia',
    price: 312500, // ~10M USD
    image: '/images/villa3.jpg',
    stats: { value: '$10,000,000', yield: '6.2%' },
    projectedRent: '$51,667/month',
    unclaimedRent: 0,
    description: 'Stunning harbor view property with exclusive access and modern design.'
  }
]

export const mockProposals = [
  {
    id: 1,
    title: 'Increase Treasury Allocation to Real Estate',
    description: 'Proposal to allocate 60% of treasury to real estate NFTs for higher rental yields.',
    votesFor: 1250000, // ~1.25M ASRD
    votesAgainst: 375000, // ~375K ASRD
    status: 'active'
  },
  {
    id: 2,
    title: 'Partner with Dubai Racing Club',
    description: 'Form a partnership to acquire exclusive racing rights for Dubai events.',
    votesFor: 1000000, // ~1M ASRD
    votesAgainst: 250000, // ~250K ASRD
    status: 'active'
  }
]

export const ownedAssets: Asset[] = [
  {
    id: 7,
    name: 'Desert King',
    type: 'horse',
    location: 'Dubai',
    price: 46875, // ~1.5M USD
    image: '/images/horse1.jpg',
    stats: { wins: 6, places: 1, pedigree: 'Desert Storm lineage' },
    upcomingRace: 'Dubai World Cup',
    unclaimedWinnings: 1000, // ~$32,000
    description: 'Champion desert-bred horse with multiple international wins.'
  },
  {
    id: 8,
    name: 'Mountain Retreat',
    type: 'real-estate',
    location: 'Switzerland',
    price: 375000, // ~12M USD
    image: '/images/villa2.jpg',
    stats: { value: '$12,000,000', yield: '4.5%' },
    projectedRent: '$45,000/month',
    unclaimedRent: 14062, // ~$450,000
    description: 'Luxury alpine retreat with stunning mountain views and premium amenities.'
  }
]

export const treasuryData = {
  balance: 468750, // ~15M USD in ASRD
  monthlyInflow: 78125, // ~2.5M USD
  monthlyOutflow: 37500, // ~1.2M USD
  assets: {
    realEstate: 65,
    horses: 35
  }
}

// Platform Statistics
export const platformStats = {
  totalSupply: 4000000, // 4M total ASRD
  circulatingSupply: 2500000, // 2.5M circulating
  marketCap: 128000000, // $128M market cap
  price: 32, // $32 per ASRD
  totalAssets: 45,
  totalValueLocked: 95000000 // $95M TVL
}
