import AsyncStorage from "@react-native-async-storage/async-storage";
import { Event, Contact } from "../res/dataModels";


export const storeUserEvent = async (event: Event) => {
  try {
      let userEventsString = await AsyncStorage.getItem("user_events");
      let userEvents: Event[] = userEventsString !== null ? JSON.parse(userEventsString) : [];
      userEvents.push(event);
      await AsyncStorage.setItem("user_events", JSON.stringify(userEvents));
  }
  catch (e) {
      console.log("Error storing user events");
  }
}

export const getAllUserEvents = async () => {
  try {
    let userEventsString = await AsyncStorage.getItem("user_events");
    let userEvents: Event[] = userEventsString !== null ? JSON.parse(userEventsString) : [];
    return userEvents;
  }
  catch (e) {
    console.log("Error getting events");
  }
}

export const getUserEventFromUUID = async (uuid: string) => {
  try {
    let userEventsString = await AsyncStorage.getItem("user_events");
    let userEvents: Event[] = userEventsString !== null ? JSON.parse(userEventsString) : [];
    for (let e of userEvents) {
      if (e.uuid === uuid) {
        return e;
      }
    }
    console.log("there is no event with this uuid");
  }
  catch (e) {
    console.log("Error getting an event");
  }
}

export const deleteUserEventFromUUID = async (uuid: string) => {
  try {
    let userEventsString = await AsyncStorage.getItem("user_events");
    let userEvents: Event[] = userEventsString !== null ? JSON.parse(userEventsString) : [];
    for (let i = 0; i < userEvents.length; i++) {
      if (userEvents[i].uuid === uuid) {
        userEvents.splice(i, 1);
        await AsyncStorage.setItem("user_events", JSON.stringify(userEvents));
        // console.log("event deleted");
        return;
      }
    }
    console.log("there is no event with this uuid");
  }
  catch (e) {
    console.log("Error deleting an event");
  }
}

export const getAllImportedContacts = async () => {
  try {
    let userFriendsString = await AsyncStorage.getItem("user_friends");
    let userFriends: Contact[] = userFriendsString !== null ? JSON.parse(userFriendsString) : [];
    return userFriends;
  }
  catch (e) {
    console.log("Error getting user's friends");
  }
}

export const storeImportedContact = async (contact: Contact) => {
  try {
    let userFriendsString = await AsyncStorage.getItem("user_friends");
    let userFriends: Contact[] = userFriendsString !== null ? JSON.parse(userFriendsString) : [];
    userFriends.push(contact);
    // console.log("contact successfully stored");
    await AsyncStorage.setItem("user_friends", JSON.stringify(userFriends));
  }
  catch (e) {
      console.log("Error storing this contact");
  }
}

export const deleteImportedContactFromID = async (id: string) => {
  try {
    let userFriends: Contact[] = await getAllImportedContacts();
    for (let i = 0; i < userFriends.length; i++) {
      if (userFriends[i].id === id) {
        userFriends.splice(i, 1);
        await AsyncStorage.setItem("user_events", JSON.stringify(userFriends));
        // console.log("imported contact deleted");
        return;
      }
    }
    console.log("there is no imported contact with this id");
  }
  catch (e) {
    console.log("Error deleting an imported contact");
  }
}

export const deleteAllImportedContacts = async () => {
  try {
    await AsyncStorage.setItem("user_friends", JSON.stringify([]));
  }
  catch (e) {
    console.log("error deleting all imported contacts");
  }
}
