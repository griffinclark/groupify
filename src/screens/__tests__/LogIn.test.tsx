import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { createMock } from 'ts-auto-mock';
import { renderWithNavigation } from '../../testing/navigationHelper';
import { Props, LogIn } from '../LogIn';
import { CreateAccount } from '../CreateAccount';
import { ForgotPassword } from '../ForgotPassword';
// import { Home } from '../Home';
// import Amplify, { Auth } from 'aws-amplify';

const mockProps = createMock<Props>();

describe('LogIn Screen', () => {
  it('is', () => {
    expect(true).toBe(true);
  });
  it('renders correctly', async () => {
    const { getByTestId, getByText } = render(<LogIn {...mockProps} />);

    await waitFor(() => {
      const page = getByTestId('LogInScreen');
      expect(page).toBeTruthy();
      const name = getByText('Phone Number');
      expect(name).toBeTruthy();
      const password = getByText('Password');
      expect(password).toBeTruthy();
    });
  });

  describe('navigates correctly', () => {
    const otherComponents = [
      { name: 'ForgotPassword', component: ForgotPassword },
      { name: 'CreateAccount', component: CreateAccount },
    ];

    let wrapper: any;
    beforeEach(() => {
      // Example of calling wrapper with other screens
      wrapper = renderWithNavigation(LogIn, otherComponents);
    });

    it('renders login screen', async () => {
      await waitFor(() => {
        expect(wrapper.queryByTestId('LogInScreen')).toBeTruthy();
      });
    });

    // Examples of test navigating to other screens sucessfully
    it('navigates to create account page', async () => {
      await waitFor(() => {
        fireEvent.press(wrapper.getByText('Create one today!'));
        expect(wrapper.queryByTestId('CreateAccountScreen')).toBeTruthy();
      });
    });
  });
});
