import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ActivityMap } from '../../src/organisms/ActivityMap';

storiesOf('ActivityMap', module)
  .addDecorator(BufferView)
  .add('image', () => <ActivityMap />)
  .add('noImage', () => <ActivityMap />);

// TODO need locations
