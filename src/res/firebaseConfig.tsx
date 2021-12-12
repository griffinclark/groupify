try {
  remoteConfig = require('@react-native-firebase/remote-config');
} catch (e) {
  console.log(e);
}

export const fetchConfig = async () => {
  await remoteConfig()
    .setDefaults({
      awesome_new_feature: 'disabled',
    })
    .then(() => {
      console.log('Default values set.');
    });
};

export const refreshConfig = async () => await remoteConfig().fetchAndActivate();

export const getRemoteValue = (key: string): void => remoteConfig().getValue(key).value;
