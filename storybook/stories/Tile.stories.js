import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { Title } from '../../src/atoms/Title';

storiesOf('Tile', module)
  .addDecorator(BufferView)
  .add('default', () => <Title />);
// TODO this display isn't very helpful
