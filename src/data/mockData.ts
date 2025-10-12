// ULTIMATE ENHANCED MOCK DATA - SATISFIES ALL COMPONENTS
// Mock data for the application

export const mockProposals = [
  {
    id: 1,
    title: "Expand Dubai Real Estate Portfolio",
    description: "Acquire additional luxury properties in Palm Jumeirah to meet growing investor demand",
    votesFor: 1250,
    votesAgainst: 320,
    status: "active",
    endDate: "2025-02-15"
  },
  {
    id: 2,
    title: "Launch New Thoroughbred Fund",
    description: "Create specialized fund for champion racehorses with proven track records",
    votesFor: 890,
    votesAgainst: 210,
    status: "active",
    endDate: "2025-02-20"
  },
  {
    id: 3,
    title: "Upgrade Yacht Fleet Amenities",
    description: "Invest in premium upgrades for Mediterranean superyacht to increase charter rates",
    votesFor: 670,
    votesAgainst: 150,
    status: "active",
    endDate: "2025-02-25"
  }
];

export const mockAssets = [
  {
    id: 1,
    title: "Dubai Luxury Villa",
    type: "Real Estate",
    category: "Luxury Residential",
    location: "Palm Jumeirah, Dubai",
    value: 2500000,
    totalValue: 2500000,
    roi: "32.5%",
    expectedROI: "32.5%",
    timeline: "36 months",
    investmentHorizon: "36 months",
    minInvestment: 100,
    status: "Available",
    description: "Exclusive waterfront villa in the prestigious Palm Jumeirah. Features private beach access, infinity pool, and panoramic views of the Arabian Gulf. Managed by luxury hospitality experts with proven rental income history.",
    
    // Enhanced properties for ALL COMPONENTS
    badges: [
      { label: "Featured", color: "amber" },
      { label: "High Demand", color: "rose" },
      { label: "Verified", color: "emerald" }
    ],
    performance: "+15.2%",
    timeLeft: "45 days",
    investorCount: 234,
    sharesAvailable: 100,
    sharesSold: 78,
    enhanced: true,
    
    // NEW PROPERTIES FOR EnhancedAssetCard COMPATIBILITY
    investment: 50000,           // For EnhancedAssetCard & FluidDashboard
    shares: 2.0,                 // For EnhancedAssetCard & FluidDashboard
    image: "/assets/dubai-villa.jpg",
    progress: 78,
    riskLevel: "Medium",
    liquidity: "High",
    tags: ["Luxury", "High ROI", "Verified", "Rental Income"],
    currency: "USD"
  },
  {
    id: 2,
    title: "Champion Thoroughbred",
    type: "Thoroughbred",
    category: "Sports & Racing",
    location: "Kentucky, USA",
    value: 1800000,
    totalValue: 1800000,
    roi: "45.2%",
    expectedROI: "45.2%",
    timeline: "24 months",
    investmentHorizon: "24 months",
    minInvestment: 100,
    status: "Available",
    description: "Elite racehorse with championship pedigree and multiple stakes wins. Under professional training with top-tier racing schedule. Includes breeding rights and insurance coverage.",
    
    // Enhanced properties
    badges: [
      { label: "Exclusive", color: "violet" },
      { label: "Limited Time", color: "sapphire" }
    ],
    performance: "+8.7%",
    timeLeft: "21 days",
    investorCount: 189,
    sharesAvailable: 100,
    sharesSold: 65,
    enhanced: true,
    
    // NEW PROPERTIES FOR EnhancedAssetCard COMPATIBILITY
    investment: 35000,
    shares: 1.94,
    image: "/assets/thoroughbred.jpg",
    progress: 65,
    riskLevel: "High",
    liquidity: "Medium",
    tags: ["Sports", "Racing", "Exclusive", "Breeding Rights"],
    currency: "USD"
  },
  {
    id: 3,
    title: "Mediterranean Superyacht",
    type: "Marine Asset",
    category: "Luxury Marine",
    location: "French Riviera",
    value: 4200000,
    totalValue: 4200000,
    roi: "41.3%",
    expectedROI: "41.3%",
    timeline: "48 months",
    investmentHorizon: "48 months",
    minInvestment: 100,
    status: "Available",
    description: "Luxury 45-meter superyacht available for charter in the Mediterranean. Features helipad, cinema, spa, and professional crew. High-demand seasonal charter market with premium rates.",
    
    // Enhanced properties
    badges: [
      { label: "Top Performer", color: "cyan" },
      { label: "Verified", color: "emerald" },
      { label: "Featured", color: "amber" }
    ],
    performance: "+12.4%",
    timeLeft: "15 days",
    investorCount: 156,
    sharesAvailable: 100,
    sharesSold: 89,
    enhanced: true,
    
    // NEW PROPERTIES FOR EnhancedAssetCard COMPATIBILITY
    investment: 25000,
    shares: 0.6,
    image: "/assets/superyacht.jpg",
    progress: 89,
    riskLevel: "Medium",
    liquidity: "Low",
    tags: ["Luxury", "Marine", "Charter", "Seasonal"],
    currency: "USD"
  },
  {
    id: 4,
    title: "Private Jet Portfolio",
    type: "Aviation",
    category: "Business Aviation",
    location: "Global Operations",
    value: 3500000,
    totalValue: 3500000,
    roi: "38.7%",
    expectedROI: "38.7%",
    timeline: "60 months",
    investmentHorizon: "60 months",
    minInvestment: 100,
    status: "Available",
    description: "Diverse fleet of business jets available for charter and leaseback. Includes maintenance programs and certified operators. Serving corporate and private clients worldwide.",
    
    // Enhanced properties
    badges: [
      { label: "Blockchain Verified", color: "emerald" },
      { label: "High Demand", color: "rose" }
    ],
    performance: "+9.3%",
    timeLeft: "30 days",
    investorCount: 201,
    sharesAvailable: 100,
    sharesSold: 72,
    enhanced: true,
    
    // NEW PROPERTIES FOR EnhancedAssetCard COMPATIBILITY
    investment: 45000,
    shares: 1.29,
    image: "/assets/private-jet.jpg",
    progress: 72,
    riskLevel: "Medium",
    liquidity: "Medium",
    tags: ["Aviation", "Business", "Global", "Leaseback"],
    currency: "USD"
  },
  {
    id: 5,
    title: "Tech Startup Venture",
    type: "Venture Capital",
    category: "Technology",
    location: "Silicon Valley",
    value: 1200000,
    totalValue: 1200000,
    roi: "52.1%",
    expectedROI: "52.1%",
    timeline: "72 months",
    investmentHorizon: "72 months",
    minInvestment: 100,
    status: "Available",
    description: "Promising AI technology startup with patented algorithms and enterprise clients. Strong growth trajectory with recurring revenue model and expansion plans.",
    
    // Enhanced properties
    badges: [
      { label: "High Growth", color: "rose" },
      { label: "Exclusive Access", color: "violet" },
      { label: "Verified", color: "emerald" }
    ],
    performance: "+18.6%",
    timeLeft: "7 days",
    investorCount: 178,
    sharesAvailable: 100,
    sharesSold: 81,
    enhanced: true,
    
    // NEW PROPERTIES FOR EnhancedAssetCard COMPATIBILITY
    investment: 20000,
    shares: 1.67,
    image: "/assets/tech-startup.jpg",
    progress: 81,
    riskLevel: "High",
    liquidity: "Low",
    tags: ["Technology", "AI", "Startup", "High Growth"],
    currency: "USD"
  },
  {
    id: 6,
    title: "Luxury Watch Collection",
    type: "Luxury Goods",
    category: "Collectibles",
    location: "Geneva, Switzerland",
    value: 950000,
    totalValue: 950000,
    roi: "28.9%",
    expectedROI: "28.9%",
    timeline: "24 months",
    investmentHorizon: "24 months",
    minInvestment: 100,
    status: "Available",
    description: "Curated collection of rare and vintage luxury timepieces from top Swiss manufacturers. Includes limited editions and historically significant pieces with appreciation potential.",
    
    // Enhanced properties
    badges: [
      { label: "Limited Edition", color: "sapphire" },
      { label: "Verified", color: "emerald" }
    ],
    performance: "+6.8%",
    timeLeft: "14 days",
    investorCount: 145,
    sharesAvailable: 100,
    sharesSold: 67,
    enhanced: true,
    
    // NEW PROPERTIES FOR EnhancedAssetCard COMPATIBILITY
    investment: 15000,
    shares: 1.58,
    image: "/assets/luxury-watches.jpg",
    progress: 67,
    riskLevel: "Low",
    liquidity: "Medium",
    tags: ["Luxury", "Collectibles", "Watches", "Limited"],
    currency: "USD"
  },
  {
    id: 7,
    title: "Commercial Office Tower",
    type: "Real Estate",
    category: "Commercial",
    location: "Manhattan, NYC",
    value: 8500000,
    totalValue: 8500000,
    roi: "22.4%",
    expectedROI: "22.4%",
    timeline: "120 months",
    investmentHorizon: "120 months",
    minInvestment: 100,
    status: "Available",
    description: "Prime commercial real estate in Manhattan with AAA-rated tenants and long-term leases. Stable income generation with annual appreciation.",
    
    // Enhanced properties
    badges: [
      { label: "Stable Income", color: "emerald" },
      { label: "Prime Location", color: "amber" }
    ],
    performance: "+4.2%",
    timeLeft: "60 days",
    investorCount: 312,
    sharesAvailable: 100,
    sharesSold: 92,
    enhanced: true,
    
    // NEW PROPERTIES FOR EnhancedAssetCard COMPATIBILITY
    investment: 75000,
    shares: 0.88,
    image: "/assets/office-tower.jpg",
    progress: 92,
    riskLevel: "Low",
    liquidity: "High",
    tags: ["Commercial", "Real Estate", "Stable", "Prime"],
    currency: "USD"
  },
  {
    id: 8,
    title: "Fine Art Collection",
    type: "Fine Art",
    category: "Art & Collectibles",
    location: "London, UK",
    value: 2800000,
    totalValue: 2800000,
    roi: "35.8%",
    expectedROI: "35.8%",
    timeline: "48 months",
    investmentHorizon: "48 months",
    minInvestment: 100,
    status: "Available",
    description: "Curated collection of contemporary art from emerging and established artists. Includes pieces with proven auction history and museum exhibitions.",
    
    // Enhanced properties
    badges: [
      { label: "Cultural Asset", color: "violet" },
      { label: "Appreciating", color: "rose" },
      { label: "Verified", color: "emerald" }
    ],
    performance: "+11.7%",
    timeLeft: "25 days",
    investorCount: 167,
    sharesAvailable: 100,
    sharesSold: 58,
    enhanced: true,
    
    // NEW PROPERTIES FOR EnhancedAssetCard COMPATIBILITY
    investment: 30000,
    shares: 1.07,
    image: "/assets/fine-art.jpg",
    progress: 58,
    riskLevel: "Medium",
    liquidity: "Low",
    tags: ["Art", "Collectibles", "Cultural", "Appreciating"],
    currency: "USD"
  }
];

