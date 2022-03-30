/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import { RoutePropParams } from '../res/root-navigation';
import { Auth } from 'aws-amplify';
// import { DataStore } from '@aws-amplify/datastore';
import { TEAL_8, WHITE } from '../res/styles/Colors';
import { JOST } from '../res/styles/Fonts';
import { TopNavBar } from '../molecules/TopNavBar';
import { NavigationProps } from '../res/dataModels';
// import { getExpoPushToken, registerForPushNotifications } from '../res/notifications';
// import { User } from '../models';
// import { setUserPushToken } from '../res/storageFunctions';

export interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}

export const ValidateUser = ({ navigation, route }: Props) => {
  const [validationCode, setValidationCode] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const confirmRef = useRef<CodeInput>(null);

  // useEffect( () => {
  //   const loadDatastore = async () => {
  //   const userInfo = await Auth.currentUserInfo();
  //   console.log(route.params.phone);
  //   console.log('userrrrr', userInfo);
  //   };
  //   loadDatastore();
  // }, []);

  const validateUser = async () => {
    try {
      // await registerForPushNotifications();
      await Auth.confirmSignUp(route.params.phone, validationCode);
      // console.log('New User: Adding user to database');
      // const newToken = await getExpoPushToken();
      // console.log('New User: New Token', newToken);
      // await setUserPushToken(newToken);
      // console.log('newToken', newToken);
      // await DataStore.save(
      //   new User({
      //     phoneNumber: route.params.phone,
      //     name: route.params.name,
      //     pushToken: newToken,
      //   }),
      // );
      // console.log('Created new user:');
      // console.log('User created', newToken);
      // console.log('userInfo', userInfo);
      navigation.navigate('Login', { accountCreated: 'success' });
    } catch (err: any) {
      setError(err.message);
      clearError();
      setSuccess(undefined);
    }
  };

  const clearError = () => {
    setTimeout(() => {
      setError(undefined);
    }, 3000);
  };
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar
        stickyHeader={false}
        navigation={navigation}
        displayGroupify={true}
        displayBackButton={true}
        displaySettings={false}
        route={route}
        targetScreen={'createAccountForm'}
      />
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.header}>Please enter the verification code you received.</Text>
            <CodeInput
              ref={confirmRef}
              className={'border-b'}
              space={10}
              size={42}
              inputPosition="left"
              onFulfill={(code: any) => setValidationCode(code)}
              containerStyle={{ marginTop: 60 }}
              codeInputStyle={{ borderBottomWidth: 1.5, borderBottomColor: 'black', fontSize: 20 }}
              activeColor="black"
              keyboardType="numeric"
              codeLength={6}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {success ? <Text style={styles.success}>{success}</Text> : null}
            <TouchableOpacity
              onPress={() => {
                try {
                  console.log(route.params.phone);
                  Auth.resendSignUp(route.params.phone);
                  setSuccess('Sent new verification code');
                  setError(undefined);
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (err: any) {
                  console.log(err);
                  setError(err.message);
                  clearError();
                }
              }}
            >
              <Text style={styles.verification}>Send New Verification Code</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={validateUser} activeOpacity={0.7} style={styles.button}>
              <Text style={styles.buttonText}> Next </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    marginTop: 30,
    fontFamily: JOST['400'],
    paddingHorizontal: 20,
  },
  verification: {
    fontSize: 20,
    color: '#3F8A8D',
    marginTop: 30,
    fontFamily: JOST['400'],
  },
  button: {
    marginTop: 60,
    backgroundColor: TEAL_8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 335,
    marginHorizontal: 20,
    height: 39,
  },
  buttonText: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '500',
  },
  error: {
    marginTop: 20,
    textAlign: 'center',
    color: '#DD6161',
    fontSize: 16,
    fontFamily: JOST['400'],
  },
  success: {
    marginTop: 20,
    textAlign: 'center',
    color: 'green',
    fontSize: 16,
    fontFamily: JOST['400'],
  },
});
