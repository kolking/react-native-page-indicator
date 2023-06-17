import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ItemProps = {
  text: string;
  value: any;
};

type Props = {
  items: ItemProps[];
  selected?: any;
  onChange: (value: any) => void;
};

const Segmented = ({ items, selected, onChange }: Props) => {
  return (
    <View style={styles.root}>
      {items.map(({ text, value }, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.item, value === selected && styles.selected]}
          onPress={() => onChange(value)}
        >
          <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginVertical: 5,
    flexDirection: 'row',
  },
  item: {
    borderRadius: 3,
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  selected: {
    backgroundColor: '#fff3',
  },
  text: {
    fontSize: 17,
    color: 'white',
    fontWeight: '500',
  },
});

export default Segmented;
