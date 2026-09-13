import React, { useMemo } from 'react';

interface Sparkle {
  id: number;
  left: string;
  top: string;
  duration: string;
  delay: string;
  size: number;
}

export const SparkleBackground: React.FC = () => {
  const sparkles: Sparkle[] = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => ({
      id: i,
      left: `${(Math.random() * 100).toFixed(2)}vw`,
      top: `${(Math.random() * 100).toFixed(2)}vh`,
      duration: `${(2.2 + Math.random() * 3.5).toFixed(2)}s`,
      delay: `${(Math.random() * 3).toFixed(2)}s`,
      size: Math.random() > 0.6 ? 5 : 3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient glowing color orbs in pink & white tones */}
      <div className="blur-orb-1" />
      <div className="blur-orb-2" />
      <div className="blur-orb-3" />

      {/* Sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle-dot"
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: s.duration,
            animationDelay: s.delay,
            boxShadow: `0 0 ${s.size * 2}px white`,
          }}
        />
      ))}
    </div>
  );
};
