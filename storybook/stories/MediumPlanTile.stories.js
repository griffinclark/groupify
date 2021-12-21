import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { MediumPlanTile } from './../../src/molecules/MediumPlanTile';
import { plans } from '../ExampleData';

storiesOf('MediumPlanTile', module)
  .addDecorator(BufferView)
  .add('default', () => <MediumPlanTile plan={plans[0]} />);

// TODO Default plan
