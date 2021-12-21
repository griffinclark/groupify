import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { MiniPlanTile } from './../../src/molecules/MiniPlanTile';
import { plans } from '../ExampleData';

storiesOf('MiniPlanTile', module)
  .addDecorator(BufferView)
  .add('default', () => <MiniPlanTile plan={plans[0]} />);
