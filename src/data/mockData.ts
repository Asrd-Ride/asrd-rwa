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
  },
  {
    id: 3,
    name: 'Midnight Star',
    type: 'horse',
    location: 'UK',
    price: 1000,
    image: '/images/horse2.jpg',
    stats: { wins: 4, places: 1, pedigree: 'Royal Ascot pedigree' },
    upcomingRace: 'Ascot Gold Cup',
    description: 'Royal Ascot pedigree with exceptional speed and endurance.'
  },
  {
    id: 4,
    name: 'London Penthouse',
    type: 'real-estate',
    location: 'UK',
    price: 9000,
    image: '/images/villa2.jpg',
    stats: { value: '£3,000,000', yield: '5.8%' },
    projectedRent: '£14,500/month',
    description: 'Modern penthouse in the heart of London with luxury finishes.'
  },
  {
    id: 5,
    name: 'Outback Spirit',
    type: 'horse',
    location: 'Australia',
    price: 1100,
    image: '/images/horse3.jpg',
    stats: { wins: 3, places: 3, pedigree: 'Outback lineage' },
    upcomingRace: 'Melbourne Cup',
    description: 'Robust outback lineage known for exceptional performance in long distances.'
  },
  {
    id: 6,
    name: 'Sydney Harbour House',
    type: 'real-estate',
    location: 'Australia',
    price: 10000,
    image: '/images/villa3.jpg',
    stats: { value: 'AU$4,000,000', yield: '6.2%' },
    projectedRent: 'AU$20,667/month',
    description: 'Stunning harbor view property with exclusive access and modern design.'
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
  },
  {
    id: 2,
    title: 'Partner with Dubai Racing Club',
    description: 'Form a partnership to acquire exclusive racing rights for Dubai events.',
    votesFor: 3200,
    votesAgainst: 800,
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
  },
  {
    id: 8,
    name: 'Mountain Retreat',
    type: 'real-estate',
    location: 'Switzerland',
    price: 12000,
    image: '/images/villa2.jpg',
    stats: { value: 'CHF 5,000,000', yield: '4.5%' },
    projectedRent: 'CHF 18,750/month',
    unclaimedRent: 4500,
    description: 'Luxury alpine retreat with stunning mountain views and premium amenities.'
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
