import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { InviteePreviewTile } from './../../src/molecules/InviteePreviewTile';
import { plans } from '../ExampleData';

storiesOf('InviteePreviewTile', module)
  .addDecorator(BufferView)
  .add('default', () => <InviteePreviewTile plan={plans[0]} />);
