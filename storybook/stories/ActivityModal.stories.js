import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ActivityModal } from './../../src/molecules/ActivityModal';

storiesOf('ActivityModal', module)
  .addDecorator(BufferView)
  .add('default', () => <ActivityModal modal={true} setModal={null} />);
//TODO fix