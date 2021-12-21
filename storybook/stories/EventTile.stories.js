import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { EventTile } from '../../src/molecules/EventTile';
import { plans } from '../ExampleData';

storiesOf('EventTile', module)
  .addDecorator(BufferView)
  .add('default', () => <EventTile enabled={true} plan={plans[0]} />);