export const ownedAssets = [
  {
    id: 1,
    title: "Dubai Luxury Villa",
    type: "Real Estate",
    category: "Luxury Residential",
    location: "Palm Jumeirah, Dubai",
    value: 2500000,
    totalValue: 2500000,
    roi: "32.5%",
    expectedROI: "32.5%",
    timeline: "36 months",
    investmentHorizon: "36 months",
    investment: 50000,
    shares: 2,
    status: "Active",
    nextPayout: "2025-03-15",
    payoutAmount: 4250,
    description: "Your investment in this premium Dubai property generates consistent rental income from luxury tourism and corporate rentals.",
    
    // Enhanced properties
    badges: [
      { label: "Performing", color: "emerald" },
      { label: "Monthly Payout", color: "cyan" }
    ],
    performance: "+15.2%",
    investorCount: 234,
    enhanced: true,
    
    // Additional properties for consistency
    minInvestment: 100,
    sharesAvailable: 100,
    sharesSold: 78,
    timeLeft: "45 days",
    image: "/assets/dubai-villa.jpg",
    progress: 78,
    riskLevel: "Medium",
    liquidity: "High",
    tags: ["Luxury", "High ROI", "Verified", "Rental Income"],
    currency: "USD"
  },
  {
    id: 2,
    title: "Champion Thoroughbred",
    type: "Thoroughbred",
    category: "Sports & Racing",
    location: "Kentucky, USA",
    value: 1800000,
    totalValue: 1800000,
    roi: "45.2%",
    expectedROI: "45.2%",
    timeline: "24 months",
    investmentHorizon: "24 months",
    investment: 35000,
    shares: 1.94,
    status: "Active",
    nextPayout: "2025-04-20",
    payoutAmount: 8500,
    description: "Ownership share in champion racehorse with upcoming major racing events and breeding opportunities.",
    
    // Enhanced properties
    badges: [
      { label: "High Performer", color: "amber" },
      { label: "Seasonal", color: "sapphire" }
    ],
    performance: "+28.7%",
    investorCount: 189,
    enhanced: true,
    
    // Additional properties for consistency
    minInvestment: 100,
    sharesAvailable: 100,
    sharesSold: 65,
    timeLeft: "21 days",
    image: "/assets/thoroughbred.jpg",
    progress: 65,
    riskLevel: "High",
    liquidity: "Medium",
    tags: ["Sports", "Racing", "Exclusive", "Breeding Rights"],
    currency: "USD"
  },
  {
    id: 3,
    title: "Mediterranean Superyacht",
    type: "Marine Asset",
    category: "Luxury Marine",
    location: "French Riviera",
    value: 4200000,
    totalValue: 4200000,
    roi: "41.3%",
    expectedROI: "41.3%",
    timeline: "48 months",
    investmentHorizon: "48 months",
    investment: 25000,
    shares: 0.6,
    status: "Active",
    nextPayout: "2025-02-25",
    payoutAmount: 3200,
    description: "Partial ownership in luxury superyacht generating revenue from high-end charter services in premium Mediterranean locations.",
    
    // Enhanced properties
    badges: [
      { label: "Seasonal", color: "sapphire" },
      { label: "Performing", color: "emerald" }
    ],
    performance: "+12.4%",
    investorCount: 156,
    enhanced: true,
    
    // Additional properties for consistency
    minInvestment: 100,
    sharesAvailable: 100,
    sharesSold: 89,
    timeLeft: "15 days",
    image: "/assets/superyacht.jpg",
    progress: 89,
    riskLevel: "Medium",
    liquidity: "Low",
    tags: ["Luxury", "Marine", "Charter", "Seasonal"],
    currency: "USD"
  }
];

