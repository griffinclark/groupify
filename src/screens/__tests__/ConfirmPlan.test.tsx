import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { createMock, createMockList } from 'ts-auto-mock';
import { renderWithNavigation } from '../../testing/navigationHelper';
import { Props, ConfirmPlan } from '../ConfirmPlan';
import { User } from '../../models';
import { Contact } from '../../res/dataModels';

const contact = createMockList<User>(4, (index: number): any => {})
console.log(contact);


// const mockProps = createMock<Props>({ 
//   route: {
//     data: {
//       eventData: {
//         friends: User[];
//         contacts: Contact[];
//         uuid: string;
//         title: string;
//         imageURL: string;
//         description: string;
//         tags: string[];
//         date: string;
//         time: string;
//         location: string;
//         showImage: string;
//         placeId: string;
//         message: string;
//       }
//     }
//   }
// });

describe('CreatePlan Screen', () => {
  console.log(mockProps.route);
  it('renders correctly', async () => {
    const { getByText } = render(<ConfirmPlan {...mockProps} />);

    await waitFor(() => {
      expect(getByText(`Who do you want to invite to ${}?`)).toBe(true);
    });
  });
});
