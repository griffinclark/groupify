import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react-native';
import { createMock } from 'ts-auto-mock';
import { Props, Welcome } from '../Welcome';
// import { Props as LogInProps, LogIn } from '../LogIn';
// import { Props as CreateAccountProps, CreateAccount } from '../CreateAccount';
// import { renderWithNavigation } from '../../testing/navigationHelper';

const mockProps = createMock<Props>();

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

  // Actual Navigation: Temporarily not working
  // describe('navigates correctly', () => {
  //   afterEach(cleanup);
  //   // Example of other screens
  //   const LogInmockProps = createMock<LogInProps>();
  //   const CreateAccountMockProps = createMock<CreateAccountProps>();
  //   const otherComponents = [
  //     { name: 'Login', Component: LogIn, props: LogInmockProps },
  //     { name: 'CreateAccount', Component: CreateAccount, props: CreateAccountMockProps },
  //   ];
  //   let wrapper: any;
  //   beforeEach(() => {
  //     // Example of calling wrapper with other screens
  //     wrapper = renderWithNavigation(Welcome, mockProps, otherComponents);
  //   });
  //   it('renders welcome screen', async () => {
  //     await waitFor(() => {
  //       expect(wrapper.queryByTestId('WelcomeScreen')).toBeTruthy();
  //     });
  //   });
  // Examples of test navigating to other screens sucessfully
  // it('navigates to login page', async () => {
  //   fireEvent.press(wrapper.getByTestId('WelcomeLoginButton'));
  //   await waitFor(async () => {
  // const loginScreen = await wrapper.getByTestId('LogInScreen');
  // expect(loginScreen).toBeTruthy();
  // wrapper.debug();
  //   });
  // });
  // it('navigates to create account', async () => {
  //   await waitFor(async () => {
  //     fireEvent.press(wrapper.queryByTestId('WelcomeCreateButton'));
  //     expect(wrapper.queryByTestId('CreateAccountScreen')).toBeTruthy();
  //   });
  // });
  // });
});
