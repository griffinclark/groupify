import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { PlanImageTile } from './../../src/atoms/PlanImageTile';
import { plans } from '../ExampleData';

storiesOf('PlanImageTile', module)
  .addDecorator(BufferView)
  .add('default', () => <PlanImageTile plan={plans[0]} />);
