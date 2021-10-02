import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { render } from '@testing-library/react-native';
import { Welcome } from '../Welcome';
// import { LogIn } from '../LogIn';
// import { CreateAccount } from '../CreateAccount';
import { renderWithNavigation } from '../../testing/navigationHelper';

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
    const text = getAllByText('Don\'t have an account?');
    /* eslint-enable */
    const loginButton = getAllByText('Log In');
    const signupButton = getAllByText('Sign Up');

    expect(text).toHaveLength(1);
    expect(loginButton).toHaveLength(1);
    expect(signupButton).toHaveLength(1);
  });

  describe('navigates correctly', () => {
    // Example of other screens
    // const otherComponents = [
    // { name: 'Login', component: LogIn },
    // { name: 'CreateAccount', component: CreateAccount },
    // ];

    let wrapper: any;

    beforeEach(() => {
      // Example of calling wrapper with other screens
      // wrapper = renderWithNavigation(Welcome, otherComponents);

      wrapper = renderWithNavigation(Welcome);
    });

    it('renders welcome screen', () => {
      expect(wrapper.queryByTestId('WelcomeScreen')).toBeTruthy();
    });

    // Examples of test navigating to other screens sucessfully
    // it('navigates to login page', async () => {
    //   const loginButton = getByText('Log In');
    //   fireEvent.press(loginButton);

    //   await waitFor(() => {
    //     expect(wrapper.queryByTestId('LoginScreen')).toBeTruthy();
    //   });
    // });

    // it('navigates to create account', async () => {
    //   const button = wrapper.getByText('Sign Up');
    //   expect(button).toBeTruthy();
    //   fireEvent.press(wrapper.getByText('Sign Up'));

    // await waitFor(() => {
    //   expect(wrapper.queryByTestId('CreateAccountScreen')).toBeTruthy();
    // });
    // });
  });
});
