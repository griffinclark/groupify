import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { createMock } from 'ts-auto-mock';
import { Props, Notifications } from '../Notifications';
import { getAllNotifications } from '../../res/storageFunctions';
import { Auth } from 'aws-amplify';

const mockProps = createMock<Props>({
  navigation: {
    navigate: jest.fn()
  },
  route: {
    params: {
      data: {
        eventData: {
          title: 'Econ 1500 Study Group in the Library',
        },
      },
    },
  }
});

const setup = () => render(<Notifications {...mockProps} />);

describe('Notifications Screen', () => {
  describe('renders correctly', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('renders the screen', async () => {
      const { getByTestId } = setup();

      await waitFor(() => {
        getByTestId('NotificationsScreen');
      });
    });

    it('renders the top nav', async () => {
      const { getByTestId } = setup();

      await waitFor(() => {
        getByTestId('navbar');
      });
    });

    it('renders tabs', async () => {
      const { getByTestId, getByText } = setup();

      await waitFor(() => {
        getByText('Notifications');
        getByTestId('AnnoucmentIcon');
        getByText('Nothing to see here!');
      });
    });

    it('renders notifications', async () => {
      const { getByText } = setup();

      await waitFor(() => {
        expect(getAllNotifications).toBeCalledTimes(1);
        getByText('invited');
        getByText('11:00PM');
        getByText('30 minutes!');
        getByText('accepted');
      });
    });
  });

  describe('it shows all notifications', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('it initially renders all notifications', async () => {
      const { queryAllByTestId } = setup();

      await waitFor(() => {
        const contactTiles = queryAllByTestId('NotificationsTile');
        expect(contactTiles).toHaveLength(7);
      });
    });
  });

  describe('it navigates correctly', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('navigates to Plan Details', async () => {
      const { getByTestId } = setup();

      await waitFor(async () => {
        const planLink = getByTestId('PlanDetailsLink');
        fireEvent.press(planLink[0]);
        fireEvent.press(planLink[1]);

        await waitFor(() => {
          expect(mockProps.navigation.navigate).toBeCalledWith('PlanDetails', mockProps.route.params);
        });
      });
    });
  });
});
