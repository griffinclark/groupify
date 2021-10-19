import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { createMock } from 'ts-auto-mock';
import { Props, Welcome } from '../Welcome';
import { LogIn } from '../LogIn';
import { CreateAccount } from '../CreateAccount';
import { renderWithNavigation } from '../../testing/navigationHelper';

const mockProps = createMock<Props>();

describe('Welcome Screen', () => {
  it('renders correctly', async () => {
    const { getAllByText } = render(<Welcome {...mockProps} />);
    // debug(JSON.stringify(mockProps));
    // console.log(JSON.stringify(mockProps));
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
    // Example of other screens
    const otherComponents = [
      { name: 'Login', component: LogIn },
      { name: 'CreateAccount', component: CreateAccount },
    ];
    let wrapper: any;
    beforeEach(() => {
      // Example of calling wrapper with other screens
      wrapper = renderWithNavigation(Welcome, otherComponents);
    });
    it('renders welcome screen', async () => {
      await waitFor(() => {
        expect(wrapper.queryByTestId('WelcomeScreen')).toBeTruthy();
      });
    });
    // Examples of test navigating to other screens sucessfully
    it('navigates to login page', async () => {
      await waitFor(() => {
        fireEvent.press(wrapper.queryByTestId('WelcomeLoginButton'));
        expect(wrapper.queryByTestId('LogInScreen')).toBeTruthy();
      });
    });
    it('navigates to create account', async () => {
      await waitFor(async () => {
        fireEvent.press(wrapper.queryByTestId('WelcomeCreateButton'));
        expect(wrapper.queryByTestId('CreateAccountScreen')).toBeTruthy();
      });
    });
  });
});
