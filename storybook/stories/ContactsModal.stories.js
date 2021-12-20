import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ContactsModal } from './../../src/molecules/ContactsModal';

storiesOf('ContactsModal', module)
  .addDecorator(BufferView)
  .add('default', () => <ContactsModal enabled={true} />);
