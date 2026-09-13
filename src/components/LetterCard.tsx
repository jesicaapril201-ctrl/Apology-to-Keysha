import React, { useState } from 'react';
import { 
  Heart, 
  Crown, 
  Flower2, 
  MessageCircleHeart, 
  RotateCcw,
  Copy,
  Check
} from 'lucide-react';
import { LetterContent } from '../types.ts';
import { AudioControls } from './AudioControls.tsx';
import { triggerLilyBurst } from './LilyPetals.tsx';

interface LetterCardProps {
  isVisible: boolean;
  onCloseLetter: () => void;
  onOpenReply: () => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({
  isVisible,
  onCloseLetter,
  onOpenReply,
}) => {
  const [copied, setCopied] = useState(false);

  const letterData: LetterContent = {
    title: "i'm sorry, my love 🤍",
    recipientName: 'Diva',
    message: `divaa sayaaang aku mintaa maaf yaaa aku kurang peka ke kamu nyaa kita nggaa bisa ketemu malah aku nggaa ngajak call sampe sampee kita berantem kayak ginii, aku mintaa maaf yaaa sayaang, aku mohoon kasii aku kesempatan lagii buat maafin aku, aku bakal berubah lebiih ngertiin kamu aku bener bener sayaang ke kamuu, aku nggaa mau kehilangan kamuu jadii aku mohoon kasii aku kesempatan yaa, 
i loveee uuu divaaa 🤍🤍🩷🩷`,
    signature: 'from your boyfieee ♡',
    royalNote: 'Seindah bunga lily merah muda dan megahnya istana kerajaan London, tak ada yang bisa menandingi ketulusan cintaku untukmu. Maafin aku ya cintaku... 🌸🏰',
  };

  const handleCopyMessage = () => {
    const fullText = `${letterData.title}\n\n${letterData.message}\n\n"${letterData.royalNote}"\n\n${letterData.signature}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-xl mx-auto px-3 sm:px-4 py-4 transition-all duration-1000 ease-out animate-in fade-in slide-in-from-bottom-8">
      {/* Action Toolbar Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1 text-xs">
        <div className="flex items-center gap-1.5 text-pink-700 bg-white/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-200 shadow-xs">
          <Crown className="w-3.5 h-3.5 text-amber-500" />
          <span className="font-royal font-semibold tracking-wide text-[11px]">
            Royal London &amp; Pink Lily Edition
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCloseLetter}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-white text-pink-700 border border-pink-200 transition-all shadow-xs text-xs font-medium hover:scale-105 active:scale-95"
            title="Lipat kembali amplop"
          >
            <RotateCcw className="w-3 h-3 text-pink-500" />
            <span>Tutup Surat</span>
          </button>
        </div>
      </div>

      {/* Main Letter Card - Pure Typography, Royal Border & Text (No Images) */}
      <div
        id="letterCardToCapture"
        className="royal-glass relative rounded-3xl p-6 sm:p-9 shadow-2xl border-2 border-pink-200/90 overflow-hidden bg-gradient-to-b from-white/95 via-[#fff7fa]/90 to-[#ffeef5]/85"
      >
        {/* Vintage Royal London Postmark Stamp (Pure CSS & Typography) */}
        <div className="flex items-start justify-between border-b border-pink-200/80 pb-4 mb-5">
          <div className="flex items-center gap-3">
            {/* Elegant Royal Stamp Badge */}
            <div className="relative w-12 h-12 rounded-2xl border-2 border-dashed border-pink-400/80 shadow-xs bg-gradient-to-br from-pink-100 to-pink-50 flex flex-col items-center justify-center text-pink-600 select-none">
              <Crown className="w-4 h-4 text-amber-500" />
              <span className="text-[9px] font-royal font-bold tracking-tighter uppercase mt-0.5 text-pink-700">
                LILY
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1 text-pink-800">
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-royal text-[11px] font-bold tracking-wider uppercase">
                  Royal Westminster Post • London
                </span>
              </div>
              <p className="text-[10px] text-pink-600/80 font-mono">
                AIR MAIL № 2026-LILY-DIVA 🤍
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="inline-block px-2.5 py-1 rounded-lg bg-pink-100/80 text-pink-800 text-[10px] font-semibold border border-pink-300/60 uppercase tracking-widest font-royal">
              Special Delivery
            </div>
            <p className="text-[9px] text-pink-500/80 mt-0.5">
              Strictly for Her Highness Diva
            </p>
          </div>
        </div>

        {/* Card Title in Calligraphy font */}
        <div className="text-center my-3 sm:my-4">
          <h1 className="font-cursive text-4xl sm:text-5xl text-pink-800 tracking-wide drop-shadow-xs">
            {letterData.title}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-pink-300" />
            <Flower2 className="w-3.5 h-3.5 text-pink-400" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-pink-300" />
          </div>
        </div>

        {/* Apology Love Message */}
        <div className="my-5 bg-white/70 backdrop-blur-xs p-5 sm:p-6 rounded-2xl border border-pink-150 shadow-inner">
          <p className="text-xs sm:text-sm text-pink-950 font-normal leading-loose whitespace-pre-line text-center sm:text-left">
            {letterData.message}
          </p>

          {/* Royal London & Lily Poetic Note */}
          <div className="mt-4 pt-3 border-t border-pink-200/60 flex items-start gap-2.5">
            <span className="text-lg select-none">🌸</span>
            <div className="flex-1">
              <p className="text-[11.5px] text-pink-800/90 italic leading-relaxed">
                "{letterData.royalNote}"
              </p>
            </div>
            <span className="text-lg select-none">🏰</span>
          </div>
        </div>

        {/* Signature */}
        <div className="text-right my-3">
          <div className="inline-flex items-center gap-1.5 text-pink-800">
            <span className="text-xs sm:text-sm italic font-medium">
              {letterData.signature}
            </span>
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
          </div>
        </div>
      </div>

      {/* Interactive Bottom Control Buttons (Audio & Actions) */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
        {/* Play/Pause Music */}
        <AudioControls />

        {/* Burst Lily Flowers button */}
        <button
          type="button"
          onClick={() => triggerLilyBurst(0.5, 0.5)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-pink-700 border border-pink-200/90 shadow-sm text-xs font-medium transition-all hover:scale-105 active:scale-95"
          title="Hamburkan bunga lily dan kelopak bunga"
        >
          <Flower2 className="w-3.5 h-3.5 text-pink-500" />
          <span>Tabur Lily 🌸</span>
        </button>

        {/* Copy Message Text Button */}
        <button
          type="button"
          onClick={handleCopyMessage}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-pink-700 border border-pink-200/90 shadow-sm text-xs font-medium transition-all hover:scale-105 active:scale-95"
          title="Salin teks pesan surat ini"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 font-medium">Tersalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-pink-500" />
              <span>Salin Pesan 🤍</span>
            </>
          )}
        </button>

        {/* Reply from Diva Button */}
        <button
          type="button"
          onClick={onOpenReply}
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white shadow-md text-xs font-semibold transition-all hover:scale-105 active:scale-95"
        >
          <MessageCircleHeart className="w-3.5 h-3.5" />
          <span>Kirim Balasan 💌</span>
        </button>
      </div>

      {/* Sweet Bottom Toast */}
      <div className="mt-5 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md text-pink-700 text-xs border border-pink-200/60 shadow-xs">
          thank you for staying 💗 Diva &amp; Boyfie
        </span>
      </div>
    </div>
  );
};
