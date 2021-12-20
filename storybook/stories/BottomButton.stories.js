import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { BottomButton } from './../../src/atoms/BottomButton';

storiesOf('BottomButton', module)
  .addDecorator(BufferView)
  .add('default', () => <BottomButton title="Bottom button" />);
