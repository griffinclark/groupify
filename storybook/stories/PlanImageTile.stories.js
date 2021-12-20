import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { PlanImageTile } from './../../src/atoms/PlanImageTile';

storiesOf('🔥 PlanImageTile', module)
  .addDecorator(BufferView)
  .add('default', () => <PlanImageTile plan={{ placeID: 'ChIJgUbEo8cfqokR5lP9_Wh_DaM' }} />);

// TODO get this to work with test plan
