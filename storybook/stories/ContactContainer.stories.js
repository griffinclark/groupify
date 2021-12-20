import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ContactContainer } from './../../src/organisms/ContactContainer';

storiesOf('🔥 ContactContainer', module)
  .addDecorator(BufferView)
  .add('default', () => <ContactContainer />);

//TODO need contacts[]
