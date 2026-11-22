import { type Animated, PixelRatio } from 'react-native';

export type InterpolatableAnimatedValue = Pick<
  Animated.AnimatedInterpolation<number>,
  'interpolate'
>;

export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

export function evenPixelRound(value: number) {
  return PixelRatio.roundToNearestPixel(value / 2) * 2;
}
