import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  EasingFunction,
  LayoutChangeEvent,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';

import { clamp } from './helpers';
import IndicatorMorse from './IndicatorMorse';
import IndicatorBeads from './IndicatorBeads';
import IndicatorTrain from './IndicatorTrain';

enum Variants {
  MORSE = 'morse',
  BEADS = 'beads',
  TRAIN = 'train',
}

export interface PageIndicatorProps extends ViewProps {
  count: number;
  variant?: `${Variants}`;
  current?: number | Animated.Value | ReturnType<Animated.Value['interpolate']>;
  gap?: number;
  size?: number;
  color?: string;
  scale?: number;
  opacity?: number;
  dashSize?: number;
  duration?: number;
  vertical?: boolean;
  activeColor?: string;
  borderRadius?: number;
  easing?: EasingFunction;
}

export const PageIndicator = ({
  count,
  variant = Variants.MORSE,
  current = 0,
  gap = 6,
  size = 6,
  color = 'black',
  scale = 1.5,
  opacity = 0.5,
  dashSize = size * 4,
  duration = 500,
  vertical = false,
  activeColor = color,
  borderRadius = size / 2,
  easing = Easing.out(Easing.cubic),
  style,
  ...props
}: PageIndicatorProps) => {
  const [trainStroke, setTrainStroke] = useState(dashSize);
  const shouldAnimate = typeof current === 'number';
  const flexDirection = vertical ? 'column' : 'row';
  const animatedValue = useRef(
    shouldAnimate ? new Animated.Value(clamp(current, 0, count)) : current,
  ).current;

  useEffect(() => {
    if (shouldAnimate) {
      Animated.timing(animatedValue as Animated.Value, {
        toValue: clamp(current, 0, count),
        duration,
        easing,
        useNativeDriver: true,
      }).start();
    }
  }, [shouldAnimate, animatedValue, current, count, duration, easing]);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      if (variant === Variants.TRAIN && dashSize === 0) {
        const { width, height } = e.nativeEvent.layout;
        setTrainStroke((vertical ? height : width) / count - gap);
      }
    },
    [variant, dashSize, vertical, count, gap],
  );

  return (
    <View
      {...props}
      style={[styles.root, style, { flexDirection }]}
      pointerEvents="none"
      onLayout={handleLayout}
    >
      {[...Array(count).keys()].map((index) =>
        variant === Variants.BEADS ? (
          <IndicatorBeads
            key={index}
            gap={gap}
            size={size}
            color={color}
            index={index}
            scale={scale}
            vertical={vertical}
            activeColor={activeColor}
            opacity={clamp(opacity, 0, 1)}
            borderRadius={clamp(borderRadius, 0, size / 2)}
            animatedValue={animatedValue}
          />
        ) : variant === Variants.TRAIN ? (
          <IndicatorTrain
            key={index}
            gap={gap}
            size={size}
            color={color}
            index={index}
            vertical={vertical}
            activeColor={activeColor}
            dashSize={trainStroke}
            opacity={clamp(opacity, 0, 1)}
            borderRadius={clamp(borderRadius, 0, size / 2)}
            animatedValue={animatedValue}
          />
        ) : (
          <IndicatorMorse
            key={index}
            gap={gap}
            size={size}
            color={color}
            count={count}
            index={index}
            vertical={vertical}
            activeColor={activeColor}
            dashSize={Math.max(dashSize, size * 2)}
            opacity={clamp(opacity, 0, 1)}
            borderRadius={clamp(borderRadius, 0, size / 2)}
            animatedValue={animatedValue}
          />
        ),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
