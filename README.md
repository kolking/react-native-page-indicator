# React Native Page Indicator

React Native component designed to display the current page of a swiper, slideshow, carousel, and more. You can choose from three pre-defined design variants and further customize the look and feel according to your specific requirements. All design variants support both horizontal and vertical orientations. This package has no dependencies and utilizes React Native's `Animated` API with the native driver to achieve seamless and fluid animations.

Horizontal | Vertical
---|---
<img width="390" src="https://user-images.githubusercontent.com/4656448/233733811-9d602089-9f55-403f-b51e-916785c15837.gif"> | <img width="390" src="https://user-images.githubusercontent.com/4656448/233733820-11baaa88-a752-49ce-b64e-27d82eb9bcb7.gif">

## Design Variants

Morse | Beads | Train
---|---|---
<img width="250" src="https://github.com/kolking/react-native-page-indicator/assets/4656448/373a54f6-a706-4478-8ff6-b06df69520ca"> | <img width="250" src="https://github.com/kolking/react-native-page-indicator/assets/4656448/0ce217c0-ace5-4ac5-90df-b7a6769bd459"> | <img width="250" src="https://github.com/kolking/react-native-page-indicator/assets/4656448/2f99a23b-1d6f-46c3-8a93-95e23c89777d">

## Installation

### yarn
```sh
yarn add react-native-page-indicator
```
### npm
```sh
npm install react-native-page-indicator
```

## Basic example

Pass the total number of pages as the `count` prop and the current page index as the `current` prop.

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

To create a more engaging experience where the indicator dynamically responds to the scroll position, you can pass the current page index as an `Animated.Value` rather than a regular number. The easiest approach to obtain the animated value is by dividing the corresponding scroll position by the page width (for horizontal scrolling) or page height (for vertical scrolling).

```jsx
import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { PageIndicator } from 'react-native-page-indicator';

const pages = ['Page 1', 'Page 2', 'Page 3'];

const App = () => {
  const { width, height } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const animatedCurrent = useRef(Animated.divide(scrollX, width)).current;

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
      <View style={styles.pageIndicator}>
        <PageIndicator count={pages.length} current={animatedCurrent} />
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
  pageIndicator: {
    left: 20,
    right: 20,
    bottom: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

## Common Props

Prop | Type | Default | Description
---|---|---|---
`count` | number | | The total number of pages (required)
`current` | number \| Animated.Value | `0` | The current page index can be either a number or an animated value obtained from the scroll position
`variant` | 'morse' \| 'beads' \| 'train' | `morse` | Pre-defined design variant
`vertical` | boolean | `false` | When `true` the indicators will be stacked vertically
`color` | string | `black` | Color of the indicators
`activeColor` | string | | Optional color of the active indicator
`gap` | number | `6` | Distance between the indicators
`opacity` | number | `0.5` | Opacity of the inactive indicators
`borderRadius` | number | `size / 2` | Border radius of the indicators
`duration` | number | `500` | Animation duration (has no effect when `Animated.Value` is provided for the `current` prop)
`easing` | EasingFunction | `Easing.out()` | Animation easing function (has no effect when `Animated.Value` is provided for the `current` prop)
`style`| ViewStyle | | Style object applied to the wrapping view

## Morse Variant Props

Prop | Type | Default | Description
---|---|---|---
`size` | number | `6` | Size of the inactive indicators and the thickness of the active indicator
`dashSize` | number | `size * 4` | Length of the active indicator, cannot be smaller than `size * 2`

## Train Variant Props

Prop | Type | Default | Description
---|---|---|---
`size` | number | `6` | Thickness of the indicators
`dashSize` | number | `size * 4` | Length of the indicators, setting it to `0` will stretch the indicators to the available width

## Beads Variant Props

Prop | Type | Default | Description
---|---|---|---
`size` | number | `6` | Size of the indicators
`scale` | number | `1.5` | Scaling factor of the active indicator

## Feedback

I appreciate your feedback, so please star the repository if you like it. This is the best motivation for me to maintain the package and add new features. If you have any feature requests, found a bug, or have ideas for improvement, feel free to [open an issue](https://github.com/kolking/react-native-page-indicator/issues).

## License

Licensed under the MIT license.
