import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { BufferView } from '../decorator';
import { PlanTextMessage } from './../../src/molecules/PlanTextMessage';

storiesOf('PlanTextMessage', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <PlanTextMessage
      label="Friends who don’t have Groupify yet will receive the following message:"
      text="Bacon ipsum dolor amet tri-tip cow doner kielbasa, ball tip spare ribs tail porchetta tongue shankle capicola chislic burgdoggen chicken. Pancetta bacon brisket short ribs filet mignon landjaeger chislic. Short loin short ribs picanha tail buffalo sausage tongue pastrami shank. Corned beef chicken frankfurter tail beef ribs."
    />
  ));
