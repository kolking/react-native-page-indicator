import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { PageIndicator, PageIndicatorProps } from 'react-native-page-indicator';
import Segmented from './Segmented';

StatusBar.setBarStyle('light-content');

const pages = [
  {
    title: 'Page 1',
    color: '#574ae2',
  },
  {
    title: 'Page 2',
    color: '#aa4586',
  },
  {
    title: 'Page 3',
    color: '#654597',
  },
  {
    title: 'Page 4',
    color: '#88ab75',
  },
  {
    title: 'Page 5',
    color: '#00a1e4',
  },
];

const variants = [
  {
    value: 'morse',
    text: 'Morse',
  },
  {
    value: 'beads',
    text: 'Beads',
  },
  {
    value: 'train',
    text: 'Train',
  },
];

const orientation = [
  {
    value: false,
    text: 'Horizontal',
  },
  {
    value: true,
    text: 'Vertical',
  },
];

const App = () => {
  const { width, height } = useWindowDimensions();
  const [current, setCurrent] = useState(0);
  const [variant, setVariant] = useState<PageIndicatorProps['variant']>('morse');
  const [vertical, setVertical] = useState<PageIndicatorProps['vertical']>(false);

  const pageSize = vertical ? height : width;
  const offsetProp = vertical ? 'y' : 'x';
  const scrollValue = useRef(new Animated.Value(0)).current;
  const animatedCurrent = useMemo(
    () => Animated.divide(scrollValue, pageSize),
    [scrollValue, pageSize],
  );

  const handleScrollEnd = useCallback(
    ({ nativeEvent: { contentOffset } }: NativeSyntheticEvent<NativeScrollEvent>) => {
      const viewIndex = Math.round(contentOffset[offsetProp] / pageSize);
      if (viewIndex !== current) {
        setCurrent(viewIndex);
      }
    },
    [offsetProp, pageSize, current],
  );

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        horizontal={!vertical}
        pagingEnabled={true}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { [offsetProp]: scrollValue } } }],
          { useNativeDriver: true },
        )}
      >
        {pages.map(({ title, color: backgroundColor }, index) => (
          <View key={index} style={[styles.page, { width, height, backgroundColor }]}>
            <Text style={styles.title}>{title}</Text>
            <Segmented items={variants} selected={variant} onChange={setVariant} />
            <Segmented items={orientation} selected={vertical} onChange={setVertical} />
          </View>
        ))}
      </Animated.ScrollView>
      <View style={[styles.indicator, vertical ? styles.vIndicator : styles.hIndicator]}>
        <PageIndicator
          key={`${variant}-${vertical ? 'ver' : 'hor'}`}
          count={pages.length}
          current={animatedCurrent}
          variant={variant}
          vertical={vertical}
          color="white"
          //dashSize={0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  page: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hIndicator: {
    left: 20,
    right: 20,
    bottom: 50,
  },
  vIndicator: {
    top: 80,
    right: 20,
    bottom: 80,
  },
  title: {
    fontSize: 28,
    color: 'white',
    marginBottom: 10,
    fontWeight: '700',
  },
});

export default App;
