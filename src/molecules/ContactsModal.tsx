import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { TEAL, WHITE } from '../res/styles/Colors';

interface Props {
  enabled: boolean;
  handleCloseModal: () => void;
  handleConfirm: () => void;
  modalStyle?: Record<string, unknown>;
  textStyle?: Record<string, unknown>;
  buttonStyle?: Record<string, unknown>;
  buttonTextStyle?: Record<string, unknown>;
}

export const ContactsModal: React.FC<Props> = ({
  enabled,
  handleCloseModal,
  handleConfirm,
  modalStyle,
  textStyle,
  buttonStyle,
  buttonTextStyle,
}: Props) => {
  if (!enabled) return null;
  return (
    <View style={styles.modalContainer}>
      <View style={[styles.modal, modalStyle]}>
        <Text style={[styles.modalText, textStyle]}>Are you sure you don&apos;t want to import contacts?</Text>
        <View style={[styles.buttons, buttonStyle]}>
          <TouchableOpacity onPress={handleConfirm} style={[styles.button, styles.yesButton]}>
            <Text style={[styles.buttonText, styles.yesButtonText]}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseModal} style={[styles.button, styles.backButton]}>
            <Text style={[styles.buttonText, styles.backButtonText, buttonTextStyle]}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: TEAL,
  },
  backButtonText: {
    color: WHITE,
  },
  button: {
    alignItems: 'center',
    borderRadius: 40,
    padding: 10,
    width: 122,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 23,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modal: {
    backgroundColor: WHITE,
    borderRadius: 30,
    height: 269,
    justifyContent: 'space-between',
    paddingHorizontal: 27,
    paddingBottom: 25,
    paddingTop: 65,
    width: 322,
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    paddingTop: 192,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  modalText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 29,
    textAlign: 'center',
  },
  yesButton: {
    borderColor: TEAL,
    borderWidth: 1,
  },
  yesButtonText: {
    color: TEAL,
  },
});