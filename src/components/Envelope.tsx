import React from 'react';
import { Crown, Sparkles, Heart } from 'lucide-react';

interface EnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ isOpen, onOpen }) => {
  return (
    <div
      id="envelopeBox"
      onClick={!isOpen ? onOpen : undefined}
      className={`envelope-perspective relative flex flex-col items-center justify-center transition-all duration-1000 ease-out cursor-pointer select-none ${
        isOpen
          ? 'opacity-0 -translate-y-24 pointer-events-none scale-95'
          : 'opacity-100 translate-y-0 hover:scale-[1.03]'
      }`}
    >
      {/* Decorative floating top badge */}
      <div className="mb-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-pink-200/80 text-pink-700 text-xs font-medium shadow-sm">
        <Crown className="w-3.5 h-3.5 text-pink-500" />
        <span className="font-royal tracking-wider uppercase text-[11px]">Royal London Mail</span>
        <span className="text-pink-300">•</span>
        <span>Spesial Untuk Diva 🤍</span>
      </div>

      {/* Main Envelope Body */}
      <div className="relative w-80 sm:w-96 h-52 sm:h-60 rounded-b-2xl shadow-2xl bg-gradient-to-b from-[#ffaecd] to-[#ff9abb] border border-white/50 overflow-visible flex items-center justify-center">
        {/* Envelope Inner White Lining with faint Lily & monogram motif */}
        <div className="absolute inset-x-2 top-2 bottom-2 bg-gradient-to-b from-white to-[#fff0f6] rounded-b-xl overflow-hidden opacity-95">
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-15 pointer-events-none select-none">
            <span className="text-6xl">🌸</span>
            <span className="font-royal text-xs tracking-widest text-pink-500 font-bold uppercase mt-1">
              Royal Edition
            </span>
          </div>
          {/* Peeking letter edge */}
          <div className="w-full h-10 bg-white/90 border-b border-pink-100 flex items-center justify-center">
            <span className="font-cursive text-pink-400 text-xl tracking-wide">For Diva 🤍</span>
          </div>
        </div>

        {/* Envelope Flap (Triangle with 3D rotation) */}
        <div
          className={`absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-[#ffd3e4] to-[#ffb8d4] envelope-flap ${
            isOpen ? 'open' : ''
          }`}
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 64%)',
            boxShadow: '0 8px 20px rgba(255, 150, 180, 0.4)',
          }}
        />

        {/* Wax Seal / Royal London Stamp Center */}
        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
          <div className="wax-seal w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center text-white border-2 border-amber-200/90 shadow-xl transform transition-transform hover:scale-110 active:scale-95 group">
            <div className="flex items-center gap-0.5">
              <Crown className="w-3.5 h-3.5 text-amber-100" />
            </div>
            <div className="text-sm font-semibold tracking-tighter drop-shadow-sm font-royal">
              DIVA
            </div>
            <div className="text-[10px] text-pink-100 flex items-center gap-0.5">
              <span>🤍</span>
              <span>🌸</span>
            </div>
          </div>
        </div>

        {/* Bottom fold shading */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(240, 100, 150, 0.25) 0%, transparent 40%)',
            borderRadius: '0 0 1rem 1rem',
          }}
        />
      </div>

      {/* Tap to Open Prompt */}
      <div className="mt-6 flex flex-col items-center gap-1 text-pink-800 animate-pulse">
        <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-pink-200 shadow-md">
          <Sparkles className="w-4 h-4 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-sm font-medium tracking-wide">Sentuh untuk membuka surat cinta ✨</span>
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
        </div>
        <span className="text-[12px] text-pink-600/80 font-light">
          A Royal Apology &amp; Pink Lily for You
        </span>
      </div>
    </div>
  );
};