export const platformStats = {
  totalValue: 25420000,
  totalInvestors: 3470,
  averageRoi: "38.7%",
  activeAssets: 36,
  monthlyReturns: 625000,
  totalReturns: 4850000,
  totalAssets: 52
};

// Additional enhanced data for new sections
export const testimonialData = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Real Estate Investor",
    content: "I never thought I could own a piece of a luxury Dubai property. With just $500, I'm now earning rental income from assets I could only dream of before.",
    investment: "$500",
    returns: "28% ROI",
    avatar: "SC",
    category: "Real Estate",
    verified: true,
    duration: "6 months"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Tech Professional",
    content: "The fractional ownership model changed everything for me. I've diversified across thoroughbreds and real estate with minimal capital.",
    investment: "$1,200",
    returns: "35% ROI",
    avatar: "MR",
    category: "Diversified Portfolio",
    verified: true,
    duration: "1 year"
  },
  {
    id: 3,
    name: "Jennifer Kim",
    role: "Teacher & Investor",
    content: "As an educator, I never had access to these opportunities. Now I'm building real wealth alongside my teaching career.",
    investment: "$250",
    returns: "22% ROI",
    avatar: "JK",
    category: "Alternative Assets",
    verified: true,
    duration: "4 months"
  }
];

export const howItWorksData = [
  {
    step: 1,
    title: "Explore Assets",
    description: "Browse curated real-world assets from commercial real estate to fine art",
    icon: "Search"
  },
  {
    step: 2,
    title: "Invest Fractionally",
    description: "Start with as little as $100 and own a piece of elite assets",
    icon: "Wallet"
  },
  {
    step: 3,
    title: "Earn Returns",
    description: "Receive regular dividends and benefit from asset appreciation",
    icon: "TrendingUp"
  },
  {
    step: 4,
    title: "Trade Securely",
    description: "Buy and sell your fractions on our secure blockchain platform",
    icon: "RefreshCw"
  }
];