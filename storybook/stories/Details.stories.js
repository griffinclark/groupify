import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { Details } from '../../src/molecules/Details';

storiesOf('🔥 Details', module)
  .addDecorator(BufferView)
  .add('default', () => <Details />);

//   TODO need default plan
