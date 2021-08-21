import { Auth } from 'aws-amplify';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Alert } from '../atoms/AlertModal';
import { Button } from '../atoms/Button';
import { FormInput } from '../atoms/FormInput';
import { NavButton } from '../atoms/NavButton';
import { Screen } from '../atoms/Screen';
import { Title } from '../atoms/Title';
import { Navbar } from '../molecules/Navbar';
import { RoutePropParams } from '../res/root-navigation';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
  route: RoutePropParams;
}

export const ForgotPassword: React.FC<Props> = ({ navigation, route }: Props) => {
  const [phone, setPhone] = useState('');
  const [formatPhone, setFormatPhone] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

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

  const confirmUserPhone = async () => {
    try {
      await Auth.forgotPassword(formatPhone).then(() => {
        setError(undefined);
        navigation.push('ForgotPassword', { step: 'password', phone: formatPhone });
      });
    } catch (error) {
      if (error.code === 'UserNotFoundException') {
        setError('User not found');
      } else {
        setError(error.message);
      }
    }
  };

  const confirmResetPassword = () => {
    if (verificationCode && confirmNewPassword && newPassword) {
      if (confirmNewPassword === newPassword) {
        try {
          Auth.forgotPasswordSubmit(route.params.phone, verificationCode, newPassword).then(() => {
            navigation.navigate('Login', {});
            console.log('Successfully reset password');
            })
            .catch((error) => setError(error.message));
        } catch (error) {
          console.log(error);
        }
      } else {
        setError('Passwords do not match');
      }
    }
  };

  return (
    <Screen>
      <Navbar>
        <NavButton onPress={() => navigation.navigate('Welcome', {})} title="Back" />
      </Navbar>
      {route.params.step === 'phone' && (
        <View>
          <Title>Enter Phone Number</Title>
          <FormInput
            returnKeyNext={true}
            label="Phone Number"
            value={phone}
            onChangeText={(e) => setPhone(formatPhoneNumber(e))}
          />
          {error && <Alert status="error" message={error} />}
          <Button title="Reset Password" onPress={confirmUserPhone} />
        </View>
      )}
      {route.params.step === 'password' && (
        <View>
          <FormInput
            returnKeyNext={true}
            label="Verification Code"
            onChangeText={setVerificationCode}
            secureTextEntry={false}
          />
          <FormInput returnKeyNext={true} label="New Password" onChangeText={setNewPassword} secureTextEntry={true} />
          <FormInput
            returnKeyNext={false}
            label="Confirm New Password"
            onChangeText={setConfirmNewPassword}
            secureTextEntry={true}
          />
          {error && <Alert status="error" message={error} />}
          <Button title="Confirm New Password" onPress={confirmResetPassword} />
        </View>
      )}
    </Screen>
  );
};
