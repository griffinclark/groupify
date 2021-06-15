import { RoutePropParams } from '../res/root-navigation';
import { Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { Title, NavButton, Screen, FormInput, Button, Alert } from '../atoms/AtomsExports';
import { Navbar } from '../molecules/MoleculesExports';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

interface Props {
  navigation: {
    navigate: (ev: string) => void;
    push: (ev: string, e: { validateNumber: string; step: string }) => void;
  };
  route: RoutePropParams;
}

export const CreateAccount: React.FC<Props> = ({ navigation, route }: Props) => {
  const [email, setEmail] = useState(route.params.email ? route.params.email : '');
  const [password, setPassword] = useState('empty');
  const [name, setName] = useState('empty');
  const [phone, setPhone] = useState('empty');
  const [formatPhone, setFormatPhone] = useState('empty');
  const [validateNumber, setValidateNumber] = useState('empty');
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
    setFormatPhone(amplifyPhoneFormat(phone));
  }, [email, password, name, phone, formatPhone, validationCode]);

  useEffect(() => {
    const formatedPhone = formatPhoneNumber(phone);
    setPhone(formatedPhone);
  }, [phone]);

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

  const amplifyPhoneFormat = (phone: string) => {
    if (phone.length > 10) {
      const util = PhoneNumberUtil.getInstance();
      const num = util.parseAndKeepRawInput(phone, 'US');
      return util.format(num, PhoneNumberFormat.E164);
    }
  };

  // sign the user up
  const signUp = async () => {
    if (invalidInput(formatPhone)) {
      return;
    }
    try {
      setValidateNumber(formatPhone);
      await Auth.signUp({
        username: formatPhone,
        password,
        attributes: {
          email: email,
          phone_number: formatPhone,
          name: name,
        },
      });
      console.log('user successfully created');
      setError(undefined);
      navigation.push('CreateAccount', { step: 'validate', validateNumber: validateNumber });
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
      } else {
        setError(err.message);
      }
    }
  };

  const validateUser = async () => {
    console.log();
    try {
      await Auth.confirmSignUp(validateNumber, validationCode);
      navigation.navigate('Login');
    } catch (err) {
      console.log('Error: ', err);
      setError(err.message);
    }
  };

  return (
    <Screen>
      <Navbar>
        <NavButton onPress={() => navigation.navigate('Welcome')} title="Back" />
      </Navbar>
      {route.params.step === 'create' && (
        <>
          <Title>Create Account</Title>
          <FormInput
            label="Name"
            onChangeText={(value) => {
              setName(value.trim());
            }}
          />
          <FormInput
            label="Email"
            onChangeText={(value) => {
              setEmail(value.trim());
            }}
          />
          <FormInput label="Password" onChangeText={setPassword} secureTextEntry={true} />
          <FormInput
            value={phone}
            label="Phone Number"
            onChangeText={(value) => {
              setPhone(value.trim());
            }}
          />
          {error && <Alert status="error" message={error} />}
          <Button title="Next" onPress={signUp} disabled={disabled} />
        </>
      )}
      {route.params.step === 'validate' && (
        <>
          <Title>Validate Phone Number</Title>
          <Text style={{ margin: 20, fontWeight: 'bold' }}>Please enter the verification code from your messages</Text>
          <FormInput
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
                console.log(validateNumber);
                Auth.resendSignUp(validateNumber);
                setSuccess('Sent new verification code');
              } catch (err) {
                console.log(err);
                setError(err.message);
              }
            }}
          />
          <Button title="Confirm Number" onPress={validateUser} disabled={disabled} />
        </>
      )}
    </Screen>
  );
};
