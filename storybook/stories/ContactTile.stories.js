import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ContactTile } from './../../src/molecules/ContactTile';
import { contacts } from './../ExampleData';

storiesOf('ContactTile', module)
  .addDecorator(BufferView)
  .add('selected', () => <ContactTile isSelected={true} />)
  .add('notSelected', () => <ContactTile isSelected={false} />);

// TODO create example friend to use here
