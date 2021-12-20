import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { CreatedPlanTile } from '../../src/molecules/CreatedPlanTile';

storiesOf('🔥 CreatedPlanTile', module)
  .addDecorator(BufferView)
  .add('default', () => <CreatedPlanTile />);

//   TODO need to create default plan
