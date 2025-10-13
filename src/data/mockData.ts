// ULTIMATE INVESTOR EXPERIENCE MOCK DATA
// Australia/UK/Dubai Focus | Real Estate & Horse Racing Only | 22-46% Returns
import { Asset, OwnedAsset, PlatformStats } from '@/types';

// ==================== PREMIUM ASSET DATA ====================
export const mockAssets: Asset[] = [
  // 🏢 DUBAI REAL ESTATE - Premium Waterfront
  {
    id: 1,
    name: "Dubai Marina Sky Towers",
    title: "Luxury Waterfront Apartments with Marina Views",
    description: "Exclusive collection of 3 luxury towers in the heart of Dubai Marina featuring 1-4 bedroom apartments with private balconies overlooking the marina. Each unit includes premium German kitchen appliances, Italian marble flooring, and smart home automation. The development features a state-of-the-art gym, infinity pool, private beach access, and 24/7 concierge services. Located within walking distance of Dubai Marina Mall and JBR Beach.",
    type: "real-estate",
    category: "Luxury Residential",
    location: { country: "Dubai", city: "Dubai Marina", address: "Marina Walk, Dubai Marina", coordinates: { lat: 25.0801, lng: 55.1422 } },
    currency: "AED",
    minimumInvestment: 100000,
    minInvestment: 100000,
    totalFunding: 75000000,
    fundedAmount: 68250000,
    fundingProgress: 91,
    projectedROI: 34,
    expectedReturn: 34,
    roi: 34,
    term: 48,
    riskLevel: "Medium",
    investorCount: 228,
    rating: 4.9,
    images: [
      "/assets/dubai-marina-1.jpg",
      "/assets/dubai-marina-2.jpg",
      "/assets/dubai-marina-3.jpg"
    ],
    image: "/assets/dubai-marina-1.jpg",
    features: [
      "Panoramic Marina Views",
      "Private Beach Access",
      "Infinity Pool",
      "Smart Home Automation",
      "24/7 Concierge",
      "German Appliances",
      "Italian Marble Flooring",
      "Underground Parking"
    ],
    tags: ["Luxury", "Waterfront", "High-Yield", "Prime Location"],
    badges: [
      { label: "Premium", color: "amber" },
      { label: "92% Occupancy", color: "emerald" },
      { label: "Fast Filling", color: "blue" }
    ],
    financials: {
      currentValuation: 78500000,
      totalInvested: 68250000,
      totalReturns: 10250000,
      annualizedReturn: 31.2,
      currentROI: 34,
      projectedROI: 34,
      volatility: 12.8
    },
    details: { bedrooms: 3, bathrooms: 3, area: 1850, units: 45, yearBuilt: 2023 },
    _3dConfig: { particles: 35, animations: 'premium', shadows: true }
  },
  // 🏛️ UK REAL ESTATE - Historic Luxury
  {
    id: 2,
    name: "Mayfair Heritage Collection",
    title: "Grade II Listed Georgian Townhouses",
    description: "Exquisite collection of 8 Grade II listed Georgian townhouses in Mayfair's most prestigious square. Meticulously restored to preserve original features including marble fireplaces, cornicing, and sash windows while incorporating modern luxury amenities. Each property features private gardens, wine cellars, and secure underground parking. Current tenants include diplomatic missions and ultra-high-net-worth individuals with average lease terms of 5+ years.",
    type: "real-estate",
    category: "Historic Luxury",
    location: { country: "United Kingdom", city: "London", address: "Grosvenor Square, Mayfair", coordinates: { lat: 51.5136, lng: -0.1503 } },
    currency: "GBP",
    minimumInvestment: 150000,
    minInvestment: 150000,
    totalFunding: 45000000,
    fundedAmount: 42750000,
    fundingProgress: 95,
    projectedROI: 28,
    expectedReturn: 28,
    roi: 28,
    term: 60,
    riskLevel: "Low",
    investorCount: 156,
    rating: 4.8,
    images: [
      "/assets/mayfair-1.jpg",
      "/assets/mayfair-2.jpg",
      "/assets/mayfair-3.jpg"
    ],
    image: "/assets/mayfair-1.jpg",
    features: [
      "Grade II Listed",
      "Private Gardens",
      "Original Features",
      "Wine Cellars",
      "Secure Parking",
      "Diplomatic Tenants",
      "5+ Year Leases",
      "Heritage Restoration"
    ],
    tags: ["Historic", "Ultra-Luxury", "Stable", "Prime"],
    badges: [
      { label: "Historic", color: "purple" },
      { label: "100% Occupied", color: "emerald" },
      { label: "Low Risk", color: "blue" }
    ],
    financials: {
      currentValuation: 47250000,
      totalInvested: 42750000,
      totalReturns: 4500000,
      annualizedReturn: 25.4,
      currentROI: 28,
      projectedROI: 28,
      volatility: 8.2
    },
    details: { bedrooms: 6, bathrooms: 5, area: 4200, units: 8, yearBuilt: 1785 },
    _3dConfig: { particles: 30, animations: 'premium', shadows: true }
  },
  // 🏢 AUSTRALIA REAL ESTATE - Premium Commercial
  {
    id: 3,
    name: "Collins Street Premium Tower",
    title: "A-Grade CBD Office Development",
    description: "New 45-story premium office tower in Melbourne's financial district featuring 6-star NABERS energy rating and WELL Platinum certification. Anchor tenants include two major international banks and a top-tier law firm with weighted average lease expiry of 8.2 years. Features include end-of-trip facilities, premium dining precinct, advanced building management systems, and direct access to Parliament Station.",
    type: "real-estate",
    category: "Premium Commercial",
    location: { country: "Australia", city: "Melbourne", address: "525 Collins Street, CBD", coordinates: { lat: -37.8185, lng: 144.9537 } },
    currency: "AUD",
    minimumInvestment: 75000,
    minInvestment: 75000,
    totalFunding: 85000000,
    fundedAmount: 76500000,
    fundingProgress: 90,
    projectedROI: 26,
    expectedReturn: 26,
    roi: 26,
    term: 84,
    riskLevel: "Low",
    investorCount: 342,
    rating: 4.7,
    images: [
      "/assets/collins-street-1.jpg",
      "/assets/collins-street-2.jpg",
      "/assets/collins-street-3.jpg"
    ],
    image: "/assets/collins-street-1.jpg",
    features: [
      "6-Star NABERS Rating",
      "WELL Platinum Certified",
      "Anchor Tenants Secured",
      "8.2 Year WALE",
      "End-of-Trip Facilities",
      "Direct Station Access",
      "Premium Dining",
      "Advanced BMS"
    ],
    tags: ["Commercial", "Sustainable", "Prime CBD", "Long Lease"],
    badges: [
      { label: "Sustainable", color: "emerald" },
      { label: "96% Leased", color: "blue" },
      { label: "Low Volatility", color: "green" }
    ],
    financials: {
      currentValuation: 89250000,
      totalInvested: 76500000,
      totalReturns: 12750000,
      annualizedReturn: 23.8,
      currentROI: 26,
      projectedROI: 26,
      volatility: 7.5
    },
    details: { floors: 45, area: 65000, parking: 285, yearBuilt: 2025 },
    _3dConfig: { particles: 25, animations: 'enhanced', shadows: true }
  }
  // Add the rest of your assets (Horse Racing, Burj Vista, etc.) similarly
];

