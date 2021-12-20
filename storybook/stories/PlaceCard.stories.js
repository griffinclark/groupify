import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { PlaceCard } from '../../src/molecules/PlaceCard';

storiesOf('PlaceCard', module).add('no image', () => (
  <PlaceCard name="Name" address="1111 Griffin's House" rating={3} userRatings={7} priceLevel={1} />
));

//TODO add different place cards with different options (image, no image, etc.)
// TODO need to add in something in PlaceCard to handle no image being passed in
