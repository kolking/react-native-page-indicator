import React, { useEffect, useRef } from 'react';
import { Animated, Easing, EasingFunction, StyleSheet, View, ViewProps } from 'react-native';

import { clamp } from './helpers';
import Indicator from './Indicator';

export interface PageIndicatorProps extends ViewProps {
  gap?: number;
  size?: number;
  color?: string;
  count: number;
  current?: number;
  stroke?: number;
  opacity?: number;
  duration?: number;
  vertical?: boolean;
  borderRadius?: number;
  easing?: EasingFunction;
  animatedCurrent?: Animated.Value | Animated.AnimatedInterpolation;
}

export const PageIndicator = ({
  gap = 6,
  size = 6,
  color = 'black',
  count,
  current = 0,
  stroke = size * 4,
  opacity = 0.6,
  duration = 500,
  vertical = false,
  borderRadius = size / 2,
  easing = Easing.out(Easing.cubic),
  animatedCurrent,
  style,
  ...props
}: PageIndicatorProps) => {
  const flexDirection = vertical ? 'column' : 'row';
  const animatedValue = useRef(new Animated.Value(clamp(current, 0, count))).current;

  useEffect(() => {
    if (!animatedCurrent) {
      Animated.timing(animatedValue, {
        toValue: current,
        duration,
        easing,
        useNativeDriver: true,
      }).start();
    }
  }, [animatedCurrent, animatedValue, current, duration, easing]);

  return (
    <View {...props} style={[style, styles.root, { flexDirection }]} pointerEvents="none">
      {[...Array(count).keys()].map((index) => (
        <Indicator
          key={index}
          gap={gap}
          size={size}
          color={color}
          count={count}
          index={index}
          vertical={vertical}
          stroke={Math.max(stroke, size * 2)}
          opacity={clamp(opacity, 0, 1)}
          borderRadius={clamp(borderRadius, 0, size / 2)}
          animatedValue={animatedCurrent || animatedValue}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
