import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { CheckBox } from './../../src/atoms/CheckBox';

storiesOf('CheckBox', module)
  .addDecorator(BufferView)
  .add('checked', () => <CheckBox isSelected={true} />)
  .add('unchecked', () => <CheckBox isSelected={false} />);
