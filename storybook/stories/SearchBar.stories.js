import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { SearchBar } from './../../src/atoms/SearchBar';

storiesOf('SearchBar', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <SearchBar placeholder="Search for something strange" onInputChange={() => console.log('doink')} />
  ));
