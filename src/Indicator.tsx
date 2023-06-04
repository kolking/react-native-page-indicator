import React from 'react';
import { Animated, StyleSheet, View, ViewStyle, ViewProps } from 'react-native';

interface IndicatorProps extends ViewProps {
  gap: number;
  size: number;
  color: string;
  count: number;
  index: number;
  stroke: number;
  opacity: number;
  vertical: boolean;
  activeColor: string;
  borderRadius: number;
  animatedValue: Animated.Value | Animated.AnimatedInterpolation;
}

const Indicator = ({
  gap,
  size,
  color,
  count,
  index,
  stroke,
  opacity,
  vertical,
  activeColor,
  borderRadius,
  animatedValue,
}: IndicatorProps) => {
  const offset = (stroke - size) / 2;
  const overlay = activeColor !== color;

  const wrapperTranslate = animatedValue.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [
      offset * (count - 2 * index),
      offset * (count - 2 * index - 1),
      offset * (count - 2 * index - 2),
    ],
    extrapolate: 'clamp',
  });

  const wrapperStyles: Animated.AnimatedProps<ViewStyle> = {
    flexDirection: vertical ? 'column' : 'row',
    [vertical ? 'marginVertical' : 'marginHorizontal']: gap / 2,
    opacity: animatedValue.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [opacity, overlay ? 0 : 1, opacity],
      extrapolate: 'clamp',
    }),
    transform: [vertical ? { translateY: wrapperTranslate } : { translateX: wrapperTranslate }],
  };

  const overlayStyles: Animated.AnimatedProps<ViewStyle> = {
    ...wrapperStyles,
    ...StyleSheet.absoluteFillObject,
    opacity: animatedValue.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    }),
  };

  const commonStyle: Animated.AnimatedProps<ViewStyle> = {
    width: vertical ? size : stroke / 2,
    height: vertical ? stroke / 2 : size,
    backgroundColor: color,
  };

  const leftTranslate = animatedValue.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [offset, 0, offset],
    extrapolate: 'clamp',
  });

  const rightTranslate = animatedValue.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [-offset, 0, -offset],
    extrapolate: 'clamp',
  });

  const leftStyles: Animated.AnimatedProps<ViewStyle> = {
    ...commonStyle,
    borderTopLeftRadius: borderRadius,
    [vertical ? 'borderTopRightRadius' : 'borderBottomLeftRadius']: borderRadius,
    transform: [vertical ? { translateY: leftTranslate } : { translateX: leftTranslate }],
  };

  const rightStyles: Animated.AnimatedProps<ViewStyle> = {
    ...commonStyle,
    borderBottomRightRadius: borderRadius,
    [vertical ? 'borderBottomLeftRadius' : 'borderTopRightRadius']: borderRadius,
    transform: [vertical ? { translateY: rightTranslate } : { translateX: rightTranslate }],
  };

  return (
    <View>
      <Animated.View style={wrapperStyles}>
        <View style={styles.mask}>
          <Animated.View style={leftStyles} />
        </View>
        <View style={styles.mask}>
          <Animated.View style={rightStyles} />
        </View>
      </Animated.View>
      {overlay && (
        <Animated.View style={overlayStyles}>
          <View style={styles.mask}>
            <Animated.View style={[leftStyles, { backgroundColor: activeColor }]} />
          </View>
          <View style={styles.mask}>
            <Animated.View style={[rightStyles, { backgroundColor: activeColor }]} />
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mask: {
    overflow: 'hidden',
  },
});

export default Indicator;
