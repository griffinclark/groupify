import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { SquareImageDisplay } from './../../src/atoms/SquareImageDisplay';
import { View } from 'react-native';

storiesOf('SquareImageDisplay', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <View style={{ flex: 1, backgroundColor: '#9FA8DA' }}>
      <SquareImageDisplay imageURI="https://wallpaperaccess.com/full/1080417.jpg" />
    </View>
  ));
