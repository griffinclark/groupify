import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { FormInput } from './../../src/atoms/FormInput';

storiesOf('FormInput', module)
  .addDecorator(BufferView)
  .add('default', () => <FormInput placeholder="Tell me your secrets" />);