// ==================== OWNED ASSETS ====================
export const ownedAssets: OwnedAsset[] = [
  {
    id: 1,
    asset: mockAssets[0],
    investedAmount: 750000,
    currentValue: 1020000,
    purchaseDate: "2025-01-15",
    returns: 270000,
    roi: 36,
    shares: 15,
    value: 1020000,
    payoutAmount: 8500,
    payoutFrequency: "monthly",
    nextPayout: "2025-12-01",
    status: "active",
    badges: [
      { label: "Active", color: "emerald" },
      { label: "Monthly Income", color: "blue" }
    ]
  }
];

// ==================== PLATFORM STATS ====================
export const platformStats: PlatformStats = {
  totalUsers: 4850,
  activeInvestors: 3247,
  totalInvestments: 485000000,
  totalReturns: 112000000,
  platformGrowth: 42.8,
  averageROI: 32.6
};

// ==================== INVESTOR EDUCATION ====================
export const treasuryData = {
  totalValue: 485000000,
  availableFunds: 85000000,
  allocatedFunds: 400000000,
  monthlyIncome: 3850000,
  monthlyExpenses: 1250000,
  netCashFlow: 2600000,
  assets: [
    { name: 'Premium Real Estate', value: 285000000, percentage: 58.8, color: 'emerald' },
    { name: 'Elite Horse Racing', value: 125000000, percentage: 25.8, color: 'amber' },
    { name: 'Commercial Properties', value: 75000000, percentage: 15.4, color: 'blue' }
  ],
  growth: { monthly: "+12.4%", quarterly: "+38.2%", yearly: "+156.7%" },
  performance: { currentMonth: "+12.4%", lastMonth: "+10.8%", ytd: "+86.3%" }
};

