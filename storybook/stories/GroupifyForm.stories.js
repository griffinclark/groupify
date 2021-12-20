import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { GroupifyForm } from './../../src/atoms/GroupifyForm';

const inputFields = [
  {
    title: 'Plan Name *',
    placeholder: '',
    settings: 'default',
    value: '',
    func: console.log('hi'),
    disabled: true,
  },
  {
    title: 'Date *',
    placeholder: 'MM/DD/YYYY',
    settings: 'default',
    value: '',
    func: console.log('hi'),
    disabled: true,
  },
  {
    title: 'Time *',
    placeholder: 'H:MM PM',
    settings: 'default',
    value: '',
    func: console.log('hi'),
    disabled: true,
  },
  {
    title: 'Description',
    placeholder: '',
    settings: 'default',
    value: '',
    func: console.log('hi'),
    disabled: true,
  },
  {
    title: 'Address',
    placeholder: '',
    settings: 'default',
    value: '',
    func: console.log('hi'),
    disabled: true,
  },
];

storiesOf('GroupifyForm', module)
  .addDecorator(BufferView)
  .add('default', () => <GroupifyForm inputList={inputFields} />);
