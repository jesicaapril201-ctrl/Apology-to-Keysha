import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface FloatingLilyItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  content: string;
  rotate: number;
}

export const triggerLilyBurst = (originX: number = 0.5, originY: number = 0.5) => {
  // Canvas confetti with soft pink and pure white colors
  confetti({
    particleCount: 50,
    spread: 90,
    origin: { x: originX, y: originY },
    colors: ['#ffb6d5', '#ff8ebc', '#ffffff', '#ffd1e3', '#ffe4ee', '#f472b6'],
    shapes: ['circle', 'square'],
    scalar: 1.1,
    ticks: 180,
  });

  // DOM Burst of lily flowers, petals and hearts
  const burstCount = 36;
  const symbols = ['🌸', '💮', '🩷', '🤍', '🌷', '✨', '💐'];

  for (let i = 0; i < burstCount; i++) {
    const el = document.createElement('div');
    el.className = 'burst-flower-item';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.fontSize = `${20 + Math.random() * 22}px`;

    el.style.left = `${originX * 100}%`;
    el.style.top = `${originY * 100}%`;

    const angle = Math.random() * Math.PI * 2;
    const distance = 160 + Math.random() * 420;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    el.style.setProperty('--x', `${x}px`);
    el.style.setProperty('--y', `${y}px`);

    document.body.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 2200);
  }
};

export const LilyPetals: React.FC<{ active?: boolean }> = ({ active = true }) => {
  const [flowers, setFlowers] = useState<FloatingLilyItem[]>([]);

  useEffect(() => {
    if (!active) return;

    const symbols = ['🌸', '💮', '🩷', '🤍', '🌷', '✨'];
    let counter = 0;

    const interval = setInterval(() => {
      const newFlower: FloatingLilyItem = {
        id: ++counter,
        left: Math.random() * 96,
        size: 18 + Math.random() * 24,
        duration: 7 + Math.random() * 5,
        content: symbols[Math.floor(Math.random() * symbols.length)],
        rotate: Math.floor(Math.random() * 360),
      };

      setFlowers((prev) => [...prev.slice(-28), newFlower]);
    }, 450);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {flowers.map((f) => (
        <div
          key={f.id}
          className="floating-flower flex items-center justify-center select-none"
          style={{
            left: `${f.left}vw`,
            bottom: '-40px',
            fontSize: `${f.size}px`,
            animationDuration: `${f.duration}s`,
          }}
        >
          <span style={{ transform: `rotate(${f.rotate}deg)` }}>{f.content}</span>
        </div>
      ))}
    </div>
  );
};
