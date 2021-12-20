import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { PlanDetailsTile } from '../../src/molecules/PlanDetailsTile';

storiesOf('🔥 PlanDetailsTile', module)
  .addDecorator(BufferView)
  .add('creator', () => <PlanDetailsTile plan={null} creator={true} />)
  .add('notCreator', () => <PlanDetailsTile plan={null} creator={false} />);

//TODO add in fake plan
