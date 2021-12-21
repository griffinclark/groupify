import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { FriendBubble } from './../../src/atoms/FriendBubble';
import { users } from './../ExampleData';

storiesOf('FriendBubble', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <FriendBubble
      friend={users[0]}
      addUser={() => {
        console.log('no function');
      }}
      removeUser={() => {
        console.log('no function');
      }}
      selectedFriends={users}
    />
  ));
