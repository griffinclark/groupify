import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface SquareImageDisplayProps {
  imageURI: string;
}

export const SquareImageDisplay: React.FC<SquareImageDisplayProps> = ({ imageURI }: SquareImageDisplayProps) => {
  return <Image style={styles.imagePreviewContainer} source={{ uri: imageURI }} />;
};

const styles = StyleSheet.create({
  imagePreviewContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 0,
  },
});
