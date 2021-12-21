import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ContactContainer } from './../../src/organisms/ContactContainer';
import { contacts } from './../ExampleData';

storiesOf('ContactContainer', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <ContactContainer
      contacts={contacts}
      adjustSelectedContacts={() => console.log('this is where a React state update would go')}
    />
  ));
