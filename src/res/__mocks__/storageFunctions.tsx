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


export const getAllNotifications = jest.fn().mockImplementation(() => {
  const notifications = [
    { id: 1, eventName: 'Econ 1500 Study Group in the Library', user: 'Ashley Cooper' },
    { id: 2, eventName: 'Econ 1500 Study Group in the Library', user: 'Ashley Cooper', time: '11:00PM' },
    { id: 3, content: 'Bored? Make a plan and go see your friends!' },
    { id: 3, content: 'Bored? Make a plan and go see your friends!' }
  ];
  const mockNotifications = createMockList<Contact>(4, (index: number) => {
    return {
      id: index + '',
      name: notifications[index].name,
      phoneNumber: notifications[index].phoneNumber,
    };
  });

  return new Promise((resolve, reject) => {
    resolve(mockNotifications);
  });
});
