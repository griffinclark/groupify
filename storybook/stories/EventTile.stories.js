import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { EventTile } from '../../src/molecules/EventTile';

storiesOf('🔥 EventTile', module)
  .addDecorator(BufferView)
  .add('default', () => <EventTile enabled={true} />);
// TODO need default plan
