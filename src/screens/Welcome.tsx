import React from 'react';
import { ImageBackground, View, Text, StyleSheet, Image } from 'react-native';
import { Button } from '../atoms/Button';
import { copy } from '../res/groupifyCopy';
import { TEAL_0, WHITE } from '../res/styles/Colors';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const Welcome: React.FC<Props> = ({ navigation }: Props) => {
  return (
    <ImageBackground
      style={{ width: '100%', height: '100%', position: 'relative' }}
      resizeMode={'cover'}
      source={require('../../assets/SplashImage.png')}
      testID="WelcomeScreen"
    >
      <Image style={styles.logo} source={require('../../assets/newSplashIcon.png')} />
      <View style={{ flex: 1, position: 'absolute', bottom: 50, justifyContent: 'center', alignSelf: 'center' }}>
        <Button
          textStyle={{
            fontSize: 22,
            lineHeight: 28.9,
            fontWeight: '500',
            backgroundColor: 'transparent',
            color: TEAL_0,
          }}
          buttonStyle={{ width: 335, borderRadius: 5, backgroundColor: WHITE, height: 50 }}
          title={copy.loginButtonTitle}
          onPress={() => navigation.navigate('Login', {})}
          testID="WelcomeLoginButton"
        />
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              lineHeight: 23.6,
              color: WHITE,
              marginBottom: 5,
              fontWeight: '400',
            }}
          >
            Don&apos;t have an account yet ?
          </Text>
          <Button
            buttonStyle={{
              width: 335,
              borderWidth: 2,
              borderColor: TEAL_0,
              borderRadius: 5,
              marginHorizontal: 20,
              height: 50,
            }}
            textStyle={{
              color: WHITE,
              backgroundColor: TEAL_0,
              fontSize: 22,
              lineHeight: 28.9,
              fontWeight: '500',
            }}
            title={copy.signUpButtonTitle}
            onPress={() => navigation.navigate('VerifyPhone', {})}
            testID="WelcomeCreateButton"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    width: '80%',
    height: 95,
    marginTop: 45,
    marginHorizontal: 38,
    resizeMode: 'contain',
  },
});
