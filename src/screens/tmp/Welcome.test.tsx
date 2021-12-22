import React from 'react';
import { cleanup, render, waitFor, fireEvent } from '@testing-library/react-native';
import { createMock } from 'ts-auto-mock';
import { Props, Welcome } from '../Welcome';

const mockProps = createMock<Props>({
  navigation: {
    navigate: jest.fn(),
  },
});

describe('Welcome Screen', () => {
  afterEach(cleanup);
  it('renders correctly', async () => {
    const { getAllByText } = render(<Welcome {...mockProps} />);
    await waitFor(() => {
      /* eslint-disable */
      const text = getAllByText("Don't have an account?");
      /* eslint-enable */
      expect(text).toHaveLength(1);
      const loginButton = getAllByText('Log In');
      expect(loginButton).toHaveLength(1);
      const signupButton = getAllByText('Sign Up');
      expect(signupButton).toHaveLength(1);
    });
  });

  describe('navigates correctly', () => {
    it('navigates to login screen', async () => {
      const { getByText } = render(<Welcome {...mockProps} />);

      await waitFor(() => {
        const loginButton = getByText('Log In');
        fireEvent.press(loginButton);
        expect(mockProps.navigation.navigate).toBeCalled();
      });
    });

    it('navigates to create account screen', async () => {
      const { getByText } = render(<Welcome {...mockProps} />);

      await waitFor(() => {
        const createButton = getByText('Sign Up');
        fireEvent.press(createButton);
        expect(mockProps.navigation.navigate).toBeCalledWith('CreateAccount', {});
      });
    });
  });
});
