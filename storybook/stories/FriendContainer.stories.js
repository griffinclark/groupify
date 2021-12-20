import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { FriendContainer } from './../../src/organisms/FriendContainer';

storiesOf('HomeNavBar', module)
  .addDecorator(BufferView)
  .add('default', () => <FriendContainer />);

//TODO need User[]
