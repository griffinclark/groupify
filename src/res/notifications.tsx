import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { ALERT } from './styles/Colors';
import {createNotification, createNotificationFromTo} from '../graphql/mutations.js';
import { API, graphqlOperation } from 'aws-amplify';
import { NotificationMessage } from './dataModels';

export const registerForPushNotifications = async (): Promise<void> => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
  } else {
    console.log('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: ALERT,
    });
  }
};

export const getExpoPushToken = async (): Promise<string> => {
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
};

export const sendPushNotification = async (
  expoPushToken: string,
  title: string,
  body: string,
  data: Record<string, unknown>,
): Promise<void> => {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: data,
  };
  // console.log(JSON.stringify(message));

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};

export const createNotificationAWS = async (msg: NotificationMessage) => {
  if(!msg.body) return;

  try {
      const notificationResponse : any = await API.graphql(graphqlOperation(createNotification, {input: {body: msg.body, meassageSubtitle: msg.title}}));

      return notificationResponse.data?.createNotifcation;
  } catch (err) {
      console.log('error:', err);
  }
}

export const createNotificationFromToAWS = async (notificationId:string, recipientId: string, senderType: 'USER' | 'NOTIFICATIONPANEL') => {
  try {
      const notificationFromToRespose : any = await API.graphql(graphqlOperation(createNotificationFromTo, {input: {notificationID: notificationId, recipientID: recipientId, senderType: senderType}}));
      
      return notificationFromToRespose.data.createNotificationFromTo;
  } catch (err) {
      console.log('error:' , err);
  }
}
