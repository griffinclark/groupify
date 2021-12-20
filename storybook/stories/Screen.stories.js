import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { Screen } from './../../src/atoms/Screen';

storiesOf('Screen', module)
  .addDecorator(BufferView)
  .add('default', () => <Screen />);
