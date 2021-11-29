import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HandIcon } from '../../assets/Icons/IconExports';
import { AppText } from '../atoms/AtomsExports';

interface Props {
  title: string;
}

export const NoResults: React.FC<Props> = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <HandIcon />
      <AppText style={styles.text}>{title}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 20,
  },
});
