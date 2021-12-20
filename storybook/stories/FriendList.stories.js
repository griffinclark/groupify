import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { FriendList } from './../../src/organisms/FriendList';

storiesOf('FriendList', module)
  .addDecorator(BufferView)
  .add('default', () => <FriendList title="title" />);
// TODO need User[]
