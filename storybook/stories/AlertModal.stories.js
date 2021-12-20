import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { AlertModal } from '../../src/molecules/AlertModal';

storiesOf('AlertModal', module).add('default', () => (
  <AlertModal
    title={'Alert Title'}
    subtitle={'Any other information given about the alert'}
    yesButton="Yes "
    noButton="No"
  />
));
