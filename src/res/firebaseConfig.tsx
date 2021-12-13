// @providesModule @react-native-firebase/remote-config
import remoteConfig from '@react-native-firebase/remote-config';
// import { firebase } from '@react-native-firebase/remote-config';

export const fetchConfig = async () => {
  await firebase
    .remoteConfig()
    .setDefaults({
      awesome_new_feature: 'disabled',
    })
    .then(() => {
      console.log('Default values set.');
    });
};

export const refreshConfig = async () => await remoteConfig().fetchAndActivate();

export const getRemoteValue = (key: string): void => remoteConfig().getValue(key).value;
