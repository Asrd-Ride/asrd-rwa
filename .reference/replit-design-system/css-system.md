# 🎨 REPLIT CSS DESIGN SYSTEM

## COLOR TOKENS
:root {
  --background: hsl(220, 40%, 8%);
  --foreground: hsl(0, 0%, 98%);
  --primary: hsl(195, 100%, 50%);    /* #00D1FF */
  --secondary: hsl(258, 84%, 69%);   /* #7B61FF */
  --card: hsla(0, 0%, 100%, 0.05);
  --border: hsla(0, 0%, 100%, 0.1);
}

## GLASS MORPHISM
.glass-effect {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

## NEON EFFECTS
.neon-glow {
  box-shadow: 0 0 20px rgba(0, 209, 255, 0.3), 0 0 40px rgba(0, 209, 255, 0.1);
}

.neon-text {
  text-shadow: 0 0 10px rgba(0, 209, 255, 0.5), 0 0 20px rgba(0, 209, 255, 0.3);
}

## 3D FLIP CARDS
.flip-card {
  perspective: 1000px;
  height: 400px;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}
