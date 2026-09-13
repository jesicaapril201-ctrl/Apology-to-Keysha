import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { romanticPlayer } from '../utils/audio.ts';

interface AudioControlsProps {
  onMusicToggle?: (isPlaying: boolean) => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({ onMusicToggle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    setIsPlaying(romanticPlayer.isPlaying());
  }, []);

  const handleToggle = () => {
    const nextState = romanticPlayer.toggle();
    setIsPlaying(nextState);
    if (onMusicToggle) onMusicToggle(nextState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticPlayer.setVolume(val);
  };

  return (
    <div className="relative inline-flex items-center gap-2">
      {/* Play / Pause Toggle Button */}
      <button
        type="button"
        onClick={handleToggle}
        className={`group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border shadow-sm ${
          isPlaying
            ? 'bg-pink-500 text-white border-pink-400 shadow-pink-200 hover:bg-pink-600'
            : 'bg-white/80 text-pink-700 border-pink-200/80 hover:bg-white'
        }`}
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik Romantis'}
      >
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5" />
            <span>Pause Musik 🎵</span>
            {/* Animated sound wave bars */}
            <span className="flex items-end gap-0.5 h-3 ml-1">
              <span className="w-0.5 bg-white rounded-full animate-pulse h-2" />
              <span className="w-0.5 bg-white rounded-full animate-pulse h-3 delay-75" />
              <span className="w-0.5 bg-white rounded-full animate-pulse h-1.5 delay-150" />
            </span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 fill-pink-600" />
            <span>Play Musik 🎵</span>
            <Music className="w-3.5 h-3.5 opacity-60" />
          </>
        )}
      </button>

      {/* Volume button toggle */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowVolume(!showVolume)}
          className="p-2 rounded-full bg-white/80 border border-pink-200/80 text-pink-600 hover:bg-white transition-colors shadow-sm"
          title="Atur Volume"
        >
          {volume === 0 ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>

        {showVolume && (
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-pink-200 flex flex-col items-center gap-2 z-40 animate-in fade-in">
            <span className="text-[10px] text-pink-600 font-medium whitespace-nowrap">
              Volume ({Math.round(volume * 100)}%)
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1.5 accent-pink-500 bg-pink-100 rounded-lg cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};
