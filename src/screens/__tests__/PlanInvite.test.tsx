import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { createMock } from 'ts-auto-mock';
import { Props, PlanInvite } from '../PlanInvite';
import { getAllImportedContacts } from '../../res/storageFunctions';
// import { Auth } from 'aws-amplify';

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

const setup = () => render(<PlanInvite {...mockProps} />);

describe('Plan Invite Screen', () => {
  describe('renders correctly', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('renders the screen', async () => {
      const { getByTestId } = setup();

      await waitFor(() => {
        getByTestId('PlanInviteScreen');
      });
    });

    it('renders the top nav', async () => {
      const { getByTestId, getByText } = setup();

      await waitFor(() => {
        getByTestId('navbar');
        getByText('Invite Friends');
      });
    });

    it('renders the description', async () => {
      const { getByText } = setup();

      await waitFor(() => {
        getByText('Who do you want to invite to Example Plan Title?');
      });
    });

    it('renders tabs and the input field', async () => {
      const { getByPlaceholderText, getByTestId, getByText } = setup();

      await waitFor(() => {
        getByText('FRIENDS');
        getByTestId('MagIcon');
        getByPlaceholderText('Search for Friends to Invite');
      });
    });

    it('renders contacts', async () => {
      const { getByText, getAllByText } = setup();

      await waitFor(() => {
        expect(getAllImportedContacts).toBeCalledTimes(1);
        getByText('Griffen');
        getByText('Samiksha');
        getByText('Hassaan');
        getByText('Phillip');
        const phoneNumbers = getAllByText('1234567890');
        expect(phoneNumbers).toHaveLength(4);
      });
    });

    it('renders bottom button', async () => {
      const { getByText } = setup();

      await waitFor(() => {
        getByText('Preview Plan');
      });
    });
  });

  describe('it filters contacts', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('it initially renders all contacts', async () => {
      const { queryAllByTestId } = setup();

      await waitFor(() => {
        const contactTiles = queryAllByTestId('ContactTile');
        expect(contactTiles).toHaveLength(4);
      });
    });

    it('filters contacts unpon text input', async () => {
      const { getAllByTestId, getByTestId } = setup();

      await waitFor(async () => {
        const textInput = getByTestId('SearchBar');
        fireEvent.changeText(textInput, 'Grif');

        // await waitFor(() => {
        //   const contactTiles = getAllByTestId('ContactTile');
        //   expect(contactTiles).toHaveLength(1);
        // });
      });
    });
  });

  describe('it selects users', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('renders without any selected contacts', async () => {
      const { queryAllByTestId } = setup();

      await waitFor(() => {
        const contactTiles = queryAllByTestId('ContactTile');
        expect(contactTiles).toHaveLength(4);
        const selectedContacts = queryAllByTestId('SelectedIcon');
        expect(selectedContacts).toHaveLength(0);
      });
    });

    it('selects contacts by pressing', async () => {
      const { queryAllByTestId } = setup();

      await waitFor(() => {
        const contactTiles = queryAllByTestId('ContactTile');
        fireEvent.press(contactTiles[0]);
        fireEvent.press(contactTiles[1]);
        const selectedContacts = queryAllByTestId('SelectedIcon');
        expect(selectedContacts).toHaveLength(2);
      });
    });
  });

  describe('it navigates correctly', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it('navigates to create plan with plan info when clicking back icon', async () => {
      const { getByTestId } = setup();
      await waitFor(() => {
        const backButton = getByTestId('BackIcon');
        fireEvent.press(backButton);
        expect(mockProps.navigation.navigate).toBeCalledWith('PlanCreate', mockProps.route.params);
      });
    });

    // it('does not navigate to Plan Details if no contacts are selected', async () => {
    //   const { getByText } = setup();

    //   await waitFor(() => {
    //     const button = getByText('Preview Plan');
    //     fireEvent.press(button);
    //     expect(mockProps.navigation.navigate).toBeCalledTimes(0);
    //   });
    // });

    it('it navigates to Plan Details with correct info if contacts selected', async () => {
      const { getByText, queryAllByTestId } = setup();
      await waitFor(async () => {
        const contactTiles = queryAllByTestId('ContactTile');
        fireEvent.press(contactTiles[0]);
        fireEvent.press(contactTiles[1]);

        // await waitFor(() => {
        //   const button = getByText('Preview Plan');
        //   fireEvent.press(button);

        //   expect(Auth.currentUserInfo).toBeCalled();
        // });
      });
    });
  });
});
