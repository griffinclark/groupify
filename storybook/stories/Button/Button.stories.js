import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { BufferView } from '../../decorator';
import { Button } from './../../../src/atoms/Button';

storiesOf('Button', module)
  .addDecorator(BufferView)
  .add('Big green button', () => <Button title={'test'} onPress={() => action('tapped-default')} />)

