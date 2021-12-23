import React from 'react';
import { ImageBackground, View } from 'react-native';
import { AppText } from '../atoms/AppText';
import { Button } from '../atoms/Button';
import { copy } from '../res/groupifyCopy';
import { TEAL_0 } from '../res/styles/Colors';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const Welcome: React.FC<Props> = ({ navigation }: Props) => {
  return (
    <ImageBackground
      style={{ width: '100%', height: '100%' }}
      resizeMode={'cover'}
      source={require('../../assets/SplashScreen.png')}
      testID="WelcomeScreen"
    >
      <View style={{ flexDirection: 'column', justifyContent: 'center', flex: 1, marginBottom: '15%' }}>
        <Button
          textStyle={{ fontSize: 20 }}
          buttonStyle={{ width: 335, borderRadius: 25 }}
          title={copy.loginButtonTitle}
          onPress={() => navigation.navigate('Login', {})}
          testID="WelcomeLoginButton"
        />
        <View style={{ marginTop: 20 }}>
          <AppText style={{ textAlign: 'center', fontSize: 20, lineHeight: 28.6 }}>Don&apos;t have an account?</AppText>
          <Button
            buttonStyle={{ width: 335, backgroundColor: 'white', borderWidth: 2, borderColor: TEAL_0, borderRadius: 25 }}
            textStyle={{ color: TEAL_0, backgroundColor: 'white', fontSize: 20 }}
            title={copy.signUpButtonTitle}
            onPress={() => navigation.navigate('CreateAccount', {})}
            testID="WelcomeCreateButton"
          />
        </View>
      </View>
    </ImageBackground>
  );
};
