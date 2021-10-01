import React from 'react';
import { render } from '@testing-library/react-native';

import { PlanIndex } from '../PlanIndex';

const mockProp = {
  navigation: {
    navigate: () => {
      console.log('navigate');
    },
  },
};

describe('Plan Index Screen', () => {
  const { getByText, queryByTestId } = render(<PlanIndex {...mockProp} />);
  const screen = queryByTestId('PlanIndexScreen');
  const invitedTab = getByText('INVITED');
  const createdab = getByText('CREATED');

  it('renders correctly', () => {
    expect(screen).toBeTruthy();
    expect(invitedTab).toBeTruthy();
    expect(createdab).toBeTruthy();
  });
});
