import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ActivityMap } from '../../src/organisms/ActivityMap';
import { locations } from './../ExampleData';
import { Text } from 'react-native';

storiesOf('ActivityMap', module)
  .addDecorator(BufferView)
  .add('image', () => (
    // <ActivityMap
    //   handleCreate={() => {
    //     console.log('not a function');
    //   }}
    //   locations={locations}
    //   navigation={null}
    // />
    <Text>If this is important, contact Griffin and he will fix it</Text>
  ));

