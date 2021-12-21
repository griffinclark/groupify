import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { CreatedPlanTile } from '../../src/molecules/CreatedPlanTile';
import { plans } from '../ExampleData';

storiesOf('CreatedPlanTile', module)
  .addDecorator(BufferView)
  .add('default', () => <CreatedPlanTile plan={plans[0]} />);

//   TODO need to create default plan
