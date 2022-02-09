/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import { RoutePropParams } from '../res/root-navigation';
import { Auth } from 'aws-amplify';
import { WHITE } from '../res/styles/Colors';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    goBack: () => void;
    push: (ev: any, e: { phone: any; step: string }) => void;
  };
  route: RoutePropParams;
}

export const ValidateUser = ({ navigation, route }: Props) => {
  const [validationCode, setValidationCode] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const confirmRef = useRef<CodeInput>(null);

  const validateUser = async () => {
    try {
      await Auth.confirmSignUp(route.params.phone, validationCode);
      navigation.navigate('Login', { accountCreated: 'success' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log('Error: ', err);
      setError(err.message);
      clearError();
      setSuccess(undefined);
    }
  };

  const clearError = () => {
    setTimeout(() => {
      setError(undefined);
    }, 3000);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.header}>Please enter the verification code you received.</Text>
            <CodeInput
              ref={confirmRef}
              className={'border-b'}
              space={10}
              size={48}
              inputPosition="left"
              onFulfill={(code: any) => setValidationCode(code)}
              containerStyle={{ marginTop: 5 }}
              codeInputStyle={{ borderBottomWidth: 1.5, borderBottomColor: 'black', fontSize: 23 }}
              activeColor="black"
              keyboardType="numeric"
              codeLength={6}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {success ? <Text style={styles.success}>{success}</Text> : null}
            <TouchableOpacity
              onPress={() => {
                try {
                  console.log(route.params.phone);
                  Auth.resendSignUp(route.params.phone);
                  setSuccess('Sent new verification code');
                  setError(undefined);
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (err: any) {
                  console.log(err);
                  setError(err.message);
                  clearError();
                }
              }}
            >
              <Text style={styles.verification}>Send New Verification Code</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={validateUser} activeOpacity={0.7} style={styles.button}>
              <Text style={styles.buttonText}> Next </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    marginVertical: 18,
    fontWeight: '500',
  },
  verification: {
    fontSize: 20,
    color: '#3F8A8D',
    marginTop: 45,
    fontWeight: '500',
  },
  button: {
    marginTop: 28,
    backgroundColor: '#3F8A8D',
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 22,
    borderRadius: 5,
  },
  buttonText: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '500',
  },
  error: {
    marginTop: 15,
    backgroundColor: 'red',
    textAlign: 'center',
    marginHorizontal: 30,
    color: 'white',
    fontSize: 18,
    borderRadius: 10,
  },
  success: {
    marginTop: 15,
    backgroundColor: 'green',
    textAlign: 'center',
    marginHorizontal: 30,
    color: 'white',
    fontSize: 18,
    borderRadius: 10,
  },
});
