import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { CreatedPlans } from './../../src/organisms/CreatedPlans';

storiesOf('CreatedPlans', module)
  .addDecorator(BufferView)
  .add('default', () => <CreatedPlans />);

// TODO need plans[]
//TODO need User
