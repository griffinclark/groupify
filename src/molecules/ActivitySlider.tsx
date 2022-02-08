import React from 'react';
import { StyleSheet, View } from 'react-native';
// import Slider from '@react-native-community/slider';
import { Slider } from '@sharcoux/slider';
import { AppText } from '../atoms/AtomsExports';
import { GREY_4, TEAL_0, WHITE } from './../res/styles/Colors';
import { copy } from './../res/groupifyCopy';

interface Props {
  distance: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDistance: any;
}

export const ActivitySlider: React.FC<Props> = ({ distance, setDistance }: Props) => {
  const handleSlideDone = (val: number) => {
    const distances = [1, 5, 10, 20, 30];
    const newDistance = distances[val];
    if (newDistance != distance) setDistance(newDistance);
  };
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Distance</AppText>
      <View style={styles.sliderContainer}>
        <View style={styles.slider}>
          <Slider
            maximumValue={4}
            step={1}
            maximumTrackTintColor={GREY_4}
            minimumTrackTintColor={TEAL_0}
            onSlidingComplete={(val) => handleSlideDone(val)}
            thumbStyle={styles.thumb}
            value={50}
          />
        </View>
        <AppText style={styles.text}>
          {distance} {copy.distanceMeasure}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
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
    height: 28,
    width: 253,
    // width: 100,
  },
  thumb: {
    borderColor: 'rgba(49,165,159, 0.25)',
    borderRadius: 11.5,
    borderWidth: 6,
    backgroundColor: WHITE,
    height: 23,
    width: 23,
  },
  text: {
    fontSize: 20,
  },
});
