import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { AppText } from '../../src/atoms/AppText';
import { BufferView } from '../decorator';

storiesOf('AppText', module)
  .addDecorator(BufferView)
  .add('default', () => <AppText maxFontSizeMultiplier={1}> Here is some example app text </AppText>);
