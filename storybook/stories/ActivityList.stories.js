import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ActivityList } from '../../src/organisms/ActivityList';
import { locations } from '../ExampleData';
storiesOf('ActivityList', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <ActivityList
      handleCreate={() => {
        console.log('not a function');
      }}
      locations={locations}
    />
  ));
