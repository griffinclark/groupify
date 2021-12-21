import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { CreatedPlans } from './../../src/organisms/CreatedPlans';
import { plans, users } from '../ExampleData';

storiesOf('CreatedPlans', module)
  .addDecorator(BufferView)
  .add('default', () => <CreatedPlans userPlans={plans} invitedPlans={plans} user={users[0]} />);
