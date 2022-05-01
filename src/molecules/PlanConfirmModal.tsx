import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, AppText } from '../atoms/AtomsExports';
import { CloseIcon } from '../../assets/Icons/Close';
import { globalStyles } from '../res/styles/GlobalStyles';
import { Contact } from '../res/dataModels';
import { WHITE, MESSAGE_BLUE } from '../res/styles/Colors';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../models';
import { formatInviteePhoneNumber, isGroupify } from '../res/utilFunctions';
export interface Props {
  message: string;
  selectedContacts: Contact[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const PlanConfirmModal: React.FC<Props> = ({
  message,
  selectedContacts,
  isOpen = false,
  onClose,
  onSubmit,
}: Props) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [contactString, setContractString] = useState('');

  useEffect(() => {
    setIsVisible(isOpen);
    getFriendString();
  }, [isOpen]);

  const close = () => {
    onClose();
    setIsVisible(false);
  };

  const getFriendString = async () => {
    setContractString('');
    let contactString = '';

    const notGroupify: String[] = [];

    for (const selectedContact of selectedContacts) {
      const isGroupifyCheck = await isGroupify(selectedContact);
      if (!isGroupifyCheck) {
        notGroupify.push(selectedContact.name);
      }
    }

    notGroupify.map((contactName, index) => {
      if (notGroupify.length > 1) {
        if (index < notGroupify.length - 1) {
          contactString += ' ' + contactName + ',';
        } else {
          contactString += ' and ' + contactName + '.';
        }
      } else {
        contactString += contactName + '.';
      }
    });

    setContractString(contactString);
  };

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={isVisible} style={{ zIndex: 1, width: 500 }}>
        <View style={[globalStyles.centeredView, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <View style={globalStyles.modalView}>
            <CloseIcon onPress={close} />
            <View style={styles.modalContent}>
              <AppText style={[globalStyles.textH3, styles.modalText]}>
                We will be sending a text message to {'\n'} Non-Groupify Users for this event.
              </AppText>

              {contactString.length > 0 && (
                <AppText style={[globalStyles.bodySmall, styles.modalText]}>
                  Invitees not on Groupify: {contactString}
                </AppText>
              )}

              <View style={styles.messageBox}>
                <AppText style={[globalStyles.bodyMedium, { color: WHITE }]}>{message}</AppText>
              </View>

              <Button
                title={'Ok, Send Invite'}
                onPress={onSubmit}
                containerStyle={{ width: '100%' }}
                buttonStyle={{ minWidth: '100%', borderRadius: 5, marginTop: 15, marginBottom: 0 }}
                textStyle={{ fontSize: 13 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 15,
    textAlign: 'center',
  },
  messageBox: {
    backgroundColor: MESSAGE_BLUE,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    marginTop: 15,
    padding: 10,
  },
});
