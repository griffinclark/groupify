import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { createNotification, createNotificationFromTo } from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';

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
      lightColor: '#FF231F7C',
    });
  }
};

export const getExpoPushToken = async (): Promise<string> => {
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
};

export const sendPushNotification = async (
  senderID: string,
  recipientID: string,
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

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  try {
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const notificationResponse: any = await API.graphql(
      graphqlOperation(createNotification, {
        input: {
          body: body,
          messageSubtitle: title,
        },
      }),
    );
    const notificationID = notificationResponse.data.createNotification.id;
    await API.graphql(
      graphqlOperation(createNotificationFromTo, {
        input: {
          notificationID: notificationID,
          senderID: senderID,
          recipientID: recipientID,
          senderType: 'USER',
        },
      }),
    );
  } catch (err) {
    console.log('error:', err);
  }
};
