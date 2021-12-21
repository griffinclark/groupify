import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { ActivityImage } from '../../src/molecules/ActivityImage';

storiesOf('ActivityImage', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <ActivityImage
      referenceId={
        'Aap_uED1xmW2OtwaiGkrCOTMiQ6F0uX0yTgaHPNcQzfYEWhfHv8nSeAr0-UbkhhloexFGwREe3f0XMMUn68MqUKX_lUEKrK4dmv_I0uDT0sneUi4zJLrjYmD1dOGkg5k6sOeYubFPU_QjVuCo23o1ns5bsk1z8hzz1wrsd7axg2hX4zB8Qd0'
      }
      width={128}
      height={115}
    />
  ));
