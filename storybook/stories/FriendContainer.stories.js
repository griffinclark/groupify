import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { FriendContainer } from './../../src/organisms/FriendContainer';
import { users } from './../ExampleData';

storiesOf('FriendContainer', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <FriendContainer friends={users} adjustSelectedFriends={() => console.log('this is not a real function')} />
  ));
