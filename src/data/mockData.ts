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
}

export const mockAssets: Asset[] = [
  // Horse Racing Assets - Australia, UK, Dubai
  {
    id: 1,
    name: 'Sydney Speedster',
    type: 'horse',
    location: 'Sydney, Australia',
    price: 3125, // $100,000 USD
    image: 'https://placehold.co/600x400/4A5568/FFFFFF?text=Racehorse+1',
    stats: {
      wins: 12,
      places: 3,
      pedigree: 'Australian Thoroughbred',
      age: '5 years',
      trainer: 'Royal Randwick Stables',
      earnings: '$1.2M'
    },
    upcomingRace: 'Melbourne Cup 2024',
    unclaimedWinnings: 0,
    description: 'Elite Australian thoroughbred with multiple championship wins. Known for explosive speed and consistent performance in major derbies.',
    featured: true,
    roi: 19
  },
  {
    id: 2,
    name: 'Royal Ascot Champion',
    type: 'horse',
    location: 'Ascot, UK',
    price: 2500, // $80,000 USD
    image: 'https://placehold.co/600x400/2D3748/FFFFFF?text=Racehorse+2',
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
    name: 'Dubai Desert King',
    type: 'horse',
    location: 'Dubai, UAE',
    price: 4687.5, // $150,000 USD
    image: 'https://placehold.co/600x400/1A365D/FFFFFF?text=Arabian+Thoroughbred',
    stats: {
      wins: 15,
      places: 2,
      pedigree: 'Pure Arabian Bloodline',
      age: '4 years',
      trainer: 'Meydan Racing Stables',
      earnings: '$2.8M'
    },
    upcomingRace: 'Dubai World Cup 2024',
    unclaimedWinnings: 0,
    description: 'Champion Arabian thoroughbred with undefeated record in desert racing. Multiple Group 1 winner with exceptional speed and stamina.',
    featured: true,
    roi: 22
  },
  {
    id: 4,
    name: 'Melbourne Marvel',
    type: 'horse',
    location: 'Melbourne, Australia',
    price: 1875, // $60,000 USD
    image: 'https://placehold.co/600x400/2C5282/FFFFFF?text=Stock+Horse',
    stats: {
      wins: 6,
      places: 5,
      pedigree: 'Australian Stock Horse',
      age: '4 years',
      trainer: 'Flemington Stables',
      earnings: '$450K'
    },
    upcomingRace: 'Caulfield Cup 2024',
    unclaimedWinnings: 0,
    description: 'Powerful Australian stock horse known for exceptional endurance and speed. Perfect for long-distance racing and championship events.',
    featured: false,
    roi: 16
  },
  {
    id: 5,
    name: 'Golden Thunder',
    type: 'horse',
    location: 'Dubai, UAE',
    price: 4375, // $140,000 USD
    image: 'https://placehold.co/600x400/744210/FFFFFF?text=Golden+Bloodline',
    stats: {
      wins: 7,
      places: 1,
      pedigree: 'Golden Bloodline',
      age: '5 years',
      trainer: 'Jebel Ali Stables',
      earnings: '$950K'
    },
    upcomingRace: 'Dubai Derby',
    unclaimedWinnings: 150,
    description: 'Champion racehorse with multiple international wins and consistent performance. Known for exceptional speed and racing intelligence.',
    featured: false,
    roi: 20
  },

  // Real Estate Assets - Dubai, UK, Australia
  {
    id: 6,
    name: 'Dubai Marina Penthouse',
    type: 'real-estate',
    location: 'Dubai Marina, UAE',
    price: 9375, // $300,000 USD
    image: 'https://placehold.co/600x400/2C5282/FFFFFF?text=Dubai+Marina+View',
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
    id: 7,
    name: 'London Kensington Villa',
    type: 'real-estate',
    location: 'London, UK',
    price: 15625, // $500,000 USD
    image: 'https://placehold.co/600x400/4A5568/FFFFFF?text=London+Villa',
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
    id: 8,
    name: 'Sydney Harbour Mansion',
    type: 'real-estate',
    location: 'Sydney, Australia',
    price: 31250, // $1,000,000 USD
    image: 'https://placehold.co/600x400/1A365D/FFFFFF?text=Sydney+Opera+View',
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
    id: 9,
    name: 'Dubai Palm Residence',
    type: 'real-estate',
    location: 'Dubai, UAE',
    price: 62500, // $2,000,000 USD
    image: 'https://placehold.co/600x400/2D3748/FFFFFF?text=Palm+Jumeirah',
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
    description: 'Luxury modern estate on Palm Jumeirah. Features home theater, wine cellar, gym, and panoramic sea views with premium security.',
    featured: false,
    roi: 18
  },
  {
    id: 10,
    name: 'London Mayfair Penthouse',
    type: 'real-estate',
    location: 'London, UK',
    price: 156250, // $5,000,000 USD
    image: 'https://placehold.co/600x400/744210/FFFFFF?text=Mayfair+London',
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
    description: 'Luxury penthouse in exclusive Mayfair with panoramic views of London. Features private elevator, smart home system, and premium finishes.',
    featured: true,
    roi: 18
  }
]

// Sample owned assets for demo
export const ownedAssets: Asset[] = [
  {
    id: 5,
    name: 'Golden Thunder',
    type: 'horse',
    location: 'Dubai, UAE',
    price: 4375,
    image: 'https://placehold.co/600x400/744210/FFFFFF?text=Golden+Bloodline',
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
