import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { AppTextInput } from './../../src/atoms/AppTextInput';
import { BufferView } from '../decorator';

storiesOf('AppTextInput', module)
  .addDecorator(BufferView)
  .add('default', () => <AppTextInput placeholder="Enter your input here" />);
