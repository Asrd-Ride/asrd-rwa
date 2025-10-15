const fs = require('fs');

function fixComponent(filePath, loadingUI) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add useEffect import if needed
  if (content.includes("import { useState } from 'react'")) {
    content = content.replace("import { useState } from 'react'", "import { useState, useEffect } from 'react'");
  }
  if (content.includes("import React, { useState } from 'react'")) {
    content = content.replace("import React, { useState } from 'react'", "import React, { useState, useEffect } from 'react'");
  }
  
  // Find the line after hook declarations (where we should insert mounted logic)
  const lines = content.split('\n');
  let insertIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('const [selectedAsset') || 
        lines[i].includes('const [isLiked') ||
        lines[i].includes('const [showInvestmentModal') ||
        lines[i].includes('useState<Asset | null>')) {
      // Found hook declarations, insert after this block
      insertIndex = i + 1;
      break;
    }
  }
  
  // If we didn't find the specific patterns, insert after the function declaration
  if (insertIndex === -1) {
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('export default function')) {
        insertIndex = i + 1;
        break;
      }
    }
  }
  
  if (insertIndex !== -1) {
    const mountedCode = `\n  const [mounted, setMounted] = useState(false);\n  \n  useEffect(() => {\n    setMounted(true);\n  }, []);\n\n  if (!mounted) {\n    return (\n      ${loadingUI}\n    );\n  }`;
    
    lines.splice(insertIndex, 0, ...mountedCode.split('\n'));
    fs.writeFileSync(filePath, lines.join('\n'));
    console.log(`Fixed ${filePath}`);
  } else {
    console.log(`Could not find insertion point in ${filePath}`);
  }
}

// Fix the components
fixComponent(
  'src/components/sections/FeaturedAssetsSection.tsx',
  '<div className="min-h-[400px] bg-gradient-to-br from-purple-900/20 to-blue-900/20 animate-pulse rounded-2xl" />'
);

fixComponent(
  'src/components/ui/AssetDetailsModal.tsx',
  'null'
);

console.log('All components fixed properly!');
