import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { HomeNavBar } from '../../src/molecules/HomeNavBar';

storiesOf('HomeNavBar', module)
  .addDecorator(BufferView)
  .add('default', () => <HomeNavBar />);
