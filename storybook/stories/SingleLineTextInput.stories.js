import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { SingleLineTextInput } from '../../src/atoms/SingleLineTextInput';

storiesOf('SingleLineTextInput', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <SingleLineTextInput inputText="Don't type, this isn't wired up yet" placeHolder="Enter something exciting" />
  ));
// TODO wire this up properly so user can type
