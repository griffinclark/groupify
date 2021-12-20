import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { View } from 'react-native';
import { Navbar } from './../../src/atoms/Navbar';

storiesOf('Navbar', module)
  .addDecorator(BufferView)
  .add('default', () => <Navbar title="Atomic navbar" />);
