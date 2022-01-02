import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

export const MapIcon: React.FC<Props> = () => {
  return <ImageBackground source={require('../locationPins/Location_Base.png')} style={styles.background} />;
};

const styles = StyleSheet.create({
  background: {
    // flex: 1,
    alignItems: 'center',
    height: 32,
    width: 27.5,
  },
  image: {
    height: 22,
    marginTop: 13,
    width: 22,
  },
});
