import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
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
  const loginButton = getAllByText('Log In');
  const signupButton = getAllByText('Sign Up');

  it('renders correctly', () => {
    /* eslint-disable */
    const text = getAllByText("Don't have an account?");
    /* eslint-enable */

    expect(text).toHaveLength(1);
    expect(loginButton).toHaveLength(1);
    expect(signupButton).toHaveLength(1);
  });

  it('navigates to login page', () => {
    console.log(loginButton);

    // fireEvent.press(loginButton);
  });

  // it('navigates to create account', () => {});
});
