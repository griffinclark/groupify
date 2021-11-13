import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

interface Props {
  image: string;
}

export const MapIcon: React.FC<Props> = ({ image }: Props) => {
  if (!image || image.length < 1) return null;
  const imageUrl = `../assets/activity-${image}.png`;
  console.log(imageUrl);
  return <View />;
  // return <ImageBackground source={require(imageUrl)} style={{ flex: 1 }}></ImageBackground>;
};
