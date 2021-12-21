import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { Details } from '../../src/molecules/Details';
import { plans } from '../ExampleData';

storiesOf('Details', module)
  .addDecorator(BufferView)
  .add('default', () => <Details plan={plans[0]} />);

  // TODO not displaying