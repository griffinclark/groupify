import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { FriendList } from './../../src/organisms/FriendList';
import { users } from '../ExampleData';

storiesOf('FriendList', module)
  .addDecorator(BufferView)
  .add('default', () => <FriendList title="title" friends={users} />);
