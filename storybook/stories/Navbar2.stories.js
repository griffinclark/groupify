//FIXME why the fuck do we have 2 navbars?
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { Navbar } from '../../src/molecules/Navbar';

storiesOf('Navbar2', module)
  .addDecorator(BufferView)
  .add('default', () => <Navbar />);

// TODO wtf is this component?
