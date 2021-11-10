import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { createMock } from 'ts-auto-mock';
import { Props, ActivitySelector } from '../ActivitySelector';

const mockProps = createMock<Props>({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
});

describe('ActivitySelector Screen', () => {
  describe('renders correctly', () => {
    it('renders the screen', async () => {
      const { getByTestId } = render(<ActivitySelector {...mockProps} />);
      await waitFor(() => {
        const screen = getByTestId('ActivitySelectorScreen');
        expect(screen).toBeTruthy();
      });
    });

    it('renders the top nav', async () => {
      const { getByTestId, getByText } = render(<ActivitySelector {...mockProps} />);
      await waitFor(() => {
        getByTestId('back');
        getByText('Activity Selector');
      });
    });

    it('renders description and searchbar', async () => {
      const { getByText, getByPlaceholderText } = render(<ActivitySelector {...mockProps} />);
      await waitFor(() => {
        getByText('What do you want to do today?');
        getByPlaceholderText('Search for Restaurants, Parks, ...');
      });
    });

    it('renders the activities', async () => {
      const { getByText, queryAllByTestId } = render(<ActivitySelector {...mockProps} />);
      await waitFor(() => {
        const activities = queryAllByTestId('activity');
        expect(activities).toHaveLength(6);
        getByText('?');
        getByText('Get Food');
        getByText('Go Outside');
        getByText('Get Fit');
        getByText('Get Shopping');
        getByText('Get Coffee');
        getByText('Get Relaxed');
      });
    });

    it('renders the lower activity selector', async () => {
      const { getByText, queryAllByTestId } = render(<ActivitySelector {...mockProps} />);
      await waitFor(() => {
        const dividers = queryAllByTestId('divider');
        expect(dividers).toHaveLength(2);
        getByText('or');
        getByText('Plan Custom Event!');
      });
    });
  });

  describe('handles modal', () => {
    it('modal is closed initailly', async () => {
      const { queryByTestId } = render(<ActivitySelector {...mockProps} />);
      await waitFor(() => {
        const activityModal = queryByTestId('activityModal');
        expect(activityModal).toBeFalsy();
      });
    });
    it('modal opens when ? is clicked', async () => {
      const { getByText, queryByTestId } = render(<ActivitySelector {...mockProps} />);
      await waitFor(() => {
        const modalTrigger = getByText('?');
        fireEvent.press(modalTrigger);
        const activityModal = queryByTestId('activityModal');
        expect(activityModal).toBeTruthy();
      });
    });
  });

  describe('navigates correctly', () => {
    it('navigates back', async () => {
      const { getByTestId } = render(<ActivitySelector {...mockProps} />);
      await waitFor(() => {
        const backButton = getByTestId('back');
        fireEvent.press(backButton);
        expect(mockProps.navigation.goBack).toBeCalledTimes(1);
      });
    });
    it('navigates to custom event', async () => {
      const { getByText } = render(<ActivitySelector {...mockProps} />);
      await waitFor(() => {
        const customButton = getByText('Plan Custom Event!');
        fireEvent.press(customButton);
        expect(mockProps.navigation.navigate).toBeCalledWith('PlanCreate', {
          currentUser: {
            attributes: {
              name: 'Mock Current User',
              phone_number: '+1234567890',
              phone_number_verified: true,
              sub: '1',
            },
            id: '1',
            username: '1',
          },
        });
      });
    });

    describe('selects activity correctly', () => {
      it('selects activity by text input', async () => {
        const { getByPlaceholderText } = render(<ActivitySelector {...mockProps} />);
        await waitFor(() => {
          const input = getByPlaceholderText('Search for Restaurants, Parks, ...');
          fireEvent.changeText(input, 'typed activity');
          fireEvent(input, 'submitEditing');
          expect(mockProps.navigation.navigate).toBeCalledWith('ActivityResults', { activity: 'typed activity' });
        });
      });
      it('selects activity by button', async () => {
        const { getByText, queryAllByTestId } = render(<ActivitySelector {...mockProps} />);
        await waitFor(() => {
          const activities = queryAllByTestId('activity');
          fireEvent.press(activities[0]);
          fireEvent.press(activities[2]);
          fireEvent.press(activities[4]);
          expect(mockProps.navigation.navigate).toBeCalledWith('ActivityResults', { activity: 'restaurant' });
          expect(mockProps.navigation.navigate).toBeCalledWith('ActivityResults', { activity: 'gym' });
          expect(mockProps.navigation.navigate).toBeCalledWith('ActivityResults', { activity: 'coffee' });
          expect(mockProps.navigation.navigate).not.toBeCalledWith('ActivityResults', { activity: 'park' });
          expect(mockProps.navigation.navigate).not.toBeCalledWith('ActivityResults', { activity: 'shopping' });
          expect(mockProps.navigation.navigate).not.toBeCalledWith('ActivityResults', { activity: 'relax' });
        });
      });
    });
  });
});
