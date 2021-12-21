import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { DataDisplay } from './../../src/organisms/DataDisplay';
import { plans } from '../ExampleData';

storiesOf('DataDisplay', module)
  .addDecorator(BufferView)
  .add('default', () => <DataDisplay data={plans} />);
// TODO need plans[]
