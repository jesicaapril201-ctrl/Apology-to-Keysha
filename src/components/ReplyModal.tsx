import React, { useState } from 'react';
import { X, Heart, Send, Sparkles, Flower2 } from 'lucide-react';
import { triggerLilyBurst } from './LilyPetals.tsx';

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendReply: (replyText: string) => void;
}

export const ReplyModal: React.FC<ReplyModalProps> = ({
  isOpen,
  onClose,
  onSendReply,
}) => {
  const [reply, setReply] = useState('');
  const [sent, setSent] = useState(false);

  const quickReplies = [
    'Aku maafin kamu kok sayang, jangan sedih lagi ya 🤍',
    'Janji ya lebih peka, selalu kabar-kabari dan jangan cuek 🥺🌸',
    'I love you too boyfie, peluk erat dari jauh! 🫂💕',
    'Bunga lily-nya cantik banget, makasih yaa cintaku 🌷✨',
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;

    triggerLilyBurst(0.5, 0.4);
    onSendReply(reply.trim());
    setSent(true);

    setTimeout(() => {
      setSent(false);
      setReply('');
      onClose();
    }, 2800);
  };

  const handleSelectQuick = (text: string) => {
    setReply(text);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="relative max-w-md w-full bg-gradient-to-b from-white to-[#fff0f6] rounded-3xl p-6 shadow-2xl border-2 border-pink-200/80"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {sent ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-pink-100 border-2 border-pink-300 flex items-center justify-center text-pink-500 mb-4 animate-bounce">
              <Heart className="w-8 h-8 fill-pink-500 text-pink-500" />
            </div>
            <h3 className="font-cursive text-3xl text-pink-700">
              Pesan Terkirim dengan Cinta 🤍
            </h3>
            <p className="text-sm text-pink-600/90 mt-2 max-w-xs">
              Terima kasih Diva sayang sudah membaca dan membalas surat ini. Hatiku lega banget! 💕
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-pink-600 bg-pink-100/70 px-3 py-1 rounded-full mb-2">
                <Flower2 className="w-3.5 h-3.5 text-pink-500" />
                <span>Balasan Untuk Boyfie</span>
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              </div>
              <h3 className="font-cursive text-3xl text-pink-800">
                Kirim Balasan untuk Dia 💌
              </h3>
              <p className="text-xs text-pink-600/80 mt-1">
                Katakan apa yang ada di hatimu untuk kekasihmu
              </p>
            </div>

            {/* Quick replies */}
            <div className="space-y-1.5 mb-4">
              <p className="text-[11px] font-medium text-pink-700/80">
                Pilih balasan cepat:
              </p>
              <div className="flex flex-col gap-1.5">
                {quickReplies.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectQuick(q)}
                    className="text-left text-xs p-2.5 rounded-xl bg-pink-50/80 hover:bg-pink-100 text-pink-900 border border-pink-200/60 transition-all hover:translate-x-1"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Tulis balasanmu di sini sayang..."
                rows={3}
                className="w-full text-xs p-3 rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/90 text-pink-950 placeholder-pink-300 resize-none shadow-inner"
              />

              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-pink-600 hover:text-pink-800 font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!reply.trim()}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white text-xs font-semibold shadow-md transition-transform hover:scale-105 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Balasan 🤍</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
