import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { MediumPlanTile } from './../../src/molecules/MediumPlanTile';

storiesOf('🔥 MediumPlanTile', module)
  .addDecorator(BufferView)
  .add('default', () => <MediumPlanTile />);

// TODO Default plan
