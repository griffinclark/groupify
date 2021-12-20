import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { CircularImageDisplay } from './../../src/atoms/CircularImageDisplay';
import { View } from 'react-native';

storiesOf('CircularImageDisplay', module)
  .addDecorator(BufferView)
  .add('checked', () => (
    <View style={{ flex: 1, backgroundColor: '#9FA8DA' }}>
      <CircularImageDisplay imageURI="https://wallpaperaccess.com/full/1080417.jpg" />
    </View>
  ));
