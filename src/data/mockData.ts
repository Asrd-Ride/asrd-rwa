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

export const mockAssets: Asset[] = [
  {
    id: 1,
    name: 'Desert Storm',
    type: 'horse',
    location: 'Dubai',
    price: 150, // 150 ASRD = $4,800 USD
    image: 'https://images.unsplash.com/photo-1599140780245-99dce06649c3?w=600&h=400&fit=crop',
    stats: { wins: 8, places: 2, pedigree: 'Arabian Champion' },
    upcomingRace: 'Dubai World Cup',
    unclaimedWinnings: 0,
    description: 'Elite Arabian racehorse with proven track record in desert conditions.',
    featured: true
  },
  {
    id: 2,
    name: 'Marina Bay Residence',
    type: 'real-estate',
    location: 'Dubai',
    price: 200, // 200 ASRD = $6,400 USD
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop',
    stats: { value: '$6,400', yield: '7.2%' },
    projectedRent: '$38/month',
    unclaimedRent: 0,
    description: 'Modern apartment in Dubai Marina with premium amenities.',
    featured: true
  },
  {
    id: 3,
    name: 'Royal Spirit',
    type: 'horse',
    location: 'UK',
    price: 120, // 120 ASRD = $3,840 USD
    image: 'https://images.unsplash.com/photo-1574883509704-8ce8e0ad0dfa?w=600&h=400&fit=crop',
    stats: { wins: 6, places: 3, pedigree: 'Thoroughbred' },
    upcomingRace: 'Royal Ascot',
    unclaimedWinnings: 0,
    description: 'British thoroughbred with excellent racing pedigree.',
    featured: false
  },
  {
    id: 4,
    name: 'London Loft',
    type: 'real-estate',
    location: 'UK',
    price: 180, // 180 ASRD = $5,760 USD
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    stats: { value: '$5,760', yield: '6.8%' },
    projectedRent: '$33/month',
    unclaimedRent: 0,
    description: 'Contemporary loft apartment in central London.',
    featured: false
  },
  {
    id: 5,
    name: 'Outback Champion',
    type: 'horse',
    location: 'Australia',
    price: 140, // 140 ASRD = $4,480 USD
    image: 'https://images.unsplash.com/photo-1500479773-e3c8ee3d9c2e?w=600&h=400&fit=crop',
    stats: { wins: 5, places: 4, pedigree: 'Australian Stock' },
    upcomingRace: 'Melbourne Cup',
    unclaimedWinnings: 0,
    description: 'Robust Australian horse known for endurance and speed.',
    featured: true
  },
  {
    id: 6,
    name: 'Sydney Apartment',
    type: 'real-estate',
    location: 'Australia',
    price: 190, // 190 ASRD = $6,080 USD
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop',
    stats: { value: '$6,080', yield: '7.0%' },
    projectedRent: '$35/month',
    unclaimedRent: 0,
    description: 'Modern apartment with city views in Sydney.',
    featured: false
  }
]

export const mockProposals = [
  {
    id: 1,
    title: 'Increase Treasury Allocation to Real Estate',
    description: 'Proposal to allocate 60% of treasury to real estate NFTs for higher rental yields.',
    votesFor: 1250000,
    votesAgainst: 375000,
    status: 'active'
  },
  {
    id: 2,
    title: 'Partner with Dubai Racing Club',
    description: 'Form a partnership to acquire exclusive racing rights for Dubai events.',
    votesFor: 1000000,
    votesAgainst: 250000,
    status: 'active'
  }
]

export const ownedAssets: Asset[] = [
  {
    id: 7,
    name: 'Golden Thunder',
    type: 'horse',
    location: 'UAE',
    price: 160,
    image: 'https://images.unsplash.com/photo-1599140780245-99dce06649c3?w=600&h=400&fit=crop',
    stats: { wins: 7, places: 1, pedigree: 'Golden Bloodline' },
    upcomingRace: 'Dubai Derby',
    unclaimedWinnings: 150,
    description: 'Champion racehorse with multiple international wins.'
  }
]

export const treasuryData = {
  balance: 468750,
  monthlyInflow: 78125,
  monthlyOutflow: 37500,
  assets: {
    realEstate: 65,
    horses: 35
  }
}

export const platformStats = {
  totalSupply: 4000000,
  circulatingSupply: 2500000,
  marketCap: 128000000,
  price: 32,
  totalAssets: 45,
  totalValueLocked: 95000000
}
