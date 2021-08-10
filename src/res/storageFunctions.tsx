import AsyncStorage from '@react-native-async-storage/async-storage';
import { Event, Contact } from '../res/dataModels';

// Functions for storing user events

export const storeUserEvent: (uuid: Event) => Promise<void> = async (event: Event) => {
  try {
    const userEventsString = await AsyncStorage.getItem('user_events');
    const userEvents: Event[] = userEventsString !== null ? JSON.parse(userEventsString) : [];
    userEvents.push(event);
    await AsyncStorage.setItem('user_events', JSON.stringify(userEvents));
  } catch (e) {
    console.log('Error storing user events');
  }
};

export const getAllUserEvents: () => Promise<Event[]> = async () => {
  try {
    const userEventsString = await AsyncStorage.getItem('user_events');
    const userEvents: Event[] = userEventsString !== null ? JSON.parse(userEventsString) : [];
    return userEvents;
  } catch (e) {
    console.log('Error getting events');
    return [];
  }
};

export const getUserEventFromUUID: (uuid: string) => Promise<Event | undefined> = async (uuid: string) => {
  try {
    const userEventsString = await AsyncStorage.getItem('user_events');
    const userEvents: Event[] = userEventsString !== null ? JSON.parse(userEventsString) : [];
    for (const e of userEvents) {
      if (e.uuid === uuid) {
        return e;
      }
    }
    console.log('there is no event with this uuid');
  } catch (e) {
    console.log('Error getting an event');
  }
};

export const deleteUserEventFromUUID: (uuid: string) => Promise<void> = async (uuid: string) => {
  try {
    const userEventsString = await AsyncStorage.getItem('user_events');
    const userEvents: Event[] = userEventsString !== null ? JSON.parse(userEventsString) : [];
    for (let i = 0; i < userEvents.length; i++) {
      if (userEvents[i].uuid === uuid) {
        userEvents.splice(i, 1);
        await AsyncStorage.setItem('user_events', JSON.stringify(userEvents));
        return;
      }
    }
    console.log('there is no event with this uuid');
  } catch (e) {
    console.log('Error deleting an event');
  }
};

export const getAllImportedContacts: () => Promise<Contact[]> = async () => {
  try {
    const userFriendsString = await AsyncStorage.getItem('user_friends');
    const userFriends: Contact[] = userFriendsString ? JSON.parse(userFriendsString) : [];
    return userFriends;
  } catch (e) {
    console.log('Error getting user friends');
    return [];
  }
};

export const storeImportedContact: (contact: Contact) => Promise<void> = async (contact: Contact) => {
  try {
    const userFriends: Contact[] = await getAllImportedContacts();
    userFriends.push(contact);
    await AsyncStorage.setItem('user_friends', JSON.stringify(userFriends));
  } catch (e) {
    console.log('Error storing this contact');
  }
};

// export const eventObject: () => Promise<void> = async () => {

// };

export const deleteImportedContactFromID: (id: string) => Promise<void> = async (id: string) => {
  try {
    const userFriends: Contact[] = await getAllImportedContacts();
    for (let i = 0; i < userFriends.length; i++) {
      if (userFriends[i].id === id) {
        userFriends.splice(i, 1);
        await AsyncStorage.setItem('user_friends', JSON.stringify(userFriends));
        return;
      }
    }
    console.log('there is no imported contact with this id');
  } catch (e) {
    console.log('Error deleting an imported contact');
  }
};

export const deleteAllImportedContacts: () => Promise<void> = async () => {
  try {
    await AsyncStorage.setItem('user_friends', JSON.stringify([]));
  } catch (e) {
    console.log('error deleting all imported contacts');
  }
};

export const clearAllEvents: () => Promise<void> = async () => {
  let keys: string[] = [];
  try {
    await AsyncStorage.removeItem('user_events');
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    // read key error
  }
  console.log('All events cleared:', keys);
};
