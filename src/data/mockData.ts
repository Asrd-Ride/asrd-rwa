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
  featured: boolean;
  roi: number;
  category?: string;
  auctionEndTime?: number; // Timestamp for auction end
  currentBid?: number; // Current bid in ASRD
  minimumBid?: number; // Minimum bid in ASRD
}

export const mockAssets: Asset[] = [
  // Auction Assets
  {
    id: 10,
    name: 'Desert Lightning',
    type: 'horse',
    location: 'Dubai, UAE',
    price: 4687.5, // $150,000 USD
    image: 'https://images.unsplash.com/photo-1542729173-04a963a6306d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    stats: { 
      wins: 15, 
      places: 2, 
      pedigree: 'Pure Arabian Bloodline',
      age: '4 years',
      trainer: 'Mohammed Al Maktoum Stables',
      earnings: '$2.8M'
    },
    upcomingRace: 'Dubai World Cup 2024',
    unclaimedWinnings: 0,
    description: 'Champion Arabian thoroughbred with undefeated record in desert racing. Multiple Group 1 winner with exceptional speed and stamina. Owned by royal stables.',
    featured: true,
    roi: 22,
    category: 'Premium Racehorse',
    auctionEndTime: Date.now() + (48 * 60 * 60 * 1000), // 48 hours from now
    currentBid: 4250,
    minimumBid: 4500
  },
  {
    id: 11,
    name: 'Manhattan Skyline Penthouse',
    type: 'real-estate',
    location: 'New York, USA',
    price: 156250, // $5,000,000 USD
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    stats: { 
      value: '$5,000,000', 
      yield: '7.8%',
      bedrooms: 4,
      bathrooms: 5,
      squareFeet: 4500,
      yearBuilt: 2022
    },
    projectedRent: '$32,500/month',
    unclaimedRent: 0,
    description: 'Luxury penthouse in Manhattan with panoramic views of Central Park. Features private elevator, smart home system, and premium finishes throughout.',
    featured: true,
    roi: 18,
    category: 'Luxury Residential',
    auctionEndTime: Date.now() + (72 * 60 * 60 * 1000), // 72 hours from now
    currentBid: 140625,
    minimumBid: 150000
  },

  // Regular Assets - Horses ($25k - $150k)
  {
    id: 1,
    name: 'Thunder Sovereign',
    type: 'horse',
    location: 'Kentucky, USA',
    price: 3125, // $100,000 USD
    image: 'https://images.unsplash.com/photo-1599140780245-99dce06649c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    stats: { 
      wins: 12, 
      places: 3, 
      pedigree: 'American Thoroughbred',
      age: '5 years',
      trainer: 'Churchill Downs Stables',
      earnings: '$1.2M'
    },
    upcomingRace: 'Kentucky Derby 2024',
    unclaimedWinnings: 0,
    description: 'Elite American thoroughbred with multiple championship wins. Known for explosive speed and consistent performance in major derbies.',
    featured: true,
    roi: 19
  },
  {
    id: 2,
    name: 'Royal Ascot Champion',
    type: 'horse',
    location: 'Newmarket, UK',
    price: 2500, // $80,000 USD
    image: 'https://images.unsplash.com/photo-1513279922550-250c2129b13a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    stats: { 
      wins: 8, 
      places: 4, 
      pedigree: 'British Thoroughbred',
      age: '6 years',
      trainer: 'Royal Ascot Stables',
      earnings: '$850K'
    },
    upcomingRace: 'Royal Ascot 2024',
    unclaimedWinnings: 0,
    description: 'British thoroughbred with impeccable racing pedigree. Multiple Group 1 winner with consistent performance in European circuits.',
    featured: false,
    roi: 17
  },
  {
    id: 3,
    name: 'Australian Desert Storm',
    type: 'horse',
    location: 'Melbourne, Australia',
    price: 1875, // $60,000 USD
    image: 'https://images.unsplash.com/photo-1500479773-e3c8ee3d9c2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    stats: { 
      wins: 6, 
      places: 5, 
      pedigree: 'Australian Stock Horse',
      age: '4 years',
      trainer: 'Melbourne Racing Club',
      earnings: '$450K'
    },
    upcomingRace: 'Melbourne Cup 2024',
    unclaimedWinnings: 0,
    description: 'Powerful Australian stock horse known for exceptional endurance and speed. Perfect for long-distance racing and championship events.',
    featured: false,
    roi: 16
  },
  {
    id: 4,
    name: 'Kentucky Derby Star',
    type: 'horse',
    location: 'Kentucky, USA',
    price: 781.25, // $25,000 USD
    image: 'https://images.unsplash.com/photo-1599140780245-99dce06649c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    stats: { 
      wins: 4, 
      places: 3, 
      pedigree: 'American Quarter Horse',
      age: '3 years',
      trainer: 'Bluegrass Stables',
      earnings: '$180K'
    },
    upcomingRace: 'Kentucky Derby 2024',
    unclaimedWinnings: 0,
    description: 'Promising American quarter horse with explosive acceleration. Showing great potential in preliminary races with strong lineage.',
    featured: false,
    roi: 21
  },

  // Real Estate Assets ($300k - $5M)
  {
    id: 5,
    name: 'Marina Bay Penthouse',
    type: 'real-estate',
    location: 'Dubai Marina, UAE',
    price: 9375, // $300,000 USD
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    stats: { 
      value: '$300,000', 
      yield: '8.5%',
      bedrooms: 2,
      bathrooms: 2,
      squareFeet: 1800,
      yearBuilt: 2020
    },
    projectedRent: '$2,125/month',
    unclaimedRent: 0,
    description: 'Luxury penthouse with panoramic views of Dubai Marina. Features private infinity pool and premium amenities in prime location.',
    featured: true,
    roi: 15
  },
  {
    id: 6,
    name: 'Kensington Luxury Villa',
    type: 'real-estate',
    location: 'London, UK',
    price: 15625, // $500,000 USD
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    stats: { 
      value: '$500,000', 
      yield: '7.2%',
      bedrooms: 3,
      bathrooms: 3,
      squareFeet: 2200,
      yearBuilt: 2018
    },
    projectedRent: '$3,000/month',
    unclaimedRent: 0,
    description: 'Historic Victorian villa in prime Kensington location. Recently renovated with modern luxury amenities while preserving original features.',
    featured: false,
    roi: 14
  },
  {
    id: 7,
    name: 'Sydney Harbour Mansion',
    type: 'real-estate',
    location: 'Sydney, Australia',
    price: 31250, // $1,000,000 USD
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    stats: { 
      value: '$1,000,000', 
      yield: '8.8%',
      bedrooms: 4,
      bathrooms: 4,
      squareFeet: 3500,
      yearBuilt: 2019
    },
    projectedRent: '$7,333/month',
    unclaimedRent: 0,
    description: 'Stunning waterfront mansion with direct views of Sydney Opera House. Features private dock, infinity pool, and smart home automation.',
    featured: true,
    roi: 16
  },
  {
    id: 8,
    name: 'Beverly Hills Estate',
    type: 'real-estate',
    location: 'Los Angeles, USA',
    price: 62500, // $2,000,000 USD
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    stats: { 
      value: '$2,000,000', 
      yield: '9.2%',
      bedrooms: 5,
      bathrooms: 6,
      squareFeet: 6500,
      yearBuilt: 2021
    },
    projectedRent: '$15,333/month',
    unclaimedRent: 0,
    description: 'Luxury modern estate in exclusive Beverly Hills. Features home theater, wine cellar, gym, and panoramic city views with premium security.',
    featured: false,
    roi: 18
  },
  {
    id: 9,
    name: 'Golden Thunder',
    type: 'horse',
    location: 'Dubai, UAE',
    price: 4375, // $140,000 USD
    image: 'https://images.unsplash.com/photo-1542729173-04a963a6306d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    stats: { 
      wins: 7, 
      places: 1, 
      pedigree: 'Golden Bloodline',
      age: '5 years',
      trainer: 'Dubai Racing Club',
      earnings: '$950K'
    },
    upcomingRace: 'Dubai Derby',
    unclaimedWinnings: 150,
    description: 'Champion racehorse with multiple international wins and consistent performance. Known for exceptional speed and racing intelligence.',
    featured: false,
    roi: 20
  }
]

