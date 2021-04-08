import AsyncStorage from "@react-native-async-storage/async-storage";
import { Event } from "../res/dataModels";


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

export const getUserEventFromUUID = async (uuid: string, func) => {
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