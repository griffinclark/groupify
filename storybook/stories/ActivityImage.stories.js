import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ActivityImage } from '../../src/molecules/ActivityImage';

storiesOf('🔥 ActivityImage', module)
  .addDecorator(BufferView)
  .add('default', () => <ActivityImage referenceId={null} width={128} height={115} />);

//TODO fix
