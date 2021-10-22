import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { createMock, createMockList } from 'ts-auto-mock';
import { renderWithNavigation } from '../../testing/navigationHelper';
// import { PlanInvite } from '../PlanInvite';
import { Home } from '../Home';
import { Props, ConfirmPlan } from '../ConfirmPlan';
import { User } from '../../models';
// import { Auth } from 'aws-amplify';

const friends = ['friend1', 'friend2', 'friend3', 'friend4', 'friend5'];

const mockFriends = createMockList<User>(5, (index: number) => {
  return {
    id: index + '',
    name: friends[index],
  };
});

const mockProps = createMock<Props>({
  route: {
    params: {
      data: {
        eventData: {
          friends: mockFriends,
          contacts: mockFriends,
          uuid: 'string',
          title: 'New Event',
          imageURL: 'photo',
          description: 'Its an event',
          tags: ['tag'],
          date: '12-12-12',
          time: '12:00',
          location: 'store',
          showImage: 'image',
          placeId: '1234',
          message:
            'Hey ___, [username] is inviting you to [activity] at 12:00 pm on 03/20 at location. Hope to see you there!',
        },
      },
    },
  },
});

describe('Welcome Screen', () => {
  describe('renders correctly', () => {
    it('renders the screen', async () => {
      const { getByTestId } = render(<ConfirmPlan {...mockProps} />);
      await waitFor(() => {
        const screen = getByTestId('ConfirmPlanScreen');
        expect(screen).toBeTruthy();
      });
    });

    it('renders the top nav', async () => {
      const { getByTestId, getByText } = render(<ConfirmPlan {...mockProps} />);
      await waitFor(() => {
        getByTestId('ConfirmPlanBack');
        getByText('Confirm');
      });
    });

    it('renders the descriptions and inputs', async () => {
      const { queryAllByTestId, getByText } = render(<ConfirmPlan {...mockProps} />);
      await waitFor(() => {
        getByText(
          'Almost done! Please confirm all details are correct, and that you’ve invited all you want. You can always come back and edit this event at a later time.',
        );
        getByText('Plan Name *');
        getByText('Date *');
        getByText('Description');
        getByText('Address');
        getByText('Friends who don’t have Groupify yet will receive the following message:');
        getByText('Edit Note');

        const inputs = queryAllByTestId('input');
        expect(inputs).toHaveLength(6);
      });
    });

    it('renders contacts list', async () => {
      const { queryAllByTestId, getByText } = render(<ConfirmPlan {...mockProps} />);
      await waitFor(() => {
        const contacts = queryAllByTestId('contact');
        getByText('friend1');
        getByText('friend2');
        getByText('friend3');
        getByText('friend4');
        getByText('friend5');
      });
    });

    it('renders bottom button', async () => {
      const { getByText } = render(<ConfirmPlan {...mockProps} />);
      await waitFor(() => {
        getByText('Confirm and Create Event');
      });
    });
  });

  // describe('it displays and updates input fields', () => {
  //   it('displays initial values', async () => {
  //     const { getByText } = render(<ConfirmPlan {...mockProps} />);

  //     await waitFor(() => {
  //       // getByText('New Event');
  //       getByText('12-12-12');
  //       getByText('12:00');
  //       getByText('Its an event');
  //       getByText('store');
  //       getByText(
  //         'Hey ___, [username] is inviting you to [activity] at 12:00 pm on 03/20 at location. Hope to see you there!',
  //       );
  //     });
  //   });
  // });

  describe('navigates correctly', () => {
    const otherComponents = [{ name: 'Home', component: Home }];
    let wrapper: any;
    beforeEach(() => {
      // Example of calling wrapper with other screens
      wrapper = renderWithNavigation(ConfirmPlan, otherComponents);
    });

    it('navigates back home', async () => {
      await waitFor(() => {
        fireEvent.press(wrapper.queryByTestId('ConfirmPlanBack'));
        expect(wrapper.getByTestId('CreateAccountScreen')).toBeTruthy();
      });
    });
  });
});
