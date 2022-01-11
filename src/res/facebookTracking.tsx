import * as Facebook from 'expo-facebook';
//Asks for permission for facebook to track user data, used in App.tsx

const appId = '693164164986653';
const appName = 'Munchkin Labs';

export const facebookInit = async (): Promise<void> => {
  await Facebook.initializeAsync({ appId: appId, appName: appName });
  const response = await Facebook.getPermissionsAsync();
  let finalResponse = response;
  if (response.status == 'undetermined') {
    const newResponse = await Facebook.requestPermissionsAsync();
    finalResponse = newResponse;
  } else if (finalResponse.granted == true) {
    console.log('The user HAS granted data permissions for facebook');
    await Facebook.setAdvertiserTrackingEnabledAsync(true);
  } else {
    console.log('The user HAS NOT granted data permissions for facebook');
    await Facebook.setAdvertiserTrackingEnabledAsync(false);
  }
};
