export interface Asset {
  id: number;
  name: string;
  type: 'horse' | 'real-estate';
  location: string;
  price: number; // Price in ASRD tokens
  image: string;
  stats: any;
  upcomingRace?: string;
  projectedRent?: string;
  unclaimedWinnings?: number;
  unclaimedRent?: number;
  description: string;
  featured?: boolean;
}

// ASRD token price = $32
const ASRD_PRICE = 32;

export const mockAssets: Asset[] = [
  {
    id: 1,
    name: 'Arabian Thunder',
    type: 'horse',
    location: 'Dubai',
    price: 3500, // 3,500 ASRD = $112,000 USD
    image: 'https://images.unsplash.com/photo-1599140780245-99dce06649c3?w=600&h=400&fit=crop',
    stats: { wins: 12, places: 3, pedigree: 'Pure Arabian' },
    upcomingRace: 'Dubai World Cup',
    unclaimedWinnings: 0,
    description: 'Champion Arabian racehorse with multiple international victories.',
    featured: true
  },
  {
    id: 2,
    name: 'Ocean Pearl Villa',
    type: 'real-estate',
    location: 'Dubai',
    price: 4500, // 4,500 ASRD = $144,000 USD
    image: 'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=600&h=400&fit=crop',
    stats: { value: '$144,000', yield: '6.5%' },
    projectedRent: '$780/month',
    unclaimedRent: 0,
    description: 'Luxury beachfront villa with panoramic ocean views.',
    featured: true
  },
  {
    id: 3,
    name: 'Royal Ascot Champion',
    type: 'horse',
    location: 'UK',
    price: 2800, // 2,800 ASRD = $89,600 USD
    image: 'https://images.unsplash.com/photo-1574883509704-8ce8e0ad0dfa?w=600&h=400&fit=crop',
    stats: { wins: 8, places: 2, pedigree: 'Thoroughbred' },
    upcomingRace: 'Ascot Gold Cup',
    unclaimedWinnings: 0,
    description: 'Elite thoroughbred with exceptional racing pedigree.',
    featured: false
  },
  {
    id: 4,
    name: 'London Sky Penthouse',
    type: 'real-estate',
    location: 'UK',
    price: 5000, // 5,000 ASRD = $160,000 USD
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    stats: { value: '$160,000', yield: '5.8%' },
    projectedRent: '$773/month',
    unclaimedRent: 0,
    description: 'Modern penthouse in the heart of London with luxury finishes.',
    featured: false
  },
  {
    id: 5,
    name: 'Outback Warrior',
    type: 'horse',
    location: 'Australia',
    price: 3200, // 3,200 ASRD = $102,400 USD
    image: 'https://images.unsplash.com/photo-1500479773-e3c8ee3d9c2e?w=600&h=400&fit=crop',
    stats: { wins: 6, places: 4, pedigree: 'Australian Stock' },
    upcomingRace: 'Melbourne Cup',
    unclaimedWinnings: 0,
    description: 'Robust Australian stock horse known for exceptional endurance.',
    featured: true
  },
  {
    id: 6,
    name: 'Sydney Harbour View',
    type: 'real-estate',
    location: 'Australia',
    price: 4800, // 4,800 ASRD = $153,600 USD
    image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=600&h=400&fit=crop',
    stats: { value: '$153,600', yield: '6.2%' },
    projectedRent: '$793/month',
    unclaimedRent: 0,
    description: 'Stunning harbor view apartment with exclusive access.',
    featured: false
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
    price: 4000, // 4,000 ASRD = $128,000 USD
    image: 'https://images.unsplash.com/photo-1599140780245-99dce06649c3?w=600&h=400&fit=crop',
    stats: { wins: 6, places: 1, pedigree: 'Desert Storm lineage' },
    upcomingRace: 'Dubai World Cup',
    unclaimedWinnings: 3200, // $3,200 USD in winnings
    description: 'Champion desert-bred horse with multiple international wins.'
  },
  {
    id: 8,
    name: 'Mountain Retreat',
    type: 'real-estate',
    location: 'Switzerland',
    price: 5200, // 5,200 ASRD = $166,400 USD
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de62?w=600&h=400&fit=crop',
    stats: { value: '$166,400', yield: '4.5%' },
    projectedRent: '$624/month',
    unclaimedRent: 4500, // $4,500 USD in rent
    description: 'Luxury alpine retreat with stunning mountain views.'
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
