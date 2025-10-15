const fs = require('fs');

function fixMountedState(filePath, loadingUI) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Add useEffect import
  if (content.includes("import { useState } from 'react'")) {
    content = content.replace("import { useState } from 'react'", "import { useState, useEffect } from 'react'");
  }
  if (content.includes("import React, { useState } from 'react'")) {
    content = content.replace("import React, { useState } from 'react'", "import React, { useState, useEffect } from 'react'");
  }
  
  // Find the line number after all hook declarations in the component function
  const lines = content.split('\n');
  let functionStart = -1;
  let lastHookLine = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('export default function') && functionStart === -1) {
      functionStart = i;
    }
    if (functionStart !== -1 && i > functionStart) {
      // Look for hook declarations
      if (lines[i].includes('useState(') || lines[i].includes('useAuth') || lines[i].includes('useNotification')) {
        lastHookLine = i;
      }
      // Stop when we hit the first non-hook, non-variable line after hooks
      if (lastHookLine !== -1 && 
          !lines[i].trim().startsWith('const [') && 
          !lines[i].trim().startsWith('  const [') &&
          !lines[i].includes('useState(') &&
          !lines[i].includes('useAuth') &&
          !lines[i].includes('useNotification') &&
          lines[i].trim() !== '' &&
          !lines[i].trim().startsWith('//') &&
          i > lastHookLine + 2) {
        
        // Insert mounted state after the last hook
        const mountedCode = `\n  const [mounted, setMounted] = useState(false);\n  \n  useEffect(() => {\n    setMounted(true);\n  }, []);\n\n  if (!mounted) {\n    return (\n      ${loadingUI}\n    );\n  }`;
        lines.splice(i, 0, ...mountedCode.split('\n'));
        break;
      }
    }
  }
  
  fs.writeFileSync(filePath, lines.join('\n'));
  console.log(`Fixed ${filePath}`);
}

// Fix the components
fixMountedState(
  'src/components/sections/FeaturedAssetsSection.tsx',
  '<div className="min-h-[400px] bg-gradient-to-br from-purple-900/20 to-blue-900/20 animate-pulse rounded-2xl" />'
);

fixMountedState(
  'src/components/ui/AssetDetailsModal.tsx',
  'null'
);

console.log('Mounted state fixes completed!');
