import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { DataStore } from '@aws-amplify/datastore';
import { getAllImportedContacts } from '../res/storageFunctions';
import { registerForPushNotifications, getExpoPushToken } from '../res/notifications';
import { Contact } from '../res/dataModels';
import { Navbar } from '../molecules/MoleculesExports';
import { Title, NavButton, Alert, FormInput, Button, Screen } from '../atoms/AtomsExports';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { User } from '../models';

interface Props {
  navigation: {
    CreateAccount: {
      step: string;
      phone: string;
    };
    params: {
      Login: string;
    };
    navigate:
      | ((ev: string, a?: { step?: string; phone?: string }) => void)
      | ((ev: string, a?: { data?: { prevAction?: string } }) => void)
      | ((ev: string, a?: { userID?: string }) => void);
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

  const amplifyPhoneFormat = (phone: string) => {
    if (phone.length > 10) {
      const util = PhoneNumberUtil.getInstance();
      const num = util.parseAndKeepRawInput(phone, 'US');
      return util.format(num, PhoneNumberFormat.E164);
    }
    return phone;
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    if (phoneNumberLength < 11) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }
    return phoneNumber;
  };

  const registerUser = async (): Promise<User> => {
    await registerForPushNotifications();
    const token = await getExpoPushToken();
    const userInfo = await Auth.currentUserInfo();
    const users = await DataStore.query(User, (user) => user.phoneNumber('eq', userInfo.attributes.phone_number));
    // console.log(users);
    if (users.length > 0) {
      const user = users[0];
      console.log('Existing User: Updating users pushToken');
      if (user.pushToken !== token) {
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
      console.log(newUser);
      return newUser;
    }
  };

  const logIn = async () => {
    console.log(formatPhone);
    setError(undefined);
    try {
      await Auth.signIn(formatPhone, password);
      console.log('successfully signed in');
      const user = await registerUser();
      console.log(user);
      const contacts: Contact[] = await getAllImportedContacts();
      if (contacts.length === 0) {
        navigation.navigate('ImportContacts');
      } else {
        navigation.navigate('Home', { userID: user.id });
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
      <Navbar>
        <NavButton onPress={() => navigation.navigate('Welcome')} title="Back" />
      </Navbar>
      <Title>Log In</Title>
      <FormInput label="Phone Number" value={phone} onChangeText={(e) => setPhone(formatPhoneNumber(e))} />
      <FormInput label="Password" onChangeText={setPassword} secureTextEntry={true} />
      {error && <Alert status="error" message={error} />}
      <Button title="Sign In" onPress={logIn} disabled={disabled} />
    </Screen>
  );
};
