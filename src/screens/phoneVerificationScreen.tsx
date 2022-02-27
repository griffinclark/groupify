/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { WHITE } from '../res/styles/Colors';
import PhoneInput from 'react-native-phone-number-input';
import { RoutePropParams } from '../res/root-navigation';
import { formatPhoneNumber } from '../res/utilFunctions';
import * as SecureStore from 'expo-secure-store';
import { TopNavBar } from '../molecules/TopNavBar';
import { NavigationProps } from '../res/dataModels';
import { JOST } from '../res/styles/Fonts';

export interface Props {
  navigation: NavigationProps;
  route: RoutePropParams;
}

export const phoneVerificationScreen = ({ navigation, route }: Props) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [, setFormattedValue] = useState('');
  const [error, setError] = useState('');

  const phoneInputRef = useRef<PhoneInput>(null);

  useEffect(() => {
    console.log('phoneNumber', phoneNumber);
  }, [phoneNumber]);

  const setSecureStoreItem = async (key: string, value: string): Promise<void> => {
    return SecureStore.setItemAsync(key, value);
  };

  const clearError = () => {
    setTimeout(() => {
      setError('');
    }, 3000);
  };
  const handleSubmit = async () => {
    if (phoneNumber.length < 10 || phoneNumber.length > 11) {
      setError('Please enter a valid phone number');
      clearError();
      return;
    }
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    setFormattedValue(formattedPhoneNumber);
    setSecureStoreItem('phone', formattedPhoneNumber);
    navigation.push('createAccountForm', { phone: formattedPhoneNumber, step: 'create' });
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={styles.innerContainer}>
        <TopNavBar
          stickyHeader={false}
          navigation={navigation}
          displayGroupify={true}
          displayBackButton={true}
          displaySettings={false}
          route={route}
          targetScreen={'Welcome'}
        />
        <Text style={styles.header}>What&apos;s your phone number? </Text>

        <View style={styles.input}>
          <PhoneInput
            ref={phoneInputRef}
            defaultValue={phoneNumber}
            defaultCode="US"
            layout="second"
            onChangeText={(text) => {
              setPhoneNumber(text);
            }}
            autoFocus
            countryPickerButtonStyle={{
              borderRadius: 0,
              borderBottomWidth: 1,
              marginRight: 12,
              width: '30%',
            }}
            textContainerStyle={{
              borderBottomWidth: 1,
              width: '100%',
            }}
          />
        </View>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
          <View style={{ position: 'absolute', bottom: 80 }}>
            <Text style={styles.text}>
              Let&apos;s start with your phone number. You&apos;ll use it to login to Groupify, but first, we&apos;ll
              send you a code to help us verify your identity.
            </Text>
            <TouchableOpacity
              disabled={!phoneNumber}
              onPress={handleSubmit}
              activeOpacity={0.7}
              style={[styles.button, { backgroundColor: phoneNumber ? '#3F8A8D' : '#BDBDBD' }]}
            >
              <Text style={styles.buttonText}> Next </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  innerContainer: {
    backgroundColor: WHITE,
    flex: 1,
    position: 'relative',
  },
  header: {
    fontSize: 20,
    marginTop: 29,
    marginLeft: 20,
    fontFamily: JOST['400'],
  },
  input: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  error: {
    marginTop: 20,
    textAlign: 'center',
    color: '#DD6161',
    fontSize: 16,
    fontFamily: JOST['400'],
  },
  text: {
    fontSize: 16,
    marginHorizontal: 8,
    color: '#767676',
    marginBottom: 20,
    fontFamily: JOST['400'],
  },
  button: {
    marginTop: 18,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: WHITE,
    fontSize: 20,
    fontFamily: JOST['500'],
  },
});
