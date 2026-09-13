export interface PhotoItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  isCustom?: boolean;
}

export interface LetterContent {
  title: string;
  recipientName: string;
  message: string;
  signature: string;
  royalNote: string;
}

export interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  type: 'lily' | 'petal' | 'heart' | 'sparkle' | 'rose';
}
