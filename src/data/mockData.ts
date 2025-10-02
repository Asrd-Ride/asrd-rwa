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
  roi?: number;
}

// Fixed image URLs - using reliable Unsplash sources
export const mockAssets: Asset[] = [
  {
    id: 1,
    name: 'Thunder Sovereign',
    type: 'horse',
    location: 'Dubai, UAE',
    price: 180, // 180 ASRD = $5,760 USD
    image: 'https://images.unsplash.com/photo-1542729173-04a963a6306d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    stats: { wins: 12, places: 3, pedigree: 'Arabian Champion Bloodline' },
    upcomingRace: 'Dubai World Cup 2024',
    unclaimedWinnings: 0,
    description: 'Elite Arabian thoroughbred with multiple international championship wins. Known for exceptional speed and endurance in desert conditions.',
    featured: true,
    roi: 22
  },
  {
    id: 2,
    name: 'Marina Bay Penthouse',
    type: 'real-estate',
    location: 'Dubai Marina, UAE',
    price: 250, // 250 ASRD = $8,000 USD
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    stats: { value: '$8,000', yield: '8.5%' },
    projectedRent: '$57/month',
    unclaimedRent: 0,
    description: 'Luxury penthouse with panoramic views of Dubai Marina. Features private infinity pool and premium amenities.',
    featured: true,
    roi: 9
  },
  {
    id: 3,
    name: 'Royal Ascot Champion',
    type: 'horse',
    location: 'Newmarket, UK',
    price: 160, // 160 ASRD = $5,120 USD
    image: 'https://images.unsplash.com/photo-1513279922550-250c2129b13a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    stats: { wins: 8, places: 4, pedigree: 'British Thoroughbred' },
    upcomingRace: 'Royal Ascot 2024',
    unclaimedWinnings: 0,
    description: 'British thoroughbred with impeccable racing pedigree. Multiple Group 1 winner with consistent performance.',
    featured: false,
    roi: 18
  },
  {
    id: 4,
    name: 'Kensington Luxury Villa',
    type: 'real-estate',
    location: 'London, UK',
    price: 220, // 220 ASRD = $7,040 USD
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    stats: { value: '$7,040', yield: '7.2%' },
    projectedRent: '$42/month',
    unclaimedRent: 0,
    description: 'Historic Victorian villa in prime Kensington location. Recently renovated with modern luxury amenities.',
    featured: false,
    roi: 8
  },
  {
    id: 5,
    name: 'Australian Desert Storm',
    type: 'horse',
    location: 'Melbourne, Australia',
    price: 140, // 140 ASRD = $4,480 USD
    image: 'https://images.unsplash.com/photo-1500479773-e3c8ee3d9c2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    stats: { wins: 6, places: 5, pedigree: 'Australian Stock Horse' },
    upcomingRace: 'Melbourne Cup 2024',
    unclaimedWinnings: 0,
    description: 'Powerful Australian stock horse known for exceptional endurance and speed. Perfect for long-distance racing.',
    featured: true,
    roi: 20
  },
  {
    id: 6,
    name: 'Sydney Harbour Mansion',
    type: 'real-estate',
    location: 'Sydney, Australia',
    price: 280, // 280 ASRD = $8,960 USD
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    stats: { value: '$8,960', yield: '8.8%' },
    projectedRent: '$66/month',
    unclaimedRent: 0,
    description: 'Stunning waterfront mansion with direct views of Sydney Opera House. Features private dock and infinity pool.',
    featured: false,
    roi: 10
  },
  {
    id: 7,
    name: 'Kentucky Derby Star',
    type: 'horse',
    location: 'Kentucky, USA',
    price: 200, // 200 ASRD = $6,400 USD
    image: 'https://images.unsplash.com/photo-1599140780245-99dce06649c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    stats: { wins: 10, places: 2, pedigree: 'American Quarter Horse' },
    upcomingRace: 'Kentucky Derby 2024',
    unclaimedWinnings: 0,
    description: 'American quarter horse with explosive acceleration. Multiple derby winner with championship lineage.',
    featured: true,
    roi: 25
  },
  {
    id: 8,
    name: 'Beverly Hills Estate',
    type: 'real-estate',
    location: 'Los Angeles, USA',
    price: 320, // 320 ASRD = $10,240 USD
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    stats: { value: '$10,240', yield: '9.2%' },
    projectedRent: '$78/month',
    unclaimedRent: 0,
    description: 'Luxury modern estate in exclusive Beverly Hills. Features home theater, wine cellar, and panoramic city views.',
    featured: true,
    roi: 11
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
    id: 9,
    name: 'Golden Thunder',
    type: 'horse',
    location: 'Dubai, UAE',
    price: 160,
    image: 'https://images.unsplash.com/photo-1542729173-04a963a6306d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    stats: { wins: 7, places: 1, pedigree: 'Golden Bloodline' },
    upcomingRace: 'Dubai Derby',
    unclaimedWinnings: 150,
    description: 'Champion racehorse with multiple international wins and consistent performance.',
    roi: 19
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
