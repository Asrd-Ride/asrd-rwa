# ⚙️ REPLIT TAILWIND CONFIG

## ANIMATIONS
animation: {
  'float': 'float 6s ease-in-out infinite',
  'glow': 'glow 2s ease-in-out infinite alternate',
  'pulse-slow': 'pulse 3s ease-in-out infinite',
}

## KEYFRAMES  
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(1deg); }
  66% { transform: translateY(-10px) rotate(-1deg); }
}

@keyframes glow {
  from { box-shadow: 0 0 20px rgba(0, 209, 255, 0.3); }
  to { box-shadow: 0 0 30px rgba(0, 209, 255, 0.6), 0 0 40px rgba(123, 97, 255, 0.3); }
}
