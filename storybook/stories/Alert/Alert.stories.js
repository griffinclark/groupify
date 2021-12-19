import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { BufferView } from '../../decorator';
import { Alert } from './../../../src/atoms/Alert';

storiesOf('Alert', module)
  .addDecorator(BufferView)
  .add('success', () => <Alert status={'success'} message={'Everybody will use Groupify :)'} />)
  .add('error', () => <Alert status={'error'} message={'Nobody will use Groupify :('} />);
