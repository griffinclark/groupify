import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { NavButton } from './../../src/atoms/NavButton';

storiesOf('NavButton', module)
  .addDecorator(BufferView)
  .add('default', () => <NavButton title="Navigate to somewhere else" />);
