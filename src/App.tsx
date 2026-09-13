/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SparkleBackground } from './components/SparkleBackground.tsx';
import { LilyPetals, triggerLilyBurst } from './components/LilyPetals.tsx';
import { Envelope } from './components/Envelope.tsx';
import { LetterCard } from './components/LetterCard.tsx';
import { ReplyModal } from './components/ReplyModal.tsx';
import { romanticPlayer } from './utils/audio.ts';

export default function App() {
  const [opened, setOpened] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const handleOpenLetter = () => {
    if (opened) return;
    setOpened(true);

    // Radial burst of lily flowers and hearts
    triggerLilyBurst(0.5, 0.45);

    // Play romantic piano audio
    romanticPlayer.play();

    // Show card after envelope flap animation
    setTimeout(() => {
      setCardVisible(true);
    }, 700);

    // Show sweet popup toast
    setTimeout(() => {
      setToastVisible(true);
    }, 1500);
  };

  const handleCloseLetter = () => {
    setCardVisible(false);
    setToastVisible(false);
    setTimeout(() => {
      setOpened(false);
    }, 600);
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 overflow-x-hidden">
      {/* Background Ambience: Soft Pink & White Sparkles */}
      <SparkleBackground />

      {/* Floating Pink Lilies & Petals */}
      <LilyPetals active={true} />

      {/* Central Content Area */}
      <div className="relative z-20 w-full max-w-2xl flex flex-col items-center justify-center my-auto">
        {/* The 3D Interactive Envelope */}
        {!cardVisible && (
          <Envelope isOpen={opened} onOpen={handleOpenLetter} />
        )}

        {/* The Apology Letter Card (Pure Text & Music) */}
        <LetterCard
          isVisible={cardVisible}
          onCloseLetter={handleCloseLetter}
          onOpenReply={() => setIsReplyOpen(true)}
        />
      </div>

      {/* Floating Popup Toast (from user's original design) */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-5 py-2.5 rounded-full bg-white/85 backdrop-blur-md border border-pink-200/90 shadow-xl text-pink-700 text-xs sm:text-sm font-medium transition-all duration-700 pointer-events-none flex items-center gap-2 ${
          toastVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        }`}
      >
        <span>thank you for staying</span>
        <span>💗</span>
        <span className="text-[11px] text-pink-400 font-royal">DIVA 🤍</span>
      </div>

      {/* Reply Modal */}
      <ReplyModal
        isOpen={isReplyOpen}
        onClose={() => setIsReplyOpen(false)}
        onSendReply={(replyText) => {
          console.log('Reply from Diva:', replyText);
        }}
      />
    </main>
  );
}
