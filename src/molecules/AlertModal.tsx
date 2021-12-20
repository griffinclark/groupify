import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TEAL, WHITE } from '../res/styles/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText } from '../atoms/AppText';

interface Props {
  title: string;
  subtitle?: string;
  onButton2Press?: () => void;
  onButton1Press: () => void;
  yesButton: string;
  noButton?: string;
}
export const AlertModal: React.FC<Props> = ({
  title,
  subtitle,
  onButton2Press,
  onButton1Press,
  yesButton,
  noButton,
}: Props) => {
  return (
    <View style={styles.popup}>
      <View style={styles.container}>
        <View>
          <AppText maxFontSizeMultiplier={1} style={styles.text1}>
            {title}
          </AppText>
          {subtitle ? (
            <AppText maxFontSizeMultiplier={1} style={styles.text2}>
              {subtitle}
            </AppText>
          ) : null}
        </View>
        <View style={styles.buttonContainer}>
          {noButton ? (
            <TouchableOpacity style={styles.button} onPress={onButton2Press}>
              <AppText maxFontSizeMultiplier={1} style={[styles.buttonText, { color: TEAL }]}>
                {noButton}
              </AppText>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity style={[styles.button, { backgroundColor: TEAL }]} onPress={onButton1Press}>
            <AppText maxFontSizeMultiplier={1} style={[styles.buttonText, { color: 'white' }]}>
              {yesButton}
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
    borderColor: TEAL,
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
