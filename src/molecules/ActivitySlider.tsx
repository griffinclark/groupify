import React from 'react';
import { StyleSheet, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { AppText } from '../atoms/AtomsExports';
import { TEAL } from '../res/styles/Colors';

interface Props {
  distance: number;
  setDistance: any;
}

export const ActivitySlider: React.FC<Props> = ({ distance, setDistance }: Props) => {
  const handleSlideDone = (val: number) => {
    const distances = [1, 5, 10, 15, 25, 50];
    const newDistance = distances[val];
    if (newDistance != distance) setDistance(newDistance);
  };
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Distance</AppText>
      <View style={styles.sliderContainer}>
        <Slider
          maximumValue={5}
          step={1}
          maximumTrackTintColor={'#C4C4C4'}
          minimumTrackTintColor={TEAL}
          onSlidingComplete={(val) => handleSlideDone(val)}
          style={styles.slider}
          value={50}
        />
        <AppText style={styles.text}>{distance} mi</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingLeft: 26,
    paddingRight: 17,
    paddingTop: 16,
  },
  sliderContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  slider: {
    width: 253,
  },
  text: {
    fontSize: 20,
  },
});
