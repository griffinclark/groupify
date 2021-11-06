import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native';
import { AppText } from '../atoms/AtomsExports';

interface Props {
  modal: boolean;
  setModal: any;
}

export const ActivityModal: React.FC<Props> = ({ modal, setModal }: Props) => {
  if (!modal) return null;
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <View style={{ right: 20, position: 'absolute', zIndex: 100 }}>
          <TouchableOpacity onPress={() => setModal(false)}>
            <AppText style={styles.x}>X</AppText>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <AppText style={styles.modalHeader}>Location Discovery</AppText>
          <AppText style={styles.modalHeaderText}>
            Having trouble picking a place? Choose from 6 categories to find a new, fun location!
          </AppText>

          <AppText style={styles.modalTitle}>Get Food</AppText>
          <AppText style={styles.modalText}>
            Restaurants , Bakeries, Diners, Takeout, Pizzerias, Fast Food, Bars
          </AppText>
          <AppText style={styles.modalTitle}>Go Outside</AppText>
          <AppText style={styles.modalText}>Parks, Hiking and Bike Trails, Lakes, Beaches</AppText>
          <AppText style={styles.modalTitle}>Get Fit</AppText>
          <AppText style={styles.modalText}>Gyms, Yoga Studios</AppText>
          <AppText style={styles.modalTitle}>Go Shopping</AppText>
          <AppText style={styles.modalText}>Malls, Shopping Centers, Retail Stores</AppText>
          <AppText style={styles.modalTitle}>Get Coffee</AppText>
          <AppText style={styles.modalText}>Cafes, Coffee Shops</AppText>
          <AppText style={styles.modalTitle}>Get Relaxed</AppText>
          <AppText style={styles.modalText}>Spas, Hair and Nail Salons, Massage Studios</AppText>
          <AppText style={styles.modalTitle}>Nightlife</AppText>
          <AppText style={styles.modalText}>Bars, Clubs</AppText>
          <AppText style={styles.modalTitle}>Entertainment</AppText>
          <AppText style={styles.modalText}>Movie theaters, Ballet, Plays, Attractions</AppText>
          <AppText style={styles.modalTitle}>Art & Culture</AppText>
          <AppText style={styles.modalText}>Art Galleries, Museums, Libraries</AppText>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 465,
    paddingTop: 30,
    width: 322,
  },
  x: {
    // alignSelf: 'flex-end',
    fontSize: 40,
    // right: 20,
    // top: -11,
    // position: 'absolute',
    // zIndex: 100,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 25,
    textAlign: 'center',
  },
  modalHeaderText: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  modalTitle: {
    fontSize: 20,
    lineHeight: 29,
    fontWeight: '700',
    marginTop: 10,
    paddingHorizontal: 30,
  },
  modalText: {
    fontSize: 16,
    paddingHorizontal: 30,
    marginTop: 5,
    lineHeight: 23,
  },
});
