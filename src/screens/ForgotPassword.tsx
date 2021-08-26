import { Auth } from 'aws-amplify';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import React, { useEffect, useState } from 'react';
import { Keyboard, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Alert } from '../atoms/AlertModal';
import { Button } from '../atoms/Button';
import { FormInput } from '../atoms/FormInput';
import { Screen } from '../atoms/Screen';
import { RoutePropParams } from '../res/root-navigation';
import { TEAL } from '../res/styles/Colors';
import { formatPhoneNumber } from '../res/utilFunctions';

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
          Auth.forgotPasswordSubmit(route.params.phone, verificationCode, newPassword)
            .then(() => {
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
    } else {
      if (!verificationCode) {
        setError('Enter verification code');
      }
      if (!newPassword) {
        setError('Enter new password');
      }
      if (!confirmNewPassword) {
        setError('Confirm new password');
      }
    }
  };

  return (
    <Screen>
      <Icon
        style={{ alignSelf: 'flex-start', marginLeft: 20 }}
        name="arrow-left"
        type="font-awesome"
        size={30}
        onPress={() => navigation.navigate('Login', {})}
      />
      {route.params.step === 'phone' && (
        <View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <Text style={styles.title}>Enter Phone Number</Text>
            <FormInput
              returnKeyNext={true}
              label="Phone Number"
              value={phone}
              onChangeText={(number) => setPhone(formatPhoneNumber(number))}
            />
            {error && <Alert status="error" message={error} />}
            <Button title="Submit" onPress={confirmUserPhone} />
          </TouchableWithoutFeedback>
        </View>
      )}
      {route.params.step === 'password' && (
        <View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
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
          </TouchableWithoutFeedback>
        </View>
      )}
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
