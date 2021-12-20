import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ActivityCard } from '../../src/molecules/ActivityCard';

storiesOf('🔥 ActivityCard', module)
  .addDecorator(BufferView)
  .add('default', () => <ActivityCard location={{}} map={null} />);
// TODO fix
