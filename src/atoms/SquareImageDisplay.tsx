import React from 'react';
import { Image, StyleSheet } from 'react-native';

// XXX should this be a TouchableOpacity?

interface Props {
  imageURI: string;
}

export const SquareImageDisplay: React.FC<Props> = ({ imageURI }: Props) => {
  return (
    <Image style={styles.imagePreviewContainer} source={{ uri: imageURI }} />
  );
};

const styles = StyleSheet.create({
  imagePreviewContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 0,
  },
});
