import React from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { WHITE } from '../res/styles/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
          <Text maxFontSizeMultiplier={1} style={styles.text1}>
            {message}
          </Text>
          {message2 ? (
            <Text maxFontSizeMultiplier={1} style={styles.text2}>
              {message2}
            </Text>
          ) : null}
        </View>
        <View style={styles.buttonContainer}>
          {button2Text ? (
            <TouchableOpacity style={styles.button} onPress={onButton2Press}>
              <Text maxFontSizeMultiplier={1} style={[styles.buttonText, { color: '#3F8A8D' }]}>
                {button2Text}
              </Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity style={[styles.button2, { backgroundColor: '#31A59F' }]} onPress={onButton1Press}>
            <Text maxFontSizeMultiplier={1} style={[styles.buttonText, { color: 'white' }]}>
              {button1Text}
            </Text>
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
    // borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  text1: {
    fontSize: 20,
    lineHeight: 29.6,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  text2: {
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 8,
    marginTop: 10,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 10,
    borderColor: '#3F8A8D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: -10,
  },
  button2: {
    paddingHorizontal: 10,
    borderColor: '#3F8A8D',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
  popup: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    position: 'absolute',
  },
});
