# React Native Page Indicator

React Native component to display the current page of a swiper, slideshow, carousel etc. The package has zero dependencies and uses React Native's `Animated` API with native driver to produce silky-smooth animations.

Horizontal | Vertical
---|---
<img width="390" src="https://user-images.githubusercontent.com/4656448/233733811-9d602089-9f55-403f-b51e-916785c15837.gif"> | <img width="390" src="https://user-images.githubusercontent.com/4656448/233733820-11baaa88-a752-49ce-b64e-27d82eb9bcb7.gif">


## Installation

```sh
yarn add react-native-page-indicator
# or
npm install react-native-page-indicator
```

## Basic example

Pass the total number of pages in the `count` prop and the current page index in the `current` prop.

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PageIndicator } from 'react-native-page-indicator';

const MyComponent = ({ pages, current }) => (
  <View style={styles.wrapper}>
    <PageIndicator count={pages} current={current} />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyComponent;
```

## Advanced example

For a more appealing experience when the indicator directly responds to scroll position, you should pass the current page index of `Animated.Value` type to `animatedCurrent` prop. The simplest way to obtain the value is to divide scroll position by the page width (for horizontal scrolling) or page height (for vertical scrolling).

```jsx
import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { PageIndicator } from 'react-native-page-indicator';

const pages = ['Page 1', 'Page 2', 'Page 3'];

const App = () => {
  const { width, height } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
      >
        {pages.map((page, index) => (
          <View key={index} style={[styles.page, { width, height }]}>
            <Text>{page}</Text>
          </View>
        ))}
      </Animated.ScrollView>
      <PageIndicator
        style={styles.pageIndicator}
        count={pages.length}
        animatedCurrent={Animated.divide(scrollX, width)}
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
});

export default App;
```

## Props

Prop | Type | Default | Description
---|---|---|---
`count` | number | | The total number of pages (required)
`current` | number | `0` | The current page index
`color` | string | `black` | Color of the indicators
`activeColor` | string | | Optional color of the active indicator
`size` | number | `6` | Size of the indicators
`gap` | number | `6` | Distance between the indicators
`opacity` | number | `0.6` | Opacity of inactive indicators
`stroke` | number | `size * 4` | Length of the active indicator stroke
`borderRadius` | number | `size / 2` | Border radius of the indicators
`vertical` | boolean | `false` | When `true` the indicators will be stacked vertically
`duration` | number | `500` | Duration of the animation (has no effect when `animatedCurrent` provided)
`easing` | EasingFunction | `Easing.out(Easing.cubic)` | Easing function, see [available options](https://reactnative.dev/docs/easing)
`animatedCurrent` | Animated.Value | | Animated current page index
`style`| ViewStyle | | Style object applied to the wrapping View

## License

MIT