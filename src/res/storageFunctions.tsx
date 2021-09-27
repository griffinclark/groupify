import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact } from '../res/dataModels';

export const setFavoriteContacts: (contacts: Contact[]) => Promise<void> = async (contacts: Contact[]) => {
  try {
    await AsyncStorage.setItem('user_favorite_friend', JSON.stringify(contacts));
  } catch (e) {
    console.log(e);
  }
};

export const getFavoriteContacts: () => Promise<Contact[]> = async () => {
  try {
    const result = await AsyncStorage.getItem('user_favorite_friend');
    const favorites: Contact[] = result ? JSON.parse(result) : [];
    return favorites;
  } catch (e) {
    console.log(e);
    return [];
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
