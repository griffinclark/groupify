import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent, Image } from 'react-native';
import { GREY_1, WHITE, POST_SPACING } from '../res/styles/Colors';
import { Plan } from '../models';
import { formatTime, formatDate, loadPhoto } from '../res/utilFunctions';

interface MediumPlanTileProps {
  plan: Plan;
  onPress?: (event: GestureResponderEvent) => void;
}

export const MediumPlanTile: React.FC<MediumPlanTileProps> = ({ plan, onPress }: MediumPlanTileProps) => {
  const [photoURI, setPhotoURI] = useState('');

  useEffect(() => {
    if (plan.placeID !== undefined) {
      const placeID = plan.placeID;
      (async () => setPhotoURI(await loadPhoto(placeID)))();
    }
  }, []);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rootContainer}>
        {photoURI ? (
          <Image source={{ uri: photoURI }} style={styles.image} resizeMode="cover" />
        ) : (
          <Text>No image</Text>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{plan.title}</Text>
          <View style={styles.infoItemRow}>
            <Text style={styles.infoItem}>{plan.date ? formatDate(plan.date) : ''}</Text>
            <Text>{plan.time ? formatTime(plan.time) : ''}</Text>
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
