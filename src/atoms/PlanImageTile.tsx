import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Plan } from '../models';
import { TEAL_0 } from '../res/styles/Colors';
import { formatDayOfWeekDate, formatTime, loadPhoto } from '../res/utilFunctions';
import { AppText } from './AppText';
import { Image } from 'react-native-elements';

interface Props {
  plan: Plan;
}

export const PlanImageTile: React.FC<Props> = ({ plan }: Props) => {
  const [photoURI, setPhotoURI] = useState('');
  useEffect(() => {
    (async () => {
      if (plan.placeID) {
        setPhotoURI(await loadPhoto(plan.placeID));
      }
    })();
  }, []);

  return (
    <View>
      {photoURI ? (
        <Image source={{ uri: photoURI }} style={styles.image} resizeMode="cover">
          <View style={styles.imageDetailContainer}>
            <AppText maxFontSizeMultiplier={1} style={styles.imageDetail}>
              {plan.date &&
                formatDayOfWeekDate(plan.date)
                  .toString()
                  .substring(formatDayOfWeekDate(plan.date).toString().indexOf(' ') + 1)}
            </AppText>
          </View>
          <View style={styles.imageDetailContainer}>
            <AppText maxFontSizeMultiplier={1} style={styles.imageDetail}>
              {plan.time && formatTime(plan.time)}
            </AppText>
          </View>
          <View style={styles.imageDetailContainer}>
            <AppText maxFontSizeMultiplier={1} style={styles.imageDetail}>
              {plan.title}
            </AppText>
          </View>
        </Image>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 154,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    paddingRight: 6,
    alignItems: 'flex-end',
  },
  imageDetail: {
    fontSize: 20,
    paddingHorizontal: 5,
    textAlign: 'right',
    color: 'white',
  },
  imageDetailContainer: {
    backgroundColor: TEAL_0,
    padding: 5,
    margin: 4,
    borderRadius: 5,
  },
});
