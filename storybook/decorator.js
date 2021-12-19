import { React } from 'react';
import { View } from 'react-native';

export const BufferView = (storyFn) => (
  <View style={{ flex: 1, marginVertical: 120, marginHorizontal: 20 }}>{storyFn()}</View>
);
