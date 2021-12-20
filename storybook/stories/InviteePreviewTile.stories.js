import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { InviteePreviewTile } from './../../src/molecules/InviteePreviewTile';

storiesOf('🔥 InviteePreviewTile', module)
  .addDecorator(BufferView)
  .add('default', () => <InviteePreviewTile />);

// TODO default plan
