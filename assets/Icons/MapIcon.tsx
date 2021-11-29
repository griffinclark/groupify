import React from 'react';
import { ImageBackground, StyleSheet, Image } from 'react-native';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

export const MapIcon: React.FC<Props> = ({ image }: Props) => {
  return (
    <ImageBackground source={require('../MapIcon.png')} style={styles.background}>
      <Image source={image} style={styles.image} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    // flex: 1,
    height: 71,
    alignItems: 'center',
    width: 49,
  },
  image: {
    height: 22,
    marginTop: 13,
    width: 22,
  },
});
