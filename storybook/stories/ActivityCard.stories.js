import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ActivityCard } from '../../src/molecules/ActivityCard';
import { locations } from './../ExampleData';

storiesOf('ActivityCard', module)
  // .addDecorator(BufferView)
  .add('default', () => (
    <ActivityCard location={locations[0]} map={false} favoritesArr={locations} setFavoritesArr={locations} />
  ));
