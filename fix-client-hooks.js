const fs = require('fs');

// This approach uses a different pattern - we'll use a client wrapper
// or move the problematic hooks inside useEffect

const componentsToFix = [
  'src/components/sections/FluidDashboard.tsx',
  'src/components/sections/FluidMarketplace.tsx',
  'src/components/sections/OurJourneySection.tsx', 
  'src/components/sections/FeaturedAssetsSection.tsx',
  'src/components/ui/AssetDetailsModal.tsx'
];

componentsToFix.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // For now, let's just remove the mounted state logic since it's not working
  // We'll use a different approach
  content = content.replace(/const \[mounted, setMounted\] = useState\(false\);\s*useEffect\(\(\) => {\s*setMounted\(true\);\s*}, \[\]\);\s*if \(!mounted\) {\s*return[^}]+};?\s*/g, '');
  
  fs.writeFileSync(filePath, content);
  console.log(`Cleaned ${filePath}`);
});

console.log('Now we need to use a different approach. Let\\'s check if we can use dynamic imports at the page level instead.');
