import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { GREY_1, WHITE } from '../res/styles/Colors';
import { Plan } from '../models';
import { loadPhoto, formatDayOfWeekDate } from '../res/utilFunctions';

interface Props {
  plan: Plan;
  navigation: {
    navigate: (ev: string, {}) => void;
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
    navigation.navigate(destination, { plan: plan });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rootContainer}>
        {photoURI ? <Image source={{ uri: photoURI }} style={styles.image} resizeMode="cover" /> : null}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{plan.title}</Text>
          <View style={styles.infoItemRow}>
            <Text style={styles.infoItem}>Date: {plan.date ? formatDayOfWeekDate(plan.date) : ''}</Text>
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
    shadowColor: '#000',
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
