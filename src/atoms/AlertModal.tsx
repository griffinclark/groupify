import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TEAL, WHITE } from '../res/styles/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
  message: string;
  onConfirm: () => void;
  onReject: () => void;
}
export const AlertModal: React.FC<Props> = ({ message, onConfirm, onReject }: Props) => {
  return (
    <View style={styles.popup}>
      <View style={styles.container}>
        <Text style={styles.text}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onConfirm}>
            <Text style={[styles.buttonText, { color: TEAL }]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: TEAL }]} onPress={onReject}>
            <Text style={[styles.buttonText, { color: 'white' }]}>Back</Text>
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
    top: '35%',
    backgroundColor: WHITE,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
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
    width: '100%',
    height: '110%',
    backgroundColor: 'rgba(52, 52, 52, 0.7)',
    position: 'absolute',
  },
});
