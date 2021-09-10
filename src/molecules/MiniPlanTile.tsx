import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import { GREY_1, WHITE, POST_SPACING, TEAL } from '../res/styles/Colors';
import { Plan } from '../models';
import { loadPhoto, formatDayOfWeekDate } from '../res/utilFunctions';
import { Image } from 'react-native-elements';
import { AppText } from '../atoms/AtomsExports';

interface Props {
  plan: Plan;
  onPress?: (event: GestureResponderEvent) => void;
}

export const MiniPlanTile: React.FC<Props> = ({ plan, onPress }: Props) => {
  const [photoURI, setPhotoURI] = useState<string>('');

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
        <Image style={{ width: 89, height: 63, borderRadius: 5, marginRight: 5 }} source={{ uri: photoURI }} />
        <View>
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
    width: '100%',
    flexDirection: 'row',
    backgroundColor: WHITE,
    borderRadius: 10,
    marginTop: POST_SPACING,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    marginBottom: 10,
  },
  infoItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  infoItem: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    color: GREY_1,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    maxWidth: '90%',
  },
  today: {
    backgroundColor: TEAL,
    padding: 3,
    borderRadius: 25,
  },
});
