import React from 'react';
import { Animated, StyleSheet, View, ViewStyle, ViewProps } from 'react-native';

interface IndicatorProps extends ViewProps {
  gap: number;
  size: number;
  color: string;
  count: number;
  index: number;
  opacity: number;
  dashSize: number;
  vertical: boolean;
  activeColor: string;
  borderRadius: number;
  animatedValue: Animated.Value | ReturnType<Animated.Value['interpolate']>;
}

const Indicator = ({
  gap,
  size,
  color,
  count,
  index,
  opacity,
  dashSize,
  vertical,
  activeColor,
  borderRadius,
  animatedValue,
}: IndicatorProps) => {
  const offset = (dashSize - size) / 2;
  const overlay = activeColor !== color;

  const rootStyles: ViewStyle = {
    [vertical ? 'marginVertical' : 'marginHorizontal']: gap / 2,
  };

  const translateWrapper = animatedValue.interpolate({
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
    opacity: animatedValue.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [opacity, overlay ? 0 : 1, opacity],
      extrapolate: 'clamp',
    }),
    transform: [vertical ? { translateY: translateWrapper } : { translateX: translateWrapper }],
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
    width: vertical ? size : dashSize / 2,
    height: vertical ? dashSize / 2 : size,
    backgroundColor: color,
  };

  const translateLeft = animatedValue.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [offset, 0, offset],
    extrapolate: 'clamp',
  });

  const translateRight = animatedValue.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [-offset, 0, -offset],
    extrapolate: 'clamp',
  });

  const leftStyles: Animated.AnimatedProps<ViewStyle> = {
    ...commonStyle,
    borderTopLeftRadius: borderRadius,
    [vertical ? 'borderTopRightRadius' : 'borderBottomLeftRadius']: borderRadius,
    transform: [vertical ? { translateY: translateLeft } : { translateX: translateLeft }],
  };

  const rightStyles: Animated.AnimatedProps<ViewStyle> = {
    ...commonStyle,
    borderBottomRightRadius: borderRadius,
    [vertical ? 'borderBottomLeftRadius' : 'borderTopRightRadius']: borderRadius,
    transform: [vertical ? { translateY: translateRight } : { translateX: translateRight }],
  };

  return (
    <View style={rootStyles}>
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

export default React.memo(Indicator);
