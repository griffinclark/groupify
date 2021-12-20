import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { MultiLineTextInput } from './../../src/atoms/MultiLineTextInput';
import { View } from 'react-native';

storiesOf('MultiLineTextInput', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <View style={{ flex: 1, backgroundColor: '#9FA8DA' }}>
      <MultiLineTextInput placeholder="Enter your favorite things about working at Munchkin Labs" />
    </View>
  ));
