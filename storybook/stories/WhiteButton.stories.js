import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { WhiteButton } from '../../src/atoms/WhiteButton';

storiesOf('WhiteButton', module)
  .addDecorator(BufferView)
  .add('default', () => <WhiteButton text="White button text" />);
