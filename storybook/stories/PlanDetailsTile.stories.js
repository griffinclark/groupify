import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { PlanDetailsTile } from '../../src/molecules/PlanDetailsTile';
import { plans } from '../ExampleData';

storiesOf('PlanDetailsTile', module)
  .addDecorator(BufferView)
  .add('creator', () => <PlanDetailsTile plan={plans[0]} creator={true} />)
  .add('notCreator', () => <PlanDetailsTile plan={plans[0]} creator={false} />);
