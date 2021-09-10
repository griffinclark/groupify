import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TEAL } from '../res/styles/Colors';
import { AppText } from './AtomsExports';

interface Props {
  navigation: {
    navigate: (ev: string, {}) => void;
  };
  destination: string;
}

export const ViewAll: React.FC<Props> = ({ navigation, destination }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(destination, {})}>
      <AppText style={styles.text}>SEE ALL</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
    color: TEAL,
  },
});
