import React from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import { Button } from '../atoms/Button';
import { copy } from '../res/groupifyCopy';
import { TEAL_0, WHITE } from '../res/styles/Colors';
import { JOST } from '../res/styles/Fonts';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
}

export const Welcome: React.FC<Props> = ({ navigation }: Props) => {
  return (
    <ImageBackground
      style={styles.imgBackground}
      resizeMode={'cover'}
      source={require('../../assets/SplashScreen3.png')}
      testID="WelcomeScreen"
    >
      <View style={styles.buttonContainer}>
        <Button
          textStyle={{
            fontSize: 20,
            lineHeight: 28.9,
            fontFamily: JOST['500'],
            backgroundColor: 'transparent',
            color: TEAL_0,
          }}
          buttonStyle={{ width: 335, borderRadius: 5, backgroundColor: WHITE, height: 50 }}
          title={copy.loginButtonTitle}
          onPress={() => navigation.navigate('Login', {})}
          testID="WelcomeLoginButton"
        />
        <View style={{ marginTop: 20 }}>
          <Text style={styles.textStyle}>Don&apos;t have an account yet ?</Text>
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
              fontSize: 20,
              lineHeight: 28.9,
              fontFamily: JOST['500'],
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
    marginTop: 50,
    marginHorizontal: 38,
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  buttonContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 23.6,
    color: WHITE,
    marginBottom: 5,
    fontFamily: JOST['500'],
  },
});
