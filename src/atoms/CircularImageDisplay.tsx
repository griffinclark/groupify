import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface Props {
  imageURI: string;
  size?: number;
}

export const CircularImageDisplay: React.FC<Props> = ({ imageURI }: Props) => {
  return (
    <Image
      style={styles.imagePreviewContainer}
      source={{
        uri: imageURI,
      }}
    />
  );
};

const styles = StyleSheet.create({
  imagePreviewContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 150,
  },
});
