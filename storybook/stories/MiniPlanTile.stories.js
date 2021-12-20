import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { MiniPlanTile } from './../../src/molecules/MiniPlanTile';

storiesOf('🔥 MiniPlanTile', module)
  .addDecorator(BufferView)
  .add('default', () => <MiniPlanTile />);

// TODO Default plan
