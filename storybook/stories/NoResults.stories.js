import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { NoResults } from './../../src/molecules/NoResults';

storiesOf('NoResults', module)
  .addDecorator(BufferView)
  .add('default', () => <NoResults title="This text isn't standardized and probably differs across screens" />);
