/**
 * Romantic Melody Synthesizer via Web Audio API
 * Plays a gentle, dreamy romantic piano arpeggio progression (Fmaj7 - C - Dm7 - Bbmaj7)
 * with music box & soft Rhodes harmonic warmth.
 */

class RomanticAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlayingState: boolean = false;
  private timer: number | null = null;
  private volumeNode: GainNode | null = null;
  private volumeLevel: number = 0.6;
  private noteIndex: number = 0;
  private customAudio: HTMLAudioElement | null = null;
  private useCustomAudio: boolean = false;

  // Romantic progression frequencies (Hz): Fmaj7 -> C -> Dm7 -> Bbmaj7
  private melodyNotes: number[] = [
    // Fmaj7 chord arpeggio
    349.23, 440.00, 523.25, 659.25, 523.25, 440.00,
    // C add9 chord arpeggio
    261.63, 329.63, 392.00, 587.33, 392.00, 329.63,
    // Dm7 chord arpeggio
    293.66, 349.23, 440.00, 523.25, 440.00, 349.23,
    // Bbmaj7 chord arpeggio
    233.08, 293.66, 349.23, 440.00, 349.23, 293.66,
    // Higher melodic ornaments
    698.46, 659.25, 587.33, 523.25, 440.00, 523.25,
    349.23, 392.00, 440.00, 523.25, 659.25, 587.33
  ];

  constructor() {
    // Lazy init audio context on first user action
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.volumeNode = this.ctx.createGain();
      this.volumeNode.gain.value = this.volumeLevel;
      this.volumeNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number = 1.4) {
    if (!this.ctx || !this.volumeNode) return;

    const now = this.ctx.currentTime;
    
    // Fundamental oscillator (triangle for soft warm bell/piano body)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic overtone (sine for sparkling music box chime)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Warm sub overtone
    const osc3 = this.ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 0.5, now);

    // Individual note envelope
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    // Soft attack
    noteGain.gain.exponentialRampToValueAtTime(0.3, now + 0.04);
    // Natural exponential decay
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Filter to soften the highs
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    osc3.connect(noteGain);

    noteGain.connect(filter);
    filter.connect(this.volumeNode);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + duration);
    osc2.stop(now + duration);
    osc3.stop(now + duration);
  }

  private step() {
    if (!this.isPlayingState) return;
    const freq = this.melodyNotes[this.noteIndex];
    this.playTone(freq, 1.6);

    // Occasionally play a soft low bass anchor on first beat of phrase
    if (this.noteIndex % 6 === 0) {
      this.playTone(freq * 0.5, 2.2);
    }

    this.noteIndex = (this.noteIndex + 1) % this.melodyNotes.length;

    // Tempo: ~340ms per note (gentle flowing ballad arpeggio)
    this.timer = window.setTimeout(() => this.step(), 340);
  }

  public play() {
    this.initContext();
    if (this.useCustomAudio && this.customAudio) {
      this.customAudio.play().catch(() => {});
      this.isPlayingState = true;
      return;
    }

    if (!this.isPlayingState) {
      this.isPlayingState = true;
      this.step();
    }
  }

  public pause() {
    this.isPlayingState = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggle(): boolean {
    if (this.isPlayingState) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlayingState;
  }

  public setVolume(val: number) {
    this.volumeLevel = Math.max(0, Math.min(1, val));
    if (this.volumeNode && this.ctx) {
      this.volumeNode.gain.setValueAtTime(this.volumeLevel, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volumeLevel;
    }
  }

  public getVolume(): number {
    return this.volumeLevel;
  }

  public isPlaying(): boolean {
    return this.isPlayingState;
  }

  public setCustomAudioUrl(url: string) {
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (url) {
      this.customAudio = new Audio(url);
      this.customAudio.loop = true;
      this.customAudio.volume = this.volumeLevel;
      this.useCustomAudio = true;
      if (this.isPlayingState) {
        this.customAudio.play().catch(() => {});
      }
    } else {
      this.useCustomAudio = false;
      this.customAudio = null;
    }
  }
}

export const romanticPlayer = new RomanticAudioPlayer();
