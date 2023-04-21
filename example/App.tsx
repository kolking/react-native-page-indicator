import React, { useCallback, useRef, useState } from 'react';
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
import { PageIndicator } from 'react-native-page-indicator';

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

const App = () => {
  const { width, height } = useWindowDimensions();
  const [current, setCurrent] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const viewIndex = Math.round(e.nativeEvent.contentOffset.x / width);

      if (viewIndex !== current) {
        setCurrent(viewIndex);
      }
    },
    [width, current],
  );

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        horizontal={true}
        pagingEnabled={true}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
      >
        {pages.map((page, index) => (
          <View key={index} style={[styles.page, { width, height, backgroundColor: page.color }]}>
            <Text style={styles.title}>{page.title}</Text>
          </View>
        ))}
      </Animated.ScrollView>
      <PageIndicator
        style={styles.pageIndicator}
        count={pages.length}
        //current={current}
        animatedCurrent={Animated.divide(scrollX, width)}
        color="white"
      />
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
  pageIndicator: {
    left: 0,
    right: 0,
    bottom: 50,
    position: 'absolute',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
});

export default App;
