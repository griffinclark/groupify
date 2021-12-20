import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { FriendBubble } from './../../src/atoms/FriendBubble';

storiesOf('🔥FriendBubble', module)
  .addDecorator(BufferView)
  .add('default', () => <FriendBubble friend="" />);
// TODO need to figure out a way to display this component that makes sense