// ==================== PROPOSALS ====================
export const mockProposals = [
  {
    id: 1,
    title: "Dubai Palm Jumeirah Expansion",
    description: "Acquire 8 luxury villas on Palm Jumeirah to capitalize on 45% annual tourism growth and premium rental demand averaging 32% ROI.",
    votesFor: 2842,
    votesAgainst: 428,
    status: "active",
    endDate: "2025-03-15",
    type: "Real Estate",
    impact: "High",
    budget: "$42M",
    timeline: "8 months",
    expectedROI: 32,
    riskLevel: "Medium"
  },
  {
    id: 2,
    title: "Royal Ascot Breeding Program",
    description: "Establish new thoroughbred breeding program focused on Royal Ascot champions with John Gosden training and Newmarket facilities.",
    votesFor: 2156,
    votesAgainst: 289,
    status: "approved",
    endDate: "2025-12-30",
    type: "Horse Racing",
    impact: "High",
    budget: "$18M",
    timeline: "4 months",
    expectedROI: 45,
    riskLevel: "High"
  }
];

// ==================== HOW IT WORKS ====================
export const howItWorksData = [
  { step: 1, title: "Discover Premium Opportunities", description: "Browse curated real estate and horse racing investments in Australia, UK, and Dubai with detailed analytics and 3D visualizations.", icon: "search", duration: "Instant" },
  { step: 2, title: "Deep Due Diligence", description: "Access comprehensive investment memos, financial models, and live 3D property tours before making investment decisions.", icon: "shield", duration: "1-3 Days" },
  { step: 3, title: "Invest with Confidence", description: "Execute investments through our secure platform with blockchain verification and instant settlement.", icon: "dollar", duration: "Instant" },
  { step: 4, title: "Track & Optimize", description: "Monitor performance in real-time with advanced dashboards and receive regular income distributions.", icon: "chart", duration: "Ongoing" }
];

// ==================== USER PORTFOLIO ====================
export const userPortfolioData = {
  totalValue: 1020000,
  monthlyIncome: 8500,
  activeInvestments: 3,
  totalReturns: 270000,
  averageROI: 36,
  assets: [
    { id: 1, name: "Dubai Marina Sky Towers", value: 1020000, shares: 15, monthlyIncome: 8500, roi: 36 }
  ]
};

// ==================== PLATFORM FEATURES ====================
export const platformFeatures = [
  { title: "Immersive 3D Property Tours", description: "Walk through every investment property with photorealistic 3D tours and virtual reality compatibility", icon: "cube" },
  { title: "Blockchain Verification", description: "Every transaction and asset ownership recorded on immutable blockchain for maximum security", icon: "shield" },
  { title: "Advanced Analytics", description: "Real-time performance tracking, ROI forecasting, and comprehensive investment analytics", icon: "chart" },
  { title: "Universal Experience", description: "Seamless investment experience across all devices with adaptive performance optimization", icon: "devices" }
];
