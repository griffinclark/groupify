import { Contact } from '../dataModels';
import { createMockList } from 'ts-auto-mock';

export const getAllImportedContacts = jest.fn().mockImplementation(() => {
  const contacts = [
    { name: 'Griffen', phoneNumber: '1234567890' },
    { name: 'Samiksha', phoneNumber: '1234567890' },
    { name: 'Hassaan', phoneNumber: '1234567890' },
    { name: 'Phillip', phoneNumber: '1234567890' },
  ];
  const mockContacts = createMockList<Contact>(4, (index: number) => {
    return {
      id: index + '',
      name: contacts[index].name,
      phoneNumber: contacts[index].phoneNumber,
    };
  });

  return new Promise((resolve, reject) => {
    resolve(mockContacts);
  });
});
