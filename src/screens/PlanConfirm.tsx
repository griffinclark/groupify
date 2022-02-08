import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, AppText } from '../atoms/AtomsExports';
import { CloseIcon } from '../../assets/Icons/Close';
import { ConfettiAnimation } from '../molecules/MoleculesExports';
import { RoutePropParams } from '../res/root-navigation';
import { formatDayOfWeekDate } from '../res/utilFunctions';

export interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
    push: (ev: string) => void;
  };
  route: RoutePropParams;
}

export const PlanConfirm: React.FC<Props> = ({ navigation, route }: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  const goHome = () => {
    navigation.navigate('Home', {});
    setIsVisible(false);
  };

  return (
    <View>
      <ConfettiAnimation />
      <Modal animationType="slide" transparent={true} visible={isVisible} style={{ zIndex: -1 }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CloseIcon onPress={goHome} />
            <View style={styles.modalContent}>
              <AppText style={styles.modalText}>Great! Plan has been created!</AppText>
              <AppText style={styles.modalText}>{route.params.data.planData.title}</AppText>
              <AppText style={styles.modalText}>
                {formatDayOfWeekDate(route.params.data.planData.date, false, true)} {'\n'}{' '}
                {route.params.data.planData.time}
              </AppText>
              
              <Button title={'Awesome Sauce'} onPress={goHome} buttonStyle={{ minWidth: 292, borderRadius: 5 }} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
  },
  modalView: {
    minWidth: 292,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'flex-end',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
