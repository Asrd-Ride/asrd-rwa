const fs = require('fs');

const componentsToFix = [
  'src/components/sections/FluidDashboard.tsx',
  'src/components/sections/FluidMarketplace.tsx',
  'src/components/sections/OurJourneySection.tsx',
  'src/components/sections/FeaturedAssetsSection.tsx',
  'src/components/ui/AssetDetailsModal.tsx'
];

componentsToFix.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Find the function start line
  let functionStart = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('export default function') && functionStart === -1) {
      functionStart = i;
      break;
    }
  }
  
  if (functionStart === -1) return;
  
  // Find the opening brace line
  let openingBrace = -1;
  for (let i = functionStart; i < lines.length; i++) {
    if (lines[i].includes('{')) {
      openingBrace = i;
      break;
    }
  }
  
  if (openingBrace === -1) return;
  
  // Insert mounted state logic right after the opening brace
  const mountedCode = [
    '  const [mounted, setMounted] = useState(false);',
    '  ',
    '  useEffect(() => {',
    '    setMounted(true);',
    '  }, []);',
    '',
    '  if (!mounted) {',
    '    return (',
    filePath.includes('AssetDetailsModal') ? 
      '      null' : 
      '      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 animate-pulse rounded-2xl" />',
    '    );',
    '  }',
    ''
  ];
  
  // Remove any existing mounted state logic first
  const newLines = [];
  let skipNext = false;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('const [mounted, setMounted]')) {
      skipNext = true;
      continue;
    }
    if (skipNext) {
      if (lines[i].includes('if (!mounted)')) {
        // Skip until we find the closing brace of the if statement
        let braceCount = 0;
        while (i < lines.length) {
          if (lines[i].includes('{')) braceCount++;
          if (lines[i].includes('}')) {
            braceCount--;
            if (braceCount === 0) {
              skipNext = false;
              break;
            }
          }
          i++;
        }
      } else {
        skipNext = false;
      }
      continue;
    }
    newLines.push(lines[i]);
  }
  
  // Insert the mounted state at the correct position
  newLines.splice(openingBrace + 1, 0, ...mountedCode);
  
  fs.writeFileSync(filePath, newLines.join('\n'));
  console.log(`Fixed hook order in ${filePath}`);
});

console.log('Hook order fixes completed!');
