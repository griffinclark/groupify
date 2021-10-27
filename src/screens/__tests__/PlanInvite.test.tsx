import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react-native';
import { createMock, createMockList } from 'ts-auto-mock';
import { Props, PlanInvite } from '../PlanInvite';
import { tsObjectKeyword } from '@babel/types';

const mockProps = createMock<Props>({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  route: {
    params: {
      data: {
        eventData: {
          title: 'Example Plan Title',
        },
      },
    },
  },
});

describe('Plan Invite Screen', () => {
  describe('renders correctly', () => {
    it('renders the screen', async () => {
      const { getByTestId } = render(<PlanInvite {...mockProps} />);

      await waitFor(() => {
        getByTestId('PlanInviteScreen');
      });
    });

    it('renders the top nav', async () => {
      const { getByTestId, getByText } = render(<PlanInvite {...mockProps} />);

      await waitFor(() => {
        getByTestId('navbar');
        getByText('Invite Friends');
      });
    });

    it('renders the description', async () => {
      const { getByText } = render(<PlanInvite {...mockProps} />);

      await waitFor(() => {
        getByText('Who do you want to invite to Example Plan Title?');
      });
    });

    it('renders tabs and the input field', async () => {
      const { getByPlaceholderText, getByTestId, getByText } = render(<PlanInvite {...mockProps} />);

      await waitFor(() => {
        getByText('FRIENDS');
        getByTestId('MagIcon');
        getByPlaceholderText('Search for Friends to Invite');
      });
    });

    it('renders contacts', () => {
      expect(1).toBe(0);
    });

    it('renders bottom button', async () => {
      const { getByText } = render(<PlanInvite {...mockProps} />);

      await waitFor(() => {
        getByText('Preview Plan');
      });
    });
  });
});
