// Mock data for the application

export const mockProposals = [
  {
    id: 1,
    title: "Expand Dubai Real Estate Portfolio",
    description: "Acquire additional luxury properties in Palm Jumeirah to meet growing investor demand",
    votesFor: 1250,
    votesAgainst: 320,
    status: "active",
    endDate: "2024-02-15"
  },
  {
    id: 2,
    title: "Launch New Thoroughbred Fund",
    description: "Create specialized fund for champion racehorses with proven track records",
    votesFor: 890,
    votesAgainst: 210,
    status: "active",
    endDate: "2024-02-20"
  },
  {
    id: 3,
    title: "Upgrade Yacht Fleet Amenities",
    description: "Invest in premium upgrades for Mediterranean superyacht to increase charter rates",
    votesFor: 670,
    votesAgainst: 150,
    status: "active",
    endDate: "2024-02-25"
  }
];

export const mockAssets = [
  {
    id: 1,
    title: "Dubai Luxury Villa",
    type: "Real Estate",
    location: "Palm Jumeirah, Dubai",
    value: 2500000,
    roi: "32.5%",
    timeline: "36 months",
    minInvestment: 100,
    status: "Available",
    description: "Exclusive waterfront villa in the prestigious Palm Jumeirah. Features private beach access, infinity pool, and panoramic views of the Arabian Gulf. Managed by luxury hospitality experts with proven rental income history."
  },
  {
    id: 2,
    title: "Champion Thoroughbred",
    type: "Thoroughbred",
    location: "Kentucky, USA",
    value: 1800000,
    roi: "45.2%",
    timeline: "24 months",
    minInvestment: 100,
    status: "Available",
    description: "Elite racehorse with championship pedigree and multiple stakes wins. Under professional training with top-tier racing schedule. Includes breeding rights and insurance coverage."
  },
  {
    id: 3,
    title: "Mediterranean Superyacht",
    type: "Marine Asset",
    location: "French Riviera",
    value: 4200000,
    roi: "41.3%",
    timeline: "48 months",
    minInvestment: 100,
    status: "Available",
    description: "Luxury 45-meter superyacht available for charter in the Mediterranean. Features helipad, cinema, spa, and professional crew. High-demand seasonal charter market with premium rates."
  },
  {
    id: 4,
    title: "Private Jet Portfolio",
    type: "Aviation",
    location: "Global Operations",
    value: 3500000,
    roi: "38.7%",
    timeline: "60 months",
    minInvestment: 100,
    status: "Available",
    description: "Diverse fleet of business jets available for charter and leaseback. Includes maintenance programs and certified operators. Serving corporate and private clients worldwide."
  },
  {
    id: 5,
    title: "Tech Startup Venture",
    type: "Venture Capital",
    location: "Silicon Valley",
    value: 1200000,
    roi: "52.1%",
    timeline: "72 months",
    minInvestment: 100,
    status: "Available",
    description: "Promising AI technology startup with patented algorithms and enterprise clients. Strong growth trajectory with recurring revenue model and expansion plans."
  },
  {
    id: 6,
    title: "Luxury Watch Collection",
    type: "Luxury Goods",
    location: "Geneva, Switzerland",
    value: 950000,
    roi: "28.9%",
    timeline: "24 months",
    minInvestment: 100,
    status: "Available",
    description: "Curated collection of rare and vintage luxury timepieces from top Swiss manufacturers. Includes limited editions and historically significant pieces with appreciation potential."
  }
];

export const ownedAssets = [
  {
    id: 1,
    title: "Dubai Luxury Villa",
    type: "Real Estate",
    location: "Palm Jumeirah, Dubai",
    value: 2500000,
    roi: "32.5%",
    timeline: "36 months",
    investment: 50000,
    shares: 2,
    status: "Active",
    nextPayout: "2024-02-15",
    payoutAmount: 4250,
    description: "Your investment in this premium Dubai property generates consistent rental income from luxury tourism and corporate rentals."
  },
  {
    id: 2,
    title: "Champion Thoroughbred",
    type: "Thoroughbred",
    location: "Kentucky, USA",
    value: 1800000,
    roi: "45.2%",
    timeline: "24 months",
    investment: 35000,
    shares: 1.94,
    status: "Active",
    nextPayout: "2024-02-20",
    payoutAmount: 8500,
    description: "Ownership share in champion racehorse with upcoming major racing events and breeding opportunities."
  },
  {
    id: 3,
    title: "Mediterranean Superyacht",
    type: "Marine Asset",
    location: "French Riviera",
    value: 4200000,
    roi: "41.3%",
    timeline: "48 months",
    investment: 25000,
    shares: 0.6,
    status: "Active",
    nextPayout: "2024-02-25",
    payoutAmount: 3200,
    description: "Partial ownership in luxury superyacht generating revenue from high-end charter services in premium Mediterranean locations."
  }
];

export const platformStats = {
  totalValue: 15420000,
  totalInvestors: 2470,
  averageRoi: "38.7%",
  activeAssets: 28,
  monthlyReturns: 425000,
  totalReturns: 3850000,
  totalAssets: 42
};
