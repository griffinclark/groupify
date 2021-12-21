import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ContactTile } from './../../src/molecules/ContactTile';
import { contacts } from './../ExampleData';

storiesOf('ContactTile', module)
  .addDecorator(BufferView)
  .add('selected', () => (
    <ContactTile
      isSelected={true}
      friend={contacts[0]}
      addUser={console.log('no function')}
      removeUser={console.log('no function')}
    />
  ))
  .add('notSelected', () => (
    <ContactTile
      isSelected={false}
      friend={contacts[0]}
      addUser={console.log('no function')}
      removeUser={console.log('no function')}
    />
  ));
