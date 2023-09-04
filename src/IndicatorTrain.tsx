import React from 'react';
import { Animated, StyleSheet, View, ViewStyle, ViewProps } from 'react-native';

interface IndicatorProps extends ViewProps {
  gap: number;
  size: number;
  color: string;
  index: number;
  opacity: number;
  dashSize: number;
  vertical: boolean;
  activeColor: string;
  borderRadius: number;
  animatedValue: Animated.Value | ReturnType<Animated.Value['interpolate']>;
}

const IndicatorTrain = ({
  gap,
  size,
  color,
  index,
  opacity,
  dashSize,
  vertical,
  activeColor,
  borderRadius,
  animatedValue,
}: IndicatorProps) => {
  const rootStyles: ViewStyle = {
    ...styles.root,
    borderRadius: borderRadius,
    width: vertical ? size : dashSize,
    height: vertical ? dashSize : size,
    [vertical ? 'marginVertical' : 'marginHorizontal']: gap / 2,
  };

  const baseStyles: Animated.AnimatedProps<ViewStyle> = {
    ...StyleSheet.absoluteFillObject,
    opacity,
    backgroundColor: color,
  };

  const translateOverlay = animatedValue.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [-dashSize, 0, dashSize],
    extrapolate: 'clamp',
  });

  const overlayStyles: Animated.AnimatedProps<ViewStyle> = {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
    backgroundColor: activeColor,
    transform: [vertical ? { translateY: translateOverlay } : { translateX: translateOverlay }],
  };

  return (
    <View style={rootStyles}>
      <Animated.View style={baseStyles} />
      <Animated.View style={overlayStyles} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
});

export default React.memo(IndicatorTrain);
