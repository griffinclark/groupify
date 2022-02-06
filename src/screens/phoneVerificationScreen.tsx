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
} from 'react-native';
import { Header } from '../atoms/Header';
import { WHITE } from '../res/styles/Colors';
import PhoneInput from 'react-native-phone-number-input';
import { RoutePropParams } from '../res/root-navigation';
import { formatPhoneNumber } from '../res/utilFunctions';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: any, e: { phone: any; step: string }) => void;
    goBack: () => void;
  };
  route: RoutePropParams;
}

export const phoneVerificationScreen = ({ navigation, route }: Props) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [error, setError] = useState('');

  const phoneInputRef = useRef<PhoneInput>(null);

  useEffect(() => {
    console.log('phoneNumber', phoneNumber);
  }, [phoneNumber]);

  //   const setSecureStoreItem = async (key: string, value: string): Promise<void> => {
  //     return SecureStore.setItemAsync(key, value);
  //   };

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
    // setFormattedValue(formattedPhoneNumber);
    // setSecureStoreItem('phone', formattedPhoneNumber);
    navigation.push('createAccountForm', { phone: formattedPhoneNumber, step: 'create' });
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: WHITE }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={{ backgroundColor: WHITE, flex: 1, position: 'relative' }}>
        <Header navigation={navigation} title="Groupify" />
        <Text style={{ fontSize: 20, padding: 15 }}>What&apos;s your phone number? </Text>

        <View style={{ justifyContent: 'center', alignSelf: 'center', paddingVertical: 10 }}>
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
              marginRight: 8,
            }}
            textContainerStyle={{
              borderBottomWidth: 1,
            }}
          />
        </View>
        {error ? (
          <Text
            style={{
              marginTop: 15,
              backgroundColor: 'red',
              textAlign: 'center',
              marginHorizontal: 30,
              color: 'white',
              fontSize: 18,
              borderRadius: 10,
            }}
          >
            {error}
          </Text>
        ) : null}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
          <View style={{ position: 'absolute', bottom: 80 }}>
            <Text style={{ fontSize: 17, marginHorizontal: 8, color: '#767676', marginBottom: 20 }}>
              Let&apos;s start with your phone number. You&apos;ll use it to login to Groupify, but first, we&apos;ll
              send you a code to help us verify your identity.
            </Text>
            <TouchableOpacity
              disabled={!phoneNumber}
              onPress={handleSubmit}
              activeOpacity={0.7}
              style={{
                marginTop: 18,
                backgroundColor: phoneNumber ? '#3F8A8D' : '#BDBDBD',
                alignItems: 'center',
                paddingVertical: 12,
                marginHorizontal: 15,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: WHITE, fontSize: 20, fontWeight: '500' }}> Next </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
