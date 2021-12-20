import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ActivityList } from '../../src/organisms/ActivityList';

storiesOf('ActivityList', module)
  .addDecorator(BufferView)
  .add('default', () => <ActivityList />);

// TODO need locations & TLC to get this one to work
