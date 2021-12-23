import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TEAL_0, WHITE } from '../res/styles/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText } from './AppText';

interface Props {
  message: string;
  message2?: string;
  onButton2Press?: () => void;
  onButton1Press: () => void;
  button1Text: string;
  button2Text?: string;
}
export const AlertModal: React.FC<Props> = ({
  message,
  message2,
  onButton2Press,
  onButton1Press,
  button1Text,
  button2Text,
}: Props) => {
  return (
    <View style={styles.popup}>
      <View style={styles.container}>
        <View>
          <AppText maxFontSizeMultiplier={1} style={styles.text1}>
            {message}
          </AppText>
          {message2 ? (
            <AppText maxFontSizeMultiplier={1} style={styles.text2}>
              {message2}
            </AppText>
          ) : null}
        </View>
        <View style={styles.buttonContainer}>
          {button2Text ? (
            <TouchableOpacity style={styles.button} onPress={onButton2Press}>
              <AppText maxFontSizeMultiplier={1} style={[styles.buttonText, { color: TEAL_0 }]}>
                {button2Text}
              </AppText>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity style={[styles.button, { backgroundColor: TEAL_0 }]} onPress={onButton1Press}>
            <AppText maxFontSizeMultiplier={1} style={[styles.buttonText, { color: 'white' }]}>
              {button1Text}
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '90%',
    height: 280,
    alignSelf: 'center',
    margin: 20,
    position: 'absolute',
    top: '30%',
    backgroundColor: WHITE,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'space-between',
  },
  text1: {
    fontSize: 20,
    lineHeight: 28.6,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  text2: {
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 15,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    borderRadius: 40,
    borderWidth: 1,
    width: 122,
    height: 43,
    borderColor: TEAL_0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
  },
  popup: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    position: 'absolute',
  },
});
