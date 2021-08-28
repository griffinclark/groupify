import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { getAllImportedContacts } from '../res/storageFunctions';
import { registerForPushNotifications, getExpoPushToken } from '../res/notifications';
import { Contact } from '../res/dataModels';
import { Alert, FormInput, Button, Screen } from '../atoms/AtomsExports';
import { User } from '../models';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard, StyleSheet, Text } from 'react-native';
import { TEAL } from '../res/styles/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { amplifyPhoneFormat, formatPhoneNumber } from '../res/utilFunctions';

interface Props {
  navigation: {
    CreateAccount: {
      step: string;
      phone: string;
    };
    params: {
      Login: string;
    };
    navigate: (ev: string, {}) => void;
    push: (ev: string, e: { email: string; step: string }) => void;
  };
}

export const LogIn: React.FC<Props> = ({ navigation }: Props) => {
  const [phone, setPhone] = useState('');
  const [formatPhone, setFormatPhone] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setFormatPhone(amplifyPhoneFormat(phone));
  }, [phone]);

  const registerUser = async (): Promise<User> => {
    await registerForPushNotifications();
    const token = await getExpoPushToken();
    const userInfo = await Auth.currentUserInfo();
    const users = await DataStore.query(User, (user) => user.phoneNumber('eq', userInfo.attributes.phone_number));
    // console.log(users);
    if (users.length > 0) {
      const user = users[0];
      // console.log(token);
      if (user.pushToken !== token) {
        console.log('Existing User: Updating users pushToken');
        await DataStore.save(
          User.copyOf(user, (updated) => {
            updated.pushToken = token;
          }),
        );
      }
      return user;
    } else {
      console.log('New User: Adding user to database');
      const newUser = await DataStore.save(
        new User({
          phoneNumber: userInfo.attributes.phone_number,
          email: userInfo.attributes.email,
          name: userInfo.attributes.name,
          pushToken: token,
          friends: [],
        }),
      );
      console.log('Created new user:');
      // console.log(newUser);
      return newUser;
    }
  };

  const logIn = async () => {
    setError(undefined);
    try {
      await Auth.signIn(formatPhone, password);
      console.log('successfully signed in');
      const user = await registerUser();
      const contacts: Contact[] = await getAllImportedContacts();
      if (contacts.length === 0) {
        navigation.navigate('ImportContactDetails', {});
      } else {
        if (user.id) {
          console.log(user);
          navigation.navigate('Home', { userID: user.id });
        }
      }
    } catch (err) {
      console.log('error signing in...', err);
      if (err.code == 'UserNotConfirmedException') {
        navigation.navigate('CreateAccount', { step: 'validate', phone: phone });
      } else if (err.code == 'InvalidParameterException' && err.message.includes('Incorrect·username·or·password.')) {
        setError('Incorrect username or password.');
      } else {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    if (phone.trim() && password.trim()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [phone, password]);

  return (
    <Screen>
      <Icon
        style={{ alignSelf: 'flex-start', marginLeft: 20 }}
        name="arrow-left"
        type="font-awesome"
        size={30}
        onPress={() => navigation.navigate('Welcome', {})}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
        <Text style={styles.title}>Log In</Text>
        <FormInput
          returnKeyNext={true}
          label="Phone Number"
          value={phone}
          onChangeText={(number) => setPhone(formatPhoneNumber(number))}
        />
        <FormInput returnKeyNext={false} label="Password" onChangeText={setPassword} secureTextEntry={true} />
        <TouchableOpacity
          style={{ alignSelf: 'center', marginBottom: 20 }}
          onPress={() => navigation.navigate('ForgotPassword', { step: 'phone' })}
        >
          <Text style={{ color: '#288EF5' }}>Forgot password?</Text>
        </TouchableOpacity>
        {error && <Alert status="error" message={error} />}
        <Button title="Sign In" onPress={logIn} disabled={disabled} />
      </TouchableWithoutFeedback>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    margin: 20,
    color: TEAL,
    fontSize: 32,
    fontWeight: '400',
  },
});
