import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppText } from '../atoms/AppText';

import { TEAL_0, WHITE } from '../res/styles/Colors';

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
        <AppText style={[styles.modalText, textStyle ? textStyle : {}]}>
          Are you sure you don&apos;t want to import contacts?
        </AppText>
        <View style={[styles.buttons, buttonStyle]}>
          <TouchableOpacity onPress={handleConfirm} style={[styles.button, styles.yesButton]}>
            <AppText style={[styles.buttonText, styles.yesButtonText]}>Yes</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseModal} style={[styles.button, styles.backButton]}>
            <AppText style={[styles.buttonText, styles.backButtonText, buttonTextStyle ? buttonTextStyle : {}]}>
              Back
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: TEAL_0,
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
    borderColor: TEAL_0,
    borderWidth: 1,
  },
  yesButtonText: {
    color: TEAL_0,
  },
});