// Sample owned assets for demo
export const ownedAssets: Asset[] = [
  {
    id: 9,
    name: 'Golden Thunder',
    type: 'horse',
    location: 'Dubai, UAE',
    price: 4375,
    image: 'https://images.unsplash.com/photo-1542729173-04a963a6306d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    stats: { wins: 7, places: 1, pedigree: 'Golden Bloodline' },
    upcomingRace: 'Dubai Derby',
    unclaimedWinnings: 150,
    description: 'Champion racehorse with multiple international wins and consistent performance.',
    featured: false,
    roi: 19
  }
]

// Mock data for DAO proposals
export const mockProposals = [
  {
    id: 1,
    title: 'Platform Fee Reduction',
    description: 'Reduce platform fees from 2.5% to 1.5% to attract more investors',
    votesFor: 1250,
    votesAgainst: 450,
    endTime: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days from now
    userVoted: false,
    userSupport: null
  },
  {
    id: 2,
    title: 'New Asset Category: Fine Art',
    description: 'Introduce fine art as a new asset category for fractional ownership',
    votesFor: 890,
    votesAgainst: 310,
    endTime: Date.now() + (5 * 24 * 60 * 60 * 1000), // 5 days from now
    userVoted: true,
    userSupport: true
  }
]

// Treasury data
export const treasuryData = {
  balance: 4687500, // $150M USD
  monthlyInflow: 781250, // $25M USD
  monthlyOutflow: 375000, // $12M USD
  assets: {
    realEstate: 65,
    racehorses: 25,
    cash: 10
  }
}

// Platform statistics
export const platformStats = {
  totalSupply: 4000000,
  circulatingSupply: 2500000,
  marketCap: 128000000, // $128M USD
  price: 32,
  totalAssets: 45,
  totalValueLocked: 95000000 // $95M USD
}
