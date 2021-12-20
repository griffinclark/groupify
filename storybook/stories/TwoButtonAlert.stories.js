import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { TwoButtonAlert } from '../../src/atoms/TwoButtonAlert';

storiesOf('🔥 TwoButtonAlert', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <TwoButtonAlert title="Title" message="Message" button1Text="Button1Text" button2Text="Button2Text" />
  ));

// TODO Find a way to display this without crashing
