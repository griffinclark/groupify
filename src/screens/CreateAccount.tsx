import { RoutePropParams } from '../res/root-navigation';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Title, Screen, FormInput, Button, Alert } from '../atoms/AtomsExports';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { TEAL } from '../res/styles/Colors';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { amplifyPhoneFormat, formatPhoneNumber } from '../res/utilFunctions';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string, e: { phone: string; step: string }) => void;
  };
  route: RoutePropParams;
}

export const CreateAccount: React.FC<Props> = ({ navigation, route }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [formatPhone, setFormatPhone] = useState<string>('');
  const [validationCode, setCode] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  useEffect(() => {
    if (route.params.step == 'create' && email && password && name && phone) {
      setDisabled(false);
    } else if (route.params.step == 'validate' && validationCode) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password, name, phone, formatPhone, validationCode]);

  useEffect(() => {
    setName(firstName + ' ' + lastName);
  }, [firstName, lastName]);

  useEffect(() => {
    setPhone(formatPhoneNumber(phone));
    setFormatPhone(amplifyPhoneFormat(phone));
  }, [phone]);

  const invalidInput = (phoneNumber: string) => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (!phoneRegex.test(phone) && phoneNumber.length > 10) {
      setError('Invalid phone number');
      return true;
    } else if (password.includes(' ')) {
      setError('Password cannot contain spaces');
      return true;
    } else {
      return false;
    }
  };

  // sign the user up
  const signUp = async () => {
    if (invalidInput(formatPhone)) {
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!firstName) {
      setError('Please enter your first name');
      return;
    }
    if (!lastName) {
      setError('Please enter your last name');
      return;
    }
    try {
      await Auth.signUp({
        username: formatPhone,
        password,
        attributes: {
          phone_number: formatPhone,
          name: name,
        },
        // validationData: [
        //   {
        //     Name: 'phoneNumber',
        //     Value: formatPhone,
        //   },
        // ],
      });
      console.log('user successfully created');
      setError(undefined);
      navigation.push('CreateAccount', { step: 'validate', phone: formatPhone });
    } catch (err) {
      console.log('Error: ', err);
      if (err.code == 'InvalidParameterException') {
        if (err.message == 'Username should be an email.') {
          setError('Please enter a valid email');
        } else if (err.message.includes('password')) {
          setError('Password must be at least 8 characters');
        } else {
          setError(err.message);
        }
      } else if (err.code == 'InvalidPasswordException') {
        setError('Password must be at least 8 characters');
      } else if (
        err.code === 'UserLambdaValidationException' &&
        err.message == 'PreSignUp failed with error phoneNumber already exists!.'
      ) {
        err.message = 'phone number already exists';
      } else {
        setError(err.message);
      }
    }
  };

  const validateUser = async () => {
    try {
      await Auth.confirmSignUp(route.params.phone, validationCode);
      navigation.navigate('Login', {});
    } catch (err) {
      console.log('Error: ', err);
      setError(err.message);
      setSuccess(undefined);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? -300 : -200}
      behavior={Platform.OS === 'ios' ? 'position' : 'position'}
    >
      <Screen>
        <Icon
          style={{ alignSelf: 'flex-start', marginLeft: 20 }}
          name="arrow-left"
          type="font-awesome"
          size={30}
          onPress={() => navigation.navigate('Welcome', {})}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
          {route.params.step === 'create' && (
            <View style={styles.container}>
              <View>
                <Text style={styles.title}>Create Account</Text>
                <FormInput
                  autoFocus={false}
                  returnKeyNext={true}
                  label="First Name"
                  onChangeText={(value) => {
                    setFirstName(value.trim());
                  }}
                />
                <FormInput
                  autoFocus={false}
                  returnKeyNext={true}
                  label="Last Name"
                  onChangeText={(value) => {
                    setLastName(value.trim());
                  }}
                />
                <FormInput
                  returnKeyNext={true}
                  value={phone}
                  label="Phone Number"
                  onChangeText={(value) => {
                    setPhone(formatPhoneNumber(value));
                  }}
                />
                <FormInput
                  returnKeyNext={true}
                  label="Email"
                  onChangeText={(value) => {
                    setEmail(value.trim());
                  }}
                />
                <FormInput returnKeyNext={true} label="Password" onChangeText={setPassword} secureTextEntry={true} />
                <FormInput
                  submit={signUp}
                  returnKeyNext={false}
                  label="Confirm Password"
                  onChangeText={setConfirmPassword}
                  secureTextEntry={true}
                />
                {error && <Alert status="error" message={error} />}
              </View>
              <View style={{ margin: 20 }}>
                <Button title="Next" onPress={signUp} disabled={disabled} />
              </View>
            </View>
          )}
          {route.params.step === 'validate' && (
            <>
              <Title>Validate Phone Number</Title>
              <Text style={{ margin: 20, fontWeight: 'bold' }}>
                Please enter the verification code from your messages
              </Text>
              <FormInput
                returnKeyNext={false}
                autoFocus={true}
                label="Verification Code"
                onChangeText={(value) => {
                  setCode(value.trim());
                }}
                secureTextEntry={true}
              />
              {error && <Alert status="error" message={error} />}
              {success && <Alert status="success" message={success} />}
              <Button
                title="Send New Code"
                onPress={() => {
                  try {
                    console.log(route.params.phone);
                    Auth.resendSignUp(route.params.phone);
                    setSuccess('Sent new verification code');
                    setError(undefined);
                  } catch (err) {
                    console.log(err, 'error');
                    setError(err.message);
                  }
                }}
              />
              <Button title="Confirm Number" onPress={validateUser} disabled={disabled} />
            </>
          )}
        </TouchableWithoutFeedback>
      </Screen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
  },
  title: {
    margin: 20,
    color: TEAL,
    fontSize: 32,
    fontWeight: '400',
  },
});
