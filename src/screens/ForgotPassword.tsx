import { Auth } from 'aws-amplify';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, View, StyleSheet } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Alert, Button, FormInput, Screen } from '../atoms/AtomsExports';
import { RoutePropParams } from '../res/root-navigation';
import { WHITE, TEAL_0 } from '../res/styles/Colors';
import { formatPhoneNumber } from '../res/utilFunctions';
import { AppText } from '../atoms/AppText';
import { BackChevronIcon } from '../../assets/Icons/BackChevron';
import { copy } from '../res/groupifyCopy';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Screen style={{ backgroundColor: WHITE }}>
        <ScrollView>
          <View style={{ flexDirection: 'row', paddingBottom: 20, marginHorizontal: 20 }}>
            <BackChevronIcon onPress={() => navigation.navigate('Login', {})} />
            <AppText style={styles.title}>{copy.forgotPasswordTitle}</AppText>
          </View>
          {route.params.step === 'phone' && (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
              <AppText style={styles.details}>{copy.phoneNumberPrompt}</AppText>
              <FormInput
                returnKeyNext={true}
                label={copy.phoneNumberFieldTitle}
                value={phone}
                onChangeText={(number) => setPhone(formatPhoneNumber(number))}
              />
              {error && <Alert status="error" message={error} />}
            </TouchableWithoutFeedback>
          )}
          {route.params.step === 'password' && (
            <View>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
                <AppText style={styles.title2}>{copy.createNewPassword}</AppText>
                <FormInput
                  returnKeyNext={true}
                  label="Verification Code"
                  onChangeText={setVerificationCode}
                  secureTextEntry={false}
                />
                <FormInput
                  returnKeyNext={true}
                  label={copy.passwordFieldTitle}
                  onChangeText={setNewPassword}
                  secureTextEntry={true}
                />
                {/* FIXME strong password not being suggested for secondary field */}
                <FormInput
                  returnKeyNext={true}
                  label={copy.confirmPasswordFieldTitle}
                  onChangeText={setConfirmNewPassword}
                  secureTextEntry={true}
                />
                {error && <Alert status="error" message={error} />}
              </TouchableWithoutFeedback>
            </View>
          )}
        </ScrollView>
        <Button
          title={copy.nextButtonTitle}
          onPress={route.params.step === 'phone' ? confirmUserPhone : confirmResetPassword}
        />
      </Screen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 15,
    color: TEAL_0,
    fontSize: 30,
    fontWeight: '400',
    paddingBottom: 20,
  },
  title2: {
    marginLeft: 20,
    fontSize: 30,
    fontWeight: '400',
    paddingBottom: 20,
  },
  details: {
    fontSize: 30,
    marginLeft: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 318,
    height: 98,
  },
});
