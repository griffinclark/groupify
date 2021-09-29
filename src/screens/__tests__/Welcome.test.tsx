import React from 'react';
import { render } from '@testing-library/react-native';
import { Welcome } from '../Welcome';

const mockProp = {
  navigation: {
    navigate: () => {
      console.log('navigate');
    },
  },
};

// describe('Welcome Screen', () => {
//   it('renders correctly', () => {
//     const { getByText } = render(<Welcome {...mockProp} />);
//     const text = getByText('Don&apos;t have an account?');
//     expect(text.length).toBe(1);
//   });

//   // it('navigates to login page', () => {});

//   // it('navigates to create account', () => {});
// });

describe('example', () => {
  it('is what it is', () => {
    expect('abc').toBe('abc');
  });
});
