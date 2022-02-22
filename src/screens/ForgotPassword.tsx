import { Auth } from 'aws-amplify';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import React, { useEffect, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, View, StyleSheet, Dimensions } from 'react-native';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Alert, Button, FormInput, Screen } from '../atoms/AtomsExports';
import { RoutePropParams } from '../res/root-navigation';
import { WHITE, TEAL_0, GREY_3 } from '../res/styles/Colors';
import { formatPhoneNumber } from '../res/utilFunctions';
import { AppText } from '../atoms/AppText';
import { copy } from '../res/groupifyCopy';
import { TopNavBar } from '../molecules/TopNavBar';
import { NavigationProps } from '../res/dataModels';
import { globalStyles } from '../res/styles/GlobalStyles';
import { JOST } from '../res/styles/Fonts';

interface Props {
  navigation: NavigationProps;
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
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled={false}>
      <Screen style={{ backgroundColor: WHITE }}>
        <TopNavBar
          stickyHeader={false}
          navigation={navigation}
          displayGroupify={true}
          displayBackButton={true}
          displaySettings={false}
          route={route}
          targetScreen={'Welcome'}
        />
        <View style={{paddingVertical: 29, paddingHorizontal: 20, flex: 1}}>
          <View style={{flex: 1}}>
            {route.params.step === 'phone' && (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true} style={{height: '100%'}}>
                <AppText style={[globalStyles.bodyLarge, {marginBottom: 20}]}>{copy.phoneNumberPrompt}</AppText>
                <FormInput
                  returnKeyNext={true}
                  label={copy.phoneNumberFieldTitle}
                  value={phone}
                  onChangeText={(number) => setPhone(formatPhoneNumber(number))}
                />
                <AppText style={[globalStyles.bodyMedium, {color: GREY_3, marginTop: 30}]}>{copy.phoneNumberInstruction}</AppText>
                {error && <Alert status="error" message={error} />}
              </TouchableWithoutFeedback>
            )}
            {route.params.step === 'password' && (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
                <AppText style={[globalStyles.bodyLarge, {marginBottom: 20}]}>{copy.createNewPassword}</AppText>
                <FormInput
                  returnKeyNext={true}
                  label="Verification Code"
                  onChangeText={setVerificationCode}
                  secureTextEntry={false}
                  placeholder="Enter Code"
                />
                <FormInput
                  returnKeyNext={true}
                  label={copy.passwordFieldTitle}
                  onChangeText={setNewPassword}
                  secureTextEntry={true}
                  placeholder="Enter Password"
                />
                {/* FIXME strong password not being suggested for secondary field */}
                <FormInput
                  returnKeyNext={true}
                  label={copy.confirmPasswordFieldTitle}
                  onChangeText={setConfirmNewPassword}
                  secureTextEntry={true}
                  placeholder="Confirm Password"
                />
                {error && <Alert status="error" message={error} />}
              </TouchableWithoutFeedback>
            )}
          </View>
          
          <Button
            containerStyle={{alignSelf: 'flex-end'}}
            buttonStyle={{ borderRadius: 5, width: Dimensions.get('screen').width - 40, marginTop: 60}}
            title={copy.nextButtonTitle}
            textStyle={{ fontSize: 20, fontFamily: JOST['500'] }}
            disabled={phone.trim().length === 0 && !(verificationCode && confirmNewPassword && newPassword)}
            onPress={route.params.step === 'phone' ? confirmUserPhone : confirmResetPassword}
          />
        </View>
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
