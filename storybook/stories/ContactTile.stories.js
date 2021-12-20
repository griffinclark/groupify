import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ContactTile } from './../../src/molecules/ContactTile';

storiesOf('ContactTile', module)
  .addDecorator(BufferView)
  .add('selected', () => <ContactTile isSelected={true} />)
  .add('notSelected', () => <ContactTile isSelected={false} />);

// TODO create example contact to use here
