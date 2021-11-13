import React from 'react';
import { ImageBackground, StyleSheet, Image } from 'react-native';

interface Props {
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
    height: 25,
    marginTop: 10,
    width: 25,
  },
});
