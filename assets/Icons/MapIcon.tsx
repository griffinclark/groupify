import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
}

export const MapIcon: React.FC<Props> = ({ image }: Props) => {
  return <Image source={image} style={styles.image} />;
};

const styles = StyleSheet.create({
  // background: {
  //   // flex: 1,
  //   alignItems: 'center',
  //   height: 32,
  //   width: 27.5,
  // },
  image: {
    height: 40,
    marginTop: 13,
    width: 28,
  },
});
