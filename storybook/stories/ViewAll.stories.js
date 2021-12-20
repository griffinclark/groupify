import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ViewAll } from './../../src/atoms/ViewAll';

storiesOf('ViewAll', module)
  .addDecorator(BufferView)
  .add('default', () => <ViewAll navigation={null} destination={null} payload={null} />);
// TODO Find a way to display this without crashing
