import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, GestureResponderEvent, Image } from 'react-native';
import { GREY_1, WHITE, POST_SPACING, BLACK } from '../res/styles/Colors';
import { Plan } from '../models';
import { formatTime, formatDate, loadPhoto } from '../res/utilFunctions';
import { AppText } from '../atoms/AppText';

interface Props {
  plan: Plan;
  onPress?: (event: GestureResponderEvent) => void;
}

export const MediumPlanTile: React.FC<Props> = ({ plan, onPress }: Props) => {
  const [photoURI, setPhotoURI] = useState('');

  useEffect(() => {
    (async () => {
      if (plan.placeID) {
        setPhotoURI(await loadPhoto(plan.placeID));
      }
    })();
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rootContainer}>
        {photoURI ? <Image source={{ uri: photoURI }} style={styles.image} resizeMode="cover" /> : null}
        <View style={styles.textContainer}>
          <AppText style={styles.title}>{plan.title}</AppText>
          <View style={styles.infoItemRow}>
            <AppText style={styles.infoItem}>{plan.date ? formatDate(plan.date) : ''}</AppText>
            <AppText>{plan.time ? formatTime(plan.time) : ''}</AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    width: 300,
    flexDirection: 'column',
    backgroundColor: WHITE,
    borderRadius: 10,
    marginTop: POST_SPACING,
    marginHorizontal: POST_SPACING,
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
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
