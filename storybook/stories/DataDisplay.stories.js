import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { DataDisplay } from './../../src/organisms/DataDisplay';

storiesOf('DataDisplay', module)
  .addDecorator(BufferView)
  .add('default', () => <DataDisplay />);
// TODO need plans[]
