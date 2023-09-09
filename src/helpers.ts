import { PixelRatio } from 'react-native';

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

export function evenPixelRound(value: number) {
  return PixelRatio.roundToNearestPixel(value / 2) * 2;
}
