import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { BufferView } from '../decorator';
import { FormButton } from './../../src/atoms/Formbutton';

storiesOf('FormButton', module)
  .addDecorator(BufferView)
  .add('default', () => <FormButton title={'test'} onPress={() => action('tapped-default')} />);
