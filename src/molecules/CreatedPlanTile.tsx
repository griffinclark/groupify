import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { BLACK, GREY_1, WHITE } from '../res/styles/Colors';
import { Plan } from '../models';
import { loadPhoto, formatDayOfWeekDate } from '../res/utilFunctions';
import { AppText } from '../atoms/AppText';

interface Props {
  plan: Plan;
  navigation: {
    CreateAccount: {
      step: string;
      email: string;
    };
    params: {
      Login: string;
    };
    navigate: (ev: string, {}) => void;
    push: (ev: string, {}) => void;
  };
  destination: string;
}

export const CreatedPlanTile: React.FC<Props> = ({ plan, navigation, destination }: Props) => {
  const [photoURI, setPhotoURI] = useState('');

  useEffect(() => {
    (async () => {
      if (plan.placeID) {
        setPhotoURI(await loadPhoto(plan.placeID));
      }
    })();
  }, []);

  const onPress = () => {
    navigation.push(destination, { plan: plan });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rootContainer}>
        {photoURI ? <Image source={{ uri: photoURI }} style={styles.image} resizeMode="cover" /> : null}
        <View style={styles.textContainer}>
          <AppText style={styles.title}>{plan.title}</AppText>
          <View style={styles.infoItemRow}>
            <AppText style={styles.infoItem}>Date: {plan.date ? formatDayOfWeekDate(plan.date) : ''}</AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: 216,
    flexDirection: 'column',
    backgroundColor: WHITE,
    borderRadius: 5,
    marginTop: 15,
    marginRight: 30,
    elevation: 5,
    shadowColor: BLACK,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    marginBottom: 10,
  },
  textContainer: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  infoItemRow: {
    flexDirection: 'row',
  },
  infoItem: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: GREY_1,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 91,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
