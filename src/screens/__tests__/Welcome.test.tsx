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

describe('Welcome Screen', () => {
  const { getAllByText } = render(<Welcome {...mockProp} />);

  it('renders correctly', () => {
    /* eslint-disable */
    const text = getAllByText("Don't have an account?");
    /* eslint-enable */
    const loginButton = getAllByText('Log In');
    const signupButton = getAllByText('Sign Up');

    expect(text).toHaveLength(1);
    expect(loginButton).toHaveLength(1);
    expect(signupButton).toHaveLength(1);
  });

  // it('navigates to login page', () => {});
  // it('navigates to create account', () => {});
});
