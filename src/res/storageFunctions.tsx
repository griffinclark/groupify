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